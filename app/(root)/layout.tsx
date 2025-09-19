import Image from "next/image";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <link href="/" className="flex items-center gap-2" />
        <h2>InterviewPrep</h2>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
