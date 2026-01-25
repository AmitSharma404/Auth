import { useState } from 'react'
import api from '../utils/axiosInstance';

const ShortUrl = () => {

    const [input,setInput] = useState('');
    const [link,setLink] = useState('');
    const [warning,setWarning] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const sendUrl = async () => {
        const response = await api.post('/',{
            longUrl:input
        })
        // setInput('');
        // console.log(response.data);
        setLink(response.data.shortUrl);
        setWarning(response.data.message);
    }

    const copyLink = async () => {
        await navigator.clipboard.writeText(link);
        await navigator.clipboard.readText();
    }

  return (
    <div className='flex flex-col space-y-12 items-center justify-center'>
        <div>
            <input type="text" className='h-16 sm:w-120 md:w-220 text-xl rounded-[90px] squircle outline-none px-4 py-1 font-semibold shadow-[6px_6px_10px_hsla(0,50%,10%,0.1),-6px_-6px_10px_hsla(100,100%,100%,0.8)] focus:neumorphism' placeholder='Enter your link to short' 
            onChange={handleChange} value={input} required />
        </div>
        <div>
            <button 
            onClick={sendUrl}
            className='px-9 py-3 tracking-wider text-2xl font-bold  active:bg-neutral-950/10 cursor-pointer text-black rounded-[50px] shadow-[6px_6px_10px_hsla(0,50%,10%,0.2),-6px_-6px_10px_hsla(100,100%,100%,0.8)]
            hover:neumorphism squircle'>
                Short
            </button>
        </div>
        {!link ? <></> : <div className='flex flex-col items-center gap-4 justify-center'>
            <a className='neumorphism px-10 py-1 text-lg rounded-md text-sky-500 underline underline-offset-4 font-semibold' href={link}>{link}</a>
            <button 
            onClick={copyLink}
            className='px-6 py-1 tracking-wider rounded-lg text-lg font-semibold 0 active:bg-neutral-950/10 cursor-pointer neumorphism'>
                copy
            </button> <br />
            <div className={`${warning === 'Your short url is created' ? 'bg-linear-to-b from-green-400 to-green-600':'bg-linear-to-b from-red-400 to-red-600'} rounded-md px-10 py-2 text-white bottom-10 absolute newtoast shadow-md`}>
                <p className='text-lg font-semibold'>{warning}</p>
            </div>
            
        </div>}
    </div>
  )
}

export default ShortUrl