import { createContext, useContext, useState } from "react";

const Mycontext = createContext();

const MyContextProvider = ({children}) => {

    const [count,setCount] = useState(0);
    
    const value = {
        count,
        increment: () => setCount(prev => prev + 1),
        decrement: () => setCount(prev => prev + 1)
    }

  return (
    <Mycontext.Provider value={value}>
      {children}
    </Mycontext.Provider>
  );
};

const useMyContext = () => {
    return useContext(Mycontext);
}

export { useMyContext,MyContextProvider };
