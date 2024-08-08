import React from "react";

interface FormContainerProps {
  name: string;
  iconSuffix?: React.ReactNode;
  children: React.ReactNode;
  labelLeft?: string;
  labelRight?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  name,
  iconSuffix,
  labelLeft,
  labelRight,
  children,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row items-center justify-between">
        {labelLeft && (
          <label
            htmlFor={name}
            className="block text-xs font-normal leading-6 text-gray-400 uppercase mr-3 dark:text-gray-300">
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
        <div className="relative flex flex-col rounded-lg ">
          {children}
          {iconSuffix && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              {iconSuffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
