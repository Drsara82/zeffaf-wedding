import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import emailLogo from "../../../assets/images/contact/email.svg";
import phone from "../../../assets/images/contact/phone.svg";
import location from "../../../assets/images/contact/location.svg";
import SharedInput from "../../shared/Input";
import SharedButton from "../../shared/Button";

export default function ContactSection() {
  const info = [
    { title: "Phone Number", details: "(+62) 182901758", icon: phone },
    { title: "Email", details: "info.rrdevs@gmail.com", icon: emailLogo },
    {
      title: "Address",
      details: "132 Dartmouth Street Boston, Massachusetts",
      icon: location,
    },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactMessage = {
      name,
      email,
      phone: phoneNumber,
      subject,
      message,
      date: new Date().toISOString(),
    };
    try {
      await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactMessage),
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhoneNumber("");
      setSubject("");
      setMessage("");
      toast.success("Message sent successfully!", {
        position: "top-right",
      });
    } catch {
      toast.error("Failed to send message.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white dark:bg-[#101926] overflow-hidden">
      <motion.div
        className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-start">
          <motion.div
            variants={leftSideVariants}
            className="space-y-8 mr-0 mb-10 lg:mr-10 lg:mb-0"
          >
            <h2 className="text-3xl text-footer-dark font-serif mb-6 dark:text-white dark:text-gray-100">
              Let's get in touch with us
            </h2>
            <p className="text-md text-footer-light mb-10 max-w-md dark:text-gray-300">
              You can also reach out to us by phone or email.
           
            </p>
            <div className="space-y-6">
              {info.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 sm:gap-6 group"
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12"
                  />
                  <div>
                    <h4 className="text-footer-light text-sm dark:text-gray-400 dark:text-gray-300">
                      {item.title}
                    </h4>
                    <p className="text-footer-dark text-base font-medium dark:text-white dark:text-gray-100">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={rightSideVariants}
            className="bg-footer dark:bg-[#181f2a] p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-3xl text-footer-dark font-serif mb-6 dark:text-white dark:text-gray-100">
              Send a message
            </h2>
            <p className="text-md text-footer-light mb-10 max-w-md dark:text-gray-300">
              We'll get back to you as soon as possible.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SharedInput
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  inputClass="bg-white dark:bg-[#232b3b] text-black dark:text-white border border-[#E4E7EC] dark:border-gray-700 placeholder:text-[#98A2B3] dark:placeholder:text-gray-500"
                />
                <SharedInput
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  inputClass="bg-white dark:bg-[#232b3b] text-black dark:text-white border border-[#E4E7EC] dark:border-gray-700 placeholder:text-[#98A2B3] dark:placeholder:text-gray-500"
                />
                <SharedInput
                  placeholder="Phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  inputClass="bg-white dark:bg-[#232b3b] text-black dark:text-white border border-[#E4E7EC] dark:border-gray-700 placeholder:text-[#98A2B3] dark:placeholder:text-gray-500"
                />
                <SharedInput
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  inputClass="bg-white dark:bg-[#232b3b] text-black dark:text-white border border-[#E4E7EC] dark:border-gray-700 placeholder:text-[#98A2B3] dark:placeholder:text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Message"
                  className="w-full border border-[#E4E7EC] dark:border-gray-700 rounded-md px-4 py-3 text-base outline-none placeholder:text-[#98A2B3] dark:placeholder:text-gray-500 focus:border-[#0B1B3F] dark:focus:border-green-700 transition-colors bg-white dark:bg-[#232b3b] text-black dark:text-white"
                  required
                />
                <motion.div
                  className="flex justify-start mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SharedButton
                    type="submit"
                    variant="primary"
                    size="md"
                    className="bg-[--primary] dark:bg-green-700 hover:bg-[--primary-dark] dark:hover:bg-green-800 text-white"
                  >
                 Send Message
                  </SharedButton>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
