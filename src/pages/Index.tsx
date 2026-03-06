import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/components/AboutSection";
import HelpSection from "@/components/HelpSection";
import BlogSection from "@/components/BlogSection";
import SiteFooter from "@/components/SiteFooter";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  return (
    <PageLayout>
      <AboutSection />
      <HelpSection />
      <BlogSection />
    </PageLayout>
  );
};

export default Index;
