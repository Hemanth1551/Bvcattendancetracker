// src/api/auth.js
import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/studentAttendance",
// });
const API = axios.create({
  baseURL: "https:////bvcattendancetracker-esf2dqdvehgrh6a4.centralindia-01.azurewebsites.net/api/studentAttendance", // ✅ Change this to your live backend
});


export const AddStudentAttendance = async (formData) => {
  return await API.post("/addStudentattendance", formData);
};

