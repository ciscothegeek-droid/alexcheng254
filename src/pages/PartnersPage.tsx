import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const partners = [
  { name: "Consumer Ideas Africa", location: "Nigeria", description: "Leading consumer research firm in West Africa." },
  { name: "Steadman Global", location: "East Africa", description: "Pan-African research and consulting group." },
  { name: "Research Solutions Africa", location: "Kenya", description: "Specialized in social and development research." },
  { name: "SurveyBE", location: "Belgium", description: "European partner for international projects." },
  { name: "Ipsos Africa", location: "Pan-African", description: "Global research partner with extensive African network." },
  { name: "Kantar Africa", location: "Pan-African", description: "Strategic insights and consulting across the continent." },
];

const PartnersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Partners</h1>
          <p className="text-base text-muted-foreground mb-12 max-w-2xl">
            We work with a network of trusted research partners across Africa and internationally, ensuring quality delivery in every market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div key={partner.name} className="p-6 bg-secondary rounded border border-border">
                <h3 className="text-lg font-heading font-bold text-foreground mb-1">{partner.name}</h3>
                <span className="text-xs font-body font-semibold text-primary mb-3 block">{partner.location}</span>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PartnersPage;
