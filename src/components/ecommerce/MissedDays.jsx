// MissedAttendanceTable.jsx
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import axios from "axios";
import { AddStudentAttendance } from "../../api/studentAttendance";
import Alert from "../ui/alert/Alert";
import Input from "../../components/form/input/InputField";

export default function MissedAttendanceTable() {
  const [missedDays, setMissedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [alert, setAlert] = useState(null);
  const [inCollege, setInCollege] = useState(null);
  const [distance, setDistance] = useState(null);

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
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    let did = localStorage.getItem("deviceId");
    if (!did) {
      did = crypto.randomUUID();
      localStorage.setItem("deviceId", did);
    }
    setDeviceId(did);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/studentAttendance/student/merged/${stuId}`)
      .then((res) => {
        const absents = res.data.filter((item) => item.status === "absent");
        setMissedDays(absents.map((item) => item.date));
      })
      .catch((err) => {
        console.log("fetch merged attendance", err);
      });
  }, []);

  const [formData, setFormData] = useState({
    studentId: stuId,
    date: "",
    presentedClasses: "",
    missingClasses: "",
    status: "",
    markedTime: new Date().toISOString(),
    inCollege: "",
    deviceId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        presentedClasses: value === "present" ? 6 : 0,
        missingClasses: value === "absent" ? 0 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormOpen = (date) => {
    setSelectedDate(date);
    setFormVisible(true);
    setFormData({
      studentId: stuId,
      date: date,
      presentedClasses: 6,
      missingClasses: 0,
      status: "present",
      markedTime: new Date().toISOString(),
      deviceId: deviceId,
      inCollege: inCollege
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddStudentAttendance(formData);
      setAlert({
        variant: "success",
        title: "Attendance Marked",
        message: "Attendance has been recorded successfully.",
      });

      setMissedDays((prev) => prev.filter((d) => d !== selectedDate));
      setFormVisible(false);
      setSelectedDate(null);
    } catch (err) {
      console.error(err);
      setAlert({
        variant: "error",
        title: "Error",
        message: `${err.response?.data?.message || "Failed to add attendance"}`,
      });
    }
  };

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

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      inCollege: inCollege === null ? "" : inCollege
    }));
  }, [inCollege]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Missed Attendance</h3>
        <p>Total missing days count: {missedDays.length}</p>
      </div>

      {alert && (
        <div className="mb-4">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Date
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {missedDays.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-4 text-center text-green-600 dark:text-green-400">
                  🎉 You're up to date!
                </TableCell>
              </TableRow>
            ) : (
              missedDays.map((date) => (
                <TableRow key={date}>
                  <TableCell className="py-3 text-gray-800 text-theme-sm dark:text-gray-300">
                    {new Date(date).toDateString()}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge size="sm" color="error">Not Marked</Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <button
                      onClick={() => handleFormOpen(date)}
                      className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Post Attendance
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-2">
            Mark Attendance for {new Date(selectedDate).toDateString()}
          </h4>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-800 dark:text-white"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Presented Classes</label>
            <Input
              type="number"
              id="presentedClasses"
              name="presentedClasses"
              min={0}
              max={6}
              onChange={handleChange}
              placeholder="0-6"
              value={formData.presentedClasses}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Missing Classes</label>
            <Input
              type="number"
              id="missingClasses"
              name="missingClasses"
              min={0}
              max={6}
              onChange={handleChange}
              placeholder="0-6"
              value={formData.missingClasses}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Submit Attendance
          </button>
        </form>
      )}
    </div>
  );
}
