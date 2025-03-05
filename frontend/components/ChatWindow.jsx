import React from 'react'
import EmptyChat from './EmptyChat'
import "/src/chatscroller/style.css"

export default function ChatWindow({ targetUserId, userName, photoUrl }) {
    return !targetUserId ? <EmptyChat />
        : (
            <>
                <div className='border-b-1 border-white h-[92%] md:h-[90%] overflow-y-auto scrollbar-hidden'>

                    <div className='h-[12%] border-b-1 border-white flex gap-3 sticky top-0'>
                        <div className='h-full rounded-full flex items-center p-4'>
                            <img src={photoUrl} alt="" className='rounded-full size-10 cursor-pointer' />
                        </div>
                        <div className='w-[90%] flex items-center'>
                            <p className='text-white  font-semibold p-1 cursor-pointer'>{userName}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-4 h-[88%] overflow-y-auto">

                        <div className="self-start inline-block bg-[#262d37] text-white px-4 py-2 rounded-2xl rounded-br-sm relative m-2">
                            <p>H! How a-re you?</p>
                            <span className="text-xs opacity-60 absolute bottom-[-18px] left-2">10:31 AM</span>
                        </div>

                        <div className="self-end inline-block bg-[#0084ff] text-white px-4 py-2 rounded-2xl rounded-br-sm relative m-1">
                            <p>I'm good! What about you?</p>
                            <span className="text-xs opacity-60 absolute bottom-[-18px] right-2">10:31 AM</span>
                        </div>
                    </div>

                </div>

                <div className='h-[8%] md:h-[10%] flex gap-4 items-center bg-[#081526]'>
                    <form className='w-[90%] h-full ' onSubmit={(e) => e.preventDefault()}>
                        <input type="text"
                            className='w-full h-full outline-none text-xl md:text-xl p-4 text-white'
                            placeholder='Write a message...'
                        />
                    </form>
                    <div className='bg-pink-600 text-white h-10 flex justify-center items-center rounded-xl'>
                        <button type="button" className='px-4 py-2 cursor-pointer' > Send</button>
                    </div>

                </div >
            </>
        )
}
