import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

const RootLayout = async ({
  children,
  type,
}: {
  children: ReactNode;
  type: FormType;
}) => {
  const isUserAuthenticated = await isAuthenticated();
  const isSignIn = type === "sign-in";

  //all non logged in users wont be abeleto see the home page
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <div className="flex justify-between">
        <nav>
          <link href="/" className="flex items-center gap-2" />
          <h2>FE Interview Prep</h2>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default RootLayout;
