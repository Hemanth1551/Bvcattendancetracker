// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/day",
});

export const addDay = async (formData) => {
  return await API.post("/addday", formData);
};
export const getDays = async (formData) => {
  return await API.get("/alldays", formData);
};
export const getsingleDays = async (formData) => {
  return await API.get("/getSingleDay", {
    params: formData, 
  });
};