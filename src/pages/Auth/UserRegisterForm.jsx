import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const UserRegisterForm = ({setUserTab}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const { registerWithEmailPassword, setUser, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) return setPasswordError("Password must be at least 6 characters long");
    if (!uppercase.test(password)) return setPasswordError("Password must contain at least one uppercase letter");
    if (!lowercase.test(password)) return setPasswordError("Password must contain at least one lowercase letter");

    registerWithEmailPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL })
          .then(() => {
            setUser(user);
            toast.success("Registration successful", { position: "top-right" });
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Profile update failed", { position: "top-right" });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message || "Registration failed", { position: "top-right" });
      });
  };

  const handleGoogleSignup = () => {
     googleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration successful", { position: "top-right" });
         setTimeout(() => {
          navigate("/home");
        }, 400);
      })
      .catch((error) => {
        toast.error("Registration Failed");
        console.log(error);
      });
  };


 
  return (
 <div className="w-full max-w-[400px] mx-auto
 ">
  <div className="px-5 sm:px-7 backdrop-blur-2xl rounded-2xl ">
   

     

    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">Name</label>
      <input
        name="name"
        type="text"
        required
        placeholder="Your Name"
        className="input input-bordered w-full bg-white/70 border-green-200"
      />

      <label className="text-sm font-semibold text-gray-700">Email</label>
      <input
        name="email"
        type="email"
        required
        placeholder="Your Email"
        className="input input-bordered w-full bg-white/70 border-green-200"
      />

      <label className="text-sm font-semibold text-gray-700">Photo URL</label>
      <input
        name="photoURL"
        type="text"
        placeholder="Photo URL (optional)"
        className="input input-bordered w-full bg-white/70 border-green-200"
      />

      <label className="text-sm font-semibold text-gray-700">Password</label>
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Create Password"
          className="input input-bordered w-full bg-white/70 border-green-200"
        />
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {passwordError && (
        <p className="text-red-500 text-sm">{passwordError}</p>
      )}

      <button className="btn w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
        Register
      </button>

      <div className="divider text-gray-600 text-[14px] ">OR</div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="btn w-full bg-white text-black rounded-xl"
      >
        <FcGoogle className="inline-block mr-2 text-lg" /> Sign up with Google
      </button>

      <p className="text-center text-sm mt-3">
        Already have an account?
        <button
          onClick={() => setUserTab("login")}
          className="text-green-700 font-semibold ml-1"
        >
          Login
        </button>
      </p>
    </form>
  </div>
</div>

  );
};

export default UserRegisterForm;
