// import '../../assets/css/service.css'

import React from "react";

const serviceData = [
  {
          icon: "lni-calendar",
          title: "Real-Time Attendance",
          des: "Instantly capture and reflect student attendance as it happens, reducing errors and manual input.",
        },
        {
          icon: "lni-user",
          title: "Student Profiles",
          des: "Maintain comprehensive profiles for each student, including attendance history, class schedules, and personal info.",
        },
        {
          icon: "lni-stats-up",
          title: "Analytics & Reports",
          des: "Generate detailed reports and visual dashboards to analyze trends, absenteeism, and performance insights.",
        },
        {
          icon: "lni-lock",
          title: "Secure & Private",
          des: "Protect student data with encrypted storage and role-based access to ensure confidentiality and integrity.",
        },
        {
          icon: "lni-timer",
          title: "Time Tracking",
          des: "Automatically log class timings, breaks, and overall time spent for accurate academic records and productivity tracking.",
        },
        {
          icon: "lni-mobile",
          title: "Mobile Access",
          des: "Allow teachers and students to access attendance tools and reports conveniently from their smartphones or tablets.",
        },
];

export default function Services() {
  return (
    <section className="section-area py-20 bg-white dark:bg-gray-900" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-[550px] mx-auto mb-12">
          <h6 className="text-lg font-semibold text-primary dark:text-blue-400 mb-2">
            Services
          </h6>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Best Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This Attendance System offers a comprehensive range of services that streamline attendance tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="group p-6 border rounded-xl transition-transform duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="w-[70px] h-[70px] mb-6 flex items-center justify-center text-[37px] rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-white">
                <i className={`lni ${service.icon}`} />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">{service.des}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
