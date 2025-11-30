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
    <div className="w-full max-w-[400px] mx-auto">
  <div className="px-5 sm:px-7 backdrop-blur-2xl rounded-2xl  ">

    

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

      <div className="divider text-gray-600 text-[14px]">OR</div>

      <button
        type="button"
        onClick={handleGoogleSignin}
        className="btn w-full bg-white text-black rounded-xl"
      >
        <FcGoogle className="inline-block mr-2 text-lg" /> Sign in with Google
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
