import React from "react";

interface SelectProps {
  id: string;
  name: string;
  label?: string;
  options: any[];
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  type?: string;
  error?: any; // Error message
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  type,
  error,
}) => {
  let style = "";
  if (type === "outline") style = "ring-1 ring-inset ring-gray-300/0";

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        {label && (
          <label
            htmlFor={name}
            className="block text-xs font-normal leading-6 text-gray-400 uppercase mr-3 dark:text-gray-300">
            {label}
          </label>
        )}
      </div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:ring-gray-700 ${style} sm:max-w-xs sm:text-sm sm:leading-6`}>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="dark:bg-gray-800 dark:text-gray-200">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;
