import { useEffect, useState } from "react"
import ShortUrl from "../Components/ShortUrl"
import {motion} from 'motion/react';
export const Home = () => {

    const [text,setText] = useState("");
    const fullText = "Url Shortner";
    const [stars,setStar] = useState([]);
    const [color1,setColor] = useState('');
    const [color2,setColor2] = useState('');
    const generateStar = () => {
      const numberofStar = Math.floor(window.innerHeight * window.innerWidth)/100000;
      const newStar = [];
      for(let i = 0;i < numberofStar;i++) {
        newStar.push({
          id:i,
          size:Math.random() * 10 + 2 ,
          rotate:Math.random() * 360,
          x:Math.random() * 100,
          y:Math.random() * 100,
        })
      }
      setStar(newStar);
    }
    const generateColor = () => {
      let code1 = '#';
      let code = '#'
      let index = 0
      let index1 = 2
      let letter = '1ab2c3def1234567890';

      for(let i = 0;i < 6;i++){
        index1 = Math.floor(Math.random() * letter.length);
        index = Math.floor(Math.random() * letter.length);
        code += letter[index1];
        code1 += letter[index];
      }
      setColor(code);
      setColor2(code1)
    }
    

    useEffect(() => {
      generateStar()
      generateColor()
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
        <div className="flex justify-center items-center flex-col space-y-6 bg-linear-to-lt from-green-500 to-lime-400 bg-stone-200 relative">
          <div className="min-h-screen pointer-events-none absolute w-full">
            {stars.map(star => (
              <div key={star.id} className="absolute z-0 rounded-full animate-rotate" 
              style={{
                background:`radial-gradient(circle at top,${color1 + '10'},${color2 },${color1 + '10'},${color2})`,
                rotate:star.rotate + "deg",
                width:star.size + 'px',
                height:star.size + 'px',
                top:star.x + '100%',
                left:star.y + '100%'
              }}>

              </div>
            ) )}
          </div>
          <div className="flex items-center flex-col gap-4 border border-dashed border-neutral-600/60 min-h-screen px-20 justify-center">
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
            </div>
          </div>
         </div> 
    )
}