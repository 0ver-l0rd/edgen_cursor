"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading,setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const {user} = useUser()
  const router = useRouter()
  
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length === 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChepter == undefined)
    ) {
      return true;
    }
    return false;
  };
  
  const GenerateCourseLayout = async() => {
    setLoading(true)
    const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: '
    const USER_INPUT_PROMPT='Category: '+userCourseInput?.category+', Topic: '+userCourseInput?.topic+', Level:'+userCourseInput?.level+', Duration:'+userCourseInput?.duration+',NoOf Chapters:'+userCourseInput?.noOfChepter+', in JSON format'
    const FINAL_PROMPT=BASIC_PROMPT+USER_INPUT_PROMPT
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT)
    console.log(result.response?.text())
    console.log(JSON.parse(result.response?.text()));
    setLoading(false)
    saveCourseLayoutInDB(JSON.parse(result.response?.text()))
  };

  const saveCourseLayoutInDB= async(courseLayout)=>{
    var id = uuid4()
    setLoading(true)
    const result = await db.insert(CourseList).values({
      courseId:id,
      name: userCourseInput?.topic,
      level:userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput:courseLayout,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      username:user?.fullName,
      userProfileImage: user?.imageUrl,
    })
    console.log("finish");
    router.replace('/create-course/'+id)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">🚀</span>
            </div>
            <h1 className="text-4xl font-bold knoq-gradient-text">Create Your Knoq Course</h1>
          </div>
          <p className="text-secondary-dark text-lg max-w-2xl mx-auto">
            Let's build something amazing together! Follow these simple steps to create your personalized AI-powered course on Knoq Learning Platform.
          </p>
        </div>

        {/* Stepper */}
        <div className="professional-card rounded-3xl p-8 mb-8 shadow-professional-lg">
          <div className="flex items-center justify-between mb-8">
            {StepperOptions.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center gap-3 ${
                  index <= activeIndex 
                    ? 'text-blue-600' 
                    : 'text-muted-dark'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index <= activeIndex
                      ? 'knoq-primary text-white border-blue-500 shadow-professional'
                      : 'bg-white text-muted-dark border-gray-300'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium hidden sm:block">{item.name}</span>
                </div>
                {index < StepperOptions.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < activeIndex ? 'knoq-primary' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {activeIndex === 0 && <SelectCategory />}
            {activeIndex === 1 && <TopicDescription />}
            {activeIndex === 2 && <SelectOption />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <Button
              onClick={() => setActiveIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="professional-glass border border-white/60 hover:bg-white/50 text-primary-dark"
            >
              ← Previous
            </Button>
            
            {activeIndex === 2 ? (
              <Button
                onClick={GenerateCourseLayout}
                disabled={checkStatus()}
                className="knoq-button"
              >
                {loading ? "Generating..." : "Generate Course"}
              </Button>
            ) : (
              <Button
                onClick={() => setActiveIndex(activeIndex + 1)}
                disabled={checkStatus()}
                className="knoq-button"
              >
                Next →
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {loading && <LoadingDialog />}
    </div>
  );
}

export default CreateCourse;
