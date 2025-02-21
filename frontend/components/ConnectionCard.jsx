import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateConnections } from '../config/connectionSlice'
import ConnectionDetailCard from './ConnectionDetailCard'
import { toast } from 'react-toastify'
import { setLoader } from '../config/switchSlice'
import Loader from './Loader'
import { BASE_URL } from '../hardcoded/constants'

export default function ConnectionCard({ connection }) {
    const dispatch = useDispatch()
    const loader = useSelector(store => store.switch.loader)
    const [isDetailCard, setIsDetailCard] = useState(false);

    const handleRemove = async () => {
        try {
            dispatch(setLoader(true))
            const res = await axios.delete(`${BASE_URL}/user/remove/connection/${connection?._id}`, { withCredentials: true })
            dispatch(updateConnections(connection?._id))
            dispatch(setLoader(false))
            toast.success("Connection removed successfully")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Connection can't be removed")
        }
    }
    return loader ? <Loader /> : (
        <>
            <div className='h-[50%] w-[80%] p-5 flex flex-col items-center gap-2 md:h-28 md:w-[70%] bg-[#00092d] opacity-95 rounded-lg  md:flex md:flex-row md:justify-between md:p-3 text-[#FEFFFE] md:items-center'>
                <img src={connection?.photoUrl} alt="" className='h-14 w-14 rounded-full m-1' />
                <p>{connection?.name}</p>
                <p>{connection?.skills}</p>
                <div className='flex gap-4 p-2 font-medium text-[#FEFFFE]'>
                    <button className='py-2 px-3 bg-blue-500 rounded-lg cursor-pointer' onClick={() => { setIsDetailCard(true) }}>Details</button>
                    <button className='py-2 px-3 bg-red-500 rounded-lg cursor-pointer' onClick={handleRemove}>Remove</button>
                </div>
            </div>
            {isDetailCard && <ConnectionDetailCard connection={connection} setIsDetailCard={setIsDetailCard} />}

        </>
    )
}
