import React from "react";
import Logo from "../assets/shopnest-logo.png";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full shadow-sm px-6 py-3 flex justify-between items-center z-50 sticky top-0 bg-white ">
      {/* Left side: Logo + Text */}
      <Link to={'/'} className="flex items-center gap-3 ">
        <img
          src={Logo}
          alt="ShopNest Logo"
          className="w-12 h-12 object-contain cursor-pointer transition-colors"
        />
        <div className="flex flex-col">
          <span className="text-green-500 hover:text-green-700 cursor-pointer transition-colors font-bold text-xl">
            ShopNest
          </span>
          <span className="text-sm">Fresh & Fast Delivery</span>
        </div>
      </Link>

      {/* Right side: Shopping Cart */}
      <div>
        <ShoppingBasket className="w-6 h-6 text-green-500 hover:text-green-900 cursor-pointer transition-colors " />
      </div>
    </nav>
  );
};

export default Navbar;
