import React from "react";
import heroImg from "../../../assets/images/home/hero/hero.png";
import instagramIcon from "../../../assets/images/icons/instagram.svg";
import facebookIcon from "../../../assets/images/icons/facebook.svg";
import twitterIcon from "../../../assets/images/icons/twetter.svg";
import linkedinIcon from "../../../assets/images/icons/linkedin.svg";
import SharedButton from "../../shared/Button.jsx";
export const HeroSection = () => {
  const socialIcons = [
    { src: facebookIcon, alt: "Facebook", link: "#" },
    { src: twitterIcon, alt: "Twitter", link: "#" },
    { src: linkedinIcon, alt: "LinkedIn", link: "#" },
    { src: instagramIcon, alt: "Instagram", link: "#" },
  ];

  return (
    <section className="relative min-h-[90vh] text-white overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* content */}
      <div className="relative z-10 flex items-center justify-center min-h-[90vh] px-4">
        <div className="bg-[#ADC6DD]/10 backdrop-blur-md px-14 py-12 text-center max-w-3xl">
          <p className="font-sail text-[20px] leading-[28px] tracking-normal text-white text-center">
        Hi Meet Dreams
          </p>

          <h1 className="font-bodoni font-bold text-[64px] leading-[80px] tracking-normal text-white text-center">
            Let's Plan For Your Dream Wedding
          </h1>

    <SharedButton
  to="/services"
  variant="green"
  size="md"
>
  Read More
</SharedButton>

        </div>
      </div>

      {/* social icons */}
      <div className="absolute bottom-6 left-6 z-10 flex gap-3">
        {socialIcons.map((icon, i) => (
          <a
            key={i}
            href={icon.link}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <img src={icon.src} alt={icon.alt} className="w-4 h-4" />
          </a>
        ))}
      </div>
    </section>
  );
};
