import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from ".././components/auth/services/auth.api"  // ✅ Import getMe
import Sidebar from '../components/layout/Sidebar'
import MobileNav from '../components/layout/MobileNav'
import Header from '../components/layout/Header'
import ProfileHeader from '../components/profile/shared/ProfileHeader'
import ProfileStories from '../components/profile/shared/ProfileStories'
import ProfileTabs from '../components/profile/shared/ProfileTabs'
import ProfilePosts from '../components/profile/shared/ProfilePosts'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts')
  const [profileData, setProfileData] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await getMe()  // ✅ Use getMe from auth.api.js
      const { user, posts: userPosts } = response
      
      // Format data for ProfileHeader component
      setProfileData({
        username: user.username,
        fullName: user.fullName,
        bio: user.bio || '',
        avatar: user.profileImage,
        posts: user.postCount.toString(),
        followers: user.followerCount.toString(),
        following: user.followingCount.toString(),
      })

      // Format posts for ProfilePosts component
      const formattedPosts = userPosts.map(post => ({
        id: post._id,
        image: post.imgUrl,
        likes: post.likeCount.toString(),
        comments: '0', // Add comments count when you implement comments
        type: 'photo', // Change to 'video' when you add video support
        isCarousel: false, // Change when you add carousel support
      }))
      
      setPosts(formattedPosts)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError(err.message || 'Failed to load profile')
      
      // If not authenticated, redirect to login
      if (err.message === 'Not authenticated') {
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  // Stories data - you can implement this later from backend
  const storiesData = [
    // Keep empty for now, or add when you implement stories feature
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1014] flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-[#0B1014] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error || 'Failed to load profile'}</div>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B1014]">
      <Sidebar />
      <Header username={profileData.username} />

      <main className="lg:ml-64 pt-14 lg:pt-0 pb-16 lg:pb-0">
        <div className="max-w-4xl mx-auto lg:py-8">
          <div className="animate-fade-in">
            <ProfileHeader profile={profileData} />
          </div>

          {storiesData.length > 0 && (
            <div className="animate-fade-in animate-delay-200">
              <ProfileStories stories={storiesData} />
            </div>
          )}

          <div className="animate-fade-in animate-delay-300">
            <ProfileTabs onTabChange={setActiveTab} />
          </div>

          <div className="px-4 lg:px-0 py-4 animate-fade-in animate-delay-300">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full border-2 border-zinc-700 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-2 text-white">No Posts Yet</h3>
                <p className="text-zinc-500 text-sm">Start sharing your moments!</p>
              </div>
            ) : (
              <ProfilePosts posts={posts} activeTab={activeTab} />
            )}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

export default Profile