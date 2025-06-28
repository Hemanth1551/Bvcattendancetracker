// Imports
import { useState, useEffect } from 'react';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button.jsx";
import { AddStudentAttendance } from "../../../api/studentAttendance.js";
import Alert from "../../../components/ui/alert/Alert";
import axios from "axios"

export default function DefaultInputs() {

  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }
  const stuId = student.id;

  const [attendanceData, setattendanceData] = useState({
    studentId: stuId,
    date: new Date().toISOString().split('T')[0],
    presentedClasses: "",
    missingClasses: "",
    status: "",
    markedTime: new Date().toISOString(),
  });

  // ✅ Add alert state
  const [alert, setAlert] = useState(null);

  // Automatically set status
  useEffect(() => {
  setattendanceData(prevData => {
    const value = parseInt(prevData.presentedClasses, 10);
    const status = value >= 1 && value <= 6 ? "present" : "absent";
    return {
      ...prevData,
      status,
    };
  });
}, [attendanceData.presentedClasses]);

    const [todayData, settodayData] = useState([]);
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/day/todayworkingday`)
        .then((res) => {
          settodayData(res.data);
        })
        .catch((err) => {
          console.log("fetch attendance", err);
        });
    }, []);



  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setattendanceData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(todayData.length > 0){
        await AddStudentAttendance(attendanceData);
        setAlert({
          variant: "success",
          title: "Attendance Marked",
          message: "Attendance has been recorded successfully.",
        });
      }else{
        setAlert({
          variant: "error",
          title: "Admin has not posted today's result",
          message: "Failed to add attendance.",
        });
      }
      
    } catch (err) {
      console.error(err);
      setAlert({
        variant: "error",
        title: "Error",
        message: `${err.response?.data?.message || "Failed to add attendance"}`,
      });
    }
  };

  return (
    <ComponentCard title="Enter Your Attendance">
      {/* ✅ Show alert if exists */}
      {alert && (
        <div className="mb-4">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="presentedClasses">Enter Your Presented Classes</Label>
            <Input
              type="number"
              id="presentedClasses"
              name="presentedClasses"
              min={0}
              max={6}
              onChange={handleChange}
              placeholder="0-6"
              value={attendanceData.presentedClasses}
            />
          </div>
          <div>
            <Label htmlFor="missingClasses">Enter Your Missing Classes</Label>
            <Input
              type="number"
              id="missingClasses"
              name="missingClasses"
              min={0}
              max={6}
              onChange={handleChange}
              placeholder="0-6"
              value={attendanceData.missingClasses}
            />
          </div>
          <div>
            <Button className="w-full" size="sm">
              Post Attendance
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
