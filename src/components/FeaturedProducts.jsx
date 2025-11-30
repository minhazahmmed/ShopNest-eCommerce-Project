import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// images
import Meat from "../assets/meat_shopnest.jpg";
import Fish from "../assets/FIsh_shopnest.jpg";
import Dairy from "../assets/dairy_shopnest.jpg";
import Vegetables from "../assets/vegetables.jpg";
import Eggs from "../assets/Eggs_shopnest.jpg";
import Bakery from "../assets/Bakery_shopnest.jpg";

// Card components
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Category data
const categories = [
  { img: Vegetables, title: "Fresh Vegetables" },
  { img: Meat, title: "Quality Meat" },
  { img: Fish, title: "Fresh Seafood" },
  { img: Dairy, title: "Dairy & Eggs" },
  { img: Eggs, title: "Farm Fresh Eggs" },
  { img: Bakery, title: "Artisan Bakery" },
  { img: Vegetables, title: "Organic Produce" },
  { img: Fish, title: "Frozen Delights" },
];

const FeaturedProducts = ({ onCategoryClick, setIsSignUp }) => {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 Responsive item count
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1); // mobile
      else if (window.innerWidth < 1024) setItemsPerSlide(2); // tablet
      else setItemsPerSlide(3); // desktop
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // autoplay
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const translateValue = `-${currentIndex * (100 / itemsPerSlide)}%`;

  const handleCardClick = (e) => {
    e.preventDefault();
    if (setIsSignUp) setIsSignUp(false);
    if (onCategoryClick) onCategoryClick();
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800">
            Fresh Categories
          </h2>

          <Link
            to="/categories"
            className="text-green-600 hover:text-green-700 font-semibold transition flex items-center"
          >
            View All&nbsp;
            <svg className="w-5 h-5" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${translateValue})` }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2"
                >
                  <Card className="h-full">
                    <button
                      onClick={handleCardClick}
                      className="block group cursor-pointer w-full text-left"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={category.img}
                          alt={category.title}
                          className="w-full h-80 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <CardContent className="text-center">
                        <h3 className="font-bold text-xl text-gray-800 group-hover:text-green-600 transition">
                          {category.title}
                        </h3>
                        <span className="text-sm text-gray-500 mt-1 block">
                          Login to Shop
                        </span>
                      </CardContent>
                    </button>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows — only show on large screen */}
          {categories.length > itemsPerSlide && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 bg-white p-4 rounded-full text-gray-700 shadow-xl opacity-75 hover:opacity-100 hover:bg-green-600 hover:text-white transition duration-300 z-10 hidden lg:block"
                onClick={prevSlide}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 bg-white p-4 rounded-full text-gray-700 shadow-xl opacity-75 hover:opacity-100 hover:bg-green-600 hover:text-white transition duration-300 z-10 hidden lg:block"
                onClick={nextSlide}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
