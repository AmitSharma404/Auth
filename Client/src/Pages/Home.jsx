import ShortUrl from "../Components/ShortUrl"

export const Home = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center flex-col space-y-6 bg-linear-to-lt from-green-500 to-lime-400 bg-stone-200">
          <div className="neumorphism px-4 py-1 rounded-[40px] squircle">
            <h1 className="font-extrabold text-4xl sm:text-6xl text-transparent bg-clip-text bg-linear-to-r/decreasing from-indigo-500 to-green-500">Url Shortener</h1>
          </div>
            <ShortUrl/>
         </div> 
    )
}