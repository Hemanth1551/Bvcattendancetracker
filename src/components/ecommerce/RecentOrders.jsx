import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table"
import Badge from "../ui/badge/Badge"
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete, MdOutlineViewInAr } from "react-icons/md";

import { useEffect, useState } from "react"
import { Modal } from "../ui/modal";
import axios from "axios"
import Alert from "../ui/alert/Alert";



export default function RecentOrders({ tableData }) {
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(null);


  const handleEditClick = (record) => {
    setSelectedAttendance(record);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };


  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
    // console.log("data",storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  const stuId = student.id;

  const deleteAttendance = async (id, date) => {
      try {
        const res = await axios.delete(`http://localhost:5000/api/studentAttendance/student/deleteatt/${id}/${date}`);
        setAlert({
          variant: "success",
          title: "Attendance Deleted",
          message: "Attendance has been deleted successfully.",
        });
      } catch (err) {
        setAlert({
          variant: "error",
          title: "Deletion Failed",
          message: "Please try again. " + (err.response?.data?.message || err.message),
        });
      }
    };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        
        {isOpen && selectedAttendance && (

          <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
            {alert && (
                    <div className="mb-4">
                      <Alert
                        variant={alert.variant}
                        title={alert.title}
                        message={alert.message}
                      />
                    </div>
                  )}
          <div className="relative w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              View attedance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Date:</strong> {selectedAttendance.date?.split("T")[0]}</p>
              <p><strong>Presented Classes:</strong> {selectedAttendance.presentedClasses}</p>
              <p><strong>Missing Classes:</strong> {selectedAttendance.missingClasses}</p>
              <p><strong>Status:</strong> {selectedAttendance.status}</p>
              <p><strong>Marked Time:</strong> {selectedAttendance.markedTime?.split("T")[1]?.split(".")[0]}</p>
              <p><strong>Location:</strong> {selectedAttendance.location}</p>
              <p><strong>Created At:</strong> {selectedAttendance.createdAt}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
              <p className="text-sm text-blue-600 items-center p-2 dark:text-gray-300 border border-blue-600 rounded leading-relaxed md:max-w-xl dark:bg-gray-800">
                <b>Note</b> : The student has not updated the previous attendance. If you have posted incorrect attendance, you can delete it and go to the pending attendance section to repost it.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-600"
                onClick={() => {
                  deleteAttendance(selectedAttendance.studentId, selectedAttendance.date)
                }}
              >
                Delete
                <MdDelete className="text-lg" />
              </button>
            </div>

          </div>
        </Modal>

        )}


        


        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Attendence
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Presented Classes
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Missing Classes
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Marked Time
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-center text-gray-500  text-theme-xs dark:text-gray-400"
              >
                View Record 
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product, index)  => (
              <TableRow key={index}>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.date.split("T")[0]}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.presentedClasses}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.missingClasses}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "present"
                        ? "success"
                        : product.status === "absent"
                        ? "error"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.markedTime.split("T")[1].split(".")[0]}
                </TableCell>
                <TableCell className="text-center">
                  <button onClick={() => handleEditClick(product)}>
                    <MdOutlineViewInAr />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


