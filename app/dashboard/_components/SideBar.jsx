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
} from "react-icons/hi2";

function SideBar({setState}) {
  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  // const {signOut} = useClerk()
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 1,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    // {
    //   id: 1,
    //   name: "Upgrade",
    //   icon: <HiOutlineShieldCheck />,
    //   path: "/dashboard/upgrade",
    // },
    // {
    //   id: 1,
    //   name: "Logout",
    //   icon: <HiOutlinePower />,
    //   path: "/dashboard/logout",
    //   onClick: signOut()
    // },
  ];
  const path = usePathname()
  
  return (
    <div className="fixed h-full knoq-sidebar z-10 md:w-64 p-6 rounded-r-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-professional">
            <span className="text-white font-bold">K</span>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
        </div>
        <Link href={"/dashboard"} className="knoq-gradient-text font-bold text-xl">Knoq LP</Link>
      </div>
      
      <div className="professional-glass rounded-3xl p-4 mb-6 shadow-professional">
        <h3 className="text-sm font-semibold text-primary-dark mb-3">Navigation</h3>
        <ul className="space-y-2">
          {Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <div 
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  item.path === path 
                    ? 'nav-item-active text-white shadow-professional' 
                    : 'text-secondary-dark hover:nav-item-hover'
                }`} 
                onClick={setState}
              >
                <div className="text-xl">{item.icon}</div>
                <h2 className="font-medium">{item.name}</h2>
              </div>
            </Link>
          ))}
        </ul>
      </div>

      {/* <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length)/5*100}/>
        <h2 className="text-sm my-2">{userCourseList?.length} Out of 5 Course Created</h2>
        <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited course generation</h2>
      </div> */}
    </div>
  );
}

export default SideBar;
