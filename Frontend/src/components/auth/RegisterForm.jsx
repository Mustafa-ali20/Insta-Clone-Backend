import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        formData, // request body
        { withCredentials: true }, // config object
      )
      .then((res) => {
        console.log(res.data);
        // navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        // Show error to user
      });
  };

  const isFormValid =
    formData.email.length > 0 &&
    formData.password.length > 0 &&
    formData.fullName.length > 0 &&
    formData.username.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mobile number or email */}
      <div>
        <label className="text-white text-base font-normal mb-2 block">
          Mobile number or email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Mobile number or email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border border-[#5a6b6c] font-bold rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
        />
        <p className="text-sm text-zinc-100 mt-2">
          You may receive notifications from us.{" "}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Learn why we ask for your contact information
          </a>
        </p>
      </div>

      {/* Password */}
      <div>
        <label className="text-white text-base font-normal mb-2 block">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border border-[#5a6b6c] font-bold rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Name */}
      <div>
        <label className="text-white text-base font-normal mb-2 block">
          Name
        </label>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border border-[#5a6b6c] rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Username */}
      <div>
        <label className="text-white text-base font-normal mb-2 block">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border border-[#5a6b6c] rounded-xl text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Privacy Text */}
      <div className="text-sm text-zinc-100 leading-relaxed">
        <p className="mb-3">
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Learn more
          </a>
          .
        </p>
        <p>
          By tapping Submit, you agree to create an account and to Instagram's{" "}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Terms
          </a>
          ,{" "}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Cookies Policy
          </a>
          .
        </p>
        <p className="mt-3">
          The{" "}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Privacy Policy
          </a>{" "}
          describes the ways we can use the information we collect when you
          create an account. For example, we use this information to provide,
          personalize and improve our products, including ads.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white font-semibold rounded-full px-4 py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </Button>

      {/* Already have account button */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full border border-[#5a6b6c] text-white font-normal rounded-full px-4 py-3 text-sm hover transition-colors"
      >
        I already have an account
      </button>
    </form>
  );
};

export default RegisterForm;
