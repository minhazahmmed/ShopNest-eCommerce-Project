import React, { useEffect, useState } from "react";
import HeroTag from "../components/HeroTag";
import HeroHeading from "../components/HeroHeading";
import HeroStats from "../components/HeroStats";
import LoginRegister from "./Auth/LoginRegister";
import heroBG from "../assets/hero-grocery.jpg";
import FeaturedProducts from "../components/FeaturedProducts";
import { useNavigate } from "react-router";
import { Truck, Leaf, Shield, Clock } from "lucide-react";

const ICONS = { Truck, Leaf, Shield, Clock };

const MainPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [activeIdx, setActiveIdx] = useState(null);
  const [features, setFeatures] = useState([]);
  const navigate = useNavigate();

  const scrollToLoginForm = () => {
    setIsSignUp(false);
    setActiveTab("login");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => {
        const finalData = data.map((item) => ({
          ...item,
          icon: ICONS[item.icon],
        }));
        setFeatures(finalData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      {/* 🔥 AUTH SECTION WITH BACKGROUND IMAGE */}
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBG})`,
        }}
      >
        <div className="bg-white/55 backdrop-blur-sm w-full">
          <div className="max-w-[1200px] mx-auto pt-20 pb-16 px-4 lg:flex justify-between items-center gap-10">

            {/* LEFT SIDE TEXT */}
            <div className="text-center lg:text-left space-y-6">
              <HeroTag />
              <HeroHeading />
              <HeroStats />
            </div>

            {/* RIGHT SIDE AUTH CARD */}
            <div className="basis-1/2 flex justify-center mt-10 lg:mt-0">
              <div className="text-xl font-semibold text-green-700">
                <LoginRegister
                  isSignUp={isSignUp}
                  setIsSignUp={setIsSignUp}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 FEATURED PRODUCTS (NO BACKGROUND HERE) */}
      <FeaturedProducts
        onCategoryClick={scrollToLoginForm}
        setIsSignUp={setIsSignUp}
        setActiveTab={setActiveTab}
      />

      {/* 🔥 WHY CHOOSE SHOPNEST */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-700 mb-4">
              Why Choose ShopNest?
            </h2>
            <p className="text-green-800 max-w-3xl mx-auto text-lg">
              Experience the best online grocery shopping with our premium
              features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/about")}
                tabIndex={0}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onFocus={() => setActiveIdx(idx)}
                onBlur={() => setActiveIdx(null)}
                className={`bg-white border border-green-800 rounded-xl p-8 text-center cursor-pointer
                  transform transition duration-300 ease-in-out
                  ${activeIdx === idx ? "shadow-xl scale-105" : "shadow-none scale-100"}`}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 mx-auto">
                  <feature.icon className="h-10 w-10 text-green-700" />
                </div>
                <h3 className="font-semibold text-green-800 mb-3 text-2xl">
                  {feature.title}
                </h3>
                <p className="text-base text-green-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default MainPage;
