import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/components/AboutSection";
import HelpSection from "@/components/HelpSection";
import BlogSection from "@/components/BlogSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#e8e8e8] flex justify-center">
      <div className="w-full max-w-[960px] bg-background shadow-lg">
      <SiteHeader />
      <main>
        <AboutSection />
        <HelpSection />
        <BlogSection />
      </main>
      <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
