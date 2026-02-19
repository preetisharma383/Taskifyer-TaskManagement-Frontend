"use client";

import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";

function Sidebar() {
  const { logoutUser } = useUserContext();

  return (
    <aside
      className="
        w-full
        lg:w-80
        lg:fixed lg:right-0 lg:top-20
        lg:h-[calc(100vh-5rem)]
        bg-[#f9f9f9]
        flex flex-col
        border-l
        p-4
      "
    >
      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <Profile />

        <div className="my-4">
          <RadialChart />
        </div>
      </div>

      {/* SIGN OUT – ALWAYS VISIBLE */}
      <button
        onClick={logoutUser}
        className="
          w-full
          py-3
          bg-[#EB4E31]
          text-white
          rounded-full
          hover:bg-[#3aafae]
          mt-4
        "
      >
        Sign Out
      </button>
    </aside>
  );
}

export default Sidebar;
