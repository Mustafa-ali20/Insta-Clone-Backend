import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    month: '',
    day: '',
    year: '',
    fullName: '',
    username: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/profile')
  }

  const isFormValid = 
    formData.email.length > 0 && 
    formData.password.length > 0 &&
    formData.month.length > 0 &&
    formData.day.length > 0 &&
    formData.year.length > 0 &&
    formData.fullName.length > 0 && 
    formData.username.length > 0

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
          You may receive notifications from us.{' '}
          <a href="#" className="text-[#4A9FED] hover:underline">
            Learn why we ask for your contact information
          </a>
        </p>
      </div>

      {/* Password */}
      <div>
        <label className="text-white text-base font-normal mb-2 block">Password</label>
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

      {/* Birthday */}
      <div>
        <label className="text-white text-base font-normal mb-2 flex items-center gap-2">
          Birthday
          <button type="button" className="text-zinc-400 hover:text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </label>
        <div className="grid grid-cols-3 gap-3">
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            className="px-4 py-4 border border-[#5a6b6c] rounded-xl text-zinc-400 text-sm focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23999' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
            className="px-4 py-4 border border-[#5a6b6c] rounded-xl text-zinc-400 text-sm focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23999' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="px-4 py-4 border border-[#5a6b6c] rounded-xl text-zinc-400 text-sm focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23999' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Year</option>
            {Array.from({ length: 100 }, (_, i) => {
              const year = new Date().getFullYear() - i
              return <option key={year} value={year}>{year}</option>
            })}
          </select>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="text-white text-base font-normal mb-2 block">Name</label>
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
        <label className="text-white text-base font-normal mb-2 block">Username</label>
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
          People who use our service may have uploaded your contact information to Instagram.{' '}
          <a href="#" className="text-[#4A9FED] hover:underline">Learn more</a>.
        </p>
        <p>
          By tapping Submit, you agree to create an account and to Instagram's{' '}
          <a href="#" className="text-[#4A9FED] hover:underline">Terms</a>,{' '}
          <a href="#" className="text-[#4A9FED] hover:underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-[#4A9FED] hover:underline">Cookies Policy</a>.
        </p>
        <p className="mt-3">
          The <a href="#" className="text-[#4A9FED] hover:underline">Privacy Policy</a> describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.
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
        onClick={() => navigate('/login')}
        className="w-full border border-[#5a6b6c] text-white font-normal rounded-full px-4 py-3 text-sm hover transition-colors"
      >
        I already have an account
      </button>
    </form>
  )
}

export default RegisterForm