"use client"; // Make this a client component to allow onClick

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";

const RootLayout = ({
  children,
  type,
}: {
  children: ReactNode;
  type: FormType;
}) => {
  const router = useRouter();

  // Logout handler
  const handleLogout = async () => {
    await signOut(); // Clear server-side cookie
    router.push("/sign-in"); // Redirect to login page
  };

  return (
    <div className="root-layout">
      <div className="flex justify-between items-center">
        <nav className="flex items-center gap-2">
          <h2>
            {" "}
            <a href="/">FE Interview Prep</a>
          </h2>
        </nav>

        {/* Keep the logout button inline */}
        <button
          className="bg-pink-400 px-10 py-2 rounded-2xl hover:underline hover:cursor-pointer"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      {children}
    </div>
  );
};

export default RootLayout;
