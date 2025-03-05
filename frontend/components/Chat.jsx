import { useDispatch, useSelector } from "react-redux"
import "/src/chatscroller/style.css"
import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"
import { BACKEND_URL } from "../hardcoded/constants"
import { addConnections } from "../config/connectionSlice"
import { setLoader } from "../config/switchSlice"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Messages() {
  const connections = useSelector(store => store.connection)
  const [targetUserId, setTargetUserId] = useState(null)
  const [userName, setUserName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const dispatch = useDispatch()
  const fetchConnections = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.get(`${BACKEND_URL}/user/connections`, { withCredentials: true });
      dispatch(addConnections(res?.data?.finalData));
      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      toast.error("Could not get connections ")
    }
  };

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return
  return (
    <div className='h-full flex overflow-hidden bg-gradient-to-b from-black opacity-70'>
      <div className='h-full w-[25%] border-r border-white cursor-pointer p-1 bg-[#081526] overflow-y-auto scrollbar-hidden'>
        {connections.map((connection) => { return <ChatList key={connection._id} userId={connection._id} setTargetUserId={setTargetUserId} photoUrl={connection.photoUrl} name={connection.name} setPhotoUrl={setPhotoUrl} setUserName={setUserName} /> })}
      </div>

      <div className='h-full w-[75%] border-r-1 overflow-auto'>
        <ChatWindow targetUserId={targetUserId} photoUrl={photoUrl} userName={userName} />
      </div>
    </div >
  )
}


