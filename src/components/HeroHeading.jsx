import React from "react";

const HeroHeading = () => {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-green-700">
        Your Daily
        <span className="block text-green-700">Grocery Partner</span>
      </h1>

      <p className="text-lg text-gray-700 max-w-lg mx-auto lg:mx-0 mt-4">
        Shop from thousands of fresh products and get them delivered to your
        home in minutes. Quality guaranteed, always.
      </p>
    </div>
  );
};

export default HeroHeading;
