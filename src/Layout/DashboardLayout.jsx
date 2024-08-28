import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
import { FaRegUser } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  MdLockReset,
  MdOutlinePassword,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { GiLoveMystery } from "react-icons/gi";
import { FcReuse } from "react-icons/fc";
import { FaAmazonPay } from "react-icons/fa";
import { LiaCcAmazonPay } from "react-icons/lia";
import { SiPaytm } from "react-icons/si";
import useAdmin from "../hooks/useAdmin";
const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [isAdmin] = useAdmin();

  const AdminRoutes = [
    {
      icon: <FaRegUser className="text-xl" />,
      name: "All users",
      path: "/dashboard/allusers",
    },
    {
      icon: <GrServices className="text-xl" />,
      name: "Service Confirmation",
      path: "/dashboard/service_confirmation",
    }, //https://verify.bmdc.org.bd/
    {
      icon: <BiCategory className="text-xl" />,
      name: "Create Categorie",
      path: "/dashboard/create_categorie",
    },
    {
      icon: <TbCategoryPlus className="text-xl" />,
      name: "All Categorie",
      path: "/dashboard/all_categorie",
    },
    {
      icon: <RiProductHuntLine className="text-xl" />,
      name: "All Product",
      path: "/dashboard/all_product_list",
    },
    {
      icon: <MdOutlineShoppingCartCheckout className="text-xl" />,
      name: "All Add To Card",
      path: "/dashboard/all_addtocard_product",
    },
    {
      icon: <GiLoveMystery className="text-xl" />,
      name: "All Favorite",
      path: "/dashboard/all_favorite_product",
    },
    {
      icon: <FcReuse className="text-xl" />,
      name: "Reuseable Product",
      path: "/dashboard/all_old_product_list",
    },
    {
      icon: <FaAmazonPay className="text-xl" />,
      name: "Service Payments",
      path: "/dashboard/service_transaction",
    },
    {
      icon: <LiaCcAmazonPay className="text-xl" />,
      name: "New Product Pay",
      path: "/dashboard/new_product_paymentlist",
    },
    {
      icon: <SiPaytm className="text-xl" />,
      name: "Old Product Pay",
      path: "/dashboard/old_product_paymentlist",
    },
    {
      icon: <BsGraphUpArrow className="text-xl" />,
      name: "Activity",
      path: "/dashboard",
    },

    {
      icon: <MdOutlinePassword className="text-xl" />,
      name: "Chnage Password",
      path: "/new_products/chnage_password",
    },
    {
      icon: <MdLockReset className="text-xl" />,
      name: "Reset Password",
      path: "/reset_password",
    },
  ];

  return (
    <>
      <div>
        <Header />
        <div className="drawer drawer-mobile">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-64   text-base-content m-1">
              {isAdmin &&
                AdminRoutes?.map((v, index) => {
                  const isActive = pathname === v.path;

                  return (
                    <li key={index}>
                      <div>
                        {v.icon}
                        <Link
                          className={`m-1 ${
                            isActive ? "text-blue-500" : "text-gray-600"
                          }`}
                          to={v.path}
                        >
                          {v.name}
                        </Link>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
