'use client'
import React, { useState } from "react";

import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

function DashboardLayout({ children }) {
  const [userCourseList,setUserCourseList] = useState([])
  const [showSideBar,setShowSideBar] = useState(false)
  const [showArrow,setShowArrow] = useState(true)
  const setState = ()=>{
    setShowSideBar(!showSideBar)
    setShowArrow(!showArrow)
  }
  return (
    <UserCourseListContext.Provider value={{userCourseList,setUserCourseList}}>
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dashboard-content">
      {showArrow && (
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <div className="professional-glass rounded-full p-3 cursor-pointer hover:scale-110 transition-all duration-300 shadow-professional" onClick={setState}>
            <HiOutlineArrowRight className="text-2xl text-slate-700" />
          </div>
        </div>
      )}

      <div className={`md:w-72 relative ${showSideBar ? 'w-80' : 'hidden'} md:block`}>
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <div className="professional-glass rounded-full p-3 cursor-pointer hover:scale-110 transition-all duration-300 shadow-professional" onClick={setState}>
            <HiOutlineArrowLeft className="text-2xl text-slate-700" />
          </div>
        </div>
        <SideBar setState={setState}/>
      </div>
      
      <div className="md:ml-72">
        <Header/>
        <div className="p-6 md:p-8 pb-20">
          <div className="professional-card rounded-3xl p-8 shadow-professional-lg border border-white/60 fade-in-up">
            {children}
          </div>
        </div>
      </div>
    </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
