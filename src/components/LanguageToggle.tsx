// LanguageToggle.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        className={`py-2 px-4 text-xs border-2 dark:text-gray-200 rounded-lg flex items-center space-x-2 ${
          i18n.language === "en"
            ? "bg-gray-200 dark:bg-gray-700  border-blue-500"
            : "border-transparent"
        }`}
        onClick={() => handleLanguageChange("en")}>
        <FontAwesomeIcon icon={faGlobe} />
        <span>English</span>
      </button>

      <button
        className={`py-2 px-4 text-xs border-2 dark:text-gray-200 rounded-lg flex items-center space-x-2 ${
          i18n.language === "id"
            ? "bg-gray-200 dark:bg-gray-700  border-blue-500"
            : "border-transparent"
        }`}
        onClick={() => handleLanguageChange("id")}>
        <FontAwesomeIcon icon={faLanguage} />
        <span>Indonesian</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
