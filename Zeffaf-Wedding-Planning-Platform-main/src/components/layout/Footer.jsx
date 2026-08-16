import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Logo from "../../assets/images/icons/Vector.svg";
import insta1 from "../../assets/images/footer/insta1.png";
import insta2 from "../../assets/images/footer/insta2.png";
import insta3 from "../../assets/images/footer/insta3.png";
import insta4 from "../../assets/images/footer/insta4.png";
import insta5 from "../../assets/images/footer/insta5.png";
import insta6 from "../../assets/images/footer/insta6.png";

const linksData = [
  { name: "About Us", link: "/about" },
  { name: "FAQ's", link: "/faq" },
  { name: "Terms Of Service", link: "/terms" },
  { name: "Privacy policy", link: "/privacy" },
  { name: "Our Team", link: "/team" },
  { name: "Latest Blog", link: "/blog" },
];
const instaImages = [insta1, insta2, insta3, insta4, insta5, insta6];

const LinksSection = ({ title, links }) => (
  <div className="space-y-6 text-center md:text-left">
    <h3 className="text-xl text-footer-dark dark:text-white font-normal">
      {title}
    </h3>
    <ul className="space-y-3 text-center md:text-left">
      {links.map((item, index) => (
        <li key={index}>
          <a
            href={item.link}
            className="flex items-center justify-center md:justify-start text-sm font-normal text-footer-light dark:text-gray-300 hover:text-footer-dark dark:hover:text-white transition-colors duration-300"
          >
            <FiChevronRight className="text-sm mr-1 text-footer-light dark:text-gray-400" />
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-footer pt-16 dark:bg-[#102032]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <img src={Logo} alt="Zeffaf Logo" className="h-10 w-auto" />
              <span className="text-xl text-footer-dark dark:text-white font-medium">
                Zeffaf
              </span>
            </div>
            <p className="text-sm font-normal text-footer-light dark:text-gray-300 max-w-sm mx-auto md:mx-0">
              We are many variations of passages <br /> available but the
              majority have suffered alteration in some form.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-center md:justify-start space-x-3 text-footer-dark dark:text-gray-200 text-sm">
                <FaPhoneAlt className="text-sm font-normal text-footer-dark dark:text-gray-400" />
                <span>+888 (123) 869523</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-footer-dark dark:text-gray-200 text-sm">
                <FaEnvelope className="text-sm font-normal text-footer-dark dark:text-gray-400" />
                <span>Zeffaf@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-footer-dark dark:text-gray-200 text-sm">
                <FaMapMarkerAlt className="text-sm font-normal text-footer-dark dark:text-gray-400" />
                <span>New York - 1075 Firs Avenue</span>
              </div>
            </div>
          </div>

          <LinksSection title="Quick Links" links={linksData} />
          <LinksSection title="Our Services" links={linksData} />

          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-xl font-normal text-footer-dark dark:text-white">
              Instagram
            </h3>

            <div className="grid grid-cols-3 gap-1 justify-items-center md:justify-items-start">
              {instaImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`insta-${index}`}
                  className="w-28 h-16 object-cover rounded-md transform transition duration-300 hover:scale-105 bg-white dark:bg-gray-800"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-footer-dark dark:bg-[#14263d] mt-16 py-4 border-t border-white/10 dark:border-[#1e3350]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center text-sm font-normal">
          <p className="text-center md:text-left text-white dark:text-gray-300 mb-4 md:mb-0">
            © 2026 Zeffaf. Developed by Marwa Elgorn. All Rights Reserved.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-footer-dark dark:bg-gray-800 flex items-center justify-center hover:bg-footer-green dark:hover:bg-green-600 transition-colors duration-300"
            >
              <FaFacebookF className="text-white text-lg hover:text-footer dark:hover:text-white" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-footer-green dark:bg-green-700 flex items-center justify-center hover:bg-footer-green dark:hover:bg-green-600 transition-colors duration-300"
            >
              <FaTwitter className="text-white text-lg hover:text-footer dark:hover:text-white" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-footer-dark dark:bg-gray-800 flex items-center justify-center hover:bg-footer-green dark:hover:bg-green-600 transition-colors duration-300"
            >
              <FaLinkedinIn className="text-white text-lg hover:text-footer dark:hover:text-white" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-footer-dark dark:bg-gray-800 flex items-center justify-center hover:bg-footer-green dark:hover:bg-green-600 transition-colors duration-300"
            >
              <FaInstagram className="text-white text-lg hover:text-footer dark:hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
