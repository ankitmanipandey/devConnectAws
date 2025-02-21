import Body from "../components/Body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from "../components/Profile"
import Requests from "../components/Requests"
import Connections from "../components/Connections"
import Messages from "../components/Messages"
import Feed from "../components/Feed"
import HeaderElement from "../components/HeaderElement"
import Login from "../components/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<HeaderElement />} />
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/requests" element={<Requests />}></Route>
          <Route path="/connections" element={<Connections />}></Route>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
