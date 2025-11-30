import { ShieldCheck, User } from "lucide-react";
import React from "react";

const AuthToggle = ({ mode, setMode }) => {
  return (
   <div className="inline-flex bg-gray-100 rounded-lg  gap-1 text-sm sm:text-base">
  <button
    onClick={() => setMode("user")}
    className={`flex items-center gap-1 px-4 py-2 rounded-l-lg transition ${
      mode === "user" ? "bg-green-200 text-green-600" : "text-green-400 "
    }`}
  >
    <User className="h-4 w-4" />
    User
  </button>

  <button
    onClick={() => setMode("admin")}
    className={`flex items-center gap-1 px-4 py-2 rounded-r-lg transition ${
      mode === "admin" ? "bg-green-200 text-green-600" : "text-green-400 "
    }`}
  >
    <ShieldCheck className="h-4 w-4" />
    Admin
  </button>
</div>

  );
};

export default AuthToggle;
