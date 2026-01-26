import { useEffect, useState } from "react"
import ShortUrl from "../Components/ShortUrl"

export const Home = () => {

    const [text,setText] = useState("");
    const fullText = "Url Shortner"

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
        <div className="flex justify-center items-center flex-col space-y-6 bg-linear-to-lt from-green-500 to-lime-400 bg-stone-200">
          <div className="flex items-center flex-col gap-4 border border-dashed border-neutral-600/60 min-h-screen px-20 justify-center">
            <div className="neumorphism px-4 py-1 rounded-[40px] squircle">
            <h1 className="font-extrabold text-4xl sm:text-6xl text-transparent bg-clip-text bg-linear-to-r/decreasing from-indigo-500 to-green-500">{text}</h1>
          </div>
            <div>
              <ShortUrl/>
            </div>
          </div>
         </div> 
    )
}