import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(username, fullName, password, email) {
  try {
    const response = await axios.post(
      "/register",
      {
        username,
        fullName,
        password,
        email,
      },
      {
        withCredentials: true,
      },
    );
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
    const response = await axios.post(
      "/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    if (err.response?.status === 409) {
      throw new Error("Invalid user");
    }
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await axios.get("/get-me");
    return response.data;
  } catch (err) {
     if (err.response?.status === 409) {
      throw new Error("Invalid user");
    }
    throw err;
  }
}
