import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../config/userSlice"
import { setIsEmailVerified } from '../config/switchSlice'
import { BACKGROUND_IMAGE, BACKEND_URL } from "../hardcoded/constants"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/profile/view`,
                                        {withCredentials:true})
            dispatch(addUser(res.data))
        }
        catch (err) {
            const params = new URLSearchParams(location.search)
            const token = params.get("token")
            if (err?.response?.status === 401 && location.pathname === "/forgot/password") {
                navigate(token ? `/forgot/password?token=${token}` : "/forgot/password")
                dispatch(setIsEmailVerified(true))
            }
            else {
                navigate("/")
            }
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
