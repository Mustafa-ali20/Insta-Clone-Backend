import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register(username, fullName, password, email) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      fullName,
      password,
      email,
    });
    return response.data;
  } catch (err) {
    if (err.response?.status === 409) {
      throw new Error("User already exists");
    }
    throw err;
  }
}

export async function login(email, password) {
  try {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      // No need for withCredentials here - it's in the api instance!
    );
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      // ✅ Changed from 409 to 401
      throw new Error("Invalid credentials");
    }
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      // ✅ Changed from 409 to 401
      throw new Error("Not authenticated");
    }
    throw err;
  }
}
