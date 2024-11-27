import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, Outlet } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { RiBaseStationLine } from "react-icons/ri";
import { HiStatusOffline } from "react-icons/hi";
import Navbar from "../Pages/Shared/Navbar";
import UserLayout from "../components/LayoutComponent/UserLayout";
import HeadLayout from "../components/LayoutComponent/HeadLayout";
import AdminLayout from "../components/LayoutComponent/AdminLayout";
import AccountsLayout from "../components/LayoutComponent/AccountsLayout";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaGreaterThan,
  FaLessThan,
} from "react-icons/fa";

const DashboardLayoutM = () => {
  const { user, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <div>
      <div>
        <Navbar setOpenMenu={setOpenMenu} openMenu={openMenu}></Navbar>
      </div>

      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
          {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
        </div>

        {openMenu && (
          <div
            className="drawer-side flex flex-col h-full p-3 w-60 min-w-fit text-white"
            style={{ backgroundColor: "#0c2556" }}
          >
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <div className="space-y-3">
              <div className="flex items-center p-2 mt-1 space-x-4  border rounded-lg">
                <img
                  src="https://universesoftcare.com/media/CustomerImage/Untitled-f1.jpg"
                  alt=""
                  className="w-12 h-12 rounded-lg dark:bg-gray-500"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <span className="flex items-center space-x-1">
                    <Link
                      rel="noopener noreferrer"
                      to=""
                      className="text-xs hover:underline dark:text-gray-400"
                    >
                      View profile
                    </Link>
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                  {/* <UserLayout></UserLayout> */}

                  {/* <HeadLayout></HeadLayout> */}

                  <AdminLayout></AdminLayout>

                  {/* <AccountsLayout></AccountsLayout> */}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayoutM;
