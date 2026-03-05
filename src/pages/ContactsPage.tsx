import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactsPage = () => {
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
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-1">Subject</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-1">Message</label>
                <textarea rows={5} className="w-full px-4 py-2 border border-border rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground font-body font-semibold text-sm rounded hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ContactsPage;
