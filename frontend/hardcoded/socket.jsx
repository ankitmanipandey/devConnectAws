import io from 'socket.io-client'
import { SOCKET_URL } from './constants'

export const createSocketConnection = () => {
    return io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        withCredentials: true
        
    })
}