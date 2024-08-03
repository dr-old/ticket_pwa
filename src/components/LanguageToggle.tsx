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
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange("en")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="English">
        <FontAwesomeIcon icon={faGlobe} className="text-blue-500" />
        <span className="sr-only">English</span>
      </button>
      <button
        onClick={() => handleLanguageChange("id")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Indonesian">
        <FontAwesomeIcon icon={faLanguage} className="text-red-500" />
        <span className="sr-only">Indonesian</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
