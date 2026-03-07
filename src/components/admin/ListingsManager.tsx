import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Edit, X, Save } from "lucide-react";
import { getJobListings, addJobListing, deleteJobListing, updateJobListing, type JobListing } from "@/lib/careersData";
import { getCountries, getLevel1Divisions, getLevel2Divisions, getLevel3Divisions, getLevel1Label, getLevel2Label, getLevel3Label } from "@/lib/locationData";

const emptyJob = {
  title: "", category: "", location: "", type: "Full-time",
  description: "", requirements: [""], deadline: "",
  employees_required: 1, country: "", county: "", constituency: "", ward: "",
  timespan: "", payment_per_day: "", allowances: "", hours_per_day: "",
};

const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

const ListingsManager = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof emptyJob>(emptyJob);

  const refresh = async () => { setJobs(await getJobListings()); };
  useEffect(() => { refresh(); }, []);

  const update = (field: string, value: string | number) => setForm((p) => ({ ...p, [field]: value }));

  const handleDelete = async (id: string) => {
    if (confirm("Delete this listing?")) { await deleteJobListing(id); refresh(); }
  };

  const handleEdit = (job: JobListing) => {
    setEditingId(job.id);
    setForm({
      title: job.title, category: job.category, location: job.location, type: job.type,
      description: job.description, requirements: job.requirements,
      deadline: job.deadline,
      employees_required: job.employees_required || 1,
      country: job.country || "", county: job.county || "",
      constituency: job.constituency || "", ward: job.ward || "",
      timespan: job.timespan || "",
      payment_per_day: job.payment_per_day?.toString() || "",
      allowances: job.allowances || "",
      hours_per_day: job.hours_per_day?.toString() || "",
    });
    setShowForm(true);
  };

  const handleCountryChange = (country: string) => {
    setForm(p => ({ ...p, country, county: "", constituency: "", ward: "" }));
  };

  const handleCountyChange = (county: string) => {
    setForm(p => ({ ...p, county, constituency: "", ward: "" }));
  };

  const handleConstituencyChange = (constituency: string) => {
    setForm(p => ({ ...p, constituency, ward: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const locationParts = [form.ward, form.constituency, form.county, form.country].filter(Boolean);
    const data = {
      ...form,
      location: locationParts.join(", ") || form.location,
      requirements: form.requirements.filter(Boolean),
      employees_required: Number(form.employees_required) || 1,
      payment_per_day: form.payment_per_day ? Number(form.payment_per_day) : undefined,
      hours_per_day: form.hours_per_day ? Number(form.hours_per_day) : undefined,
    };
    if (editingId) await updateJobListing(editingId, data);
    else await addJobListing(data);
    setForm(emptyJob); setShowForm(false); setEditingId(null); refresh();
  };

  const addReq = () => setForm((p) => ({ ...p, requirements: [...p.requirements, ""] }));
  const updateReq = (i: number, v: string) => setForm((p) => ({ ...p, requirements: p.requirements.map((r, idx) => (idx === i ? v : r)) }));
  const removeReq = (i: number) => setForm((p) => ({ ...p, requirements: p.requirements.filter((_, idx) => idx !== i) }));

  const countries = getCountries();
  const level1Options = form.country ? getLevel1Divisions(form.country) : [];
  const level2Options = form.country && form.county ? getLevel2Divisions(form.country, form.county) : [];
  const level3Options = form.country && form.county && form.constituency ? getLevel3Divisions(form.country, form.county, form.constituency) : [];

  const l1Label = form.country ? getLevel1Label(form.country) : "County/Region";
  const l2Label = form.country ? getLevel2Label(form.country) : "Constituency/District";
  const l3Label = form.country ? getLevel3Label(form.country) : "Ward";

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Career Listings</h2>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyJob); }}>
          {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> New Listing</>}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-8 space-y-6">
          <h3 className="font-bold text-foreground text-lg">{editingId ? "Edit Listing" : "Create New Listing"}</h3>

          {/* Basic Info */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Job Title *</label>
                <Input required value={form.title} onChange={(e) => update("title", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Category *</label>
                <select className={selectClass} required value={form.category} onChange={(e) => update("category", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Field Data Collection">Field Data Collection</option>
                  <option value="Research">Research</option>
                  <option value="Sorting">Sorting</option>
                  <option value="Administration">Administration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Type *</label>
                <select className={selectClass} required value={form.type} onChange={(e) => update("type", e.target.value)}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Deadline *</label>
                <Input type="date" required value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Number of Employees Required *</label>
                <Input type="number" min="1" required value={form.employees_required} onChange={(e) => update("employees_required", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2">Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Country *</label>
                <select className={selectClass} required value={form.country} onChange={(e) => handleCountryChange(e.target.value)}>
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
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

          {/* Job Terms */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2">Job Terms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Job Timespan</label>
                <Input placeholder="e.g., 3 months, 6 weeks" value={form.timespan} onChange={(e) => update("timespan", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Payment per Day (KSH)</label>
                <Input type="number" min="0" step="0.01" placeholder="e.g., 1500" value={form.payment_per_day} onChange={(e) => update("payment_per_day", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Allowances</label>
                <Input placeholder="e.g., Transport + Lunch" value={form.allowances} onChange={(e) => update("allowances", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Hours per Day</label>
                <Input type="number" min="1" max="24" step="0.5" placeholder="e.g., 8" value={form.hours_per_day} onChange={(e) => update("hours_per_day", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Description & Requirements */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Description *</label>
            <Textarea required rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Requirements</label>
            {form.requirements.map((r, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input value={r} onChange={(e) => updateReq(i, e.target.value)} placeholder={`Requirement ${i + 1}`} />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeReq(i)}><X className="w-4 h-4" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addReq}><Plus className="w-3 h-3 mr-1" /> Add Requirement</Button>
          </div>
          <div className="flex justify-end">
            <Button type="submit"><Save className="w-4 h-4 mr-1" /> {editingId ? "Update" : "Create"} Listing</Button>
          </div>
        </form>
      )}

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-semibold text-foreground">Title</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Category</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Location</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Positions</th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Deadline</th>
              <th className="text-right p-3 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No listings yet</td></tr>
            ) : jobs.map((job) => (
              <tr key={job.id} className="border-t border-border">
                <td className="p-3 text-foreground font-medium">{job.title}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{job.category}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{job.country || job.location}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{job.employees_required || 1}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{job.deadline}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListingsManager;
