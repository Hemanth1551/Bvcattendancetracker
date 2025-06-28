// components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const student = JSON.parse(localStorage.getItem("student"));

  if (!student) {
    return <Navigate to="/signin" />;
  }

  return children;
}
