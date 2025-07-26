import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='professional-glass rounded-3xl mx-6 mt-6 p-6 flex justify-between items-center shadow-professional-lg border border-white/60'>
      <Link href={"/dashboard"} className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 knoq-logo">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-professional">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        </div>
        <div className="hidden sm:block">
          <span className="knoq-gradient-text font-bold text-2xl">Knoq</span>
          <div className="text-sm text-secondary-dark font-medium">Learning Platform</div>
        </div>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="professional-glass rounded-2xl p-2 shadow-professional">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-xl",
                userButtonPopoverCard: "professional-card rounded-2xl shadow-professional-lg"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
