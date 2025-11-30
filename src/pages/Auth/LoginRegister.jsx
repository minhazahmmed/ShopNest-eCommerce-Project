import React, { useState } from "react";
import AuthToggle from "./AuthToggle";
import UserLoginForm from "./UserLoginForm";
import UserRegisterForm from "./UserRegisterForm";
import AdminLoginForm from "./AdminLoginForm";

const LoginRegister = () => {
  const [mode, setMode] = useState("user"); // "user" or "admin"
  const [userTab, setUserTab] = useState("login"); // "login" or "register"

  return (
   <div className="w-full max-w-[350px] sm:max-w-md md:max-w-lg mx-auto">
  <div className="mb-4 flex justify-center">
    <AuthToggle mode={mode} setMode={setMode} />
  </div>

  {mode === "user" ? (
    <div>
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setUserTab("login")}
          className={`px-4 py-2 rounded-lg ${
            userTab === "login"
              ? "bg-green-600 text-white"
              : "bg-white/30 text-gray-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setUserTab("register")}
          className={`px-4 py-2 rounded-lg ${
            userTab === "register"
              ? "bg-green-600 text-white"
              : "bg-white/30 text-gray-500"
          }`}
        >
          Register
        </button>
      </div>

      {userTab === "login" ? (
        <UserLoginForm setUserTab={setUserTab} />
      ) : (
        <UserRegisterForm setUserTab={setUserTab} />
      )}
    </div>
  ) : (
    <AdminLoginForm />
  )}
</div>

  );
};

export default LoginRegister;
