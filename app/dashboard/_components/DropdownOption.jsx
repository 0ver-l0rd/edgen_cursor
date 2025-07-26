import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineTrash } from "react-icons/hi2";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DropdownOption({ children, handleOnDelete }) {
    const [openAlert,setOpenAlert] = useState(false)
  
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="professional-card border border-white/60 shadow-professional-lg">
          <DropdownMenuItem 
            onClick={()=>setOpenAlert(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
          >
            <HiOutlineTrash className="text-lg" />
            <span className="font-medium">Delete Course</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="professional-card border border-white/60 shadow-professional-lg">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <AlertDialogTitle className="text-xl text-primary-dark">Delete Course</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-secondary-dark">
              This action cannot be undone. This will permanently delete your course and remove all associated data from Knoq LP servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel 
              onClick={()=>setOpenAlert(false)}
              className="professional-glass border border-white/60 hover:bg-white/50 text-primary-dark"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={()=>handleOnDelete()}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DropdownOption;
