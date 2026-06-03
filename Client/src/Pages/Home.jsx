import { useEffect, useState } from "react"
import {ShortUrl} from "../Components/ShortUrl"
import {motion} from 'motion/react';
import { Canvas } from "../Components/Canvas";
import { ProtectedRoutes } from "../Auth/ProtectedRoute";
import { Toaster } from "sonner";
export const Home = () => {

    const [text,setText] = useState("");
    const fullText = "Url Shortner";

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
          setText(fullText.substring(0,index))
          index++;

          if(index > fullText.length){
            clearInterval(interval);
          }
      }, 200);
      return () =>  clearInterval(interval)
    },[])

    return (
      <ProtectedRoutes>
          <div className="flex justify-center items-center flex-col space-y-6  bg-stone-200 relative">
        <Toaster position="top-right" richColors closeButton/>
          <div className="flex items-center flex-col gap-4  min-h-screen px-20 justify-center z-10">
           
            <h1
            className="font-extrabold text-4xl sm:text-6xl text-transparent bg-clip-text bg-linear-to-r/decreasing from-indigo-500 to-green-500">Url Shortner</h1>
            <div className="py-4">
              <ShortUrl/>
              <Canvas/>
            </div>
          </div>
         </div> 
        </ProtectedRoutes>
    )
}