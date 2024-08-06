import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faSignOutAlt,
  faBars,
  faTimes,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/useAuth";
import { useTranslation } from "react-i18next";
import ModalAlert from "./ModalAlert";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { logOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menu = [
    { title: t("common.overview"), link: "/dashboard", icon: faHome },
    { title: t("common.ticket"), link: "/ticket", icon: faTicket },
    { title: t("common.profile"), link: "#", icon: faUser },
    { title: t("common.setting"), link: "/settings", icon: faCog },
  ];

  const isSmallScreen = window.innerWidth < 768;

  const handleLogout = () => {
    logOut();
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex h-screen ${
        isSmallScreen ? "w-12" : isSidebarOpen ? "w-40 md:w-64" : "w-12"
      } text-white transition-width duration-300 bg-gray-800 dark:bg-gray-900`}>
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between h-16 shadow-md px-4 bg-gray-700 dark:bg-gray-800">
          <h1
            className={`text-md text-slate-400 dark:text-slate-300 font-semibold transition-opacity duration-300 ${
              isSidebarOpen && !isSmallScreen
                ? "opacity-100"
                : "opacity-0 hidden"
            }`}>
            Dashboard Kit
          </h1>
          <button
            className={`text-slate-400 dark:text-slate-300 hover:text-slate-200 focus:outline-none ${
              !isSidebarOpen || isSmallScreen ? "w-full" : ""
            }`}
            onClick={() => !isSmallScreen && setIsSidebarOpen(!isSidebarOpen)}>
            <FontAwesomeIcon
              icon={isSidebarOpen ? faTimes : faBars}
              className={`w-4 h-4 ${
                !isSidebarOpen || isSmallScreen ? "text-center" : ""
              }`}
            />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menu.map((item, index) => (
              <li key={index.toString()} className="mb-2 w-full">
                <Link
                  to={item.link}
                  className={`flex ${
                    !isSidebarOpen || isSmallScreen ? "justify-center" : ""
                  } p-4 items-center text-xs text-slate-400 dark:text-slate-300 hover:text-slate-200 dark:hover:text-slate-100 border-l-2 border-transparent hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50/10 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out`}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`${
                      !isSidebarOpen || isSmallScreen ? "" : "mr-3"
                    } w-4 h-4 `}
                  />
                  {isSidebarOpen && !isSmallScreen && (
                    <span
                      className={`transition-opacity duration-300 ${
                        isSidebarOpen && !isSmallScreen
                          ? "opacity-100"
                          : "opacity-0"
                      }`}>
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            <li className="mb-2">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className={`flex items-center text-xs text-slate-400 dark:text-slate-300 hover:text-slate-200 dark:hover:text-slate-100 border-l-2 border-transparent hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50/10 dark:hover:bg-gray-700 p-4 w-full text-left transition-colors duration-200 ease-in-out ${
                  !isSidebarOpen || isSmallScreen ? "justify-center" : ""
                }`}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={`w-4 h-4 ${
                    !isSidebarOpen || isSmallScreen ? "text-center" : "mr-3"
                  }`}
                />
                {isSidebarOpen && !isSmallScreen && "Logout"}
              </button>
            </li>
            <ModalAlert
              isOpen={isModalOpen}
              setOpen={setIsModalOpen}
              title="Log Out"
              message="Are you sure you want to logout? You will need to login again to access your account."
              onConfirm={handleLogout}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
