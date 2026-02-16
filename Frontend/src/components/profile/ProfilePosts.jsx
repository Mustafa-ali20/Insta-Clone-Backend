import React from 'react'
import { Heart, MessageCircle, Film } from 'lucide-react'

const ProfilePosts = ({ posts, activeTab }) => {
  if (activeTab !== 'posts') {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full border-2 border-ig-gray-900 flex items-center justify-center mb-4">
          {activeTab === 'reels' && <Film className="w-8 h-8" />}
          {activeTab === 'saved' && <Heart className="w-8 h-8" />}
          {activeTab === 'tagged' && <MessageCircle className="w-8 h-8" />}
        </div>
        <h3 className="text-2xl font-light mb-2">
          {activeTab === 'reels' && 'No Reels Yet'}
          {activeTab === 'saved' && 'No Saved Posts'}
          {activeTab === 'tagged' && 'No Tagged Posts'}
        </h3>
        <p className="text-ig-gray-500 text-sm">
          {activeTab === 'reels' && 'Create your first reel'}
          {activeTab === 'saved' && 'Save posts you like'}
          {activeTab === 'tagged' && 'Photos and videos of you'}
        </p>
      </div>
    )
  }

  return (
    <div className="profile-grid">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="relative aspect-square bg-ig-gray-100 cursor-pointer group overflow-hidden"
        >
          <img 
            src={post.image} 
            alt=""
            className="w-full h-full object-cover"
          />
          
          {post.type === 'video' && (
            <div className="absolute top-2 right-2">
              <Film className="w-5 h-5 text-white drop-shadow-lg" fill="white" />
            </div>
          )}

          {post.isCarousel && (
            <div className="absolute top-2 right-2">
              <svg className="w-5 h-5 text-white drop-shadow-lg" fill="white" viewBox="0 0 48 48">
                <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
              </svg>
            </div>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Heart className="w-6 h-6" fill="white" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 text-white font-semibold">
              <MessageCircle className="w-6 h-6" fill="white" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProfilePosts
