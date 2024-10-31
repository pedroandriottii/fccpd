import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import ProtectedLayout from "./layouts/protected"
import Todo from "./pages/todo"
import Home from "./pages"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/todo" element={<Todo />} />
      </Route>
    </Routes>
  )
}

export default App
