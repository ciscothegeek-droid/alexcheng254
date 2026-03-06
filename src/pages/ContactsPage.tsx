import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MembershipBadges = () => (
  <div className="bg-muted/40 p-6 rounded-lg border border-border mb-8">
    <h2 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-4">Member of:</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {["ESOMAR", "MSRA", "PAMRO", "AMRA", "NiMRA", "SAMRA", "WAPOR", "GBA"].map((org) => (
        <span key={org} className="text-foreground/80 font-mono text-sm bg-background px-3 py-1.5 rounded border border-border text-center">{org}</span>
      ))}
    </div>
  </div>
);

const RecentPosts = () => (
  <div className="mb-10">
    <h3 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Posts</h3>
    <ul className="space-y-2 text-sm">
      {["Conducting Social Research in Rwanda", "Update from ESOMAR 2026 Conference in Nairobi", "Yemi Oniyitan Named a NiMRA Fellow", "Upcoming MSRA Ethics Webinar", "Performing Quantitative Field Work in Uganda"].map((post) => (
        <li key={post}><a href="#" className="text-foreground/70 hover:text-primary transition-colors block py-1 border-b border-border/40">{post}</a></li>
      ))}
    </ul>
  </div>
);

const OfficeCard = ({ country, company, addressLines, tel, email, linkedIn }: { country: string; company: string; addressLines: string[]; tel: string; email: string; linkedIn?: string }) => (
  <div className="border border-border rounded-lg p-5 bg-card">
    <h4 className="text-lg font-heading font-bold text-foreground mb-1">{country}</h4>
    <p className="font-semibold text-primary text-sm mb-3">{company}</p>
    <div className="space-y-1 text-sm text-muted-foreground mb-3">
      {addressLines.map((line, i) => <p key={i}>{line}</p>)}
    </div>
    <p className="text-sm"><span className="font-semibold text-foreground">Tel:</span> <span className="text-muted-foreground">{tel}</span></p>
    <p className="text-sm"><span className="font-semibold text-foreground">Email:</span> <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a></p>
    {linkedIn && <p className="text-sm mt-1"><span className="font-semibold text-foreground">LinkedIn:</span> <span className="text-muted-foreground">{linkedIn}</span></p>}
  </div>
);

const ContactsPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await (supabase as any).from("contact_messages").insert({ name: form.name, email: form.email, subject: form.subject || null, message: form.message });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to send message.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <PageLayout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 lg:px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Contact Us</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <MembershipBadges />
              <RecentPosts />
            </aside>
            <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OfficeCard country="KENYA" company="Infinite Insight Ltd." addressLines={["The Mirage, Tower 2", "Pent Floor, Office 32", "Chiromo Road", "P.O. Box 1324, 00606", "Nairobi, Kenya"]} tel="+254-774-157784" email="info@infiniteinsight.net" linkedIn="Infinite Insight" />
                <OfficeCard country="SOUTH AFRICA" company="Infinite Insight Ltd." addressLines={["153 Kruger Avenue", "Centurion", "Pretoria, South Africa"]} tel="+27-71-3560829" email="info@infiniteinsight.net" />
              </div>
              <div className="md:w-1/2">
                <OfficeCard country="NIGERIA" company="Consumer Ideas" addressLines={["53, Adeyemo Akapo Street", "Omole Phase 1", "Lagos, Nigeria"]} tel="+234-81-86286401" email="info@consumerideasafrica.com" />
              </div>
              <hr className="border-border my-8" />
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">Send us a message</h2>
                <p className="text-base text-muted-foreground mb-6 max-w-2xl">Get in touch with our team. We would love to hear from you and discuss how we can help with your research needs.</p>
              </div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 border border-border rounded-lg bg-muted/20">
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
                  <div><label className="block text-sm font-body font-semibold text-foreground mb-1">Name *</label><input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
                  <div><label className="block text-sm font-body font-semibold text-foreground mb-1">Email *</label><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
                  <div><label className="block text-sm font-body font-semibold text-foreground mb-1">Subject</label><input type="text" value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
                  <div><label className="block text-sm font-body font-semibold text-foreground mb-1">Message *</label><textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" /></div>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-primary text-primary-foreground font-body font-semibold text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-50">{submitting ? "Sending..." : "Send Message"}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactsPage;
