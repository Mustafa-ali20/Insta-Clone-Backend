import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }, // config object
      )
      .then((res) => {
        console.log(res.data);
      });

    navigate("/profile");
  };

  const isFormValid =
    formData.username.length > 0 && formData.password.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Username/Email Input */}
      <div>
        <input
          type="text"
          name="username"
          placeholder="Mobile number, username or email"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
          required
          className="w-full px-4 py-4 border border-[#4d5a61] rounded-xl text-white text-sm focus:outline-none focus:border-[#3A4952] transition-colors"
        />
      </div>

      {/* Password Input */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
          className="w-full px-4 py-4 border border-[#4d5a61] rounded-xl text-white text-sm focus:outline-none focus:border-[#5f717c] transition-colors"
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full bg-[#1f609d] hover:bg-[#3B8FDD] text-white font-semibold rounded-full px-4 py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
      >
        Log in
      </button>

      {/* Forgot Password */}
      <div className="text-center ">
        <a
          href="#"
          className="text-sm text-zinc-100 hover:text-zinc-300 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      {/* Facebook Login Button */}
      <button
        type="button"
        className="w-full text-white font-semibold rounded-full px-4 py-3 text-sm transition-colors mt-14 border border-[#4d5a61] hover:border-[#3B8FDD]"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Log in with Facebook
        </div>
      </button>
      <Link
        to="/register"
        className="w-full text-[#3B8FDD] font-semibold rounded-full px-4 py-3 text-sm transition-colors border border-[#3B8FDD] block text-center"
      >
        Create new account
      </Link>

      {/* Meta Logo */}
      <div className="flex justify-center pt-8">
        <svg
          className="w-16 h-auto text-zinc-600"
          viewBox="0 0 100 24"
          fill="currentColor"
        >
          <path d="M4.009 23.238V7.762h2.88l4.319 10.11 4.319-10.11h2.88v15.476h-2.88V11.81l-3.36 7.905h-1.918l-3.36-7.905v11.428H4.009zm19.2 0V7.762h8.64v2.88h-5.76v3.36h5.76v2.88h-5.76v3.36h5.76v2.88h-8.64zm16.8 0V10.642h-4.8V7.762h12.48v2.88h-4.8v12.596h-2.88zm18.24 0l-1.44-3.84h-6.24l-1.44 3.84h-3.36l6.24-15.476h3.36l6.24 15.476h-3.36zm-7.2-6.72h4.32l-2.16-5.76-2.16 5.76z" />
        </svg>
      </div>
    </form>
  );
};

export default LoginForm;
