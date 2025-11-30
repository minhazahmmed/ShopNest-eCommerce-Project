import React from "react";
import HeroTag from "../components/HeroTag";
import HeroHeading from "../components/HeroHeading";
import HeroStats from "../components/HeroStats";
import LoginRegister from "./Auth/LoginRegister";
import heroBG from "../assets/hero-grocery.jpg";

const MainPage = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBG})`,
      }}
    >
      <div className="bg-white/55 backdrop-blur-sm w-full ">
        <div className="max-w-[1200px] mx-auto pt-20 pb-16 px-4 lg:flex justify-between items-center gap-10">
          {/* LEFT SIDE HERO CONTENT */}
          <div className=" text-center lg:text-left space-y-6">
            <HeroTag />
            <HeroHeading />
            <HeroStats />
          </div>

          {/* RIGHT SIDE LOGIN/REGISTER TOGGLE PANEL */}
          <div className="basis-1/2 flex justify-center mt-10 lg:mt-0">
            <div className="text-xl font-semibold text-green-700">
              <LoginRegister />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
