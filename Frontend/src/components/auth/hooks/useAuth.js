import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { getMe, login, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (email, password) => {
    setLoading(true); // this will keep the loading state true until the data is recevied
    try {
      const response = await login(email, password);
      setUser(response.user);
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false); // then the state will go false
    }
  };

  const handleRegister = async (username, fullName, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, fullName, email, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProfile = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      console.error("Get profile error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleGetProfile,
  };
};

// the four things i have passed in provider context are user , loading, handleLogin, handleRegister which are now recieved here
//so where ever the this hook will be used i will have the access to all 4 of these
