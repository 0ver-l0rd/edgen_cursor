"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  
  useEffect(() => {
    user && getUserCourses();
  }, [user]);
  
  const getUserCourses = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress));
      setCourseList(result);
      setUserCourseList(result);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
          <span className="text-white text-sm font-bold">📚</span>
        </div>
        <h2 className="font-bold text-2xl knoq-gradient-text">My Knoq Courses</h2>
      </div>

      {courseList.length === 0 && !loading && (
        <div className="professional-glass rounded-3xl p-8 text-center shadow-professional">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📖</span>
          </div>
          <h3 className="text-lg font-semibold text-primary-dark mb-2">No courses yet</h3>
          <p className="text-muted-dark mb-4">Start creating your first AI-powered course on Knoq LP!</p>
        </div>
      )}

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="professional-card rounded-3xl p-4 skeleton-card"
              >
                <div className="w-full h-[200px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))
          : courseList.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={() => getUserCourses()}
              />
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
