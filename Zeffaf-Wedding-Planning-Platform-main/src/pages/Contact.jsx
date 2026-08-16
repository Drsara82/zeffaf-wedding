import React from "react";
import PageHeader from "../components/shared/PageHeader";
import ContactSection from "../components/layout/contact/ContactSection";
import MapSection from "../components/layout/contact/MapSection";
import AnimatedPage from "../components/shared/AnimatedPage";


const Contact = () => {
  return (
    <>
    <AnimatedPage>
      <PageHeader
        title="Contact"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <div className="min-h-screen bg-white dark:bg-[#101926]">
        <div className="container mx-auto px-4 py-20">
          <ContactSection />
          <MapSection />
        </div>
      </div>
      </AnimatedPage>
    </>
  );
};

export default Contact;
