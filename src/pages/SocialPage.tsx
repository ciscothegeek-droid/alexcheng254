import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Facebook, label: "Facebook", url: "#", description: "Follow us for the latest company news and project highlights." },
  { icon: Twitter, label: "Twitter / X", url: "#", description: "Stay updated with industry insights and quick updates." },
  { icon: Linkedin, label: "LinkedIn", url: "#", description: "Connect with us professionally and explore career opportunities." },
  { icon: Instagram, label: "Instagram", url: "#", description: "See behind-the-scenes from our fieldwork across Africa." },
  { icon: Youtube, label: "YouTube", url: "#", description: "Watch our research methodology videos and team profiles." },
];

const SocialPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Follow Us</h1>
          <p className="text-base text-muted-foreground mb-12 max-w-2xl">
            Stay connected with Infinite Insight through our social media channels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                className="flex items-start gap-4 p-6 bg-secondary rounded border border-border hover:border-primary transition-colors group"
              >
                <social.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">{social.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{social.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default SocialPage;
