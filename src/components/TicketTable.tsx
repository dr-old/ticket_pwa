import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faSort,
  faSortDown,
  faSortUp,
  faEllipsisVertical,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import Select from "./Select";

interface Ticket {
  id: number;
  detail: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  joinDate: string;
  priority: string;
  imageUrl: string;
}

const data: Ticket[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  detail: `Ticket detail ${index + 1}`,
  customerName: `Customer ${index + 1}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  joinDate: new Date().toISOString(),
  priority: ["high", "low", "normal"][index % 3],
  imageUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
}));

const priorityColor = {
  high: "bg-red-500",
  low: "bg-yellow-500",
  normal: "bg-green-500",
};

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "detail",
    header: "Ticket Detail",
    cell: (info: any) => (
      <div className="flex flex-row items-center">
        <img
          src={info.row.original.imageUrl}
          alt="User"
          className="w-8 h-8 object-cover rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200">
            {info.row.original.detail}
          </span>
          <span className="text-[10px] text-gray-300 dark:text-gray-500">
            Updated {moment(info.row.original.updatedAt).fromNow()}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: (info: any) => (
      <div className="flex flex-col">
        <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200">
          {info.row.original.customerName}
        </span>
        <span className="text-[10px] text-gray-300 dark:text-gray-500">
          On {moment(info.row.original.joinDate).format("MMMM D, YYYY")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info: any) => (
      <div className="flex flex-col">
        <span className="font-medium text-xs capitalize text-gray-600 dark:text-gray-200">
          {moment(info.getValue()).format("MMMM D, YYYY")}
        </span>
        <span className="text-[10px] text-gray-300 dark:text-gray-500">
          {moment(info.getValue()).format("h:mm A")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (info: any) => (
      <span
        className={`font-medium text-[10px] px-3 py-1 rounded-xl uppercase text-white ${
          priorityColor[info.getValue() as keyof typeof priorityColor]
        }`}>
        {info.getValue()}
      </span>
    ),
  },
  {
    header: " ",
    cell: ({ row }) => <ActionMenu row={row} />,
    enableSorting: false, // Disable sorting for the "Action" column
  },
];

const ActionMenu = ({ row }: { row: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleClick}
        className="text-gray-500 hover:text-gray-900 p-2 rounded focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
        <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-40 bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700 shadow-lg rounded-md">
          <ul className="py-1">
            <li>
              <button
                onClick={() => {
                  handleClose();
                  // Add edit action here
                }}
                className="block px-4 py-2 items-center justify-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 w-full text-left text-xs">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="w-4 h-4 inline-block mr-2"
                />
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleClose();
                  // Add view action here
                }}
                className="block px-4 py-2 items-center justify-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 w-full text-left text-xs">
                <FontAwesomeIcon
                  icon={faEye}
                  className="w-4 h-4 inline-block mr-2"
                />
                View
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const filterLabel = [
  { title: "None", value: "" },
  { title: "Detail", value: "detail" },
  { title: "Customer Name", value: "customerName" },
  { title: "Date", value: "createdAt" },
  { title: "Priority", value: "priority" },
];

const sortLabel = [
  { title: "None", value: "" },
  { title: "Ascending", value: "asc" },
  { title: "Descending", value: "desc" },
];

const TicketTable: React.FC = () => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortOption, setSortOption] = useState("createdAt");
  const [filterOption, setFilterOption] = useState("detail");
  const [filterText, setFilterText] = useState("");
  const columnsMemo = useMemo(() => columns, []);
  const dataMemo = useMemo(() => data, []);

  const filteredData = useMemo(() => {
    if (!filterOption) return dataMemo;
    return dataMemo.filter((ticket: any) =>
      ticket[filterOption]
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  }, [dataMemo, filterOption, filterText]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a: any, b: any) => {
      const aValue = a[sortOption];
      const bValue = b[sortOption];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortOption, sortDirection]);

  const table = useReactTable({
    data: sortedData,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    getState,
    setPageSize,
    previousPage,
    nextPage,
    setPageIndex,
  } = table;

  const { pageIndex, pageSize } = getState().pagination;

  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white dark:bg-gray-900/50 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between py-6 px-6">
          <h1 className="text-gray-900 dark:text-gray-100 lg:text-md font-medium">
            All Tickets
          </h1>
          <div className="flex items-center space-x-4">
            <Dropdown
              sortColumn={sortDirection}
              setSortColumn={setSortDirection}
              data={sortLabel}
              label="Sort"
              icon={
                sortDirection === "desc"
                  ? faArrowDownShortWide
                  : faArrowUpWideShort
              }
            />
            <div className="w-4 h-4" />
            <Dropdown
              sortColumn={sortOption}
              setSortColumn={setSortOption}
              data={filterLabel}
              label="Filter"
              icon={faFilter}
            />
            {/* <TextField
              label="Filter"
              variant="outlined"
              size="small"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-48 text-xs"
              InputProps={{
                endAdornment: (
                  <FontAwesomeIcon
                    icon={faFilter}
                    className="text-gray-500 text-xs"
                  />
                ),
                classes: {
                  input: "text-xs",
                },
              }}
              InputLabelProps={{
                className: "text-xs",
              }}
            /> */}
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-white dark:bg-gray-900/50">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b-[1px] border-gray-200 dark:border-gray-700 px-6 py-3 text-left text-xs items-center justify-center font-semibold text-gray-400 dark:text-gray-500 capitalize tracking-wider cursor-pointer"
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span>
                      {{
                        asc: (
                          <FontAwesomeIcon
                            icon={faSortUp}
                            className="w-4 h-4"
                          />
                        ),
                        desc: (
                          <FontAwesomeIcon
                            icon={faSortDown}
                            className="w-4 h-4"
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? (
                        <FontAwesomeIcon icon={faSort} className="w-4 h-4" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900/50 divide-y divide-gray-200 dark:divide-gray-700">
            {getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end py-3 px-6 gap-x-10">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Rows per page{" "}
            </span>
            <div className="">
              <Select
                id="example-select"
                name="exampleSelect"
                options={[10, 20, 30, 40, 50]}
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {pageIndex + 1} of {getPageCount()} Page
            </span>
            <div>
              <button
                onClick={() => previousPage()}
                disabled={!getCanPreviousPage()}
                className="px-2 py-1 mx-1 text-lg disabled:opacity-30 dark:text-gray-500 dark:disabled:opacity-40">
                {"<"}
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!getCanNextPage()}
                className="px-2 py-1 mx-1 text-lg disabled:opacity-30 dark:text-gray-500 dark:disabled:opacity-40">
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
