import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionsSlice"
import { BASE_URL } from "../utils/constants"

export function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector((store) => store.connections)
  const fetchConnections = async() => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      })
      dispatch(addConnections(res.data.data))
    } catch(err) {
      throw new Error(err.response.data)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])
  if(!connections) return
  if(connections.length === 0) {
    return (
      <h1>No connectiond found</h1>
    )
  }
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-4xl">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, age, photoUrl, gender, about} = connection
        return (
          <div key={_id} className="flex my-4 p-4 rounded bg-base-200 w-1/2 mx-auto">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl}/>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
