
import { useParams } from "react-router-dom";
import {api} from "../utils/axiosInstance";
import { useEffect } from "react";

export const RedirectTorealUrl = () => {
    const {shortCode} = useParams();
    console.log(shortCode);
    const redirect = async () => {
        const response = await api.get(`/${shortCode}`);
        // console.log(response.data.longUrl);
        // window.location.href = response.data.longUrl;
    }
    useEffect(() => {
        redirect();
    })
    return (
        <div className="flex min-h-100 w-full items-center justify-center">
        <div className="rounded-2xl border border-teal-400 bg-teal-200 p-20 shadow-md">
          <h1 className="bg-linear-to-b from-teal-500 to-teal-800 text-3xl text-white px-6 py-2 rounded-full font-bold">Redirecting...</h1>
          
        </div>
        </div>
    )
};