import React from "react";

interface InputTextProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  iconSuffix?: React.ReactNode; // Optional icon suffix
  labelLeft?: string; // Label on the left side
  labelRight?: string; // Label on the right side
  error?: any; // Error message
}

// Use forwardRef to handle refs properly
const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      id,
      name,
      type = "text",
      placeholder,
      autoComplete,
      value,
      onChange,
      iconSuffix,
      labelLeft,
      labelRight,
      error,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          {labelLeft && (
            <label
              htmlFor={name}
              className="block text-sm font-medium leading-6 text-gray-400 uppercase mr-3 dark:text-gray-300">
              {labelLeft}
            </label>
          )}
          {labelRight && (
            <label
              htmlFor={name}
              className="block text-xs font-normal leading-6 text-gray-400 lowercase ml-3 dark:text-gray-300">
              {labelRight}
            </label>
          )}
        </div>
        <div className="flex-1">
          <div className="relative flex items-center rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={value}
              onChange={onChange}
              ref={ref} // Forward ref here
              className={`block w-full text-xs rounded-lg border-0 py-3 md:p-2 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6 ${
                error ? "border-red-500 dark:border-red-600" : ""
              }`}
            />
            {iconSuffix && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                {iconSuffix}
              </span>
            )}
          </div>
          {error && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

InputText.displayName = "InputText"; // Set displayName for debugging

export default InputText;
