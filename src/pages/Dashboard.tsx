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

const Dashboard = () => {
  const auth = useAuth();
  const [isTask, setTask] = useState<any | null>(null);

  const data = [
    { title: "Unresolved", value: 60 },
    { title: "Overdue", value: 16 },
    { title: "Open", value: 43 },
    { title: "On Hold", value: 64 },
  ];

  const unresolved = [
    { title: "Waiting on Feature Request", value: 4238 },
    { title: "Awaiting Customer Response", value: 1005 },
    { title: "Awaiting Developer Fix", value: 914 },
    { title: "Pending", value: 281 },
  ];

  const dataChart = [
    { title: "Resolved", value: 449 },
    { title: "Received", value: 426 },
    { title: "Average first response time", value: "33m" },
    { title: "Average response time", value: "3h 8m" },
    { title: "Resolution within SLA", value: "94%" },
  ];

  const tasks = [
    {
      title: "Create new task",
      value: faPlus,
      icon: true,
      color: "bg-gray-100 dark:bg-gray-700",
      onClick: () => console.log(1),
    },
    {
      title: "Finish ticket update",
      value: "urgent",
      color: "bg-orange-400 text-white",
    },
    {
      title: "Create new ticket example",
      value: "new",
      color: "bg-green-400 text-white",
    },
    {
      title: "Update ticket report",
      value: "default",
      color: "bg-gray-100 dark:bg-gray-700",
    },
  ];

  return (
    <Container title="Overview">
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
                      Today's trends
                    </span>
                    <span className="font-light text-xs text-slate-300 dark:text-gray-500 mr-1 mt-1">
                      as of {moment().format("D MMMM YYYY h:mm A")}
                    </span>
                  </div>

                  <div className="flex flex-row gap-2 lg:gap-6">
                    <span className="flex flex-row items-center font-medium text-xs text-slate-300 dark:text-gray-500">
                      <div className="bg-blue-600 dark:bg-blue-400 w-3 h-1 rounded-sm mr-2" />
                      Today
                    </span>
                    <span className="flex flex-row items-center font-medium text-xs text-slate-300 dark:text-gray-500">
                      <div className="bg-gray-400 w-3 h-1 rounded-sm mr-2" />
                      Yesterday
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
                  Unresolved
                </span>
                <span className="font-medium text-xs text-blue-600 dark:text-blue-400">
                  View details
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
                  Tasks
                </span>
                <span className="font-medium text-xs text-blue-600 dark:text-blue-400">
                  View all
                </span>
              </div>
              <div className="flex flex-row px-4 lg:px-10 pb-4 lg:pb-10 items-center mt-1">
                <span className="font-light text-xs text-slate-300 dark:text-gray-500 mr-1">
                  Today
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
