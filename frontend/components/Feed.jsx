import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../config/feedSlice'
import { toast } from "react-toastify"
import { setLoader } from '../config/switchSlice'
import Loader from './Loader'
import { BACKEND_URL } from '../hardcoded/constants'

export default function Feed() {
  const dispatch = useDispatch()
  const feedUser = useSelector(store => store?.feed)
  const loader = useSelector(store => store?.switch?.loader)

  const handleFeed = async () => {
    dispatch(setLoader(true))
    try {
      const res = await axios.get(`${BACKEND_URL}/user/feed`, { withCredentials: true })
      dispatch(addFeed(res?.data))
      dispatch(setLoader(false))
    }
    catch (err) {
      dispatch(setLoader(false))
      toast.error("Feed not available")
    }

  }
  useEffect(() => {
    handleFeed()
  }, [])

  if (!feedUser || feedUser.length === 0)
    return (
      <p className='text-2xl md:text-4xl text-white text-center' >
        No Feed Available
      </p>)


  return loader ? <Loader /> : (
    <div className='w-full min-h-screen fixed flex justify-center items-center '>
      {feedUser.map((user) => { return < UserCard userId={user?._id} key={user?._id} userName={user?.name} about={user?.about} photoUrl={user?.photoUrl || "https://t4.ftcdn.net/jpg/01/19/32/93/240_F_119329387_sUTbUdeyhk0nuhNw5WaFvOyQFmxeppjX.jpg"} /> })}
    </div>
  )
}
