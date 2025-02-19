import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedPage from "./components/ProtectedPage"
import Profile from "./pages/Profile"
import { useSelector } from "react-redux"
import Spinner from "./components/Spinner"
function App() {
    const { loading, buttonLoading } = useSelector((state) => state.loaders);
  return (
    <div>
     
      {loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
