// Layout.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-full bg-gray-800 dark:bg-gray-900">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`flex-1 transition-all duration-300 bg-gray-100 dark:bg-gray-800`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
