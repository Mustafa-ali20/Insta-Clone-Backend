import React from 'react'
import { Plus } from 'lucide-react'

const ProfileStories = ({ stories }) => {
  return (
    <div className="px-4 lg:px-8 py-6 border-b border-zinc-800">
      <div className="flex gap-8 overflow-x-auto overflow-y-hidden scrollbar-hide">
        {/* New Story */}
        <div className="flex flex-col items-center shrink-0 gap-2">
          <div className="w-20 h-20 rounded-full border-2 border-zinc-700 flex items-center justify-center bg-[#0B1014]">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs text-white">New</span>
        </div>

        {/* Story Highlights */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center shrink-0 gap-2">
            <div className="p-0.5 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <div className="w-19 h-19 rounded-full overflow-hidden bg-[#0B1014] p-0.75 flex items-center justify-center">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="text-xs text-white max-w-20 truncate text-center">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileStories