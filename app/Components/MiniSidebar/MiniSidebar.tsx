"use client";

import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTasks } from "@/context/taskContext";

function MiniSidebar() {
  const pathname = usePathname();
  const { clearAllTasks } = useTasks();

  const getStrokeColor = (link: string) =>
    pathname === link ? "#3aafae" : "#71717a";

  const navItems = [
    { icon: <IconGrid strokeColor={getStrokeColor("/")} />, link: "/" },
    { icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />, link: "/completed" },
    { icon: <IconCheck strokeColor={getStrokeColor("/pending")} />, link: "/pending" },
    { icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />, link: "/overdue" },
  ];

  return (
    <aside className="hidden md:flex w-20 flex-col bg-[#f9f9f9] border-r">
      <div className="h-20 flex items-center justify-center">
        <Image src="/logo.png" width={28} height={28} alt="logo" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-between py-8">
        <ul className="flex flex-col gap-8">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link href={item.link}>{item.icon}</Link>
            </li>
          ))}
        </ul>

        {/* DELETE ALL */}
        <button
          onClick={clearAllTasks}
          className="w-12 h-12 flex items-center justify-center border-2 border-[#EB4E31] rounded-full hover:bg-red-50"
        >
          <IconDeleteAll strokeColor="#EB4E31" />
        </button>
      </div>
    </aside>
  );
}

export default MiniSidebar;
