import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  sortColumn: any;
  setSortColumn: (column: any) => void;
  data: any;
  label: string;
  type?: string;
  icon?: any;
  reverse?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  sortColumn,
  setSortColumn,
  data,
  label,
  type,
  icon,
  reverse,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTitle, setTitle] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (option: any) => {
    setSortColumn(option.value);
    setTitle(option.title);
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
        type="button"
        className={`inline-flex justify-between items-center w-full ${
          type === "box"
            ? "rounded-md border border-gray-300 shadow-sm px-4 dark:border-gray-600"
            : ""
        } py-2 text-xs font-medium text-gray-700 dark:text-gray-200 flex ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={`w-3 h-3 ${reverse ? "ml-2" : "mr-2"}`}
          />
        )}
        {(isTitle !== "None" ? isTitle : null) || label}
      </button>
      {isOpen && (
        <div
          className="origin-top-right z-10 absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <div className="py-1" role="none">
            {data.map((item: any, index: number) => (
              <button
                key={index.toString()}
                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                role="menuitem"
                onClick={() => handleOptionChange(item)}>
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
