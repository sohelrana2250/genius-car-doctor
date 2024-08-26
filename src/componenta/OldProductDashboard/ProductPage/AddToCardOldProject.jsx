import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../../Pages/Shared/ErrorPage/ErrorPage";
import toast from "react-hot-toast";
import AllDistrict from "../../../utils/AllDistrict";
import DeleteAction from "../../../FetchAction/DeleteAction";

const AddToCardOldProject = () => {
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  const fetchMyAddToCard = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/my_product_addTO_CARD`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      const initialQuantities = {};
      data?.data?.forEach((product) => {
        initialQuantities[product._id] = 1; // default quantity is 1
      });
      setQuantities(initialQuantities);
      calculateTotal(data?.data, initialQuantities);
      return data;
    } catch (error) {
      toast.error(`Failed to fetch products: ${error?.message}`);
      return { data: [] }; // Return an empty array in case of an error
    }
  };

  const handelDeleteOldProduct = (id) => {
    if (id) {
      ///api/v1/delete_addToCard_oldProduct/:id
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/delete_addToCard_oldProduct/${id}`,
        refetch
      );
    }
  };

  const {
    data: myaddtocard = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myaddtocard"],
    queryFn: fetchMyAddToCard,
  });

  const handleIncrement = (productId) => {
    const newQuantities = {
      ...quantities,
      [productId]: quantities[productId] + 1,
    };
    setQuantities(newQuantities);
    calculateTotal(myaddtocard?.data, newQuantities);
  };

  const handleDecrement = (productId) => {
    const newQuantities = {
      ...quantities,
      [productId]: quantities[productId] > 1 ? quantities[productId] - 1 : 1,
    };
    setQuantities(newQuantities);
    calculateTotal(myaddtocard.data, newQuantities);
  };

  const calculateTotal = (products, quantities) => {
    let newTotal = 0;
    products.forEach((product) => {
      newTotal += product.price * quantities[product._id];
    });
    setTotal(newTotal);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }
  const handelSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const district = form.district.value;
    const address = form.address.value;
    const currency = form.currency.value;
    const number = form.number.value;

    const addToCardProduct = {
      district,
      address,
      currency,
      number,
      total,
      quantities,
    };
    if (!!addToCardProduct) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/oldproduct_order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addToCardProduct),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          window.open(data?.url, "_blank");
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  return (
    <>
      <section className="bg-white py-8 antialiased  md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-serif text-gray-900 dark:text-white sm:text-2xl">
            <span className="text-red-500"> O</span>ld{" "}
            <span className="text-green-500">P</span>roduct{" "}
            <span className="text-red-500">S</span>hopping{" "}
            <span className="text-green-500">C</span>art
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {!isLoading &&
                  myaddtocard?.data?.map((product, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={product?.photo}
                            alt={product?._id}
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={product?.photo}
                            alt={product?._id}
                          />
                        </a>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() => handleDecrement(product._id)}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="counter-input"
                              value={quantities[product._id]}
                              readOnly
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            />
                            <button
                              type="button"
                              id="increment-button"
                              onClick={() => handleIncrement(product._id)}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {product?.price} TK
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            <span className="text-xl font-serif">
                              {" "}
                              Product Name{" "}
                            </span>
                            :{product?.name} &&{" "}
                            <span className="text-xl font-serif">
                              {" "}
                              Company Name{" "}
                            </span>
                            :{product.companyName}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                              </svg>
                              Add to Favorites
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handelDeleteOldProduct(product?._id)
                              }
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="sticky top-20 mt-8 w-full max-w-md shrink-0 lg:mt-0 lg:max-w-sm">
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Order Summary
                  </h3>
                  <div className="mt-6 space-y-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">
                        Subtotal (No shipping charges)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {total.toFixed(2)} TK
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600 dark:text-gray-400">
                        Total Amount (Including VAT)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {total.toFixed(2)} TK
                      </dd>
                    </div>
                    <hr />
                    <div>
                      <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                        Order Date
                      </label>
                      <div className="flex pb-4 w-full">
                        <div className="relative w-full">
                          <div className="absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <input
                            type="text"
                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
                            defaultValue={new Date().toString()}
                            name="date"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handelSubmit}>
                      <div className="mt-2">
                        <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                          District | Delivery Charges
                        </label>
                        <div className="flex pb-4 w-full">
                          <div className="relative w-full">
                            <div className="absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                            <select
                              name="district"
                              required
                              className="select select-bordered select-sm w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
                            >
                              <option disabled>District Name</option>
                              {AllDistrict?.map((v, index) => (
                                <option
                                  value={`${v.district_name}-${v.delivery_charges}`}
                                  key={index}
                                >
                                  {v.district_name} | {v.bn_name} - Delivery:{" "}
                                  {v.delivery_charges}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                          Actual Address
                        </label>
                        <div className="flex pb-4 w-full">
                          <div className="relative w-full">
                            <div className="absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                            <input
                              type="text"
                              name="address"
                              required
                              className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
                              placeholder="xxxx xxxx xxxx"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                          Currency
                        </label>
                        <div className="flex pb-4 w-full">
                          <div className="relative w-full">
                            <div className="absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                            <select
                              name="currency"
                              required
                              className="select select-bordered select-sm w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
                            >
                              <option disabled>Choose a Currency</option>
                              <option>BDT</option>
                              <option>USD</option>
                              <option>RMB</option>
                              <option>Euro</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">
                          Contact Number
                        </label>
                        <div className="flex pb-6">
                          <div className="relative w-full">
                            <div className="absolute left-0 top-0 py-3 px-4">
                              <span className="font-normal text-base text-gray-300">
                                Contact Number
                              </span>
                            </div>
                            <input
                              type="number"
                              className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                              placeholder="018/017/019/015/016"
                              name="number"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button className="inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-[#1b5e20] px-3 py-3 text-center text-base font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
                        Check Out
                        <svg
                          className="ms-1 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m2 10 4-4 4 4 4-4"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddToCardOldProject;
