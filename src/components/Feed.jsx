import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/feedSlice"
import { UserCard } from "./UserCard"

export function Feed() {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  useEffect(() => {
    if (feed) return

    const fetchFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        })
        dispatch(addFeed(res.data))
      } catch (err) {
        console.error("Error fetching feed", err)
      }
    }

    fetchFeed()
  }, [feed, dispatch])

  if(!feed) return
  if(feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10">No users available to connect</h1>
    )
  }
  return (
    feed && (
      <div className="flex flex-col gap-4 justify-center items-center my-10">
        {feed.map((f) => {
          return  <UserCard user = {f} hideButtons={false}/>
        })}
      </div>
    )
  )
}
