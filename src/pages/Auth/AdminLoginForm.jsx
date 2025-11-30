import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmailPassword, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginWithEmailPassword(email, password)
      .then((res) => {
        const user = res.user;

        if (user.email === "admin@example.com") {
          setUser(user);
          toast.success("Admin login successful", { position: "bottom-right" });
          navigate("/admin");
        } else {
          toast.error("Not an admin account", { position: "bottom-right" });
        }
      })
      .catch((error) => {
        toast.error("Login failed", { position: "bottom-right" });
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-[350px] sm:max-w-md md:max-w-lg mx-auto">
  <div className="p-6 sm:p-8 bg-white/70 rounded-2xl border border-white/40 shadow-lg">
    <h2 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-4">
      Admin Sign in
    </h2>

    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">Email</label>
      <input
        name="email"
        type="email"
        required
        placeholder="Admin Email"
        className="input input-bordered w-full bg-white/70 border-green-200"
      />

      <label className="text-sm font-semibold text-gray-700">Password</label>
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Admin Password"
          className="input input-bordered w-full bg-white/70 border-green-200"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button type="submit" className="btn w-full bg-green-800 text-white rounded-xl">
        Admin Login
      </button>
    </form>
  </div>

  <ToastContainer />
</div>

  );
};

export default AdminLoginForm;
