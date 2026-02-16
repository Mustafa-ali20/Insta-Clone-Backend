import React from 'react'
import { Settings } from 'lucide-react'
import Button from '../common/Button'

const ProfileHeader = ({ profile }) => {
  return (
    <div className="px-4 lg:px-0">
      <div className="flex gap-5 lg:gap-28 items-start mb-5">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-ig-gray-300">
            <img 
              src={profile.avatar} 
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 mb-4">
            <h2 className="text-xl font-light">{profile.username}</h2>
            
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="flex-1 lg:flex-initial">
                Edit profile
              </Button>
              <Button variant="secondary" className="flex-1 lg:flex-initial">
                View archive
              </Button>
              <button className="lg:hidden p-2">
                <Settings className="w-6 h-6" />
              </button>
              <button className="hidden lg:block p-2">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex gap-10 mb-5">
            <div>
              <span className="font-semibold">{profile.posts}</span>
              <span className="text-ig-gray-700 ml-1">posts</span>
            </div>
            <button className="hover:opacity-70">
              <span className="font-semibold">{profile.followers}</span>
              <span className="text-ig-gray-700 ml-1">followers</span>
            </button>
            <button className="hover:opacity-70">
              <span className="font-semibold">{profile.following}</span>
              <span className="text-ig-gray-700 ml-1">following</span>
            </button>
          </div>

          <div className="hidden lg:block">
            <p className="font-semibold">{profile.fullName}</p>
            <p className="text-sm whitespace-pre-line">{profile.bio}</p>
          </div>
        </div>
      </div>

      <div className="lg:hidden mb-4">
        <p className="font-semibold">{profile.fullName}</p>
        <p className="text-sm whitespace-pre-line">{profile.bio}</p>
      </div>
    </div>
  )
}

export default ProfileHeader
