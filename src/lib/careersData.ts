import { supabase } from "@/integrations/supabase/client";

export interface JobListing {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  deadline: string;
  created_at?: string;
  updated_at?: string;
  // New fields
  employees_required?: number;
  country?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  timespan?: string;
  payment_per_day?: number;
  allowances?: string;
  hours_per_day?: number;
}

export const getJobListings = async (): Promise<JobListing[]> => {
  const { data, error } = await (supabase as any)
    .from("job_listings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching job listings:", error);
    return [];
  }
  return (data || []).map((j: any) => ({
    ...j,
    deadline: j.deadline || "",
    requirements: j.requirements || [],
  }));
};

export const getJobById = async (id: string): Promise<JobListing | undefined> => {
  const { data, error } = await (supabase as any)
    .from("job_listings")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return undefined;
  return { ...data, deadline: data.deadline || "", requirements: data.requirements || [] };
};

export const addJobListing = async (job: Omit<JobListing, "id">): Promise<JobListing | null> => {
  const { data, error } = await (supabase as any)
    .from("job_listings")
    .insert({
      title: job.title,
      category: job.category,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements,
      deadline: job.deadline || null,
      employees_required: job.employees_required || 1,
      country: job.country || null,
      county: job.county || null,
      constituency: job.constituency || null,
      ward: job.ward || null,
      timespan: job.timespan || null,
      payment_per_day: job.payment_per_day || null,
      allowances: job.allowances || null,
      hours_per_day: job.hours_per_day || null,
    })
    .select()
    .single();
  if (error) {
    console.error("Error adding job listing:", error);
    return null;
  }
  return data;
};

export const updateJobListing = async (id: string, updates: Partial<JobListing>): Promise<void> => {
  const updateData: any = {};
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.category !== undefined) updateData.category = updates.category;
  if (updates.location !== undefined) updateData.location = updates.location;
  if (updates.type !== undefined) updateData.type = updates.type;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.requirements !== undefined) updateData.requirements = updates.requirements;
  if (updates.deadline !== undefined) updateData.deadline = updates.deadline || null;
  if (updates.employees_required !== undefined) updateData.employees_required = updates.employees_required;
  if (updates.country !== undefined) updateData.country = updates.country;
  if (updates.county !== undefined) updateData.county = updates.county;
  if (updates.constituency !== undefined) updateData.constituency = updates.constituency;
  if (updates.ward !== undefined) updateData.ward = updates.ward;
  if (updates.timespan !== undefined) updateData.timespan = updates.timespan;
  if (updates.payment_per_day !== undefined) updateData.payment_per_day = updates.payment_per_day;
  if (updates.allowances !== undefined) updateData.allowances = updates.allowances;
  if (updates.hours_per_day !== undefined) updateData.hours_per_day = updates.hours_per_day;

  const { error } = await (supabase as any)
    .from("job_listings")
    .update(updateData)
    .eq("id", id);
  if (error) console.error("Error updating job listing:", error);
};

export const deleteJobListing = async (id: string): Promise<void> => {
  const { error } = await (supabase as any)
    .from("job_listings")
    .delete()
    .eq("id", id);
  if (error) console.error("Error deleting job listing:", error);
};
