import { useAuth } from "../context/useAuth";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 sm:items-stretch sm:justify-start">
          <div className="flex">
            <a
              aria-current="page"
              className="text-gray-900 dark:text-gray-100 rounded-md py-2 text-sm md:text-md font-medium capitalize">
              {title}
            </a>
          </div>
        </div>
        <div className="absolute text-gray-300 dark:text-gray-400 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            className="relative rounded-full p-1 hover:text-gray-500 dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faSearch} className="" />
          </button>
          <button
            type="button"
            className="relative rounded-full ml-4 p-1 hover:text-gray-500 dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faBell} className="" />
          </button>

          <span className="hidden lg:inline-block lg:mx-6">|</span>

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div className="flex items-center">
              <MenuButton className="relative flex items-center text-sm">
                <span className="mr-4 hidden sm:inline-block text-xs font-medium text-gray-800 dark:text-gray-100">
                  {user?.fullname}
                </span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700 focus:outline-none transition-transform duration-100 ease-out">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 my-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100">
                  Your Profile
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 my-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100">
                  Settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 my-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100">
                  Sign out
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
