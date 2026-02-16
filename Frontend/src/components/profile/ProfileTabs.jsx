import React, { useState } from 'react'
import { Grid3x3, Film, Bookmark, UserSquare2 } from 'lucide-react'

const ProfileTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('posts')

  const tabs = [
    { id: 'posts', icon: Grid3x3, label: 'POSTS' },
    { id: 'reels', icon: Film, label: 'REELS' },
    { id: 'saved', icon: Bookmark, label: 'SAVED' },
    { id: 'tagged', icon: UserSquare2, label: 'TAGGED' },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    onTabChange(tabId)
  }

  return (
    <div className="border-t border-ig-gray-300">
      <div className="flex justify-center lg:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center gap-2 px-4 lg:px-12 py-3 border-t-[1px] transition-all duration-200
              ${activeTab === tab.id 
                ? 'border-ig-gray-900 text-ig-gray-900' 
                : 'border-transparent text-ig-gray-500 hover:text-ig-gray-900'
              }
            `}
          >
            <tab.icon className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="text-xs font-semibold hidden lg:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileTabs
