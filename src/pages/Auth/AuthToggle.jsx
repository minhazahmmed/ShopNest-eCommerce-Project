import React from "react";

const AuthToggle = ({ mode, setMode }) => {
  return (
    <div className="inline-flex bg-white/30 rounded-full p-1 gap-1">
      <button
        onClick={() => setMode("user")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          mode === "user" ? "bg-white text-green-700" : "text-gray-500"
        }`}
      >
        User
      </button>
      <button
        onClick={() => setMode("admin")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          mode === "admin" ? "bg-white text-green-700" : "text-gray-500"
        }`}
      >
        Admin
      </button>
    </div>
  );
};

export default AuthToggle;
