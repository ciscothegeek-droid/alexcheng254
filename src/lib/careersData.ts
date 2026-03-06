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
  const { error } = await (supabase as any)
    .from("job_listings")
    .update({
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.category !== undefined && { category: updates.category }),
      ...(updates.location !== undefined && { location: updates.location }),
      ...(updates.type !== undefined && { type: updates.type }),
      ...(updates.description !== undefined && { description: updates.description }),
      ...(updates.requirements !== undefined && { requirements: updates.requirements }),
      ...(updates.deadline !== undefined && { deadline: updates.deadline || null }),
    })
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
