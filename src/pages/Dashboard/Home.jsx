import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics"
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget"
import RecentOrders from "../../components/ecommerce/RecentOrders"
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {


  const [attendanceData, setAttendanceData] = useState([]);
  const [clgWorkingdaysCount, setClgWorkingdaysCount] = useState(0);
  const [loading, setLoading] = useState(true);

  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
    // console.log("data",storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  const stuId = student.id;



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/studentAttendance/student/${stuId}`)
      .then((res) => {
        setAttendanceData(res.data);
      })
      .catch((err) => {
        console.log("fetch dates", err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/day/alldays`)
      .then(res => {
        const workingDays = res.data.filter(item => item.action === "workingday");
        setClgWorkingdaysCount(workingDays.length);
      })
      .catch(err => {
        console.log("Error fetching working days:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log("Backend response:", attendanceData); // 👈 Check this


  const calendarShow = attendanceData.map((item) => ({
  date: new Date(item.date).toLocaleDateString("sv-SE"), // Format: yyyy-mm-dd
  action: item.status.toLowerCase(),
}));


  // Calculate totals safely with default values
  const totalPresentedClasses = attendanceData.reduce(
    (total, entry) => total + (entry.presentedClasses || 0),
    0
  );

  const totalDoutClasses = attendanceData.reduce(
    (douttotal, doutentry) => douttotal + (doutentry.missingClasses || 0),
    0
  );

  const netDoutClasses = Math.max(0, totalPresentedClasses - totalDoutClasses);

  // Calculate percentages safely
  const totalHours = clgWorkingdaysCount * 6;



  const finalAttendence = totalHours > 0 
    ? parseFloat(((totalPresentedClasses / totalHours) * 100).toFixed(2))
    : 0;
    
  const finalDoubtAttendence = totalHours > 0
    ? parseFloat(((netDoutClasses / totalHours) * 100).toFixed(2))
    : 0;

    // console.log(totalHours,finalAttendence, finalDoubtAttendence);

  if (loading) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />


      <div className="grid grid-cols-12 gap-4 md:gap-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics userAttendance={calendarShow} />

          <MonthlyTarget
            title="Main Attendance"
            percentage={finalAttendence}
            description="Tracks your attendance in regular classes."
            label="Main Attendance %"
          />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <MonthlyTarget
            title="Doubt Attendance"
            percentage={finalDoubtAttendence}
            description="Includes sessions not marked by faculty or extra classes."
            label="Doubt Attendance %"
          />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <div className="col-span-12 xl:col-span-7">
            <RecentOrders tableData={attendanceData} />
          </div>
        </div>
      </div>
    </>
  );
}
