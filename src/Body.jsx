import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export function Body() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}
