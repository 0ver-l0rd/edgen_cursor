import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='professional-glass rounded-3xl mx-6 mt-6 p-6 flex justify-between items-center shadow-professional-lg border border-white/60 fade-in-up'>
      <Link href={"/dashboard"} className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 knoq-logo group">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-professional relative overflow-hidden">
            <span className="text-white text-xl font-bold relative z-10">K</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        </div>
        <div className="hidden sm:block">
          <span className="knoq-gradient-text font-bold text-2xl professional-heading">Knoq</span>
          <div className="text-sm text-secondary-dark font-medium professional-subheading">Learning Platform</div>
          <div className="text-xs text-muted-dark professional-body">Empowering Education</div>
        </div>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-2 professional-glass rounded-2xl px-4 py-2 shadow-professional">
          <div className="w-2 h-2 bg-green-500 rounded-full pulse"></div>
          <span className="text-xs text-secondary-dark font-medium">Online</span>
        </div>

        {/* Notifications */}
        <div className="relative professional-glass rounded-2xl p-2 shadow-professional hover:shadow-professional-lg transition-all duration-300 cursor-pointer">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6a2 2 0 002-2V7a4 4 0 00-4-4H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* User Profile */}
        <div className="professional-glass rounded-2xl p-2 shadow-professional hover:shadow-professional-lg transition-all duration-300">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-xl overflow-hidden",
                userButtonPopoverCard: "professional-card rounded-2xl shadow-professional-lg border border-white/60",
                userButtonPopoverActionButton: "hover:bg-gray-50 transition-colors duration-200",
                userButtonPopoverActionButtonText: "text-primary-dark font-medium"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
