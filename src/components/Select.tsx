import React from "react";

interface SelectProps {
  id: string;
  name: string;
  options: any[];
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  type?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  type,
}) => {
  let style = "";
  if (type === "outline") style = "ring-1 ring-inset ring-gray-300/0";

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:ring-gray-700 ${style} sm:max-w-xs sm:text-sm sm:leading-6`}>
      {options.map((option, index) => (
        <option
          key={index}
          value={option}
          className="dark:bg-gray-800 dark:text-gray-200">
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
