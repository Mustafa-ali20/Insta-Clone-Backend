import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./UI/Login";
import Register from "./UI/Register";
import Profile from "./UI/Profile";
import { AuthProvider } from "./components/auth/auth.context";
import Feed from "./components/posts/pages/Feed";
import { PostContextProvider } from "./components/posts/posts.context";
import { UIProvider, useUI } from "./components/posts/ui.context";  // ✅
import CreatePost from "./components/posts/pages/CreatePost";  // ✅ adjust path as needed

// ✅ Separate inner component so it can consume UIProvider
const AppContent = () => {
  const { showCreate, closeCreate } = useUI();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>

      {/* ✅ Modal lives here — works on every page */}
      {showCreate && (
        <CreatePost onClose={closeCreate} />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <UIProvider>       {/* ✅ wrap everything */}
          <AppContent />
        </UIProvider>
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;