import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react";
import {RedirectTorealUrl} from './Components/RedirectTorealUrl.jsx'
import { Home } from "./Pages/Home.jsx"
import { Login } from "./Auth/Login.jsx";
import { NotFound } from "./Auth/NotFound.jsx"; 
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/:shortCode" element={<RedirectTorealUrl/>} >
          </Route>
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
