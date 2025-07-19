// Imports
import { useState, useEffect } from 'react';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button.jsx";
import { AddStudentAttendance } from "../../../api/studentAttendance.js";
import Alert from "../../../components/ui/alert/Alert";
import axios from "axios";
import { isMobile, isDesktop, isTablet } from "react-device-detect";

export default function DefaultInputs() {
  const [ip, setIp] = useState('');
  const [inCollege, setInCollege] = useState(null);
  const [distance, setDistance] = useState(null);

  const COLLEGE_COORDS = {
     lat: 16.5558913,
     lng: 81.9790896

  };

  const MAX_DISTANCE_KM = 1; // You can change to 1.5 if it's too strict

  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  const stuId = student.id;

  const [up, setup] = useState({
    email: student.email,
    ipaddress: ""
  });

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(err => console.error("IP fetch error:", err));
  }, []);

  useEffect(() => {
    if (ip) {
      const updated = { ...up, ipaddress: ip };
      setup(updated);
      myFunctionAfterIP(updated);
    }
  }, [ip]);

  function myFunctionAfterIP(updatedUp) {
    if (!student.ipaddress) {
      console.log("ip not set");
      if ((isMobile || isTablet) && !isDesktop) {
        const ipconform = window.confirm("This is your own daily posting attendance Mobile?");
        if (ipconform) {
          axios
            .put(`http://localhost:5000/api/auth/ip`, updatedUp)
            .then((res) => {
              console.log("IP update success:", res.data);
            })
            .catch((err) => {
              console.log("IP update failed:", err);
            });
        } else {
          setAlert({
            variant: "error",
            title: "Your device information is needed.",
            message: "Please prefer your own mobile device",
          });
        }
      } else {
        setAlert({
          variant: "error",
          title: "Attendance posting Failed",
          message: "Please prefer your own mobile device",
        });
      }
    } else {
      console.log("ip already set in student");
    }
  }

  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          const dist = getDistanceKm(latitude, longitude, COLLEGE_COORDS.lat, COLLEGE_COORDS.lng);
          console.log("Your location:", latitude, longitude);
          console.log("College location:", COLLEGE_COORDS.lat, COLLEGE_COORDS.lng);
          console.log("Distance to college:", dist.toFixed(2), "km");
          setDistance(dist);
          setInCollege(dist <= MAX_DISTANCE_KM);
        },
        err => {
          console.error("Location error:", err);
          setInCollege(false);
        }
      );
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  const [attendanceData, setattendanceData] = useState({
    studentId: stuId,
    date: new Date().toISOString().split('T')[0],
    presentedClasses: "",
    missingClasses: "",
    status: "",
    markedTime: new Date().toISOString(),
    inCollege: inCollege,
    ipaddress: "",
  });

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setattendanceData(prevData => {
      const value = parseInt(prevData.presentedClasses, 10);
      const status = value >= 1 && value <= 6 ? "present" : "absent";
      return {
        ...prevData,
        status,
        ipaddress: ip
      };
    });
  }, [attendanceData.presentedClasses, ip]);

  const [todayData, settodayData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://10.64.36.116:5000/api/day/todayworkingday`)
      .then((res) => {
        settodayData(res.data);
      })
      .catch((err) => {
        console.log("fetch attendance", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setattendanceData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (todayData.length > 0) {
        if ((isMobile || isTablet) && !isDesktop) {
          await AddStudentAttendance(attendanceData);
          setAlert({
            variant: "success",
            title: "Attendance Marked",
            message: "Attendance has been recorded successfully.",
          });
        } else {
          setAlert({
            variant: "error",
            title: "Attendance posting Failed!",
            message: "Please prefer your own mobile device, not Desktop or Laptop.",
          });
        }
      } else {
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
        title: "Attendance not posted",
        message: `${err.response?.data?.message || "Failed to add attendance"}`,
      });
    }
  };

  return (
    <ComponentCard title="Enter Your Attendance">
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
          {inCollege === null && <p>📍 Checking your GPS location...</p>}
          {inCollege !== null && (
            <p>
              <strong>📌 College Status:</strong> {inCollege ? `✅ Inside college area (IP: ${ip})` : `❌ Outside college area (IP: ${ip})`}
              <br />
              <strong>🧭 Distance:</strong> {distance?.toFixed(2)} km
            </p>
          )}
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
