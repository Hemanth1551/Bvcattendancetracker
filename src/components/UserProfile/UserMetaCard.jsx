// components/UserMetaCard.jsx
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserMetaCard() {
  // const { isOpen, openModal, closeModal } = useModal();

  // const handleSave = () => {
  //   console.log("Saving changes...");
  //   closeModal();
  // };
  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
    // console.log("dataon user",storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  const branchMap = {
  CSE: "Computer Science Engineering",
  ECE: "Electronics and Communication Engineering",
  AIML: "Artificial Intelligence and Machine Learning",
  AIDS: "Artificial Intelligence and Data Science",
  MECH: "Mechanical Engineering",
  CIVIL: "Civil Engineering"
};


  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20  flex items-center justify-center overflow-hidden border border-black rounded-full bg-gray-200 dark:bg-gray-700">
              {/* <img src="/images/user/owner.jpg" alt="user" /> */}
              <span className="font-medium text-gray-700 text-xl dark:text-gray-300">
                  {student.name ? student.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {student.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Student
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {branchMap[student.branch] || "Select your branch"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
