import React from 'react'
import { Menu, Heart, MessageCircle } from 'lucide-react'

const Header = ({ username }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-ig-gray-300 z-40 lg:hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <button className="p-2">
          <Menu className="w-6 h-6" />
        </button>
        
        <h1 className="text-base font-semibold">{username}</h1>
        
        <div className="flex items-center gap-4">
          <button className="p-2 relative">
            <Heart className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
