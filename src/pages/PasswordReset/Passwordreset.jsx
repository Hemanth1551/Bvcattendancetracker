import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import UserAddressCard from "../../components/UserProfile/UserAddressCard"
import PageMeta from "../../components/common/PageMeta"

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="BVC's Attendance System"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserAddressCard showEditButton={false} isForgotPage={true} />
        </div>
      </div>
    </>
  )
}
