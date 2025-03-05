import { useDispatch } from "react-redux";
import { setTargetUserId } from "../config/chatSlice";

export default function ChatList({ photoUrl, name, userId, setPhotoUrl, setUserName, selectedUser, setSelectedUser }) {

    const dispatch = useDispatch()
    return (
        <div className={`h-16 flex items-center transition-all duration-100 ease-in-out  rounded-lg p-1 mb-1 ${selectedUser === userId ? "bg-[#4a5078] " : "hover:bg-[#292d49]"}`}
            onClick={() => {
                dispatch(setTargetUserId(userId));
                setPhotoUrl(photoUrl);
                setUserName(name);
                setSelectedUser(userId)
            }}>
            <div className=''>
                <img src={photoUrl} alt="img" className='size-13 p-1 rounded-full' />
            </div>
            <p className='text-white p-3 ml-2 w-[80%] overflow-x-hidden font-semibold'>{name}</p>
        </div>
    )
}
