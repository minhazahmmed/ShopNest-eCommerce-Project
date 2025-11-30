import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
     <div  className="flex flex-col min-h-screen">
      <Navbar />
     <div className="flex-1">
        <Outlet/>
     </div>
      <Footer />

       <ToastContainer />
    
    </div>
  );
};

export default RootLayout;
