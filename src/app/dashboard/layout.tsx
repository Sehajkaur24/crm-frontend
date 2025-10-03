"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Leads", href: "/dashboard/leads" },
  { name: "Opportunity", href: "/dashboard/opportunity" },
  { name: "Events", href: "/dashboard/events" },
  { name: "Task", href: "/dashboard/task" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    router.push("/sign-in");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#7F55B1]">CRM Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-lg font-medium ${
                pathname === link.href
                  ? "bg-[#7F55B1] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow-md flex items-center justify-end p-6">
          <div className="space-x-4">
            <a href="/dashboard/profile" className="text-[#7F55B1] hover:underline">Profile</a>

            <button onClick={handleLogout} className="text-[#7F55B1] hover:underline"> Logout</button>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
