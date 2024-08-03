// Layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface ContainerProps {
  title: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <div>
      <Navbar title={title} />
      <main className="mx-auto max-w-7xl py-2 md:my-6 px-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Container;
