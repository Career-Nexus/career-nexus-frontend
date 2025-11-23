
import { Link, useLocation } from "react-router-dom"
import { Home, Users, Network, Briefcase } from "lucide-react"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect } from "react"
import { Notify } from "../dashboard/home/Notify"

export default function MobileFooterNav() {
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useContext(UserContext)

  // Debug user_type
  useEffect(() => {
    console.log("User type:", user?.user_type)
  }, [user?.user_type])

  // Build nav items using your same pattern
  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Mentorship",
      href: "/mentorship",
      icon: Users,
    },
    {
      name: "Network",
      href: "/network",
      icon: Network,
    },
    {
      name: user?.user_type !== "mentor" ? "Jobs" : "",
      href:
        user?.user_type &&
        ["mentor", "learner"].includes(user.user_type.toLowerCase())
          ? "/jobs"
          : "/coporate-job",
      icon: user?.user_type !== "mentor" ? Briefcase : null,
    },
  ]

  // Filter out the Jobs item completely for mentors
  const filteredNavItems = navItems.filter(
    (item) => !(item.name === "" && user?.user_type === "mentor")
  )

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white md:hidden">
      <div className="flex justify-between items-center">
        <div className="flex h-12 max-w-lg items-center justify-between">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 ${
                  isActive
                    ? "text-[#5DA05D]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <div className="h-1 w-full border-t-2 border-[#5DA05D]" />
                )}

                {item.icon && <item.icon className="my-1 h-6 w-6" />}

                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Notification */}
        <div className="relative mr-10 flex flex-col items-center justify-center px-3 py-2 text-gray-500 hover:text-gray-900">
          <Notify className="absolute" />
          <p className="text-xs font-medium text-gray-500 -mt-2">Notifications</p>
        </div>
      </div>
    </div>
  )
}
