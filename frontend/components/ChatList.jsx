export default function ChatList({ photoUrl, name, userId, setTargetUserId, setPhotoUrl, setUserName }) {
    return (
        <div className='h-16 flex items-center transition-all duration-100 ease-in-out hover:bg-[#292d49] rounded-lg p-1' onClick={() => { setTargetUserId(userId); setPhotoUrl(photoUrl); setUserName(name) }}>
            <div className=''>
                <img src={photoUrl} alt="img" className='size-13 p-1 rounded-full' />
            </div>
            <p className='text-white p-3 ml-2 w-[80%] overflow-x-hidden font-semibold'>{name}</p>
        </div>
    )
}
