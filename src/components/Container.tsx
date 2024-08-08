// Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Loading from "../utils/loading";

interface ContainerProps {
  title: string;
  loading?: boolean;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ title, loading, children }) => {
  return (
    <div>
      <Navbar title={title} />
      <main className="mx-auto max-w-7xl py-2 md:my-6 px-2 sm:px-6 lg:px-8 font-poppins">
        {children}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity">
            <div className=" w-40 h-40 flex justify-center items-center rounded-lg">
              <Loading />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Container;
