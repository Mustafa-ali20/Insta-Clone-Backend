import React from 'react'
import { Settings, ChevronDown } from 'lucide-react'

const Header = ({ username }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0B1014] border-b border-zinc-800 z-40 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button className="p-1">
          <Settings className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center gap-1">
          <h1 className="text-base font-normal text-white">{username}</h1>
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
        
        <button className="p-1">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="19" cy="12" r="1" fill="currentColor"/>
            <circle cx="5" cy="12" r="1" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header