import React from "react";
import PageHeader from "../components/shared/PageHeader";
import AboutIntroSection from "../components/layout/about/AboutIntroSection";
import AboutStats from "../components/layout/about/AboutStats";
import FeaturesSection from "../components/layout/about/FeaturesSection";
import OurWorkSection from "../components/layout/about/OurWorkSection";
import TestimonialSection from "../components/layout/about/TestimonialsSection";
import BrandingPartners from "../components/layout/Services/BrandingPartners";
import AnimatedPage from "../components/shared/AnimatedPage";
const About = () => {
  return (
    <>
      <AnimatedPage>
        <PageHeader
          title="About Us"
          breadcrumbs={[
            { label: "About", href: "/about" },
            { label: "About Us" },
          ]}
        />

        <div className="bg-white dark:bg-[#101926] py-10">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-16">
            <AboutIntroSection />
            <AboutStats />
            <FeaturesSection />
            <OurWorkSection />
            <TestimonialSection />
            <BrandingPartners />
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default About;
