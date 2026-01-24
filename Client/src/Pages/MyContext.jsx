import { createContext, useContext } from "react";

const Mycontext = createContext();

const MyContextProvider = ({children}) => {

  return (
    <Mycontext.Provider value={""}>
      {children}
    </Mycontext.Provider>
  );
};

const useMyContext = () => {
    return useContext(Mycontext);
}

export { useMyContext,MyContextProvider };
