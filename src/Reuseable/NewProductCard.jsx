import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import PostAction from "../FetchAction/PostAction";

const NewProductCard = ({ data, search }) => {
  const handelProduct = (product) => {
    let { _id, name, photo, price, discount, companyName } = product || {};
    price = price - (price * discount) / 100;

    PostAction(`${process.env.REACT_APP_SERVER_URL}/addToCard`, {
      productId: _id,
      name,
      image: photo,
      price,
      companyName,
    });
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
      {data
        ?.filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item?.name.toLowerCase() === search.toLowerCase() ||
                item?.companyName?.toLowerCase().includes(search.toLowerCase());
        })
        .map((v, index) => (
          <div
            key={index}
            className="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-100 dark:border-gray-100 m-auto hover:bg-base-200 transition-colors duration-300"
          >
            <a href="#">
              <img
                className="w-full h-64 object-cover rounded-t-lg"
                src={v?.photo}
                alt="product image"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                  {v?.name}
                </h5>
              </a>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Company Name:{" "}
                  <span className="font-semibold">{v?.companyName}</span>
                </p>
                <p className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  Sales-Of: {v?.discount}%
                </p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Available:{" "}
                  <span className="font-semibold">{v?.available}</span>
                </p>
                <p className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  #Selling Price:{" "}
                  {v?.discount >= 1
                    ? v?.price - (v?.discount / 100) * v?.price
                    : v?.price}{" "}
                  tk
                </p>
              </div>
              <p className="text-start text-gray-700 dark:text-gray-300 mb-4">
                Category: {v?.categoryDetails?.categorie}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  Tk {v?.price - (v?.discount / 100) * v?.price}
                </span>
                <button
                  onClick={() => handelProduct(v)}
                  className="text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <div className="flex">
                    <GiShoppingCart className="text-xl mr-3 " /> to cart
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewProductCard;
