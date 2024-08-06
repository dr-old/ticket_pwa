import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

const DarkModeToggle: React.FC = () => {
  const { t } = useTranslation();

  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    }
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === "system") {
      const systemTheme = getSystemTheme();
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className={`py-2 px-4 text-xs border-2 dark:text-gray-200 rounded-lg flex items-center space-x-2 ${
          theme === "light"
            ? "bg-gray-200 border-blue-500"
            : "border-transparent"
        }`}
        onClick={() => toggleTheme("light")}>
        <FontAwesomeIcon icon={faSun} />
        <span>{t("common.light")}</span>
      </button>
      <button
        className={`py-2 px-4 text-xs border-2 dark:text-white rounded-lg flex items-center space-x-2 ${
          theme === "dark"
            ? "bg-gray-700 text-white border-blue-500"
            : "border-transparent"
        }`}
        onClick={() => toggleTheme("dark")}>
        <FontAwesomeIcon icon={faMoon} />
        <span>{t("common.dark")}</span>
      </button>
      <button
        className={`py-2 px-4 text-xs border-2 dark:text-white rounded-lg flex items-center space-x-2 ${
          theme === "system"
            ? "bg-gray-300 dark:bg-gray-700 border-blue-500"
            : "border-transparent"
        }`}
        onClick={() => toggleTheme("system")}>
        <FontAwesomeIcon icon={faDesktop} />
        <span>{t("common.system")}</span>
      </button>
    </div>
  );
};

export default DarkModeToggle;
