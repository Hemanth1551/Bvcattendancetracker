// Imports
import { useState, useEffect } from 'react';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button.jsx";
import { AddStudentAttendance } from "../../../api/studentAttendance.js";
import Alert from "../../../components/ui/alert/Alert";
import axios from "axios"
import { isMobile, isDesktop, isTablet } from "react-device-detect";


function generateUUID() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function DefaultInputs() {

  const [deviceId, setDeviceId] = useState("");

  const [inCollege, setInCollege] = useState(null);
  const [distance, setDistance] = useState(null);

  const COLLEGE_COORDS = {
     lat: 16.5558913,
     lng: 81.9790896

  };

  const MAX_DISTANCE_KM = 1;

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
    deviceId: ""
  });

  useEffect(() => {
    let did = localStorage.getItem("deviceId");
    if (!did) {
      did = generateUUID();
      localStorage.setItem("deviceId", did);
    }
    setDeviceId(did);
  }, []);

  useEffect(() => {
    if (deviceId) {
      const updated = { ...up, deviceId: deviceId };
      setup(updated);
      myFunctionAfterDevice(updated);
    }
  }, [deviceId]);


  function myFunctionAfterDevice(updatedUp) {
    console.log("up",updatedUp);
    if (!student.deviceId) {
      if (isMobile && !isTablet && !isDesktop ) {
        const deviceIdConform = window.confirm("This is your own daily posting attendance Mobile?");
        if (deviceIdConform) {
          axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/deviceIdcheck`, updatedUp)
            .then((res) => console.log("deviceId update success:", res.data))
            .catch((err) => console.log("deviceId update failed:", err));
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
    deviceId: "",
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
        deviceId: deviceId
      };
    });
  }, [attendanceData.presentedClasses, deviceId]);

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
      if (todayData.length > 0) {
        if ((isMobile || isDesktop) && !isTablet) {
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
          {inCollege === null && <p>📍 Checking your GPS location...</p>}
          {inCollege !== null && (
            <p>
              <strong>📌 College Status:</strong> {inCollege ? `✅ Inside college area` : `❌ Outside college area`}<br />
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
