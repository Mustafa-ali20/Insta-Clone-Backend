import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  Menu,
  User
} from 'lucide-react'

const Sidebar = () => {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('profile')

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/profile' },
    { id: 'search', icon: Search, label: 'Search', path: '#' },
    { id: 'explore', icon: Compass, label: 'Explore', path: '#' },
    { id: 'reels', icon: Film, label: 'Reels', path: '#' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', path: '#' },
    { id: 'notifications', icon: Heart, label: 'Notifications', path: '#' },
    { id: 'create', icon: PlusSquare, label: 'Create', path: '#' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ]

  const handleNavigation = (item) => {
    setActiveItem(item.id)
    if (item.path !== '#') {
      navigate(item.path)
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-ig-gray-300 bg-white z-50 hidden lg:block">
      <div className="flex flex-col h-full p-3">
        <div className="px-3 py-6 mb-4">
          <img 
            src="/assets/instagram-logo.png" 
            alt="Instagram" 
            className="h-8 w-auto"
          />
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-ig-gray-50
                    ${activeItem === item.id ? 'font-bold' : 'font-normal'}
                  `}
                >
                  <item.icon 
                    className={`w-6 h-6 ${activeItem === item.id ? 'stroke-[2.5]' : 'stroke-[2]'}`} 
                  />
                  <span className="text-base">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-ig-gray-50 transition-all duration-200">
          <Menu className="w-6 h-6" />
          <span className="text-base">More</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
