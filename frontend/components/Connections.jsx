import React, { useEffect } from 'react'
import ConnectionCard from './ConnectionCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../config/connectionSlice'
import { setLoader } from '../config/switchSlice'
import { toast } from "react-toastify"
import Loader from './Loader'
import { BASE_URL } from '../hardcoded/constants'

export default function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connection)
  const loader = useSelector(store => store.switch.loader)
  const fetchConnections = async () => {
    try {
      dispatch(setLoader(true))
      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
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

  return loader ? <Loader /> : (
    <div className='w-full min-h-screen fixed flex flex-col mt-10 items-center gap-3'>
      {connections.map((connection) => <ConnectionCard key={connection._id} connection={connection} />)}
    </div>
  )
}
