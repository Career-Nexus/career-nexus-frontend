import { Link, useLocation } from "react-router-dom"

// You'll need to install these icons: npm install lucide-react
import { Home, Users, Network, Briefcase, Bell } from "lucide-react"
import { Notify } from "./MainNavbar"
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"

export default function MobileFooterNav() {
  const location = useLocation()
  const pathname = location.pathname
  const {user} = useContext(UserContext)

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
      name: "Jobs",
      href: user.type !== "mentor" && user.type !== "learner" ? "/coporate-job" : "/jobs",
      icon: Briefcase,
    },
    // {
    //   name: <div className="relative"><Bell /><div className='h-3 w-3 rounded-full bg-red-600 absolute -top-1 -right-2 p-1'></div></div>,
    //   href: "/notifications",
    //   icon: Bell,
    // },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white md:hidden">
      <div className="flex justify-between items-center">
        <div className="flex h-12 max-w-lg items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 ${isActive ? "text-[#5DA05D]" : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {isActive && <div className="h-1 w-full border-t-2 border-[#5DA05D]" />}
                <item.icon className="my-1 h-6 w-6" />
                <span className="text-xs font-medium">{item.name}</span>

              </Link>
            )
          })}
        </div>
        <div className="relative mr-10 flex flex-col items-center justify-center px-3 py-2 text-gray-500 hover:text-gray-900">
          <Notify className="absolute" />
          <p className="text-xs font-medium text-gray-500 -mt-2">Notifications</p>
          {/* <div className='absolute h-3 w-3 rounded-full bg-red-600 top-0 right-9 p-1'></div> */}
          
        </div>
      </div>
    </div>
  )
}

