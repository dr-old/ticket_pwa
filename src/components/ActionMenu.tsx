import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ActionMenu = ({
  row,
  onDelete,
}: {
  row: any;
  onDelete: (id: string) => void;
}) => {
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
    <div className="relative z-50" ref={dropdownRef}>
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
            <li>
              <button
                onClick={() => {
                  onDelete(row.original._id);
                }}
                className="block px-4 py-2 items-center justify-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 w-full text-left text-xs">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="w-4 h-4 inline-block mr-2"
                />
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
