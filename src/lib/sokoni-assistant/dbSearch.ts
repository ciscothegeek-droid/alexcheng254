// Live DB search helpers for Sokoni Assistant.
// Free — uses the existing Supabase publishable key, no extra services.

import { supabase } from "@/integrations/supabase/untyped-client";

export type ParsedQuery = {
  text: string;            // cleaned search text
  type?: "product" | "service" | "event";
  maxPrice?: number;
  minPrice?: number;
  location?: string;
  category?: string;
};

const TYPE_HINTS: { type: ParsedQuery["type"]; words: string[] }[] = [
  { type: "service", words: ["service", "services", "huduma", "provider"] },
  { type: "event", words: ["event", "events", "matukio", "concert", "festival"] },
  { type: "product", words: ["product", "products", "item", "items", "bidhaa"] },
];

const KENYAN_TOWNS = [
  "nairobi", "mombasa", "kisumu", "nakuru", "eldoret", "thika", "machakos",
  "naivasha", "nyeri", "kakamega", "kisii", "meru", "kitale", "kilifi",
  "diani", "malindi", "garissa", "kericho", "embu", "ruiru", "kiambu",
  "westlands", "karen", "kilimani", "ngong", "rongai", "kahawa",
];

const FILLER_TRAILING = /\b(uh|um|err|eh|like|you know|kind of|sort of|so|and|or|but)\s*$/i;

export function stripFillers(s: string): string {
  let out = s.trim();
  // remove trailing filler words to detect "still talking" pauses
  let prev = "";
  while (out !== prev) {
    prev = out;
    out = out.replace(FILLER_TRAILING, "").trim();
  }
  return out;
}

// Detect if utterance likely continues (ends in a connector, comma, "and", price-without-number, etc.)
export function looksIncomplete(s: string): boolean {
  const t = s.trim().toLowerCase();
  if (!t) return true;
  if (/[,;]$/.test(t)) return true;
  if (/\b(and|or|but|with|under|below|above|over|in|near|around|for|of|to|from|the|a|an|that|which|because|so|then)\s*$/i.test(t)) return true;
  if (/\b(less than|more than|cheaper than|priced at)\s*$/i.test(t)) return true;
  return false;
}

export function parseQuery(raw: string): ParsedQuery {
  const original = raw.trim();
  let text = " " + original.toLowerCase() + " ";
  const result: ParsedQuery = { text: original };

  // Type
  for (const h of TYPE_HINTS) {
    if (h.words.some((w) => text.includes(` ${w} `))) {
      result.type = h.type;
      break;
    }
  }

  // Price extraction: "under 5000", "below 10k", "less than 2,500", "between 1000 and 5000"
  const priceNum = (s: string) => {
    let n = parseFloat(s.replace(/[, ]/g, ""));
    if (/k$/i.test(s)) n *= 1000;
    if (/m$/i.test(s)) n *= 1_000_000;
    return Number.isFinite(n) ? n : undefined;
  };

  const between = text.match(/between\s+([\d.,]+\s*[km]?)\s+(?:and|to)\s+([\d.,]+\s*[km]?)/i);
  if (between) {
    const a = priceNum(between[1]);
    const b = priceNum(between[2]);
    if (a !== undefined && b !== undefined) {
      result.minPrice = Math.min(a, b);
      result.maxPrice = Math.max(a, b);
    }
  } else {
    const under = text.match(/(?:under|below|less than|cheaper than|max(?:imum)?|up to)\s+([\d.,]+\s*[km]?)/i);
    if (under) result.maxPrice = priceNum(under[1]);
    const over = text.match(/(?:over|above|more than|at least|min(?:imum)?|from)\s+([\d.,]+\s*[km]?)/i);
    if (over) result.minPrice = priceNum(over[1]);
  }

  // Location
  for (const town of KENYAN_TOWNS) {
    if (text.includes(` ${town} `) || text.includes(` in ${town}`) || text.includes(` near ${town}`)) {
      result.location = town;
      break;
    }
  }

  // Strip noise from search text
  let cleaned = original
    .replace(/\b(under|below|over|above|less than|more than|cheaper than|between|and|to|in|near|around|please|kindly|for me|show me|find|search|look for|i want|i need|nipe|tafuta)\b/gi, " ")
    .replace(/\b\d[\d.,]*\s*[km]?\b/gi, " ")
    .replace(new RegExp(`\\b(${KENYAN_TOWNS.join("|")})\\b`, "gi"), " ")
    .replace(/\s+/g, " ")
    .trim();

  result.text = cleaned || original;
  return result;
}

export type SearchResult = {
  listings: any[];
  shops: any[];
  parsed: ParsedQuery;
};

export async function searchEverything(raw: string, limit = 5): Promise<SearchResult> {
  const parsed = parseQuery(raw);
  const term = parsed.text;

  // --- Listings ---
  let listingQuery = supabase
    .from("listings_public")
    .select("*")
    .eq("status", "available");

  if (parsed.type) listingQuery = listingQuery.eq("listing_type", parsed.type);
  if (parsed.maxPrice !== undefined) listingQuery = listingQuery.lte("price", parsed.maxPrice);
  if (parsed.minPrice !== undefined) listingQuery = listingQuery.gte("price", parsed.minPrice);
  if (parsed.location) listingQuery = listingQuery.ilike("location", `%${parsed.location}%`);
  if (term) listingQuery = listingQuery.or(`title.ilike.%${term}%,description.ilike.%${term}%,category.ilike.%${term}%`);
  listingQuery = listingQuery.order("is_featured", { ascending: false }).order("created_at", { ascending: false }).limit(limit);

  // --- Shops ---
  let shopQuery = supabase
    .from("shops")
    .select("id, name, slug, description, location, category, is_verified, is_promoted, followers_count")
    .eq("is_active", true);

  if (parsed.location) shopQuery = shopQuery.ilike("location", `%${parsed.location}%`);
  if (term) shopQuery = shopQuery.or(`name.ilike.%${term}%,description.ilike.%${term}%,category.ilike.%${term}%`);
  shopQuery = shopQuery.order("followers_count", { ascending: false }).limit(Math.min(limit, 3));

  const [{ data: listings }, { data: shops }] = await Promise.all([listingQuery, shopQuery]);

  return {
    listings: listings || [],
    shops: shops || [],
    parsed,
  };
}

export function summariseResults(r: SearchResult): string {
  const { listings, shops, parsed } = r;
  if (!listings.length && !shops.length) {
    const filters: string[] = [];
    if (parsed.location) filters.push(`in ${parsed.location}`);
    if (parsed.maxPrice !== undefined) filters.push(`under ${parsed.maxPrice}`);
    if (parsed.minPrice !== undefined) filters.push(`above ${parsed.minPrice}`);
    return `I couldn't find anything matching "${parsed.text}"${filters.length ? " " + filters.join(" ") : ""}. Want me to search more broadly or open the search page?`;
  }

  const parts: string[] = [];
  if (listings.length) {
    const first = listings[0];
    const priceTxt = first.price ? ` at KES ${Number(first.price).toLocaleString()}` : "";
    const locTxt = first.location ? ` in ${first.location}` : "";
    parts.push(`I found ${listings.length} listing${listings.length > 1 ? "s" : ""}. Top match: ${first.title}${priceTxt}${locTxt}.`);
  }
  if (shops.length) {
    parts.push(`Also ${shops.length} shop${shops.length > 1 ? "s" : ""} matched, including ${shops[0].name}.`);
  }
  parts.push("Opening the search page for the full list.");
  return parts.join(" ");
}
