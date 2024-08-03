import {
  faCheckCircle,
  faCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Container, SplineAreaChart } from "../components";
import { useAuth } from "../context/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [isTask, setTask] = useState<any | null>(null);

  const data = [
    { title: t("common.unresolved"), value: 60 },
    { title: t("common.overdue"), value: 16 },
    { title: t("common.open"), value: 43 },
    { title: t("common.hold"), value: 64 },
  ];

  const dataChart = [
    { title: t("dataChart.resolved"), value: 449 },
    { title: t("dataChart.received"), value: 426 },
    { title: t("dataChart.averageFirstResponseTime"), value: "33m" },
    { title: t("dataChart.averageResponseTime"), value: "3h 8m" },
    { title: t("dataChart.resolutionWithinSLA"), value: "94%" },
  ];

  const unresolved = [
    { title: t("unresolved.waitingOnFeatureRequest"), value: 4238 },
    { title: t("unresolved.awaitingCustomerResponse"), value: 1005 },
    { title: t("unresolved.awaitingDeveloperFix"), value: 914 },
    { title: t("unresolved.pending"), value: 281 },
  ];

  const tasks = [
    {
      title: t("tasks.createNewTask"),
      value: faPlus,
      icon: true,
      color: "bg-gray-100 dark:bg-gray-700",
      onClick: () => console.log(1),
    },
    {
      title: t("tasks.finishTicketUpdate"),
      value: "urgent",
      color: "bg-orange-400 text-white",
    },
    {
      title: t("tasks.createNewTicketExample"),
      value: "new",
      color: "bg-green-400 text-white",
    },
    {
      title: t("tasks.updateTicketReport"),
      value: "default",
      color: "bg-gray-100 dark:bg-gray-700",
    },
  ];

  return (
    <Container title={t("common.overview")}>
      <div className="overflow-x-auto">
        <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-6 p-4">
          {data.map((item: any, index: number) => (
            <div
              key={index.toString()}
              className="bg-white dark:bg-gray-900/50 rounded-xl py-4 border-[1px] border-gray-200 dark:border-gray-700 text-slate-400 dark:text-gray-400 flex justify-center items-center hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 group">
              <button
                onClick={() => {}}
                className="flex flex-col items-center justify-center p-4 gap-3 w-full">
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm md:text-md">
                  {item.title}
                </span>
                <span className="text-slate-950 dark:text-gray-200 text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.value}
                </span>
              </button>
            </div>
          ))}

          <div className="md:col-span-4 lg:col-span-4 flex flex-col lg:flex-row bg-white dark:bg-gray-900/50 rounded-xl border-[1px] border-gray-200 dark:border-gray-700 text-slate-400 dark:text-gray-400 text-center">
            <div className="lg:w-9/12 p-4 md:p-4 lg:p-10">
              <div className="flex flex-col pb-4 lg:pb-8">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col text-left">
                    <span className="text-slate-950 dark:text-gray-200 text-left text-sm md:text-md font-semibold">
                      {t("date.trends")}
                    </span>
                    <span className="font-light text-xs text-slate-300 dark:text-gray-500 mr-1 mt-1">
                      as of {moment().format("D MMMM YYYY h:mm A")}
                    </span>
                  </div>

                  <div className="flex flex-row gap-2 lg:gap-6">
                    <span className="flex flex-row items-center font-medium text-xs text-slate-300 dark:text-gray-500">
                      <div className="bg-blue-600 dark:bg-blue-400 w-3 h-1 rounded-sm mr-2" />
                      {t("date.today")}
                    </span>
                    <span className="flex flex-row items-center font-medium text-xs text-slate-300 dark:text-gray-500">
                      <div className="bg-gray-400 w-3 h-1 rounded-sm mr-2" />
                      {t("date.yesterday")}
                    </span>
                  </div>
                </div>
              </div>
              <SplineAreaChart />
            </div>
            <div className="lg:w-3/12 border-l-[1px] border-gray-200 dark:border-gray-700">
              {dataChart.map((item: any, index: number) => (
                <div
                  key={index.toString()}
                  className={`text-slate-400 dark:text-gray-400 h-1/5 ${
                    index !== dataChart.length - 1 ? "border-b-[1px]" : ""
                  } border-gray-200 dark:border-gray-700 py-4 flex justify-center items-center hover:text-blue-600 dark:hover:text-blue-400 group`}>
                  <button
                    onClick={() => {}}
                    className="flex flex-col items-center justify-center gap-y-3 w-full">
                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm md:text-md">
                      {item.title}
                    </span>
                    <span className="text-slate-950 dark:text-gray-200 text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {item.value}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex bg-white dark:bg-gray-900/50 flex-col justify-between md:col-span-2 rounded-xl border-[1px] border-gray-200 dark:border-gray-700 text-slate-400 dark:text-gray-400 text-center">
            <div className="flex flex-col">
              <div className="flex flex-row px-4 lg:px-10 pt-4 lg:pt-8 justify-between items-center">
                <span className="text-slate-950 dark:text-gray-200 sm:text-sm md:text-md font-semibold">
                  {t("common.unresolved")}
                </span>
                <span className="font-medium text-xs text-blue-600 dark:text-blue-400">
                  {t("common.viewDetail")}
                </span>
              </div>
              <div className="flex flex-row px-4 lg:px-10 pb-4 lg:pb-10 items-center mt-1">
                <span className="font-light text-xs text-slate-300 dark:text-gray-500 mr-1">
                  Group
                </span>
                <span className="font-light text-xs text-slate-900 dark:text-gray-200">
                  Support
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              {unresolved.map((item: any, index: number) => (
                <div
                  key={index.toString()}
                  className="flex flex-row justify-between items-center h-10 md:h-14 border-b-[1px] border-gray-200 dark:border-gray-700 px-4 lg:px-10">
                  <span className="font-light text-xs md:text-sm text-left text-slate-900 dark:text-gray-200">
                    {item.title}
                  </span>
                  <span className="font-light text-xs md:text-sm text-right text-slate-400 dark:text-gray-400">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex bg-white dark:bg-gray-900/50 flex-col justify-between md:col-span-2 rounded-xl border-[1px] border-gray-200 dark:border-gray-700 text-slate-400 dark:text-gray-400 text-center">
            <div className="flex flex-col">
              <div className="flex flex-row px-4 lg:px-10 pt-4 lg:pt-8 justify-between items-center">
                <span className="text-slate-950 dark:text-gray-200 text-sm md:text-md font-semibold">
                  {t("common.task")}
                </span>
                <span className="font-medium text-xs text-blue-600 dark:text-blue-400">
                  {t("common.viewAll")}
                </span>
              </div>
              <div className="flex flex-row px-4 lg:px-10 pb-4 lg:pb-10 items-center mt-1">
                <span className="font-light text-xs text-slate-300 dark:text-gray-500 mr-1">
                  {t("date.today")}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              {tasks.map((item: any, index: number) => (
                <button
                  key={index.toString()}
                  onClick={() =>
                    item?.icon ? item.onClick() : setTask(item.title)
                  }
                  className="flex flex-row  justify-between items-center h-10 md:h-14 border-b-[1px] border-gray-200 dark:border-gray-700 px-4 lg:px-10">
                  <span
                    className={`font-light text-xs md:text-sm text-left ${
                      item?.icon
                        ? "text-slate-300 dark:text-gray-500"
                        : "text-slate-900 dark:text-gray-200"
                    }`}>
                    {!item?.icon && (
                      <FontAwesomeIcon
                        icon={isTask == item.title ? faCheckCircle : faCircle}
                        className={`w-3 h-3 mr-3 border-[1px] rounded-full ${
                          isTask == item.title
                            ? "text-blue-500"
                            : "text-white dark:text-gray-800"
                        }`}
                      />
                    )}
                    {item.title}
                  </span>
                  <span
                    className={`font-medium text-[10px] text-right px-2 py-1 rounded-md uppercase ${item.color}`}>
                    {item?.icon ? (
                      <FontAwesomeIcon
                        icon={item.value}
                        className={`w-3 h-3`}
                      />
                    ) : (
                      item.value
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
