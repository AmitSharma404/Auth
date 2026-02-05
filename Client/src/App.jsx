import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react";
const { RedirectTorealUrl } = React.lazy(() => import("./Components/redirectTorealUrl.jsx"));
import { Home } from "./Pages/Home.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/:shortCode" element={<RedirectTorealUrl/>} >
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
