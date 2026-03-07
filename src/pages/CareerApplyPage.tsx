import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getJobById, type JobListing } from "@/lib/careersData";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Calendar, ArrowLeft, CheckCircle, Loader2, Users, DollarSign, Timer, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getCountries, getLevel1Divisions, getLevel2Divisions, getLevel3Divisions, getLevel1Label, getLevel2Label, getLevel3Label } from "@/lib/locationData";

const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

const CareerApplyPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<JobListing | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", idNumber: "",
    gender: "", dateOfBirth: "", country: "", county: "", constituency: "",
    ward: "", education: "", experience: "", coverLetter: "",
  });

  useEffect(() => {
    if (id) {
      getJobById(id).then((data) => { setJob(data); setLoading(false); });
    }
  }, [id]);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleCountryChange = (country: string) => {
    setForm(p => ({ ...p, country, county: "", constituency: "", ward: "" }));
  };
  const handleCountyChange = (county: string) => {
    setForm(p => ({ ...p, county, constituency: "", ward: "" }));
  };
  const handleConstituencyChange = (constituency: string) => {
    setForm(p => ({ ...p, constituency, ward: "" }));
  };

  const countries = getCountries();
  const level1Options = form.country ? getLevel1Divisions(form.country) : [];
  const level2Options = form.country && form.county ? getLevel2Divisions(form.country, form.county) : [];
  const level3Options = form.country && form.county && form.constituency ? getLevel3Divisions(form.country, form.county, form.constituency) : [];

  const l1Label = form.country ? getLevel1Label(form.country) : "County/Region";
  const l2Label = form.country ? getLevel2Label(form.country) : "Constituency/District";
  const l3Label = form.country ? getLevel3Label(form.country) : "Ward";

  if (loading) {
    return (
      <PageLayout>
        <div className="py-16 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>
      </PageLayout>
    );
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="py-16 text-center">
          <p className="text-muted-foreground mb-4">Job listing not found.</p>
          <Link to="/careers" className="text-primary hover:underline">← Back to Careers</Link>
        </div>
      </PageLayout>
    );
  }

  if (submitted) {
    return (
      <PageLayout>
        <div className="py-16">
          <div className="container mx-auto max-w-2xl px-6 text-center">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-bold text-foreground mb-3">Application Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for applying for <strong>{job.title}</strong>. We will review your application and get back to you via the email you provided.
            </p>
            <p className="text-sm text-muted-foreground mb-6">If selected, you will receive an invitation email with further instructions for the interview/webinar.</p>
            <Link to="/careers" className="text-primary hover:underline font-semibold">← Back to Careers</Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await (supabase as any).from("applications").insert({
        job_listing_id: id, job_title: job.title, first_name: form.firstName, last_name: form.lastName,
        email: form.email, phone: form.phone, id_number: form.idNumber, gender: form.gender || null,
        date_of_birth: form.dateOfBirth || null, country: form.country, county: form.county || null,
        constituency: form.constituency || null, ward: form.ward || null, education: form.education || null,
        experience: form.experience || null, cover_letter: form.coverLetter || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message || "Please try again.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <PageLayout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <Link to="/careers" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6"><ArrowLeft className="w-4 h-4" /> Back to Careers</Link>
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary">{job.category}</span>
              <span className="text-xs text-muted-foreground">{job.type}</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.country ? [job.ward, job.constituency, job.county, job.country].filter(Boolean).join(", ") : job.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Deadline: {job.deadline}</span>
              {(job.employees_required && job.employees_required > 1) && (
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{job.employees_required} positions</span>
              )}
            </div>
            {/* Job Terms */}
            {(job.payment_per_day || job.timespan || job.hours_per_day || job.allowances) && (
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 border-t border-border pt-3">
                {job.payment_per_day && <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />KSH {job.payment_per_day}/day</span>}
                {job.timespan && <span className="flex items-center gap-1"><Timer className="w-4 h-4" />{job.timespan}</span>}
                {job.hours_per_day && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.hours_per_day} hrs/day</span>}
                {job.allowances && <span className="flex items-center gap-1">💰 {job.allowances}</span>}
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
            <h3 className="text-sm font-bold text-foreground mb-2">Requirements:</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground mb-6">Application Form</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-foreground mb-1">First Name *</label><Input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Last Name *</label><Input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Email Address *</label><Input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Phone Number *</label><Input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">ID / Passport Number *</label><Input required value={form.idNumber} onChange={(e) => update("idNumber", e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Gender</label><select className={selectClass} value={form.gender} onChange={(e) => update("gender", e.target.value)}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Date of Birth</label><Input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} /></div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Region</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Country *</label>
                  <select className={selectClass} required value={form.country} onChange={(e) => handleCountryChange(e.target.value)}>
                    <option value="">Select Country</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{l1Label}</label>
                  {level1Options.length > 0 ? (
                    <select className={selectClass} value={form.county} onChange={(e) => handleCountyChange(e.target.value)}>
                      <option value="">Select {l1Label}</option>
                      {level1Options.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <Input placeholder={`Enter ${l1Label}`} value={form.county} onChange={(e) => update("county", e.target.value)} />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{l2Label}</label>
                  {level2Options.length > 0 ? (
                    <select className={selectClass} value={form.constituency} onChange={(e) => handleConstituencyChange(e.target.value)}>
                      <option value="">Select {l2Label}</option>
                      {level2Options.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <Input placeholder={`Enter ${l2Label}`} value={form.constituency} onChange={(e) => update("constituency", e.target.value)} />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">{l3Label}</label>
                  {level3Options.length > 0 ? (
                    <select className={selectClass} value={form.ward} onChange={(e) => update("ward", e.target.value)}>
                      <option value="">Select {l3Label}</option>
                      {level3Options.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <Input placeholder={`Enter ${l3Label}`} value={form.ward} onChange={(e) => update("ward", e.target.value)} />
                  )}
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Qualifications</h3>
              <div className="space-y-4">
                <div><label className="block text-sm font-semibold text-foreground mb-1">Highest Education Level</label><select className={selectClass} value={form.education} onChange={(e) => update("education", e.target.value)}><option value="">Select</option><option value="certificate">Certificate</option><option value="diploma">Diploma</option><option value="bachelors">Bachelor's Degree</option><option value="masters">Master's Degree</option><option value="phd">PhD</option></select></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Years of Relevant Experience</label><Input type="number" min="0" value={form.experience} onChange={(e) => update("experience", e.target.value)} /></div>
                <div><label className="block text-sm font-semibold text-foreground mb-1">Cover Letter / Additional Information</label><Textarea rows={5} value={form.coverLetter} onChange={(e) => update("coverLetter", e.target.value)} placeholder="Tell us why you are a good fit for this role..." /></div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-10" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default CareerApplyPage;
