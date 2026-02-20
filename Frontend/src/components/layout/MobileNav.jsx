import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  Search,
  Film,
  Heart,
  User
} from 'lucide-react'

const MobileNav = () => {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('profile')

  const menuItems = [
    { id: 'home', icon: Home, path: '/profile' },
    { id: 'search', icon: Search, path: '#' },
    { id: 'reels', icon: Film, path: '#' },
    { id: 'messages', icon: Heart, path: '#', badge: 2 },
    { id: 'profile', icon: User, path: '/profile' },
  ]

  const handleNavigation = (item) => {
    setActiveItem(item.id)
    if (item.path !== '#') {
      navigate(item.path)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0B1014] border-t border-zinc-800 z-50 lg:hidden">
      <div className="flex justify-around items-center py-2 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`p-2 relative ${activeItem === item.id ? 'text-white' : 'text-zinc-400'}`}
          >
            <item.icon 
              className={`w-7 h-7 ${activeItem === item.id ? 'stroke-[2]' : 'stroke-[1.5]'}`}
            />
            {item.badge && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav