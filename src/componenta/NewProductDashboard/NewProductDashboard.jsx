import React from "react";
import "./style.css";
import { allPotterySubCategorie } from "./ProductDashboard";
import { Link, Outlet } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";

const NewProductDashboard = () => {
  return (
    <>
      <Header />
      <div className="drawer drawer-mobile">
        <input
          id="newproduct-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side rounded-sm bg-[url()]">
          <label htmlFor="newproduct-drawer" className="drawer-overlay"></label>

          <ul className="menu  w-56 rounded-sm">
            <li>
              <Link
                to="/new_products"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-white  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  All Products
                </span>
              </Link>
            </li>

            {allPotterySubCategorie?.map((categorie, index) => (
              <li key={index}>
                <details open>
                  <summary>{categorie?.categorieName}</summary>
                  {categorie?.subCategorie?.map((v, index) => (
                    <ul key={index}>
                      <li>
                        <div className="flex justify-start">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-6">
                              <img
                                src={
                                  v.productIcon ||
                                  "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds"
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <Link
                            className="p-2 rounded-sm"
                            to={`/new_products/car/${categorie.id}/${v.path}`}
                          >
                            {v.name}
                          </Link>
                        </div>
                      </li>
                    </ul>
                  ))}
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewProductDashboard;
