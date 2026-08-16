import {
  FaInstagram,
  FaFacebook,
  FaChevronDown,
} from "react-icons/fa";
import { SlSocialTwitter, SlSocialLinkedin } from "react-icons/sl";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";

export default function TopBar() {
  const iconStyle =
    "w-7 h-7 flex items-center justify-center rounded-full text-lg border border-white/20 font-bold text-white cursor-pointer transition-all duration-300 hover:bg-white hover:text-footer-dark";

  return (
    <div className="w-full bg-footer-dark  text-white dark:bg-[#0d2236] dark:text-gray-200 overflow-hidden">
      <div
        className="
          flex items-center justify-between
          h-9
          px-3 sm:px-6 md:px-10 lg:px-20 xl:px-40
          text-[11px] sm:text-xs md:text-sm
          font-light
        "
      >
   <div className="relative flex-1 overflow-hidden">
  <div className="hidden sm:flex items-center gap-6 whitespace-nowrap text-sm">
    <div className="flex items-center gap-2">
      <CiClock2  size={20}/>
      <span>Mon – Fri, 9:00 AM – 6:00 PM</span>
    </div>

    <div className="flex items-center gap-2">
      <FiPhoneCall size={20}/>
      <span>+20 109 456 7890</span>
    </div>

    <div className="flex items-center gap-2">
      <CiLocationOn size={20}/>
      <span>Cairo, Egypt</span>
    </div>
  </div>

  <div className="sm:hidden whitespace-nowrap text-sm">
    <div
      className="
        inline-flex items-center gap-6
        animate-[marquee_24s_linear_infinite]
        hover:[animation-play-state:paused]
      "
    >
      <div className="flex items-center gap-2">
        <CiClock2 size={20}/>
        <span>Mon – Fri, 9:00 AM – 6:00 PM</span>
      </div>

      <div className="flex items-center gap-2">
        <FiPhoneCall size={20}/>
        <span>+20 109 456 7890</span>
      </div>

      <div className="flex items-center gap-2">
        <CiLocationOn size={20}/>
        <span>Cairo, Egypt</span>
      </div>
    </div>
  </div>
</div>

        <div className="flex items-center gap-2 md:gap-3 ml-3">
          <button className="hidden sm:flex items-center gap-1 hover:text-white/80 transition">
            <span>English</span>
            <FaChevronDown className="text-[12px]" />
          </button>

          <div className={iconStyle}><FaFacebook /></div>
          <div className={iconStyle}><SlSocialTwitter /></div>
          <div className={iconStyle}><SlSocialLinkedin /></div>
          <div className={iconStyle}><FaInstagram /></div>
        </div>
      </div>
    </div>
  );
}
