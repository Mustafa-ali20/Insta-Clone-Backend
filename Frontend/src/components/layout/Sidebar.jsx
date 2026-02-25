import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  Menu,
  User,
  Plus,
} from "lucide-react";
import { useUI } from "../posts/ui.context"; // ✅ adjust path as needed

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const { openCreate } = useUI(); // ✅ grab openCreate from context

  const menuItems = [
    { id: "home", icon: Home, label: "Home", path: "/feed" },
    { id: "reels", icon: Film, label: "Reels", path: "#" },
    {
      id: "messages",
      icon: MessageCircle,
      label: "Messages",
      path: "#",
    },
    { id: "search", icon: Search, label: "Search", path: "#" },
    { id: "explore", icon: Compass, label: "Explore", path: "#" },
    { id: "notifications", icon: Heart, label: "Notifications", path: "#" },
    { id: "create", icon: Plus, label: "Create", path: "#" }, // ✅ stays #
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find((item) => item.path === currentPath);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem.id);
    }
  }, [location.pathname]);

  const handleNavigation = (item) => {
    if (item.id === "create") {
      openCreate(); // ✅ open the modal
      return;
    }
    if (item.path !== "#") {
      setActiveItem(item.id);
      navigate(item.path);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 border-r border-zinc-800 bg-[#0B1014] z-50 hidden md:flex flex-col">
      <div className="flex flex-col h-full p-2 lg:p-4">
        {/* Logo */}
        <div className="px-2 lg:px-3 py-3 mb-4">
          <div className="lg:block hidden">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
          </div>
          <div className="lg:hidden flex justify-center">
            <img src="/images/logo-mobile.png" alt="Logo" className="w-7 h-7" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex items-center">
          <ul className="space-y-1 w-full">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center justify-center lg:justify-start gap-4 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-zinc-900 relative
                    ${activeItem === item.id ? "text-white" : "text-zinc-400"}
                  `}
                >
                  <item.icon
                    className={`w-7 h-7 ${activeItem === item.id ? "stroke-[2]" : "stroke-[1.5]"}`}
                  />
                  <span
                    className={`text-base hidden lg:block ${activeItem === item.id ? "font-semibold" : "font-normal"}`}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="absolute top-2 left-6 lg:left-8 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* More Button */}
        <button className="flex items-center justify-center lg:justify-start gap-4 px-3 py-3 rounded-lg hover:bg-zinc-900 transition-all duration-200 text-zinc-400">
          <Menu className="w-7 h-7" />
          <span className="text-base hidden lg:block">More</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
