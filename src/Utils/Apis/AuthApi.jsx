import axios from "@/Utils/AxiosInstance";

export const register = async (newUser) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const exists = users.find((u) => u.email === newUser.email);
  if (exists) {
    throw new Error("Email sudah terdaftar!");
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return newUser;
};

export const login = async (email, password) => {
  const res = await axios.get("/user", { params: { email } });
  const user = res.data[0];

  if (!user) throw new Error("Email tidak ditemukan");
  if (user.password !== password) throw new Error("Password salah");

  return user;
};
