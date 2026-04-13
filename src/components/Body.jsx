import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Body() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)
  const fetchUser = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials:true
      })
      dispatch(addUser(res.data))
    } catch(err) {
      if(err.status === 401) {
        navigate("/login")
      }
      throw new Error('Error: ', err)
    }
  }
  useEffect(() => {
    if(!userData) {
      fetchUser()
    }
  }, [])
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}
