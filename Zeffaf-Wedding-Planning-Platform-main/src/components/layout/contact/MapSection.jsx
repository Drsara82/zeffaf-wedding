import React from "react";

export default function MapSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#101926]">
      <div className="w-full h-[450px] rounded-md overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.8505157277355!2d31.195271775268875!3d30.475681298010763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7df006cfe78ed%3A0xc22302e6adc8bbb0!2sITI%20Banha!5e1!3m2!1sen!2seg!4v1765718526580!5m2!1sen!2seg"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ITI Banha Location"
        />
      </div>
    </section>
  );
}
