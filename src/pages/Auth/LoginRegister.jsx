import React, { useState } from "react";
import AuthToggle from "./AuthToggle";
import UserLoginForm from "./UserLoginForm";
import UserRegisterForm from "./UserRegisterForm";
import AdminLoginForm from "./AdminLoginForm";
import { KeyRound, ShieldCheck, User, UserPen } from "lucide-react";

const LoginRegister = () => {
  const [mode, setMode] = useState("user"); 
  const [userTab, setUserTab] = useState("login");

  return (
    <div className="w-full max-w-[420px] mx-auto">

      {/* MAIN CARD */}
      <div className=" bg-gray-200 rounded-2xl border border-white/40 shadow-xl py-7">

        {/* USER / ADMIN TOGGLE (INSIDE CARD NOW) */}
        <div className="flex justify-center mb-4">
          <AuthToggle mode={mode} setMode={setMode} />
        </div>

 
      

        {/* USER ONLY: Login / Register Toggle (INSIDE CARD NOW) */}
        {mode === "user" && (
          <div className="grid grid-cols-2  mb-4  bg-gray-300 rounded-md max-w-[320px] mx-auto p-1">
            <button
              onClick={() => setUserTab("login")}
             className={` text-[16px] font-semibold flex items-center justify-center gap-2 py-1.5 rounded-l-md ${
          userTab === "login"
            ? "bg-white text-green-700 "
            : "text-green-500 hover:text-green-700"
        }`}
            >
                <KeyRound className="h-4 w-4" />
              Login
            </button>

            <button
              onClick={() => setUserTab("register")}
                className={` text-[16px] font-semibold flex items-center justify-center gap-2 py-1.5 rounded-r-md ${
          userTab === "register"
            ? "bg-white text-green-700 "
            : "text-green-500 hover:text-green-700"
        }`}
            >
                <UserPen className="h-4 w-4" />
              Register
            </button>
          </div>




        )}

               {/* TITLE */}
        <h2 className="text-2xl font-bold text-green-700 text-center mb-1">
          {mode === "user"
            ? userTab === "login"
              ? "Welcome Back"
              : "Create Account"
            : "Admin Sign In"}
        </h2>

        <p className="text-center text-sm text-gray-600 mb-3">
          {mode === "user"
            ? userTab === "login"
              ? "Sign in to your grocery account"
              : "Sign up to start shopping fresh!"
            : "Access your admin dashboard"}
        </p>


        {/* FORMS */}
        {mode === "user" ? (
          userTab === "login" ? (
            <UserLoginForm setUserTab={setUserTab} />
          ) : (
            <UserRegisterForm setUserTab={setUserTab} />
          )
        ) : (
          <AdminLoginForm />
        )}

      </div>
    </div>
  );
};

export default LoginRegister;
