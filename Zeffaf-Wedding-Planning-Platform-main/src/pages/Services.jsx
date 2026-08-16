import React from "react";
import PageHeader from "../components/shared/PageHeader";
import BrandingPartners from "../components/layout/Services/BrandingPartners.jsx";
import ServicesAbout from "../components/layout/Services/ServicesAbout.jsx";
import ServicesTestimonials from "../components/layout/Services/ServicesTestimonials.jsx";
import { ServicesSection } from "../components/layout/Home/ServicesSection.jsx";
import BlogList from "../components/layout/Blog/BlogList.jsx";
import { blogs } from "../data/blogs";
import AnimatedPage from "../components/shared/AnimatedPage";



export default function Services() {


  return (
    <>
      <AnimatedPage>
        <PageHeader
          title="Services"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />
        <ServicesSection variant="services" />

        <ServicesAbout />

        <ServicesTestimonials />
        <div className="w-full bg-white dark:bg-[#101926] py-20">
          <BlogList mode="slider" limit={6} blogs={blogs} />
        </div>
        <BrandingPartners />
      </AnimatedPage>
    </>
  );
}
