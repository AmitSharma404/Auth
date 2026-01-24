import React from 'react'
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
        setLink(response.data.shortUrl);
        setWarning(response.data.message);
    }

    const copyLink = async () => {
        await navigator.clipboard.writeText(link);
        await navigator.clipboard.readText();
    }


  return (
    <div className='flex flex-col space-y-10 items-center justify-center'>
        <div>
            <input type="text" className='h-12 w-180 ring-2 ring-sky-500 rounded-xl outline-none px-4 py-1 font-semibold' placeholder='Enter your link to short' 
            onChange={handleChange} value={input} required />
        </div>
        <div>
            <button 
            onClick={sendUrl}
            className='px-6 py-1 tracking-wider rounded-lg text-lg font-semibold bg-neutral-950/20 active:bg-neutral-950/10 cursor-pointer'>
                Short
            </button>
        </div>
        {!link ? <></> : <div className='flex space-x-10 items-center flex-col gap-4'>
            <a className='shadow-md px-4 py-1 text-lg rounded-md' href={link}>{link}</a>
            <button 
            onClick={copyLink}
            className='px-6 py-1 tracking-wider rounded-lg text-lg font-semibold bg-neutral-950/20 active:bg-neutral-950/10 cursor-pointer'>
                copy
            </button> <br />
            <div className={`${warning === 'Your short url is created' ? 'bg-green-400':'bg-red-500'} rounded-md shadow-lg px-10 py-2 text-white bottom-10 absolute newtoast`}>
                <p>{warning}</p>
            </div>
        </div>}
    </div>
  )
}

export default ShortUrl