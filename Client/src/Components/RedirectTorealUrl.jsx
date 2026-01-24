
import { useParams } from "react-router-dom";
import api from "../utils/axiosInstance";
import { useEffect } from "react";

export const RedirectTorealUrl = () => {
    const {shortCode} = useParams();
    console.log(shortCode);
    const redirect = async () => {
        const response = await api.get(`/${shortCode}`);
        console.log(response.data.longUrl);
        window.location.href = response.data.longUrl;
    }
    useEffect(() => {
        redirect();
    })
    return (
        <div className="flex min-h-100 w-full items-center justify-center">
            <h1 className="bg-teal-300 text-3xl text-neutral-950 px-6 py-2 rounded-sm font-bold">Redirecting...</h1>
        </div>
    )
};