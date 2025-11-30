
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmailPassword, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // For extra safety: also define admin constants here (must match AuthProvider)
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_UID = "pGsRJnQC69YhN5r72niCmW9eTX93";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    loginWithEmailPassword(email, password)
      .then((res) => {
        const firebaseUser = res.user;

        // check UID or email against admin
        if (
          firebaseUser.uid === ADMIN_UID ||
          firebaseUser.email === ADMIN_EMAIL
        ) {
          // setUser will be also set by onAuthStateChanged, but set now for immediacy
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: "admin",
          });

          toast.success("Admin login successful", { position: "top-right" });
          // small delay so toast appears
          setTimeout(() => navigate("/admin"), 400);
        } else {
          toast.error("Not an admin account", { position: "top-right" });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login failed: " + (error.message || ""), {
          position: "top-right",
        });
      });
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="px-5 sm:px-7 rounded-2xl  ">
      

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

          <button
            type="submit"
            className="btn w-full bg-orange-500 text-white rounded-xl"
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
