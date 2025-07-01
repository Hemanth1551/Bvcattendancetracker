import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics"
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget"
import MissedDays from "../../components/ecommerce/MissedDays"
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {


  return (
    <>
      <PageMeta
        title="BVC's Attendance System"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
        <div className="col-span-12 xl:col-span-12">
          <div className="col-span-12 xl:col-span-7">
            <MissedDays  />
          </div>
        </div>
      </div>
    </>
  );
}

// MissedDays
