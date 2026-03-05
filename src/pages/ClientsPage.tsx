import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const clientCategories = [
  {
    category: "FMCG & Consumer Goods",
    clients: ["Unilever", "Procter & Gamble", "Nestlé", "Coca-Cola", "British American Tobacco"],
  },
  {
    category: "Financial Services",
    clients: ["Standard Chartered Bank", "Equity Bank", "M-Pesa / Safaricom", "Old Mutual"],
  },
  {
    category: "Telecommunications",
    clients: ["Safaricom", "MTN", "Airtel Africa", "Orange"],
  },
  {
    category: "Development & NGOs",
    clients: ["World Bank", "UNICEF", "USAID", "Bill & Melinda Gates Foundation", "WHO"],
  },
  {
    category: "Media & Advertising",
    clients: ["WPP", "Publicis", "Dentsu", "Omnicom"],
  },
];

const ClientsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Clients</h1>
          <p className="text-base text-muted-foreground mb-12 max-w-2xl">
            We are proud to serve a diverse range of clients, from global corporations to international development organizations.
          </p>

          <div className="space-y-10">
            {clientCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">{cat.category}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {cat.clients.map((client) => (
                    <div key={client} className="flex items-center justify-center p-4 bg-secondary rounded border border-border text-center">
                      <span className="text-sm font-body font-semibold text-foreground">{client}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ClientsPage;
