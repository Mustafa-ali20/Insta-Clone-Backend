import React, { useState } from 'react'

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  required = false,
  autoComplete,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        autoComplete={autoComplete}
        className="input-field peer"
      />
      <label 
        className={`absolute left-2 transition-all duration-200 pointer-events-none text-gray-500
          ${isFocused || hasValue 
            ? 'top-0.5 text-[10px]' 
            : 'top-1/2 -translate-y-1/2 text-xs'
          }`}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input
