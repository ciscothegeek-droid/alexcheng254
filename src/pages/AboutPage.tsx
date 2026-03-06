import PageLayout from "@/components/PageLayout";

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">About Us</h1>

          <p className="text-base leading-relaxed text-foreground mb-6">
            <strong>Infinite Insight</strong> is a full-service market research agency established in 2010. From our hub in Nairobi, we offer qualitative and quantitative research services across Sub-Saharan Africa. To date, we have carried out professional projects in 30 African markets in East, West, and Southern Africa.
          </p>

          <h2 className="text-xl font-heading font-bold text-foreground mt-10 mb-4">Our Team</h2>
          <p className="text-base leading-relaxed text-foreground mb-6">
            We have put together a team of young, dynamic professionals, who are committed to delivering high quality results. Our team includes experienced researchers, field coordinators, data analysts, and project managers.
          </p>

          <h2 className="text-xl font-heading font-bold text-foreground mt-10 mb-4">Capacity Building</h2>
          <p className="text-base leading-relaxed text-foreground mb-6">
            Capacity building is an ongoing process, to which we are thoroughly committed. In addition to project-specific briefings, we regularly organise training sessions on specific topics, both in qualitative and quantitative techniques and methodologies.
          </p>

          <h2 className="text-xl font-heading font-bold text-foreground mt-10 mb-4">Ethics & Compliance</h2>
          <p className="text-base leading-relaxed text-foreground mb-6">
            We adhere to the <em className="font-semibold">ICC/ESOMAR Code of Practice</em>, the <em className="font-semibold">MSRA Code of Ethics</em>, and the European Union's <em className="font-semibold">General Data Protection Regulation</em>, which is being embraced by an increasing number of African countries.
          </p>

          <h2 className="text-xl font-heading font-bold text-foreground mt-10 mb-4">Memberships</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {["ESOMAR", "MSRA", "PAMRO", "AMRA", "NiMRA", "SAMRA", "WAPOR", "GBA"].map((org) => (
              <div key={org} className="flex items-center justify-center p-4 bg-secondary rounded border border-border">
                <span className="font-body font-semibold text-sm text-foreground">{org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
