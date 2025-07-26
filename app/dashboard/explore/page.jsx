"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    setLoading(true);
    try {
      const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
      setCourseList(result);
      setHasMore(result.length === 9);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-lg font-bold">🔍</span>
          </div>
          <h2 className="font-bold text-4xl knoq-gradient-text">Explore Knoq Courses</h2>
        </div>
        <p className="text-secondary-dark text-lg max-w-2xl mx-auto">
          Discover amazing courses built with AI by talented creators from around the world. 
          Learn, grow, and get inspired on Knoq Learning Platform!
        </p>
      </div>

      {loading && courseList.length === 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="professional-card rounded-3xl p-4 skeleton-card">
              <div className="w-full h-[200px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : courseList.length === 0 ? (
        <div className="professional-glass rounded-3xl p-12 text-center shadow-professional">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🌟</span>
          </div>
          <h3 className="text-xl font-semibold text-primary-dark mb-2">No courses available</h3>
          <p className="text-muted-dark">Be the first to create an amazing course on Knoq LP!</p>
        </div>
      ) : (
        <>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courseList?.map((course, index) => (
              <CourseCard course={course} displayUser={true} key={index} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 pt-8">
            {pageIndex !== 0 && (
              <Button 
                onClick={() => setPageIndex(pageIndex - 1)}
                className="knoq-button"
                disabled={loading}
              >
                ← Previous Page
              </Button>
            )}
            
            <div className="professional-glass rounded-2xl px-6 py-3 shadow-professional">
              <span className="text-primary-dark font-medium">
                Page {pageIndex + 1}
              </span>
            </div>
            
            {hasMore && (
              <Button 
                onClick={() => setPageIndex(pageIndex + 1)}
                className="knoq-button"
                disabled={loading}
              >
                Next Page →
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Explore;
