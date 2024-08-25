import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./style.css";
import { allPotterySubCategorie } from "./ProductDashboard";
import Footer from "../../Pages/Shared/Footer/Footer";
import { MdPostAdd } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";

const OldProductDashboard = () => {
  return (
    <>
      <Header />

      <div className="drawer drawer-mobile">
        <input
          id="oldproduct-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="oldproduct-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64  text-base-content space-y-2">
            <li>
              <Link
                to="/old_products"
                className="btn  bg-black text-white mr-1"
              >
                <span className="text-xl mr-1 text-white">All Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/old_products/post_product"
                className="btn  bg-black text-white mr-1"
              >
                <div className="flex items-center text-white">
                  <MdPostAdd className="text-xl mr-1" />
                  <span>Post Product</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/old_products/my_post"
                className="btn  bg-black text-white mr-1"
              >
                <div className="flex items-center text-white">
                  <CiCircleList className="text-xl mr-1" />
                  <span>My Post List</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/add_to_card/oldProduct"
                className="btn  bg-black text-white mr-1"
              >
                <div className="flex items-center text-white">
                  <MdOutlineShoppingCart className="text-2xl mr-1" />
                  <span>Add To Card</span>
                </div>
              </Link>
            </li>

            {allPotterySubCategorie?.map((categorie, index) => (
              <li key={index}>
                <details open>
                  <summary>{categorie?.categorieName}</summary>
                  {categorie?.subCategorie?.map((v, index) => (
                    <ul key={index}>
                      <li>
                        <div className="flex items-center">
                          <div className="avatar placeholder mr-2">
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
                            to={`/old_products/car/${categorie.id}/${v.path}`}
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

export default OldProductDashboard;
