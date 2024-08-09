import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  faArrowUpWideShort,
  faArrowDownShortWide,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import Select from "./Select";

export interface TicketProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: any;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TicketTableProps {
  data?: TicketProps[];
  columns: ColumnDef<TicketProps>[];
  title: string;
  sortValue: any;
  sortLabel: any;
  selectedRow: any;
}

const Table: React.FC<TicketTableProps> = ({
  data,
  columns,
  title,
  sortValue,
  sortLabel,
  selectedRow,
}) => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortOption, setSortOption] = useState("createdAt");
  // const [filterOption, setFilterOption] = useState("title");
  // const [filterText, setFilterText] = useState("");

  const columnsMemo = useMemo(() => columns, [columns]);
  const dataMemo = useMemo(() => data, [data]);

  // const filteredData = useMemo(() => {
  //   if (!filterOption) return dataMemo;
  //   return dataMemo?.filter((ticket: any) =>
  //     ticket[filterOption]
  //       .toString()
  //       .toLowerCase()
  //       .includes(filterText.toLowerCase())
  //   );
  // }, [dataMemo, filterOption, filterText]);

  // const sortedData = useMemo(() => {
  //   return filteredData?.length > 0 ? [...filteredData].sort((a: any, b: any) => {
  //     const aValue = a[sortOption];
  //     const bValue = b[sortOption];

  //     if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
  //     if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
  //     return 0;
  //   }): retu;
  // }, [filteredData, sortOption, sortDirection]);

  const table = useReactTable({
    data: dataMemo || [],
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
    <>
      <div className="w-full">
        <div className="overflow-x-auto bg-white dark:bg-gray-900/50 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between py-6 px-6">
            <h1 className="text-gray-900 dark:text-gray-100 lg:text-md font-medium">
              {title}
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
                data={sortValue}
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
                      {/* <span>
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
                    </span> */}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
    </>
  );
};

export default Table;
