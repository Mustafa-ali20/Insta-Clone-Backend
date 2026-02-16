import React from 'react'
import { Plus } from 'lucide-react'

const ProfileStories = ({ stories }) => {
  return (
    <div className="px-4 lg:px-0 py-4 border-b border-ig-gray-300 lg:border-0">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        <div className="flex flex-col items-center flex-shrink-0 gap-2">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-ig-gray-300 flex items-center justify-center bg-white">
            <Plus className="w-6 h-6 text-ig-gray-700" />
          </div>
          <span className="text-xs font-semibold text-ig-gray-700">New</span>
        </div>

        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0 gap-2">
            <div className="story-ring rounded-full">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-white p-0.5">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="text-xs text-ig-gray-700 max-w-[70px] truncate">
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileStories
