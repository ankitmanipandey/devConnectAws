import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFeed } from '../config/feedSlice'
import { setLoader } from '../config/switchSlice'
import Loader from './Loader'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../hardcoded/constants'

export default function UserCard({ userName, about, photoUrl, userId }) {
    const dispatch = useDispatch()
    const { loader } = useSelector(store => store?.switch)
    const handleIgnore = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post(`${BACKEND_URL}/request/send/ignored/${userId}`, {}, { withCredentials: true })
            dispatch(updateFeed(userId))
            dispatch(setLoader(false))
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Cannot ignore this profile")
        }
    }
    const handleInterested = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post(`${BACKEND_URL}/request/send/interested/${userId}`, {}, { withCredentials: true })
            dispatch(updateFeed(userId))
            dispatch(setLoader(false))
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Cannot Send Request to this Profile")
        }
    }
    return loader ? <Loader /> : (
        <div className='h-100 w-62 fixed bg-[#00092d] top-30 rounded-lg flex flex-col'>
            <div className='h-[60%] rounded-lg items-center bg-transparent'>
                <img src={photoUrl} alt="user-photo" className='object-center h-full w-full rounded-t-lg' />
            </div>
            <div className='h-[50%] flex flex-col items-center gap-3 mt-2'>
                <p className='text-[#FEFFFE] font-medium text-xl'>{userName}</p>
                <p className='text-[#FEFFFE] text-sm font-medium'>{about}</p>
                <div className='flex justify-center gap-3 text-[#FEFFFE] mt-3 font-medium'>
                    <button className='py-2 px-2 bg-pink-500 rounded-lg cursor-pointer' onClick={handleIgnore}>Ignore</button>
                    <button className='py-2 px-2 bg-blue-500 rounded-lg cursor-pointer' onClick={handleInterested}>Interested</button>
                </div>
            </div>
        </div>
    )
}
