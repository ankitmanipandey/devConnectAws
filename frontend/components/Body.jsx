import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../config/userSlice"

const Body = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
            const res = await axios.get("http://localhost:1111/profile/view",
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
            <img src={`${(location.pathname.toString() === ("/login")) || (location.pathname.toString() === ("/")) ? "/loginpage_bg.jpg" : "/loginpage_bg.jpg"}`} alt="bg-image" className=" absolute -z-10 object-cover h-full w-full" />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Body
