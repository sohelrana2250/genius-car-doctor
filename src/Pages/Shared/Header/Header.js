import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiShoppingCart } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";
import { MdOutlinePassword } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  console.log(user?.photoURL);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.setItem("token", "");
        toast.success("Successfully logged out");
      })
      .catch((error) => toast.error(error?.message));
  };

  const menuItems = (
    <>
      <li className="font-serif">
        <Link to="/">Home</Link>
      </li>
      <li className="font-serif">
        <Link to="/more-services">Services</Link>
      </li>
      <li className="font-serif">
        <Link to="/new_products">New Products</Link>
      </li>
      <li className="font-serif">
        <Link to="/old_products">Buy/Sell Products</Link>
      </li>
      <li className="font-serif">
        <Link to="/about">About</Link>
      </li>
      <li className="font-serif">
        <Link to="/having_trouble">Having Trouble</Link>
      </li>
      {user?.email && user?.emailVerified ? (
        <>
          {/* <li className="font-serif">
            <Link to="/orders">Orders</Link>
          </li> */}

          <li className="font-serif">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </>
      ) : (
        <>
          <li className="font-serif">
            <Link to="/login">Login</Link>
          </li>
          <li className="font-serif">
            <Link to="/signup">Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar h-20  pt-12 bg-base-300">
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
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img className="w-16" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>

      {/* <label
        htmlFor="my-drawer-2"
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
      </label> */}
      <div className="navbar-end space-x-2">
        <div className="flex justify-end">
          <Link
            to={`/my_favorite`}
            className="btn btn-outline btn-error btn-sm m-1"
          >
            <GrFavorite className="text-2xl" />
          </Link>
          <Link to={`/add_to_card`} className="btn btn-outline btn-sm m-1">
            <GiShoppingCart className="text-2xl" />
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt=""
                src={
                  user?.photoURL ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/new_products/chnage_password">
                <div className="flex m-1">
                  <MdOutlinePassword className="text-xl mr-2" />
                  <span>Reset Password</span>
                </div>
              </Link>
            </li>
            {/* /new_products/reset_password */}
            <li>
              <Link to="/reset_password">
                <div className="flex m-1">
                  <MdLockReset className="text-xl mr-2" />
                  <span>Forget Password</span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/about">
                <div className="flex m-1">
                  <TbArrowRoundaboutRight className="text-xl mr-2" />
                  <span>About</span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/service">
                <div className="flex m-1">
                  <MdMiscellaneousServices className="text-xl mr-2" />
                  <span>Service</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/delete_account">
                <div className="flex m-1">
                  <MdAutoDelete className="text-xl mr-2" />
                  <span>Delete Account</span>
                </div>
              </Link>
            </li>
            <li>
              {user?.uid && user?.emailVerified && (
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-error btn-outline text-white hidden lg:block"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
