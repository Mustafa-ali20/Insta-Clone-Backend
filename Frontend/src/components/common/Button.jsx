import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const baseClasses = 'font-semibold rounded-full px-4 py-2 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: ' text-white hover:bg-ig-secondary active:scale-95',
    secondary: 'text-gray-900 hover:bg-ig-gray-200 active:scale-95',
    text: 'hover:text-ig-secondary p-0'
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
