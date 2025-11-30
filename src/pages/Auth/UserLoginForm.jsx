import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const UserLoginForm = ({setUserTab}) => {
  const [showPassword, setShowPassword] = useState(false);

  const { loginWithEmailPassword, setUser, googleSignin } =
    useContext(AuthContext);

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
        toast.success("Login successful", { position: "top-right" });
        navigate(location.state?.from || "/home");
      })
      .catch((error) => {
        toast.error("Invalid credential", { position: "top-right" });
        console.log(error);
      });
  };

  const handleGoogleSignin = () => {
  googleSignin()
    .then((result) => {
      const user = result.user;
      setUser(user);

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 400);
    })
    .catch((error) => {
      toast.error("Login Failed");
      console.log(error);
    });
};


  return (
    <div className="w-full max-w-[350px] sm:max-w-md md:max-w-lg mx-auto  md:h-[605px]">
  <div className="p-6 sm:p-8 bg-white/60 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-lg ">
    <h2 className="text-[24px] md:text-[28px] font-bold text-green-700 text-center ">
      Welcome Back

    </h2>
    <p className="text-sm text-center font-normal mb-4">Sign in to your grocery account</p>
    

    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">Email</label>
      <input
        name="email"
        type="email"
        required
        placeholder="Enter Your Email"
        className="input input-bordered w-full bg-white/70 border-green-200"
      />

      <label className="text-sm font-semibold text-gray-700">Password</label>
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Enter Your Password"
          className="input input-bordered w-full bg-white/70 border-green-200"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button className="btn w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
        Sign In
      </button>

      <div className="divider">OR</div>

      <button
        type="button"
        onClick={handleGoogleSignin}
        className="btn w-full bg-white text-black rounded-xl"
      >
        <FcGoogle className="inline-block mr-2" /> Sign in with Google
      </button>

      <p className="text-center text-sm mt-3">
        Don't have an account?
        <button
          onClick={() => setUserTab("register")}
          className="text-green-700 font-semibold ml-1"
        >
          Register
        </button>
      </p>
    </form>
  </div>
</div>

  );
};

export default UserLoginForm;
