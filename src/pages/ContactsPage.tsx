import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      const { error } = await (supabase as any).from("contact_messages").insert({
        name: form.name,
        email: form.email,
        subject: form.subject || null,
        message: form.message,
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to send message.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-base text-muted-foreground mb-12 max-w-2xl">
            Get in touch with our team. We would love to hear from you and discuss how we can help with your research needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">Nairobi, Kenya<br />Sub-Saharan Africa Hub</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+254 (0) 20 XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">info@infiniteinsight.net</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday – Friday: 8:00 AM – 5:00 PM (EAT)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Name *</label>
                  <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-primary text-primary-foreground font-body font-semibold text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ContactsPage;
