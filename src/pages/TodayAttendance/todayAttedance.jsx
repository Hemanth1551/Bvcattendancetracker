import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts() {


const [attedanceData, setAttedancData] = useState([]);
const [filerStudentAttedanceData, setFilteredStudentAttedance] = useState([]);
const [loading, setLoading] = useState(true);
const [stuData, setStuData] = useState([]);
const [formdata, setFormData] = useState({
  rollNumber: "",
  branch: "",
})
  const fetchAllAttedanceData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/studentAttendance/getAllstudenttodayattedances`);
      setAttedancData(res.data);
      setFilteredStudentAttedance(res.data); // default to show all
    } catch (err) {
      console.error("fetch dates", err);
    } finally {
      setLoading(false);
    }
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!formdata.rollNumber || !formdata.branch) {
  //     setFilteredStudentAttedance(attedanceData); // reset if date is empty
  //   } else {
  //     const filtered = attedanceData.filter((stu) => stu.rollNumber === formdata.rollNumber);
  //     setFilteredStudentAttedance(filtered);
  //   }
  // };


  const handleSubmit = (e) => {
  e.preventDefault();

  // Destructure for readability
  const { rollNumber, branch } = formdata;

  // If both fields are empty, reset filter
  if (!rollNumber && !branch) {
    setFilteredStudentAttedance(attedanceData);
    return;
  }

  // Filter logic
  const filtered = attedanceData.filter((stu) => {
    const matchRoll = rollNumber ? stu.rollNumber?.toLowerCase() === rollNumber.toLowerCase() : true;
    const matchBranch = branch ? stu.branch?.toLowerCase() === branch.toLowerCase() : true;
    return matchRoll && matchBranch;
  });

  setFilteredStudentAttedance(filtered);
};





useEffect(() => {
  fetchAllAttedanceData();
}, [])


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


const [showFilter, setshowFilter] = useState(false);

const toggleFilter = () => {
  setshowFilter(prev => !prev);
};




  return (
    <>
      <PageMeta
        title="BVC's Attendance System"
        description="Manage and view college day records."
      />
      <PageBreadcrumb pageTitle="Attendance" />
      <div className="space-y-5 sm:space-y-6">
          
        <ComponentCard title="Student Attendance">
          <div className="w-full px-4 sm:px-6 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full"
        >
          {/* Roll Number Input */}
          <Input
            type="text"
            name="rollNumber"
            id="rollNumber"
            placeholder="Enter Student Roll number"
            value={formdata.rollNumber}
            onChange={handleChange}
            className="w-full"
          />

          {/* Branch Dropdown */}
          <div className="relative w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between"
              onClick={toggleFilter}
            >
              {formdata.branch || "Select Branch"}
              <span className="ml-2">▼</span>
            </Button>

            {showFilter && (
              <ul className="absolute mt-2 w-full rounded-xl bg-white text-gray-800 shadow-xl ring-1 ring-black/10 z-10 dark:bg-gray-800 dark:text-gray-100 dark:ring-white/10 divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
                {['AIML', 'CSE', 'ECE', 'EEE', 'AIDS', 'MECH', 'CIVIL'].map((dept, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer text-sm font-medium transition-colors"
                    onClick={() => {
                      const updated = { ...formdata, branch: dept };
                      setFormData(updated);
                      handleFilter(updated);
                      setShowFilter(false);
                    }}
                  >
                    {dept}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <Button type="submit" className="w-full">
              Search
            </Button>
          </div>

          {/* Clear Button */}
          <div className="w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const resetForm = { rollNumber: "", branch: "" };
                setFormData(resetForm);
                setFilteredStudentAttedance(attedanceData);
              }}
              className="w-full"
            >
              Clear
            </Button>
          </div>
        </form>

          </div>

          <div className="max-w-full overflow-x-auto mt-6">
            <table className="w-full border-collapse">
              <thead className="border-y border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    studentId
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Roll Number
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Branch
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    date
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    presentedClasses
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    missingClasses
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    status
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    markedTime
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filerStudentAttedanceData.map((data, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      <a href={`/students/${data.studentId}`}
                        style={{borderBottom: '1px solid blue', color: 'blue'}}
                      >
                        {data.studentId}
                      </a>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.rollNumber}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.name}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.branch}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.date}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.presentedClasses}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.missingClasses}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      <Badge color={data.status === "present" ? "success" : "error"}>
                        {data.status === "present" ? "Present" : "Absent"}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.markedTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
