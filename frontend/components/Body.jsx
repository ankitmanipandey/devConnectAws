import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../config/userSlice"
import { BACKGROUND_IMAGE, BASE_URL } from "../hardcoded/constants"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}`,
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
