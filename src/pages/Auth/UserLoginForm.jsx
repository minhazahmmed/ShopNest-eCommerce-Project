import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithEmailPassword, setUser, googleSignin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginWithEmailPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Login successful", { position: "bottom-right" });
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error("Invalid credential", { position: "bottom-right" });
        console.log(error);
      });
  };

  const handleGoogleSignin = () => {
    googleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful", { position: "bottom-right" });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login Failed", { position: "bottom-right" });
        console.log(error);
      });
  };

  return (
    <div className="w-[400px] h-[600px]">
      <div className="p-6 bg-white/60 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input name="email" type="email" required placeholder="Enter Your Email"
            className="input input-bordered w-full bg-white/70 border-green-200 focus:border-green-500 focus:ring focus:ring-green-200" />

          <label className="text-sm font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} required placeholder="Enter Your Password"
              className="input input-bordered w-full bg-white/70 border-green-200 focus:border-green-500 focus:ring focus:ring-green-200" />
            <span className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" className="btn w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">Sign In</button>
          </div>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleSignin} className="btn w-full bg-white text-black rounded-xl">
            <FcGoogle className="inline-block mr-2" /> Sign in with Google
          </button>

          <p className="text-center text-sm mt-3">Don't have an account?
            <Link to="/register" className="text-green-700 font-semibold ml-1">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
