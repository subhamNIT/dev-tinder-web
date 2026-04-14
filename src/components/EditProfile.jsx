
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { UserCard } from "./UserCard"

export function EditProfile({user}) {
  const dispatch = useDispatch()
  const [firstName, setfFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [about, setAbout] = useState(user.about)
  const [gender, setGender] = useState(user.gender)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [age, setAge] = useState(user.age)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const saveProfile = async() => {
    setError("")
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName, lastName, gender, age, photoUrl, about
      },
      {
        withCredentials: true
      })
      dispatch(addUser(res.data.data))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 5000) 
    } catch(err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="flex justify-center gap-4 my-10 mx-10">
      <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" value={firstName} className="input" onChange={(e) => setfFirstName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" />
            </fieldset>
            {age && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
              </fieldset>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input" />
            </fieldset>
            {gender && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input" />
              </fieldset>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo Url</legend>
              <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input" />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user = {{firstName, lastName, photoUrl, age, gender, about}} hideButtons={true}/>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Saved Successfully</span>
        </div>
      </div>}
    </div>
  )
}
