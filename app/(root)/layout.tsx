import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  //all non logged in users wont be abeleto see the home page
  if (!isUserAuthenticated) redirect("/sign-in");

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
