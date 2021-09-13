import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
const SocketContext = React.createContext()

const DEV_ENDPOINT = 'http://localhost:5000/';
const PROD_ENDPOINT = 'https://ar-messaging-app.herokuapp.com/';

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      PROD_ENDPOINT,
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}