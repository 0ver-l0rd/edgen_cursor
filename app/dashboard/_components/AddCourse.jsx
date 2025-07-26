'use client'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useContext } from 'react'

function AddCourse() {
    const {user} = useUser()
    const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)

  return (
    <div className='professional-glass rounded-3xl p-8 mb-8 shadow-professional-lg fade-in-up'>
      <div className='flex md:items-center md:justify-between flex-col md:flex-row items-start gap-8'>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-professional relative overflow-hidden group">
                <span className="text-white font-bold text-2xl relative z-10">🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            </div>
            <div>
              <h2 className='text-4xl font-bold text-primary-dark professional-heading'>
                Welcome to <span className='knoq-gradient-text'>Knoq LP</span>
              </h2>
              <p className='text-secondary-dark mt-2 professional-subheading'>Ready to create something amazing?</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className='text-muted-dark text-base max-w-lg professional-body leading-relaxed'>
              Create new courses with AI, share with friends, and earn from your knowledge. 
              Start building your educational empire today!
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="professional-card rounded-2xl p-4 shadow-professional">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <h3 className="font-semibold text-primary-dark professional-subheading">AI-Powered</h3>
                </div>
                <p className="text-xs text-muted-dark professional-body">Advanced AI creates engaging content</p>
              </div>
              
              <div className="professional-card rounded-2xl p-4 shadow-professional">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <h3 className="font-semibold text-primary-dark professional-subheading">Monetize</h3>
                </div>
                <p className="text-xs text-muted-dark professional-body">Earn from your knowledge</p>
              </div>
              
              <div className="professional-card rounded-2xl p-4 shadow-professional">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌍</span>
                  </div>
                  <h3 className="font-semibold text-primary-dark professional-subheading">Global Reach</h3>
                </div>
                <p className="text-xs text-muted-dark professional-body">Share with learners worldwide</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <Link href={'/create-course'}>
            <Button className="knoq-button text-white font-semibold px-10 py-6 text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-professional-lg group">
              <span className="mr-3 text-xl">✨</span>
              Create AI Course
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
            </Button>
          </Link>
          
          {/* Quick Stats */}
          <div className="professional-card rounded-2xl p-6 shadow-professional text-center">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold knoq-gradient-text">{userCourseList?.length || 0}</div>
                <div className="text-xs text-muted-dark">Courses Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold knoq-gradient-text-accent">∞</div>
                <div className="text-xs text-muted-dark">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
