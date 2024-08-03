import React from "react";

interface InputTextAreaProps {
  id: string;
  name: string;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
  id,
  name,
  rows = 3,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  );
};

export default InputTextArea;
