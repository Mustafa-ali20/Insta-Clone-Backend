import React, { useState } from 'react'
import { Grid3x3, Film, Bookmark, User } from 'lucide-react'

const ProfileTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('posts')

  const tabs = [
    { id: 'posts', icon: Grid3x3 },
    { id: 'reels', icon: Film },
    { id: 'saved', icon: Bookmark },
    { id: 'tagged', icon: User },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    onTabChange(tabId)
  }

  return (
    <div className="border-b border-zinc-800">
      <div className="flex justify-around px-4 lg:px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative flex items-center justify-center py-3 px-8 transition-all duration-200
              ${activeTab === tab.id 
                ? 'text-white' 
                : 'text-zinc-500 hover:text-zinc-300'
              }
            `}
          >
            <tab.icon className="w-6 h-6" />
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileTabs