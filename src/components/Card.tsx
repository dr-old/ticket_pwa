import React, { ReactNode } from "react";

interface CardProps {
  header?: any;
  footer?: any;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ header, footer, children }) => {
  return (
    <div className="bg-white shadow-md dark:bg-gray-900/50 rounded-xl w-full text-gray-600 dark:text-gray-400">
      {header && (
        <div className="text-xl font-semibold p-2 md:p-6 text-gray-900 dark:text-gray-100 border-b-[1px] border-gray-200 dark:border-gray-600">
          {header}
        </div>
      )}
      <div className="p-2 md:p-6">{children}</div>
      {footer && (
        <div className="flex justify-end p-2 md:p-6 border-t-[1px] border-gray-200 dark:border-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
