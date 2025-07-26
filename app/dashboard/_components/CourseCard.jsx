import Image from 'next/image'
import React from 'react'
import { HiMiniEllipsisVertical, HiOutlineBookOpen, HiOutlineClock, HiOutlineUser, HiOutlineStar } from 'react-icons/hi2'
import DropdownOption from './DropdownOption'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/Schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

function CourseCard({course,refreshData,displayUser=false}) {
  const handleOnDelete = async()=>{
    const res = await db.delete(CourseList).where(eq(CourseList.id,course?.id)).returning({id:CourseList.id})

    if(res){
      refreshData()
    }
  }
  
  return (
    <div className='professional-card rounded-3xl p-6 knoq-hover-lift border border-white/60 shadow-professional fade-in-up'>
      <Link href={'/course/'+course?.courseId}>
        <div className="relative overflow-hidden rounded-2xl mb-6 group">
          <Image 
            src={course?.courseBanner} 
            width={300} 
            height={200} 
            className='w-full h-[220px] object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500'
            alt={course?.courseOutput?.course?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Course Overlay Info */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="professional-glass rounded-xl px-3 py-2 shadow-professional">
              <div className="flex items-center gap-2">
                <HiOutlineStar className="text-yellow-400 text-sm" />
                <span className="text-white text-xs font-medium">4.8</span>
              </div>
            </div>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="professional-glass rounded-full p-4 shadow-professional">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-l-blue-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className='space-y-4'>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className='font-bold text-xl text-primary-dark line-clamp-2 professional-heading mb-2'>
              {course?.courseOutput?.course?.name}
            </h2>
            <p className="text-sm text-muted-dark professional-body line-clamp-2">
              Master the fundamentals and advanced concepts with our comprehensive course designed for all skill levels.
            </p>
          </div>
          {!displayUser && (
            <DropdownOption handleOnDelete={()=>handleOnDelete()}>
              <div className="professional-glass rounded-full p-2 hover:scale-110 transition-transform duration-300 shadow-professional ml-2">
                <HiMiniEllipsisVertical className="text-secondary-dark"/>
              </div>
            </DropdownOption>
          )}
        </div>
        
        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <HiOutlineBookOpen className="text-secondary-dark text-sm" />
            <span className="text-xs text-muted-dark">{course?.courseOutput?.course?.noOfChapters} Chapters</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineClock className="text-secondary-dark text-sm" />
            <span className="text-xs text-muted-dark">2.5 Hours</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 badge-primary text-xs font-medium rounded-full">
            {course?.category}
          </span>
          <span className="px-3 py-1 badge-secondary text-xs font-medium rounded-full">
            {course?.level}
          </span>
          <span className="px-3 py-1 badge-accent text-xs font-medium rounded-full">
            Popular
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-dark">Progress</span>
            <span className="text-xs font-medium text-primary-dark">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{width: '65%'}}></div>
          </div>
        </div>
        
        {displayUser && (
          <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
            <div className="relative">
              <Image 
                src={course?.userProfileImage} 
                width={40} 
                height={40} 
                className='rounded-full ring-2 ring-white shadow-professional'
                alt="User Profile"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-secondary-dark professional-subheading">{course?.username}</span>
              <p className="text-xs text-muted-dark">Course Creator</p>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineStar className="text-yellow-400 text-xs" />
              <span className="text-xs text-muted-dark">4.8</span>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <Link href={'/course/'+course?.courseId}>
          <button className="w-full knoq-button text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 mt-4">
            Continue Learning
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CourseCard
