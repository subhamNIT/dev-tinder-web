import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        email, password, firstName, lastName
      },
      {withCredentials: true})
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    } catch(err) {
      throw new Error(err.message)
    }
  }

  const handleLogin = async() => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email, password
      },
      {withCredentials: true}) // to save token in the cookies
      dispatch(addUser(res.data))
      return navigate("/")
    } catch(err) {
      setError(err.response.data)
      console.error(err)
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? 'Login': "SignUp"}</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text" value={email} className="input" onChange={(e) => setEmail(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          </fieldset>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" />
              </fieldset></>
          )}
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
          </div>
          <p className="m-auto cursor-pointer" onClick={() => setIsLoginForm(value => !value)}>
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"
            }
          </p>
        </div>
      </div>
    </div>
  )
}
