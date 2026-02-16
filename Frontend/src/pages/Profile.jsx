import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import MobileNav from '../components/layout/MobileNav'
import Header from '../components/layout/Header'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileStats from '../components/profile/ProfileStats'
import ProfileStories from '../components/profile/ProfileStories'
import ProfileTabs from '../components/profile/ProfileTabs'
import ProfilePosts from '../components/profile/ProfilePosts'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts')

  const profileData = {
    username: 'mustafaaa.ali',
    fullName: 'Mustafa ali',
    bio: 'Livin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    posts: '3',
    followers: '167',
    following: '417',
  }

  const storiesData = [
    { id: 1, name: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=200&fit=crop' },
    { id: 2, name: 'Sri Lanka', image: 'https://images.unsplash.com/photo-1552960394-c81add8de6b8?w=200&h=200&fit=crop' },
    { id: 3, name: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=200&h=200&fit=crop' },
    { id: 4, name: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=200&fit=crop' },
    { id: 5, name: 'Georgia', image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=200&h=200&fit=crop' },
  ]

  const postsData = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      likes: '134',
      comments: '0',
      type: 'photo'
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=600&fit=crop',
      likes: '89',
      comments: '5',
      type: 'video',
      isCarousel: false
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1552960394-c81add8de6b8?w=600&h=600&fit=crop',
      likes: '256',
      comments: '12',
      type: 'photo',
      isCarousel: true
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=600&fit=crop',
      likes: '178',
      comments: '8',
      type: 'photo'
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=600&fit=crop',
      likes: '203',
      comments: '15',
      type: 'photo'
    },
    { 
      id: 6, 
      image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=600&h=600&fit=crop',
      likes: '145',
      comments: '7',
      type: 'photo'
    },
  ]

  return (
    <div className="min-h-screen bg-white lg:bg-ig-gray-50">
      <Sidebar />
      <Header username={profileData.username} />

      <main className="lg:ml-64 pt-14 lg:pt-0 pb-16 lg:pb-0">
        <div className="max-w-4xl mx-auto lg:py-8">
          <div className="animate-fade-in">
            <ProfileHeader profile={profileData} />
          </div>

          <div className="animate-fade-in animate-delay-100">
            <ProfileStats profile={profileData} />
          </div>

          <div className="animate-fade-in animate-delay-200">
            <ProfileStories stories={storiesData} />
          </div>

          <div className="animate-fade-in animate-delay-300">
            <ProfileTabs onTabChange={setActiveTab} />
          </div>

          <div className="px-4 lg:px-0 py-1 animate-fade-in animate-delay-300">
            <ProfilePosts posts={postsData} activeTab={activeTab} />
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

export default Profile
