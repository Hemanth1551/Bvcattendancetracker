// DefaultInputs.jsx
import { useState, useEffect } from 'react';
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button.jsx";
import { AddStudentAttendance } from "../../../api/studentAttendance.js";
import Alert from "../../../components/ui/alert/Alert";
import axios from "axios";
import { isMobile, isDesktop, isTablet } from "react-device-detect";

// UUID fallback
function generateUUID() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function DefaultInputs() {
  const [deviceId, setDeviceId] = useState("");
  const [inCollege, setInCollege] = useState(null);
  const [distance, setDistance] = useState(null);
  const [alert, setAlert] = useState(null);
  const [todayData, setTodayData] = useState([]);

  const COLLEGE_COORDS = { lat: 16.5558913, lng: 81.9790896 };
  const MAX_DISTANCE_KM = 1;

  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  const stuId = student.id;

  const [attendanceData, setAttendanceData] = useState({
    studentId: stuId,
    date: new Date().toISOString().split('T')[0],
    presentedClasses: "",
    missingClasses: "",
    status: "",
    markedTime: new Date().toISOString(),
    inCollege: "",
    deviceId: "",
  });

  // Initialize device ID and confirm with user
  useEffect(() => {
    let did = localStorage.getItem("deviceId");
    if (!did) {
      did = generateUUID();
      localStorage.setItem("deviceId", did);
    }
    setDeviceId(did);

    // Check for browser/device type
    const ua = navigator.userAgent;
    const isChrome =
      /Chrome/.test(ua) &&
      /Google Inc/.test(navigator.vendor) &&
      !/Edg/.test(ua) &&
      !/OPR/.test(ua);

    if (!isChrome) {
      setAlert({
        variant: "error",
        title: "Attendance Failed",
        message: "Please use your mobile device with Google Chrome browser.",
      });
    }

    // Only attempt to PUT deviceId if student has no deviceId
    if (!student.deviceId) {
      if((isMobile || isDesktop) && !isTablet){
          const confirm = window.confirm("Is this your personal daily attendance mobile?");
        if (confirm) {
          axios.put(`http://10.64.36.116:5000/api/auth/deviceIdcheck`, {
            email: student.email,
            deviceId: did
          })
            .then(res => console.log("✅ deviceId updated:", res.data))
            .catch(err => console.error("❌ deviceId update failed:", err));
        } else {
          setAlert({
            variant: "error",
            title: "Device Not Confirmed",
            message: "Please use your own mobile to mark attendance.",
          });
        }
      }
    }

  }, []);

  // Sync deviceId into attendanceData
  useEffect(() => {
    if (deviceId) {
      setAttendanceData(prev => ({
        ...prev,
        deviceId: deviceId,
      }));
    }
  }, [deviceId]);

  // Calculate distance between two coordinates
  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user location and update inCollege
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
      setAlert({
        variant: "error",
        title: "Geolocation Unsupported",
        message: "Your browser does not support geolocation.",
      });
    }
  }, []);

  // Sync inCollege into attendanceData
  useEffect(() => {
    setAttendanceData(prev => ({
      ...prev,
      inCollege: inCollege === null ? "" : inCollege
    }));
  }, [inCollege]);

  // Auto calculate status
  useEffect(() => {
    setAttendanceData(prev => {
      const value = parseInt(prev.presentedClasses, 10);
      const status = value >= 1 && value <= 6 ? "present" : "absent";
      return {
        ...prev,
        status
      };
    });
  }, [attendanceData.presentedClasses]);

  // Fetch today's working day
  useEffect(() => {
    axios.get(`http://10.64.36.116:5000/api/day/todayworkingday`)
      .then((res) => setTodayData(res.data))
      .catch((err) => console.log("Error fetching working day:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (todayData.length === 0) {
        setAlert({
          variant: "error",
          title: "Attendance Failed",
          message: "Admin has not posted today's working day.",
        });
        return;
      }

      if (!isMobile || isTablet) {
        setAlert({
          variant: "error",
          title: "Invalid Device",
          message: "Please use your mobile phone (not a desktop/tablet).",
        });
        return;
      }

      if (inCollege === null) {
        setAlert({
          variant: "error",
          title: "Location Pending",
          message: "Please wait until your GPS location is determined.",
        });
        return;
      }

      await AddStudentAttendance(attendanceData);

      setAlert({
        variant: "success",
        title: "Attendance Marked",
        message: "Your attendance has been posted successfully.",
      });
    } catch (err) {
      console.error("Attendance error:", err);
      setAlert({
        variant: "error",
        title: "Error Posting Attendance",
        message: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <ComponentCard title="Enter Your Attendance">
      {alert && (
        <div className="mb-4">
          <Alert variant={alert.variant} title={alert.title} message={alert.message} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {inCollege === null ? (
            <p>📍 Checking your GPS location...</p>
          ) : (
            <p>
              <strong>📌 College Status:</strong> {inCollege ? `✅ Inside (ID: ${deviceId})` : `❌ Outside (ID: ${deviceId})`}<br />
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
            <Button className="w-full" size="sm" disabled={inCollege === null}>
              {inCollege === null ? "📍 Locating..." : "Post Attendance"}
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
