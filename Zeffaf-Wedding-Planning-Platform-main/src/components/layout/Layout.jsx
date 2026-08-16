import React from "react";
import TopBar from "./TopBar.jsx";
import MainNavbar from "./MainNavbar.jsx";
import Footer from "./Footer.jsx";
const Layout = ({ children }) => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <main className="bg-white dark:bg-[#101926] min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
