// Free, rule-based intent engine for Sokoni Assistant.
// No API calls, no costs — runs 100% in the browser.

export type IntentResult = {
  reply: string;
  action?:
    | { type: "navigate"; path: string }
    | { type: "search"; query: string }
    | { type: "external"; url: string };
};

type Rule = {
  // The bot matches if ANY of these patterns hit.
  patterns: RegExp[];
  handle: (text: string, match: RegExpMatchArray) => IntentResult;
};

const norm = (s: string) => s.toLowerCase().trim();

// Helper to build a route response
const go = (path: string, reply: string): IntentResult => ({
  reply,
  action: { type: "navigate", path },
});

const rules: Rule[] = [
  // ---------- Greetings ----------
  {
    patterns: [/^(hi|hello|hey|habari|mambo|niaje|sasa|jambo)\b/i],
    handle: () => ({
      reply:
        "Hey there! I'm Sokoni Assistant. I can help you search products, navigate the site, or explain how things work. What would you like to do?",
    }),
  },
  {
    patterns: [/\b(thank you|thanks|asante|thx)\b/i],
    handle: () => ({ reply: "You're welcome! Anything else I can help with?" }),
  },
  {
    patterns: [/\b(bye|goodbye|kwaheri|see you)\b/i],
    handle: () => ({ reply: "Goodbye! Happy shopping on SokoniArena." }),
  },

  // ---------- Search intents (capture the query) ----------
  {
    patterns: [
      /(?:search|find|look for|show me|i (?:want|need)|nipe|tafuta)\s+(?:for\s+)?(.+)/i,
    ],
    handle: (_t, m) => {
      const query = m[1].replace(/[.?!]+$/, "").trim();
      return {
        reply: `Searching for "${query}"...`,
        action: { type: "search", query },
      };
    },
  },

  // ---------- Navigation ----------
  {
    patterns: [/\b(home|homepage|main page|landing)\b/i],
    handle: () => go("/", "Taking you home."),
  },
  {
    patterns: [/\b(products?|items?|bidhaa)\b/i],
    handle: () => go("/products", "Opening Products."),
  },
  {
    patterns: [/\b(services?|huduma)\b/i],
    handle: () => go("/services", "Opening Services."),
  },
  {
    patterns: [/\b(events?|event|matukio)\b/i],
    handle: () => go("/events", "Opening Events."),
  },
  {
    patterns: [/\b(shops?|stores?|maduka)\b/i],
    handle: () => go("/shops", "Opening Shops."),
  },
  {
    patterns: [/\b(fun ?circle|social|friends)\b/i],
    handle: () => go("/fun-circle", "Opening Fun Circle."),
  },
  {
    patterns: [/\b(favorites?|saved|wishlist)\b/i],
    handle: () => go("/favorites", "Opening your favorites."),
  },
  {
    patterns: [/\b(messages?|chats?|inbox|ujumbe)\b/i],
    handle: () => go("/messages", "Opening your messages."),
  },
  {
    patterns: [/\b(dashboard|my account|account)\b/i],
    handle: () => go("/dashboard", "Opening your dashboard."),
  },
  {
    patterns: [/\b(login|sign ?in|log ?in)\b/i],
    handle: () => go("/login", "Taking you to sign in."),
  },
  {
    patterns: [/\b(register|sign ?up|create account|join)\b/i],
    handle: () => go("/register", "Let's create your account."),
  },
  {
    patterns: [/\b(how it works|how to use|guide|tutorial)\b/i],
    handle: () => go("/how-it-works", "Here's how SokoniArena works."),
  },
  {
    patterns: [/\b(terms|terms of service)\b/i],
    handle: () => go("/terms", "Opening our Terms."),
  },
  {
    patterns: [/\b(privacy|privacy policy)\b/i],
    handle: () => go("/privacy", "Opening our Privacy Policy."),
  },

  // ---------- Help / FAQ ----------
  {
    patterns: [/\b(post|create|add|list).{0,20}(ad|listing|product|item)\b/i],
    handle: () => ({
      reply:
        "To post an ad: sign in, open your Dashboard, then click 'New Listing'. You can add photos, set a price, and pick a category. Want me to take you there?",
      action: { type: "navigate", path: "/dashboard" },
    }),
  },
  {
    patterns: [/\b(open|create|start).{0,20}(shop|store)\b/i],
    handle: () => ({
      reply:
        "To open a shop, head to your Dashboard and select 'My Shop'. You'll be able to brand it, add listings, and even request promotions. Taking you there now.",
      action: { type: "navigate", path: "/dashboard" },
    }),
  },
  {
    patterns: [/\b(contact|reach|message).{0,20}(seller|owner|shop)\b/i],
    handle: () => ({
      reply:
        "Open any listing and use the contact buttons — call, WhatsApp, or in-app message. You'll need to be signed in to chat.",
    }),
  },
  {
    patterns: [/\b(price|pricing|cost|fee|charges|free)\b/i],
    handle: () => ({
      reply:
        "Browsing and posting basic listings is free. Premium features like Featured listings, Sponsored ads, and Shop promotions are paid — you can request them from your Dashboard.",
    }),
  },
  {
    patterns: [/\b(payment|pay|mpesa|m-pesa)\b/i],
    handle: () => ({
      reply:
        "Payments between buyers and sellers are arranged directly — most users use M-Pesa or cash on delivery. Always inspect items before paying.",
    }),
  },
  {
    patterns: [/\b(safe|safety|scam|fraud|trust)\b/i],
    handle: () => ({
      reply:
        "Stay safe: meet in public places, inspect items first, never send money before seeing the product, and report suspicious shops. Verified shops have a badge.",
    }),
  },
  {
    patterns: [/\b(who are you|what are you|your name)\b/i],
    handle: () => ({
      reply:
        "I'm Sokoni Assistant — your free voice helper for SokoniArena. Ask me to find things, take you to a page, or explain how the marketplace works.",
    }),
  },
  {
    patterns: [/\b(what can you do|help|commands|menu)\b/i],
    handle: () => ({
      reply:
        "I can: 🔍 search ('find iPhones'), 🧭 navigate ('open shops'), 📚 explain features ('how do I post an ad'), and answer questions about pricing, safety and payments. Just talk to me!",
    }),
  },
];

export function detectIntent(rawText: string): IntentResult {
  const text = norm(rawText);
  if (!text) {
    return { reply: "I didn't catch that. Could you say it again?" };
  }

  for (const rule of rules) {
    for (const pat of rule.patterns) {
      const m = text.match(pat);
      if (m) return rule.handle(text, m);
    }
  }

  // Fallback — treat whole utterance as a search query.
  return {
    reply: `I'll search for "${rawText}" for you.`,
    action: { type: "search", query: rawText },
  };
}
