import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email, password
      },
      {withCredentials: true}) // to save token in the cookies
      console.log('hii', res.data)
      dispatch(addUser(res.data))
      return navigate("/")
    } catch(err) {
      console.error(err)
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" value={email} className="input" onChange={(e) => setEmail(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          </fieldset>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
