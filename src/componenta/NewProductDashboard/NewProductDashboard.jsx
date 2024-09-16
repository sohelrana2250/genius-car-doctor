import React from "react";
import "./style.css";
import { allPotterySubCategorie } from "./ProductDashboard";
import { Link, Outlet } from "react-router-dom";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";
import { FaAmazonPay } from "react-icons/fa";
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
                className="btn rounded-sm  bg-black text-white m-2"
              >
                <div className="flex items-center text-white">
                  <span> All Products</span>
                </div>
              </Link>
            </li>
            {/* payment laser */}
            <li>
              <Link
                to="/new_products/my_payment_laser"
                className="btn rounded-sm  bg-black text-white ml-1 mr-1"
              >
                <div className="flex items-center text-white">
                  <FaAmazonPay className="text-xl mr-1" />
                  <span> my payment laser</span>
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
