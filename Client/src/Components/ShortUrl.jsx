import { useState } from "react";
import { api } from "../utils/axiosInstance";
import { toast } from "sonner";

export const ShortUrl = () => {
  const [input, setInput] = useState("");
  const [link, setLink] = useState("");
  const handleChange = (e) => {
      setInput(e.target.value);
  };

  const sendUrl = async () => {
    const IsValid = URL.canParse(input);
    if (IsValid) {
      const response = await api.post("/", {
        longUrl: input,
      });
      setInput('');
      if (response.data.success) {
      toast.success("Short URL is created")
      setLink(response.data.shortUrl);
      } else {
        toast.warning(response.data.message)
        setLink(response.data.shortUrl)
      }
    } else {
      toast.error("Please enter a Valid URL")
    }
  };
  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    await navigator.clipboard.readText();
    toast.success("Link Copied")
  };

  return (
    <div className="flex flex-col space-y-12 items-center justify-center z-10">
      <div className="flex relative">
        <SearchIcon className="size-6 top-1/2 left-6 -translate-y-1/2 absolute" />
        <input
          type="text"
          className="h-16 sm:w-120 md:w-220 text-xl rounded-full  outline-none px-14 py-1 font-semibold shadow-[6px_6px_10px_hsla(0,50%,10%,0.1),-6px_-6px_10px_hsla(100,100%,100%,0.8)] focus:neumorphism"
          placeholder="Enter your link to short"
          onChange={handleChange}
          value={input}
          required
        />
      </div>
      <div>
        <button
          onClick={sendUrl}
          className="px-6 py-2 tracking-wider text-2xl font-bold bg-linear-to-l from-neutral-600 to-neutral-800 rounded-full text-white cursor-pointer border-s-stone-300 border"
        >
          Short
        </button>
      </div>
      {link &&
        <div className="border border-neutral-500 px-4 py-3 rounded-md">
          <p className="text-xs text-black/50 font-medium">Here is your URL</p>
          <button className="underline font-semibold relative" onClick={copyLink}>
            <span className="bg-linear-to-l from-sky-500 to-sky-300 absolute rotate-25 rounded-full text-white -top-3 -right-6 text-xs font-medium px-2 py-0.5">
              copy
            </span>
            <a href={link}>{link}</a>
          </button>
        </div>}
    </div>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 50 50"
      width="100%"
      height="100%"
      stroke="currentColor"
      fill="currentColor"
    >
      <path d="M36.1 32.7l11.1 11.1c.9.9.9 2.5 0 3.4l-1.4 1.4c-.9.9-2.5.9-3.4 0L31.3 37.5c-3.7 2.8-8.3 4.5-13.3 4.5C8.1 42 0 33.9 0 24S8.1 6 18 6s18 8.1 18 18c0 3.2-.8 6.2-2.3 8.7zM18 36c6.6 0 12-5.4 12-12s-5.4-12-12-12-12 5.4-12 12 5.4 12 12 12z" />
    </svg>
  );
};
