import Image from 'next/image'
import React from 'react'
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from 'react-icons/hi2'
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
    <div className='professional-card rounded-3xl p-4 knoq-hover-lift border border-white/60 shadow-professional'>
      <Link href={'/course/'+course?.courseId}>
        <div className="relative overflow-hidden rounded-2xl mb-4 group">
          <Image 
            src={course?.courseBanner} 
            width={300} 
            height={200} 
            className='w-full h-[200px] object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500'
            alt={course?.courseOutput?.course?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      
      <div className='space-y-3'>
        <div className="flex justify-between items-start">
          <h2 className='font-bold text-lg text-primary-dark line-clamp-2'>
            {course?.courseOutput?.course?.name}
          </h2>
          {!displayUser && (
            <DropdownOption handleOnDelete={()=>handleOnDelete()}>
              <div className="professional-glass rounded-full p-2 hover:scale-110 transition-transform duration-300 shadow-professional">
                <HiMiniEllipsisVertical className="text-secondary-dark"/>
              </div>
            </DropdownOption>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 badge-primary text-xs font-medium rounded-full">
            {course?.category}
          </span>
          <span className="px-3 py-1 badge-secondary text-xs font-medium rounded-full">
            {course?.level}
          </span>
        </div>
        
        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-2 px-3 py-2 badge-accent rounded-xl">
            <HiOutlineBookOpen className="text-cyan-600"/>
            <span className="text-cyan-700 font-medium text-sm">
              {course?.courseOutput?.course?.noOfChapters} Chapters
            </span>
          </div>
        </div>
        
        {displayUser && (
          <div className='flex items-center gap-3 pt-3 border-t border-gray-100'>
            <div className="relative">
              <Image 
                src={course?.userProfileImage} 
                width={35} 
                height={35} 
                className='rounded-full ring-2 ring-white shadow-professional'
                alt="User Profile"
              />
            </div>
            <span className="text-sm font-medium text-secondary-dark">{course?.username}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
