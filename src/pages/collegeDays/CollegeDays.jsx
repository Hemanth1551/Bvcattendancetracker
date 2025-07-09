import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Alert from "../../components/ui/alert/Alert";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";
import { useEffect, useState } from "react";
import { addDay } from "../../api/days";
import axios from "axios";

export default function Alerts() {
  const [formdata, setFormdata] = useState({
    date: "",
    action: "",
    description: "",
  });

  const [alert, setAlert] = useState(null);
  const [allDays, setAllDays] = useState([]); // original full data
  const [filteredDays, setFilteredDays] = useState([]); // shown data
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addDay(formdata);
      setAlert({
        variant: "success",
        title: "Day added successfully",
        message:
          res.response?.data?.message ||
          "Day registered successfully.",
      });

      fetchAllDaysData(); // refresh the list
    } catch (err) {
      console.log(err);
      setAlert({
        variant: "error",
        title: "Failed to add day",
        message: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const fetchAllDaysData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/day/alldays`);
      setAllDays(res.data);
      setFilteredDays(res.data); // default to show all
    } catch (err) {
      console.error("fetch dates", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (!formdata.date) {
      setFilteredDays(allDays); // reset if date is empty
    } else {
      const filtered = allDays.filter((day) => day.date === formdata.date);
      setFilteredDays(filtered);
    }
  };

  useEffect(() => {
    fetchAllDaysData();
  }, []);

  return (
    <>
      <PageMeta
        title="React.js Alerts Dashboard"
        description="Manage and view college day records."
      />
      <PageBreadcrumb pageTitle="Dates" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Manage College Days">
          {alert && (
            <div className="mb-4">
              <Alert
                variant={alert.variant}
                title={alert.title}
                message={alert.message}
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                type="date"
                id="date"
                name="date"
                onChange={handleChange}
                value={formdata.date}
                placeholder="Select date"
                className="w-full px-4"
              />

              <select
                className="w-full h-11 px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
                id="action"
                name="action"
                onChange={handleChange}
                value={formdata.action}
              >
                <option value="">Select day action</option>
                <option value="workingday">Workingday</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-4">
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Enter day description"
                className="w-full px-4"
                onChange={handleChange}
                value={formdata.description}
              />
              <Button size="sm" className="w-36">
                Submit
              </Button>
            </div>
          </form>
        </ComponentCard>

        <ComponentCard title="Filter Days">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
    {/* Filter Button */}
    <div>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        type="button"
      >
        <svg
          className="stroke-current fill-white dark:fill-gray-800"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.29 5.9H17.71" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17.71 14.1H2.29" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M12.08 3.33C13.5 3.33 14.65 4.48 14.65 5.9C14.65 7.32 13.5 8.47 12.08 8.47C10.66 8.47 9.51 7.32 9.51 5.9C9.51 4.48 10.66 3.33 12.08 3.33Z"
            strokeWidth="1.5"
          />
          <path
            d="M7.92 11.52C6.5 11.52 5.35 12.68 5.35 14.1C5.35 15.52 6.5 16.67 7.92 16.67C9.34 16.67 10.49 15.52 10.49 14.1C10.49 12.68 9.34 11.52 7.92 11.52Z"
            strokeWidth="1.5"
          />
        </svg>
        Filter
      </button>
    </div>

    {/* Filter Form */}
    <form className="col-span-3 flex items-center gap-2" onSubmit={handleFilterSubmit}>
      <Input
        type="date"
        name="date"
        value={formdata.date}
        onChange={handleChange}
        className="w-full px-4"
      />
      <Button type="submit">Search Date</Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setFormdata({ ...formdata, date: "" });
          setFilteredDays(allDays);
        }}
      >
        Clear
      </Button>
    </form>
  </div>

          <div className="max-w-full overflow-x-auto mt-6">
            <table className="w-full border-collapse">
              <thead className="border-y border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Action
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Description
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredDays.map((data, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.date}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      <Badge color={data.action === "workingday" ? "success" : "error"}>
                        {data.action === "workingday" ? "Workingday" : "Holiday"}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.description}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {data.createdAt}
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
