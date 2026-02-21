import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./UI/Login";
import Register from "./UI/Register";
import Profile from "./UI/Profile";
import { AuthProvider } from "./components/auth/auth.context"; 

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
