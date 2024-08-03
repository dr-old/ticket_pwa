// SettingsPage.tsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Container } from "../components";

const Settings: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Set initial theme based on localStorage or OS preference
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Container title={t("common.setting")}>
      <div className="overflow-x-auto bg-white dark:bg-gray-900/50 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col justify-between py-6 px-6">
          {/* Language Toggle */}
          <div className="mb-4">
            <h2 className="text-gray-900 dark:text-gray-100 lg:text-md font-medium mb-2">
              {t("common.language")}
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`flex items-center p-2 rounded border-2 ${
                  i18n.language === "en"
                    ? "border-blue-500 bg-gray-200 dark:bg-gray-700"
                    : "border-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-label="English">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-blue-500 mr-2"
                />
                <span>English</span>
              </button>
              <button
                onClick={() => handleLanguageChange("id")}
                className={`flex items-center p-2 rounded border-2 ${
                  i18n.language === "id"
                    ? "border-red-500 bg-gray-200 dark:bg-gray-700"
                    : "border-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-label="Indonesian">
                <FontAwesomeIcon
                  icon={faLanguage}
                  className="text-red-500 mr-2"
                />
                <span>Indonesian</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
