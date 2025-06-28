// // src/api/auth.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/auth",
// });

// export const registerStudent = async (formData) => {
//   return await API.post("/register", formData);
// };

// export const loginStudent = async (formData) => {
//   return await API.post("/login", formData);
// };

// export const passwordReset = async (formData) => {
//   return await API.put("/passwordChange", formData);
// };

// export const passwordResetByEmail = async (formData) => {
//   return await API.put("/passwordChangeByEmail", formData);
// };

// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://bvcattendancetracker-esf2dqdvehgrh6a4.centralindia-01.azurewebsites.net/api/auth", // ✅ Change this to your live backend
});

export const registerStudent = async (formData) => {
  return await API.post("/register", formData);
};

export const loginStudent = async (formData) => {
  return await API.post("/login", formData);
};

export const passwordReset = async (formData) => {
  return await API.put("/passwordChange", formData);
};

export const passwordResetByEmail = async (formData) => {
  return await API.put("/passwordChangeByEmail", formData);
};

export const passwordChangeByEmailConfig = async (formData) => {
  return await API.put("/passwordChangeByEmailConfig", formData);
};
