import React from 'react'

const ProfileStats = ({ profile }) => {
  return (
    <div className="flex lg:hidden border-y border-ig-gray-300 py-3 px-4">
      <div className="flex-1 text-center">
        <div className="font-semibold">{profile.posts}</div>
        <div className="text-ig-gray-500 text-xs">posts</div>
      </div>
      <div className="flex-1 text-center border-x border-ig-gray-300">
        <div className="font-semibold">{profile.followers}</div>
        <div className="text-ig-gray-500 text-xs">followers</div>
      </div>
      <div className="flex-1 text-center">
        <div className="font-semibold">{profile.following}</div>
        <div className="text-ig-gray-500 text-xs">following</div>
      </div>
    </div>
  )
}

export default ProfileStats
