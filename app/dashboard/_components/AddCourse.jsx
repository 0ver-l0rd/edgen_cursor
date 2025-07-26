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
    <div className='professional-glass rounded-3xl p-8 mb-8 shadow-professional-lg'>
      <div className='flex md:items-center md:justify-between flex-col md:flex-row items-start gap-6'>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🚀</span>
            </div>
            <div>
              <h2 className='text-3xl font-bold text-primary-dark'>
                Welcome to <span className='knoq-gradient-text'>Knoq LP</span>
              </h2>
              <p className='text-secondary-dark mt-2'>Ready to create something amazing?</p>
            </div>
          </div>
          <p className='text-muted-dark text-sm max-w-md'>
            Create new courses with AI, share with friends, and earn from your knowledge. 
            Start building your educational empire today!
          </p>
        </div>
        
        <Link href={'/create-course'}>
          <Button className="knoq-button text-white font-semibold px-8 py-4 text-lg rounded-2xl hover:scale-105 transition-all duration-300">
            <span className="mr-2">✨</span>
            Create AI Course
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AddCourse
