import { useState } from "react";
import { useModal } from "../../hooks/useModal";
// import { Modal } from "../ui/modal";
// import Button from "../ui/button/Button";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
    // console.log("dataon user",storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Student Name</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{student.name}</p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Student Roll Number</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{student.rollNumber}</p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Domain Email address</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{student.email}</p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{student.phone}</p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Branch</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{student.branch}</p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Gender</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{student.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
