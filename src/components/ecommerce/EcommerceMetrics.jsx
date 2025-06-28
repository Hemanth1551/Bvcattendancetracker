import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../CalendarStyles.css"
import axios from "axios"

import { CalenderIcon, BoxIconLine } from "../../icons"
import DefaultInputs from "../form/form-elements/DefaultInputs"

import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { PiWarningCircle } from "react-icons/pi"
import { RxCross2 } from "react-icons/rx"

const EcommerceMetrics = ({ userAttendance }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [clgHolidays, setClgHolidays] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/day/alldays`)
      .then(res => {
        const datesOnly = res.data
        .filter(item => item.action === "holiday") // Keep only holidays
        .map(item => ({ date: item.date }));
        setClgHolidays(datesOnly)
      })
      .catch(err => {
        console.log("fetch dates", err)
      })
  }, [])

  const holidaySet = new Set(clgHolidays.map(h => h.date))

  // Attendance map
  const attendanceMap = {}
  userAttendance.forEach(({ date, action }) => {
    attendanceMap[date] = action
  })

  const renderDayContents = (day, date) => {
    const formattedDate = date.toLocaleDateString("sv-SE") // yyyy-mm-dd
    let icon
    let color = ""

    if (attendanceMap[formattedDate] === "present") {
      icon = <IoMdCheckmarkCircleOutline />
      color = "green"
    } else if (attendanceMap[formattedDate] === "absent") {
      icon = <RxCross2 />
      color = "red"
    } else if (holidaySet.has(formattedDate)) {
      icon = <PiWarningCircle />
      color = "orange"
    }

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center"
        }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>{day}</span>
        {icon && (
          <span
            className="day-icon"
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              color: color,
              fontSize: "1.8em",
              zIndex: 2
            }}
          >
            {icon}
          </span>
        )}
      </div>
    )
  }

  const currentDate = new Date()
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Calendar Block */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex ">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <CalenderIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="ml-4 mt-2.5">Daily Attendance Tracker</div>
        </div>

        <div className="mt-5">
          <div className="custom-calendar-wrapper">
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              showWeekNumbers
              renderDayContents={renderDayContents}
              inline
              calendarClassName="react-datepicker"
              minDate={startOfMonth}
              maxDate={endOfMonth}
              showPopperArrow={false}
            />
          </div>
        </div>
      </div>

      {/* Form Block */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="ml-4 mt-2.5">Mark your daily attendance below</div>
        </div>
        <div className="mt-5">
          <DefaultInputs />
        </div>
      </div>
    </div>
  )
}

export default EcommerceMetrics
