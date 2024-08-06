// SettingsPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Container, LanguageToggle } from "../components";
import DarkModeToggle from "../components/DarkModeToggle";

const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container title={t("common.setting")}>
      <div className="overflow-x-auto bg-white dark:bg-gray-900/50 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 justify-between py-6 px-6">
          {/* Language Toggle */}
          <div className="py-4 flex flex-col md:flex-row md:justify-between md:items-center col-span-2 border-b-[1px] border-gray-300 dark:border-gray-600">
            <div className="text-gray-400 text-xs font-light dark:text-gray-100 mb-4 md:mb-0">
              <h2 className="lg:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                {t("common.language")}
              </h2>
              {t("common.selectLanguage")}
            </div>
            <LanguageToggle />
          </div>
          <div className="py-4 flex flex-col md:flex-row md:justify-between md:items-center col-span-2 border-b-[1px] border-gray-300 dark:border-gray-600">
            <div className="text-gray-400 text-xs font-light dark:text-gray-100 mb-4 md:mb-0">
              <h2 className="lg:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                {t("common.theme")}
              </h2>
              {t("common.changeTheme")}
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
