import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#152126] px-4 py-8">
      <div className="w-full max-w-125">
        {/* Back Button */}
        <Link to="/login" className="text-white mb-6 hover:opacity-80 transition-opacity inline-block">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Meta Logo */}
        <div className="mb-6">
          <svg className="w-20 h-auto text-white" viewBox="0 0 100 24" fill="currentColor">
            <path d="M4.009 23.238V7.762h2.88l4.319 10.11 4.319-10.11h2.88v15.476h-2.88V11.81l-3.36 7.905h-1.918l-3.36-7.905v11.428H4.009zm19.2 0V7.762h8.64v2.88h-5.76v3.36h5.76v2.88h-5.76v3.36h5.76v2.88h-8.64zm16.8 0V10.642h-4.8V7.762h12.48v2.88h-4.8v12.596h-2.88zm18.24 0l-1.44-3.84h-6.24l-1.44 3.84h-3.36l6.24-15.476h3.36l6.24 15.476h-3.36zm-7.2-6.72h4.32l-2.16-5.76-2.16 5.76z"/>
          </svg>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-normal mb-2">Get started on Instagram</h1>
          <p className="text-zinc-400 text-sm">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        {/* Form */}
        <RegisterForm />
       
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#152126] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 text-xs text-zinc-500 mb-2">
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
            <a href="#" className="hover:underline">Contact Uploading & Non-Users</a>
            <a href="#" className="hover:underline">Meta Verified</a>
          </div>
          <div className="flex justify-center gap-3 text-xs text-zinc-500">
            <span>English</span>
            <span>© 2026 Instagram from Meta</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Register