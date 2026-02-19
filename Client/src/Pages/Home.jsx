import { useEffect, useState } from "react"
import ShortUrl from "../Components/ShortUrl"
import {motion} from 'motion/react';
import { Canvas } from "../Components/Canvas";
import { ProtectedRoutes } from "../Auth/ProtectedRoute";
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
          <div className="flex items-center flex-col gap-4  min-h-screen px-20 justify-center z-10">
            <motion.div 
            initial={{opacity:0,x:-100,}}
            whileHover={{scale:1.05,y:-30,boxShadow:"10px red"}}
            whileTap={{scale:1.07,y:-10}}
            animate={{opacity:1,x:0}}
            transition={{duration:0.3,ease:"linear",type:'spring'}}
            className="neumorphism px-4 py-1 rounded-[40px] squircle">
            <h1
            className="font-extrabold text-4xl sm:text-6xl text-transparent bg-clip-text bg-linear-to-r/decreasing from-indigo-500 to-green-500">Url Shortner</h1>
          </motion.div>
            <div>
              <ShortUrl/>
              <Canvas/>
            </div>
          </div>
         </div> 
        </ProtectedRoutes>
    )
}