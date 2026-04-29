import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { ProductGrid } from "@/components/ProductGrid";
import { RatingsSection } from "@/components/RatingsSection";
import { EcoFriendlySection } from "@/components/EcoFriendlySection";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";
import CitiesWeDeliver from "@/components/CitiesWeDeliver";

import  PrintingServicesCarousel  from "@/components/PrintingServicesCarousel";
import { TicketsCarousel } from "@/components/TicketsCarousel";
import FAQAccordion from "@/components/Faq";





const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        {/* <main> */}
          <HeroCarousel />
          <PrintingServicesCarousel/>
           <FeaturesSection /> 
          {/* <ProductGrid />
          <TicketsCarousel />
          <EcoFriendlySection />
          <AboutSection /> 
          <CitiesWeDeliver/>
            <RatingsSection />
        </main>
        <FAQAccordion/> */}
        <FooterNew />
      </div>
    </PageTransition>

  );
};

export default Index;
