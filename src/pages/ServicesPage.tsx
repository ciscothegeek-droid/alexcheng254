import PageLayout from "@/components/PageLayout";
import { BarChart3, Users, FileSearch, MessageSquare, Globe, ClipboardList } from "lucide-react";

const services = [
  { icon: BarChart3, title: "Quantitative Research", description: "Large-scale surveys, CAPI, CATI, and online data collection across multiple African markets with rigorous sampling methodologies." },
  { icon: MessageSquare, title: "Qualitative Research", description: "Focus group discussions, in-depth interviews, ethnographic studies, and online qualitative research tailored to African contexts." },
  { icon: FileSearch, title: "Desk Research", description: "Comprehensive secondary research, market sizing, competitive analysis, and industry landscape assessments." },
  { icon: Users, title: "Recruitment", description: "Professional respondent recruitment across urban and rural areas in 30+ African markets with verified databases." },
  { icon: Globe, title: "Multi-Country Studies", description: "Coordinated research across East, West, and Southern Africa with consistent methodology and local expertise." },
  { icon: ClipboardList, title: "Data Processing & Analysis", description: "Advanced data processing, statistical analysis, and actionable reporting using industry-standard tools." },
];

const ServicesPage = () => {
  return (
    <PageLayout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-base text-muted-foreground mb-12 max-w-2xl">
            We offer a comprehensive range of market research services across Sub-Saharan Africa, combining local expertise with international standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="p-6 bg-secondary rounded border border-border hover:border-primary transition-colors">
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
