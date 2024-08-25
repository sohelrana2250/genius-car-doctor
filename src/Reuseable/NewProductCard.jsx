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
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-auto hover:bg-black transition-colors duration-300"
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
                  C. Name:{" "}
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
                    : v?.price}
                </p>
              </div>
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                Category: {v?.categoryDetails?.categorie}
              </p>
              <div className="flex items-center justify-center mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <svg
                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3 dark:bg-blue-200 dark:text-blue-800">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {v?.price - (v?.discount / 100) * v?.price}
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
