import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/common/Logo'
import LoginForm from '../components/auth/LoginForm'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ig-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl flex gap-8 items-center">
        <div className="hidden lg:block flex-1">
          <img 
            src="/assets/login-side-image.png" 
            alt="Instagram phones"
            className="w-full h-auto max-w-md mx-auto"
          />
        </div>

        <div className="w-full lg:flex-1 max-w-[350px] mx-auto">
          <div className="bg-white border border-ig-gray-300 px-10 py-10 mb-3 animate-fade-in">
            <div className="flex justify-center mb-8">
              <Logo size="large" />
            </div>

            <LoginForm />
          </div>

          <div className="bg-white border border-ig-gray-300 px-10 py-6 text-center text-sm animate-fade-in animate-delay-100">
            <span className="text-ig-gray-700">Don't have an account? </span>
            <Link to="/register" className="text-ig-primary font-semibold hover:text-ig-secondary transition-colors">
              Sign up
            </Link>
          </div>

          <div className="text-center mt-4 animate-fade-in animate-delay-200">
            <p className="text-sm text-ig-gray-700 mb-4">Get the app.</p>
            <div className="flex gap-2 justify-center">
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" 
                alt="Get it on Google Play"
                className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" 
                alt="Get it from Microsoft"
                className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-ig-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-ig-gray-500 mb-3">
            <a href="#" className="hover:underline">Meta</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Locations</a>
            <a href="#" className="hover:underline">Instagram Lite</a>
            <a href="#" className="hover:underline">Threads</a>
            <a href="#" className="hover:underline">Contact Uploading & Non-Users</a>
            <a href="#" className="hover:underline">Meta Verified</a>
          </div>
          <div className="flex justify-center gap-4 text-xs text-ig-gray-500">
            <span>English</span>
            <span>© 2026 Instagram from Meta</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Login
