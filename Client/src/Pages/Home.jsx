import { useEffect, useState } from "react"
import ShortUrl from "../Components/ShortUrl"
import {motion} from 'motion/react';
import { Canvas } from "../Components/Canvas";
export const Home = () => {

    const [text,setText] = useState("");
    const fullText = "Url Shortner";
    const [stars,setStar] = useState([]);
    const generateStar = () => {
      const numberofStar = Math.floor(window.innerHeight * window.innerWidth)/10000;
      const newStar = [];
      for(let i = 0;i < numberofStar;i++) {
        newStar.push({
          id:i,
          size:Math.random() * 10 + 2 ,
          rotate:Math.random() * 360,
          x:Math.random() * 100,
          y:Math.random() * 100,
          animationdelay:Math.random() * 4 + 1,
          color:generateColor()
        })
      }
      setStar(newStar);
    }

    const generateColor = () => {
      let code = '123456789abcdef';
      let color = '#'
      for(let i = 0;i< 6;i++){
        let index = Math.floor(Math.random() * code.length);
        color += code[index];
      }
      return color;
    }
    

    useEffect(() => {
      // generateStar();
    },[])

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
        <div className="flex justify-center items-center flex-col space-y-6  bg-stone-200 relative">
          <div className="min-h-screen pointer-events-none absolute w-full">
            {stars.map(star => (
              <div key={star.id} className="absolute z-0 rounded-full animate-rotate bg-black/50" 
              style={{
                background:star.color,
                rotate:star.rotate + "deg",
                width:star.size + 'px',
                height:star.size + 'px',
                top:star.x + '100%',
                left:star.y + '100%',
                animationDelay:star.animationdelay + 's'
              }}>
              </div>
            ) )}
          </div>
          <div className="flex items-center flex-col gap-4  min-h-screen px-20 justify-center z-10">
            <motion.div 
            initial={{opacity:0,x:-100,}}
            whileHover={{scale:1.05,y:-30,boxShadow:"10px red"}}
            whileTap={{scale:1.10,y:-10}}
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
    )
}