'use client'
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import { SignedOut, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineBookOpen,
} from "react-icons/hi2";

function SideBar({setState}) {
  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  // const {signOut} = useClerk()
  const Menu = [
    {
      id: 1,
      name: "Dashboard",
      icon: <HiOutlineHome />,
      path: "/dashboard",
      description: "Overview & Analytics"
    },
    {
      id: 2,
      name: "My Courses",
      icon: <HiOutlineBookOpen />,
      path: "/dashboard",
      description: "Manage Your Content"
    },
    {
      id: 3,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
      description: "Discover New Courses"
    },
    {
      id: 4,
      name: "Analytics",
      icon: <HiOutlineChartBar />,
      path: "/dashboard/analytics",
      description: "Performance Insights"
    },
    {
      id: 5,
      name: "Settings",
      icon: <HiOutlineCog6Tooth />,
      path: "/dashboard/settings",
      description: "Account & Preferences"
    },
  ];
  const path = usePathname()
  
  return (
    <div className="fixed h-full knoq-sidebar z-10 md:w-72 p-6 rounded-r-3xl fade-in-up">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-8 group">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-professional relative overflow-hidden">
            <span className="text-white font-bold relative z-10">K</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        </div>
        <Link href={"/dashboard"} className="knoq-gradient-text font-bold text-xl professional-heading">Knoq LP</Link>
      </div>
      
      {/* Navigation Section */}
      <div className="professional-glass rounded-3xl p-6 mb-6 shadow-professional">
        <h3 className="text-sm font-semibold text-primary-dark mb-4 professional-subheading flex items-center gap-2">
          <HiOutlineAcademicCap className="text-secondary-dark" />
          Navigation
        </h3>
        <ul className="space-y-3">
          {Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <div 
                className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  item.path === path 
                    ? 'nav-item-active text-white shadow-professional' 
                    : 'text-secondary-dark hover:nav-item-hover'
                }`} 
                onClick={setState}
              >
                <div className={`text-xl transition-all duration-300 ${
                  item.path === path ? 'text-white' : 'text-secondary-dark group-hover:text-primary-dark'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-medium professional-subheading">{item.name}</h2>
                  <p className={`text-xs mt-1 transition-all duration-300 ${
                    item.path === path ? 'text-white/80' : 'text-muted-dark group-hover:text-secondary-dark'
                  }`}>
                    {item.description}
                  </p>
                </div>
                {item.path === path && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* Quick Stats */}
      <div className="professional-glass rounded-3xl p-6 mb-6 shadow-professional">
        <h3 className="text-sm font-semibold text-primary-dark mb-4 professional-subheading">Quick Stats</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-dark">Courses Created</span>
            <span className="text-lg font-bold knoq-gradient-text">{userCourseList?.length || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-dark">Completion Rate</span>
            <span className="text-lg font-bold knoq-gradient-text-accent">85%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-dark">Active Learners</span>
            <span className="text-lg font-bold knoq-gradient-text-secondary">1.2K</span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="professional-glass rounded-3xl p-6 shadow-professional">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-primary-dark professional-subheading">Course Progress</h3>
          <span className="text-xs text-muted-dark">{userCourseList?.length || 0}/5</span>
        </div>
        <Progress value={(userCourseList?.length || 0)/5*100} className="mb-3"/>
        <p className="text-xs text-muted-dark professional-body">
          {userCourseList?.length >= 5 ? 'Unlimited courses available!' : 'Upgrade for unlimited course generation'}
        </p>
      </div>
    </div>
  );
}

export default SideBar;
