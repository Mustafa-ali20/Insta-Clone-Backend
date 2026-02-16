import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0B1014]">
      {/* Instagram Logo - Mobile/Tablet Only (Top) */}
      <div className="lg:hidden bg-[#0B1014] py-10 px-8 border-b border-zinc-700">
        <img src="/images/logo.png" alt="Instagram" className="h-12 mx-auto" />
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-200px)] lg:min-h-screen">
        {/* Left Side - Image Section (65-70% width) */}
        <div className="hidden lg:flex lg:w-[65%] xl:w-[70%] relative items-center justify-center p-12 bg-[#0B1014]">
          {/* Instagram Logo in top-left */}
          <div className="absolute top-8 left-8">
            <img src="/images/logo.png" alt="Instagram" className="h-20" />
          </div>

          {/* Tagline Text */}
          <div className="absolute top-32 left-0 right-0 text-center px-8">
            <h1 className="text-white text-4xl xl:text-5xl font-light mb-2">
              See everyday moments from
            </h1>
            <h1 className="text-4xl xl:text-5xl font-light text-white">
              your{"  "}
              <span className="bg-linear-to-r from-[#FF6B35] to-[#C13584] bg-clip-text text-transparent">
                close friends
              </span>
            </h1>
          </div>

          {/* Main Image - Bigger and Centered */}
          <div className="w-full max-w-3xl mt-20">
            <img
              src="/images/Insta image.png"
              alt="Instagram showcase"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Side - Login Form Section (30-35% width) */}
        <div className="w-full lg:w-[35%] xl:w-[30%] bg-[#152126] flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12">
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Login Form Container */}
            <div className="animate-fade-in">
              <h2 className="text-white text-lg font-normal mb-5">
                Log into Instagram
              </h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Not Fixed, Scrollable */}
      <footer className="bg-[#0B1014] py-12 border-t border-zinc-700">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-400 mb-3">
            <a href="#" className="hover:underline hover:text-zinc-300">
              Meta
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              About
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Blog
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Jobs
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Help
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              API
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Privacy
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Terms
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Locations
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Instagram Lite
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Threads
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Contact Uploading & Non-Users
            </a>
            <a href="#" className="hover:underline hover:text-zinc-300">
              Meta Verified
            </a>
          </div>
          <div className="flex justify-center gap-4 text-xs text-zinc-400">
            <span>English</span>
            <span>© 2026 Instagram from Meta</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;