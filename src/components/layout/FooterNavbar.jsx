import { Link, useLocation } from "react-router-dom"

// You'll need to install these icons: npm install lucide-react
import { Home, Users, Network, Briefcase, Bell } from "lucide-react"

export default function MobileFooterNav() {
  const location = useLocation()
  const pathname = location.pathname

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
      href: "/jobs",
      icon: Briefcase,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white md:hidden">
      <div className="mx-auto flex h-12 max-w-lg items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center px-3 py-2 ${
                isActive ? "text-[#5DA05D]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
            {isActive && <div className="h-1 w-full border-t-2 border-[#5DA05D]" />}
              <item.icon className="my-1 h-6 w-6" />
              <span className="text-xs font-medium">{item.name}</span>
              
            </Link>
          )
        })}
      </div>
    </div>
  )
}

