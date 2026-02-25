import React from 'react'
import { Settings } from 'lucide-react'

const ProfileHeader = ({ profile }) => {
  return (
    <div className="px-4 lg:px-8">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Top bar with username */}
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-normal text-white">{profile.username}</h2>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Profile image and stats inline */}
        <div className="flex items-center gap-6 mb-4">
          <div className="shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-700">
              <img 
                src={profile.avatar} 
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-1 justify-around text-center">
            <div>
              <div className="text-white font-semibold text-lg">{profile.posts}</div>
              <div className="text-zinc-400 text-xs">posts</div>
            </div>
            <div>
              <div className="text-white font-semibold text-lg">{profile.followers}</div>
              <div className="text-zinc-400 text-xs">followers</div>
            </div>
            <div>
              <div className="text-white font-semibold text-lg">{profile.following}</div>
              <div className="text-zinc-400 text-xs">following</div>
            </div>
          </div>
        </div>

        {/* Name and bio */}
        <div className="mb-4">
          <p className="text-white font-semibold text-sm">{profile.fullName}</p>
          <p className="text-white text-sm">{profile.bio}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mb-6">
          <button className="flex-1 bg-[#2A2A2A] text-white font-semibold text-sm py-2 rounded-lg hover:bg-[#3A3A3A] transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 bg-[#2A2A2A] text-white font-semibold text-sm py-2 rounded-lg hover:bg-[#3A3A3A] transition-colors">
            View archive
          </button>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden lg:block">
        <div className="flex gap-8 xl:gap-20 items-start mb-8">
          {/* Profile Picture */}
          <div className="shrink-0">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-zinc-700">
              <img 
                src={profile.avatar} 
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            {/* Username and Settings */}
            <div className="flex items-center gap-6 mb-6">
              <h2 className="text-xl font-normal text-white">{profile.username}</h2>
              <Settings className="w-6 h-6 text-white cursor-pointer hover:opacity-70" />
            </div>

            {/* Stats */}
            <div className="flex gap-10 mb-5">
              <div className="text-white">
                <span className="font-semibold">{profile.posts}</span>
                <span className="text-zinc-300 ml-1">posts</span>
              </div>
              <button className="hover:opacity-70 text-white">
                <span className="font-semibold">{profile.followers}</span>
                <span className="text-zinc-300 ml-1">followers</span>
              </button>
              <button className="hover:opacity-70 text-white">
                <span className="font-semibold">{profile.following}</span>
                <span className="text-zinc-300 ml-1">following</span>
              </button>
            </div>

            {/* Name and Bio */}
            <div className="mb-5">
              <p className="text-white font-semibold">{profile.fullName}</p>
              <p className="text-white text-sm">{profile.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="bg-[#2A2A2A] text-white font-semibold text-sm px-6 py-2 rounded-lg hover:bg-[#3A3A3A] transition-colors">
                Edit Profile
              </button>
              <button className="bg-[#2A2A2A] text-white font-semibold text-sm px-6 py-2 rounded-lg hover:bg-[#3A3A3A] transition-colors">
                View archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader