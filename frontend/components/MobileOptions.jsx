import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../config/userSlice";
import axios from "axios";
import { setLoader, toggleProfileEdit } from "../config/switchSlice";
import Loader from "./Loader";
import { toast } from "react-toastify"

export default function MobileOptions() {
    const dispatch = useDispatch()
    const { loader } = useSelector(store => store.switch)
    const { isMobileOptions } = useSelector(store => store.switch)
    const handleSignOut = async () => {
        try {
            dispatch(setLoader(true))
            await axios.post("http://localhost:1111/logout", {}, { withCredentials: true })
            dispatch(removeUser())
            dispatch(setLoader(false))
            toast.success("Sign Out Successfull")
        }
        catch (err) {
            dispatch(setLoader(false))
            toast.error("Error in sign out !!")
        }
    }
    return loader ? <Loader /> : (
        <div className={`fixed h-60 w-32 p-2 z-50 rounded-l right-0 top-14 bg-[#00092d] transition-all duration-200 ease-in-out ${isMobileOptions ? "translate-x-0" : "translate-x-full"} `}>
            <Link to={"/feed"}><li className="list-none mb-1 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black">Feed</li></Link>
            <Link to={"/requests"}><li className="list-none mb-1 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Requests</li></Link>
            <Link to={"/connections"}><li className="list-none mb-1 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Connections</li></Link>
            <Link to={"/messages"}><li className="list-none mb-1 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black ">Messages</li></Link>
            <Link to={"/profile"}><li className="list-none mb-1 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black " onClick={() => dispatch(toggleProfileEdit(true))}>Profile</li></Link>
            <Link to={"/login"}><li className="list-none mb-1 text-[#FEFFFE] cursor-pointer border-1 border-transparent transition-all duration-200 ease-in-out px-2 py-1 rounded-xl hover:bg-[#FEFFFE] hover:text-black " onClick={handleSignOut}>SignOut</li></Link>
        </div>
    )
}
