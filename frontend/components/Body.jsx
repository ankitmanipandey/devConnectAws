import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../config/userSlice"
import { BASE_URL, BACKGROUND_IMAGE } from "../hardcoded/constants"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/profile/view`,
                { withCredentials: true })
            dispatch(addUser(res.data))
        }
        catch (err) {
            if (err.status === 401) {
                navigate("/")
            }
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div>
            <img src={BACKGROUND_IMAGE} alt="bg-image" className=" absolute -z-10 object-cover h-full w-full" />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Body
