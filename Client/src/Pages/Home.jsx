import { RedirectTorealUrl } from "../Components/redirectTorealUrl"
import ShortUrl from "../Components/ShortUrl"

export const Home = () => {
    return (
        <div className="min-h-100 w-full flex justify-center items-center flex-col space-y-6">
          <h1 className="font-semibold text-4xl">Url Short</h1>
            <ShortUrl/>
         </div> 
    )
}