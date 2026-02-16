import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  Search, 
  PlusSquare, 
  Film,
  User
} from 'lucide-react'

const MobileNav = () => {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('profile')

  const menuItems = [
    { id: 'home', icon: Home, path: '/profile' },
    { id: 'search', icon: Search, path: '#' },
    { id: 'create', icon: PlusSquare, path: '#' },
    { id: 'reels', icon: Film, path: '#' },
    { id: 'profile', icon: User, path: '/profile' },
  ]

  const handleNavigation = (item) => {
    setActiveItem(item.id)
    if (item.path !== '#') {
      navigate(item.path)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-ig-gray-300 z-50 lg:hidden">
      <div className="flex justify-around items-center py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`p-2 ${activeItem === item.id ? 'text-ig-gray-900' : 'text-ig-gray-700'}`}
          >
            <item.icon 
              className={`w-6 h-6 ${activeItem === item.id ? 'stroke-[2.5]' : 'stroke-[2]'}`}
            />
          </button>
        ))}
      </div>
    </nav>
  )
}

export default MobileNav
