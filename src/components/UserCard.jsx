import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { removeFeed } from "../utils/feedSlice"

export function UserCard({user, hideButtons}) {
  console.log('heyyy user', user)
  const {_id, firstName, lastName, age, photoUrl, gender, about} = user
  console.log('heyyy', user)
  const dispatch = useDispatch()

  const handleSendRequest = async(status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {withCredentials: true}
      )
      dispatch(removeFeed(userId))
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        {!hideButtons && (
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
          </div>
        )}
      </div>
    </div>
  )
}
