import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-[#e8e8e8] flex justify-center">
    <div className="w-full max-w-[960px] bg-background shadow-lg min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  </div>
);

export default PageLayout;
