import { useEffect } from "react"
import { SidebarProvider, useSidebar } from "../context/SidebarContext"
import { Outlet } from "react-router"
import AppHeader from "./AppHeader"
import Backdrop from "./Backdrop"
import AppSidebar from "./AppSidebar"

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar()

  return (
    <div className="min-h-screen xl:flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-[1600px] md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AppLayout = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark") // Enable dark mode
  }, [])

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}

export default AppLayout
