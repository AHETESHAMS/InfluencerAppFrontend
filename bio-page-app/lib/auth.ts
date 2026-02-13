import api from "./api";

// ================= REGISTER =================
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/api/auth/register", data);
    localStorage.setItem("token", res.data.token);
    return res.data; // ✅ ADDED
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Register failed");
  }
};

// ================= LOGIN =================
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data; // ✅ ADDED
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Login failed");
  }
};

// ================= GOOGLE LOGIN (NEW) =================
export const googleLogin = async (data: {
  email: string;
  name?: string | null;
}) => {
  try {
    const res = await api.post("/api/auth/google", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Google login failed");
  }
};

// ================= LOGOUT (NEW) =================
export const logoutUser = () => {
  localStorage.removeItem("token");
};
