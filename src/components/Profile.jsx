import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";

export function Profile() {
  const user = useSelector((store) => store.user)
  return user && (
    <div>
      <EditProfile user = {user}/>
    </div>
  )
}
