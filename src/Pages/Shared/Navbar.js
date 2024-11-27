import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { MdLogout } from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setOpenMenu, openMenu }) => {
  const { user, logout } = useContext(AuthContext);
  const [todayFollowup, setTodayFollowup] = useState([]);

  var date = new Date();
  const { data: todayFollowLeads = [] } = useQuery({
    queryKey: ["todayFollowLeads"],
    queryFn: async () => {
      if (user.role === "admin") {
        const res = await fetch(
          `https://demo-usc-crm-software.vercel.app/todayLead/${date}`
        );
        const data = await res.json();
        setTodayFollowup(data);
        return data;
      } else if (user.role === "head") {
        const res = await fetch(
          `https://demo-usc-crm-software.vercel.app/todayLead/${date}`
        );
        const data = await res.json();
        let lData = data.filter((lead) => lead.head.name === user.name);
        setTodayFollowup(lData);
        return data;
      } else {
        const res = await fetch(
          `https://demo-usc-crm-software.vercel.app/todayLead/${date}`
        );
        const data = await res.json();
        let lData = data.filter((lead) => lead.user.name === user.name);
        setTodayFollowup(lData);
        return data;
      }
    },
  });

  // const handleLogOut = () => {
  //     logOut()
  //         .then(() => { })
  //         .then(error => // console.log(error))
  // }

  const menuItem = (
    <>
      {user?._id ? (
        <>
          <li className="font-semibold">
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {user.role === "admin" && (
            <li className="font-semibold">
              <Link to="/dashboard/today-followUps">
                Today Follow Up
                <p className="badge badge-secondary badge-sm">
                  {todayFollowup?.length}
                </p>
              </Link>
            </li>
          )}
          {user.role === "head" && (
            <li className="font-semibold">
              <Link to="/dashboard/today-followUps">
                Today Follow Up
                <p className="badge badge-secondary badge-sm">
                  {todayFollowup?.length}
                </p>
              </Link>
            </li>
          )}
          {user.role === "user" && (
            <li className="font-semibold">
              <Link to="/dashboard/today-followup">
                Today Follow Up
                <p className="badge badge-secondary badge-sm">
                  {todayFollowup?.length}
                </p>
              </Link>
            </li>
          )}

          <li className="text-red-500 font-semibold">
            <button onClick={logout}>
              <MdLogout></MdLogout>
            </button>
          </li>
        </>
      ) : (
        <li className="font-semibold">
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div
      className="sticky top-0 z-50 navbar text-white shadow-lg flex justify-between"
      style={{ backgroundColor: "#0c2556" }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItem}
          </ul>
        </div>
        <div className="flex items-center">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            UST CRM
          </Link>
          <p
            onClick={() => setOpenMenu(!openMenu)}
            className="    text-white    p-1 text-xl rounded-md "
          >
            <FaBars />
          </p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItem}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
