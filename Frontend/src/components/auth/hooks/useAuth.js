import { useContext } from "react";
import { AuthContext } from "../auth.context"; 

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// the four things i have passed in provider context are user , loading, handleLogin, handleRegister which are now recieved here
//so where ever the this hook will be used i will have the access to all 4 of these
