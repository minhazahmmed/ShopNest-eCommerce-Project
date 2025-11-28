import React from "react";

const HeroStats = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-6">
      <div className="text-center">
        <p className="text-3xl font-bold text-green-700">10K+</p>
        <p className="text-sm text-gray-700">Products</p>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-green-700">50K+</p>
        <p className="text-sm text-gray-700">Happy Customers</p>
      </div>

      <div className="text-center">
        <p className="text-3xl font-bold text-green-700">30min</p>
        <p className="text-sm text-gray-700">Delivery Time</p>
      </div>
    </div>
  );
};

export default HeroStats;
