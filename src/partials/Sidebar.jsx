import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/white-logo.png";
import shortLogo from "../images/robotizia-bot.png";
import { useSelector } from "react-redux";


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    sidebarOpen && !sidebarExpanded && setSidebarExpanded(true);
  }, [sidebarOpen]);


  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0  bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex bg-[#F7FAFC] flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 p-4 pr-0 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        {/* Sidebar header */}
        <div className="">
          <div className={`flex justify-between pr-3 sm:px-2`}>
            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-slate-500 hover:text-slate-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            {/* Logo */}
            <NavLink end to="/" className="block mt-4">
              <img className={`hidden 2xl:block`} src={logo} />
              {sidebarExpanded === true ? (
                <img className={`2xl:hidden`} src={logo} />
              ) : (
                <img
                  className={`2xl:hidden sidebar-expandded:hidden`}
                  src={shortLogo}
                />
              )}
            </NavLink>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8 mt-20">
          {/* Pages group */}
          <div>
            <ul className="">


              {/* Home */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname === "/" ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24px"
                      height="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2e46e8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <rect x="10" y="12" width="4" height="4" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-slate-400 text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/" && " text-[#2e46e8]"
                        }`}
                    >
                      Home
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Users */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname.includes("users") ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/users"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname.includes("users") && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24px"
                      height="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2e46e8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-slate-400 text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes("users") && " text-[#2e46e8]"
                        }`}
                    >
                      Users
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Blog */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname.includes("blog") ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/blog"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname.includes("blog") && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-blockquote" width="24px"
                      height="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2e46e8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 15h15" />
                      <path d="M21 19h-15" />
                      <path d="M15 11h6" />
                      <path d="M21 7h-6" />
                      <path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
                      <path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-slate-400 text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes("blog") && " text-[#2e46e8]"
                        }`}
                    >
                      Blog
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Subscriptions */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname.includes("subscriptions") ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/subscriptions"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname.includes("subscriptions") && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="24px"
                      height="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2e46e8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 11h6m-3 -3v6" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-slate-400 text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes("subscriptions") && " text-[#2e46e8]"
                        }`}
                    >
                      Subscriptions
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-3 last:mb-0 ${pathname.includes("messages") ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/messages"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname.includes("messages") && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2e46e8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                      <line x1="12" y1="12" x2="12" y2="12.01" />
                      <line x1="8" y1="12" x2="8" y2="12.01" />
                      <line x1="16" y1="12" x2="16" y2="12.01" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-slate-400 text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes("messages") && " text-[#2e46e8]"
                        }`}
                    >
                      Messages
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* New Admin */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname.includes("add-new-admin") ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/add-new-admin"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname.includes("add-new-admin") && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24px"
                      height="24px" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2e46e8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="9" />
                      <line x1="9" y1="12" x2="15" y2="12" />
                      <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-slate-400 text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes("add-new-admin") && " text-[#2e46e8]"
                        }`}
                    >
                      Add New Admin
                    </span>
                  </div>
                </NavLink>
              </li>


              <li
                className={`px-3 py-3 rounded-sm last:mb-0 bg-[#F7FAFC]`}
              ></li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-3">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-[#ADB5CC]" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
