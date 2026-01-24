import ShortUrl from "../Components/ShortUrl"

export const Home = () => {
    return (
        <div className="min-h-100 w-full flex justify-center items-center flex-col space-y-6">
          <h1 className="font-extrabold text-4xl text-transparent bg-clip-text bg-linear-to-r from-fuchsia-500 to-pink-500">Url Shortener</h1>
            <ShortUrl/>
         </div> 
    )
}