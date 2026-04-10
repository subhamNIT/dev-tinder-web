import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>Hello</div>}></Route>
        </Routes>
      </BrowserRouter>
      <Navbar />
    </>
  )
}

export default App
