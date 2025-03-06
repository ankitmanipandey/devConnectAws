import React, { useEffect, useRef, useState } from 'react'
import EmptyChat from './EmptyChat'
import "/src/chatscroller/style.css"
import { createSocketConnection } from '../hardcoded/socket.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BACKEND_URL } from '../hardcoded/constants.jsx'

export default function ChatWindow({ user }) {
    const loggedInUserId = user?._id
    const { targetUserId } = useSelector((store) => store.chat)
    const [message, setMessage] = useState("")
    const [chatMessages, setChatMessages] = useState([])
    const { targetPhotoUrl } = useSelector(store => store.chat)
    const { targetUserName } = useSelector(store => store.chat)
    const chatEndRef = useRef(null)

    const getChatData = async () => {
        const res = await axios(`${BACKEND_URL}/get/chat/data/${loggedInUserId}/${targetUserId}`, { withCredentials: true })
        if (!res?.data?.success) {
            setChatMessages([])
        }
        setChatMessages(res?.data?.chatData)
    }

    useEffect(() => {
        const socket = createSocketConnection()

        socket.emit("joinChat", { loggedInUserId, targetUserId })

        socket.on('messageReceived', ({ text }) => {
            const { message, senderId, time } = text
            if (!chatMessages)
                setChatMessages((prev) => [...prev, { message, senderId, time }])
            getChatData()
        })

        return (() => {
            socket.disconnect()
        })
    }, [loggedInUserId, targetUserId])


    const sendMessage = () => {
        if (!message.trim()) return


        const socket = createSocketConnection()

        socket.emit('sendMessage', {
            loggedInUserId,
            targetUserId,
            text: {
                senderId: loggedInUserId,
                message: message,
                time: new Date(Date.now())
            }
        })
        getChatData()
        setMessage("")
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            sendMessage()
    }

    useEffect(() => {
        if (!loggedInUserId || !targetUserId) return
        getChatData()
    }, [targetUserId])


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages]);

    return !targetUserId ? <EmptyChat />
        : (
            <>
                <div className='border-b-1 border-white h-[92%] md:h-[90%] overflow-y-auto scrollbar-hidden'>

                    <div className='h-[12%] border-b-1 border-white flex gap-1 sticky top-0 bg-gradient-to-r from-[#00092d] opacity-70'>
                        <div className='h-full rounded-full flex items-center p-4'>
                            <img src={targetPhotoUrl} alt="" className='rounded-full size-10 cursor-pointer' />
                        </div>
                        <div className='w-[90%] flex items-center'>
                            <p className='text-white  font-semibold p-1 cursor-pointer text-2xl'>{targetUserName}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-4 h-[88%] overflow-y-auto">
                        {chatMessages?.map((msg, index) => (
                            <div
                                key={index}
                                className={`inline-block px-4 py-2 rounded-2xl relative m-2 ${msg?.chatMessage?.senderId === loggedInUserId
                                    ? "self-end bg-[#0084ff] text-white rounded-br-sm"
                                    : "self-start bg-[#262d37] text-white rounded-bl-sm"
                                    }`}
                            >
                                <p>{msg?.chatMessage?.message}</p>
                                <span className="text-xs opacity-60  bottom-[-18px] right-0">
                                    {new Date(msg?.chatMessage?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                </div>

                <div className='h-[8%] md:h-[10%] flex gap-4 items-center bg-[#081526] bg-gradient-to-r from-[#00092d] opacity-70'>
                    <form className='w-[90%] h-full ' onSubmit={(e) => e.preventDefault()}>
                        <input type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-full h-full outline-none text-xl md:text-xl p-4 text-white'
                            placeholder='Write a message...'
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                    <div className='bg-pink-600 text-white h-10 flex justify-center items-center rounded-xl transition-all duration-150 ease-in-out hover:scale-105'>
                        <button type="button" className='px-4 py-2 cursor-pointer ' onClick={() => sendMessage()} > Send</button>
                    </div>

                </div >
            </>
        )
}
