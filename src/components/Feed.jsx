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

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user = {feed[0]}/>
      </div>
    )
  )
}
