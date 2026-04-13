import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Body } from "./components/Body"
import { Connections } from "./components/Connections"
import { Feed } from "./components/Feed"
import { Login } from "./components/Login"
import { Profile } from "./components/Profile"
import { store } from "./utils/store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/connections" element={<Connections />}></Route>
            <Route path="/requests" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
