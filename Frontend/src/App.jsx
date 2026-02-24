import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./UI/Login";
import Register from "./UI/Register";
import Profile from "./UI/Profile";
import { AuthProvider } from "./components/auth/auth.context";
import Feed from "./components/posts/pages/Feed";
import { PostContextProvider } from "./components/posts/posts.context";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
