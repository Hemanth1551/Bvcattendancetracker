import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { passwordReset, passwordResetByEmail, passwordChangeByEmailConfig } from "../../api/auth";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Alert from "../../components/ui/alert/Alert";
import emailjs from "emailjs-com";


export default function UserAddressCard({showEditButton = true, isForgotPage = false}) {
  const { isOpen, openModal, closeModal } = useModal();
  const [alert, setAlert] = useState(null); 
  

  // Password visibility toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);




  // Retrieve student
  let student = {};
  try {
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) student = JSON.parse(storedStudent);
  } catch (error) {
    console.error("Invalid student JSON:", error);
  }

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    studentId: student?.id || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      // alert("❌ New password and confirm password do not match.");
      setAlert({
        variant: "error",
        title: "Password match faild",
        message: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      const { oldPassword, newPassword, studentId } = formData;
      await passwordReset({ oldPassword, newPassword, studentId });
      // alert("✅ Password updated successfully.");
      setAlert({
        variant: "success",
        title: "Password updated successfully",
        message: "You will be redirected shortly.",
      });
       setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      console.error(err);
      console.log(`❌ ${err.response?.data?.message || "Password reset failed"}`);
      setAlert({
        variant: "error",
        title: "Password Changing Failed",
        message: err.response?.data?.message || "Something went wrong.",
      });
    }
  };


  const [showPasswordemail, setShowPasswordemail] = useState(false);
  const [showConfirmemail, setShowConfirmemail] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [formEmailData, setformEmailData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });


  // const handleEmailformChange = (e) => {
  //   setformEmailData({ ...formEmailData, [e.target.name]: e.target.value });
  // };
  const handleEmailformChange = (e) => {
    const { name, value } = e.target;

      setformEmailData((prev) => ({
        ...prev,
        [name]: name === "email" ? value.toLowerCase() : value,
      }));
  };

  function generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  //  Myotp;
  const [Myotp, setMyotp] = useState(false);

      const [studentid, setStudentId] = useState("");
      const handleEmailSubmit = async () => {
      try {
        const res = await passwordChangeByEmailConfig({ email : formEmailData.email });

        if (res.data.exists) {
      const otp = generateOTP();
      setMyotp(otp);

      // ✅ Store studentId in local state to use later
      setStudentId(res.data.studentId);

      // await emailjs.send(
      //   "service_29xl84w",
      //   "template_3mflbcn",
      //   {
      //     email: formEmailData.email,
      //     passcode: otp,
      //   },
      //   "9M-up8WBbfR3-dZa_"
      // );
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: formEmailData.email,
          passcode: otp,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );



      setAlert({
        variant: "success",
        title: "OTP sent!",
        message: "Check your inbox.",
      });

      setTimeout(() => {
        setAlert(null);
        setStep(2); // move to OTP verification step
      }, 3000);
    } else {
          setAlert({
            variant: "error",
            title: "Invalid Email",
            message: "No student found with this email.",
          });
          setTimeout(() => setAlert(null), 3000);
        }
      } catch (error) {
        setAlert({
          variant: "error",
          title: "Server Error",
          message: error?.response?.data?.message || "Something went wrong.",
        });
        setTimeout(() => setAlert(null), 3000);
      }
    };



  const handleOTPSubmit = () => {
    // Simulate OTP match
    if (formEmailData.otp === Myotp) {
      setStep(3);
      // "Enter a valid OTP. "
    } else {
      setAlert({
        variant: "error",
        title: "Enter a valid OTP. ",
        message: "Something went wrong.",
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000)
    }
  };

  const handleResetPassword = async () => {
    if (formEmailData.newPassword !== formEmailData.confirmPassword) {
      setAlert({
        variant: "error",
        title: "Passwords do not match.",
        message: "Something went wrong.",
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000)
      return;
    }


      try{
        await passwordResetByEmail({newPassword: formEmailData.newPassword, studentId: studentid });

        setAlert({
          variant: "success",
          title: "Password changed successfully!",
          message: "We will back post your attendance",
        });
        setTimeout(() => {
          setAlert(null);
          setformEmailData(false);
          setStep(1);
        }, 3000)

      }catch(error){
        setAlert({
          variant: "error",
          title: "Password reset failed",
          message: error || "Something went wrong.",
        });
        setTimeout(() => {
          setAlert(null);
        }, 3000)
        return;
      }


      return;
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Student Password
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>

                {
                  isForgotPage ? (
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-red-400">
                      Enter a valid email
                    </p>
                  ) : (
                     (
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        When you know the password click <b>Edit</b> button otherwise use below <b>OTP</b> update
                      </p>
                    )
                  )
                }




<div className="px-2 overflow-y-auto custom-scrollbar">
  {alert && (
            <div className="mb-4">
              <Alert
                variant={alert.variant}
                title={alert.title}
                message={alert.message}
              />
            </div>
          )}
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

    

    {/* Step 1: Email */}
    {step === 1 && (
      <div className="relative lg:col-span-2">
        <Label htmlFor="email">Domain Email Address</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formEmailData.email}
          onChange={handleEmailformChange}
        />
        <Button className="mt-4" onClick={handleEmailSubmit}>
          Send OTP
        </Button>
      </div>
    )}

    {/* Step 2: OTP */}
    {step === 2 && (
      <div className="relative lg:col-span-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <Input
          type="text"
          name="otp"
          id="otp"
          value={formEmailData.otp}
          onChange={handleEmailformChange}
        />
        <Button className="mt-4" onClick={handleOTPSubmit}>
          Verify OTP
        </Button>
      </div>
    )}


    {/* Step 3: New Password */}
    {step === 3 && (
      <>
        <div className="relative">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type={showPasswordemail ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            value={formEmailData.newPassword}
            onChange={handleEmailformChange}
          />
          <span
            onClick={() => setShowPasswordemail(!showPasswordemail)}
            className="absolute right-4 top-10 cursor-pointer"
            >
              {showPasswordemail ? (
                <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
              )}
          </span>
        </div>

        <div className="relative">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type={showConfirmemail ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={formEmailData.confirmPassword}
            onChange={handleEmailformChange}
          />
          <span
            onClick={() => setShowConfirmemail(!showConfirmemail)}
            className="absolute right-4 top-10 cursor-pointer"
            >
              {showConfirmemail ? (
                <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
              )}
          </span>
        </div>

        <div className="lg:col-span-2 flex justify-end">
          <Button className="mt-4" onClick={handleResetPassword}>
            Change Password
          </Button>
        </div>
      </>
    )}
  </div>
</div>

              </div>
            </div>
          </div>

          {showEditButton && (
            <button
              onClick={openModal}
              aria-label="Edit password"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Password
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
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

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                {/* Old Password */}
                <div className="relative">
                  <Label>Current Password</Label>
                  <Input
                    type={showOld ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-4 top-10 cursor-pointer"
                  >
                    {showOld ? (
                      <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>

                {/* New Password */}
                <div className="relative">
                  <Label>New Password</Label>
                  <Input
                    type={showNew ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-10 cursor-pointer"
                  >
                    {showNew ? (
                      <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Label>Confirm Password</Label>
                  <Input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-10 cursor-pointer"
                  >
                    {showConfirm ? (
                      <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal} type="button">
                Close
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
