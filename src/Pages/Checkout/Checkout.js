import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import AllDistrict from "../../utils/AllDistrict";
import toast from "react-hot-toast";

const Checkout = () => {
  const { data } = useLoaderData();
  const { _id, title, price } = data;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;
    const district = form.district.value;
    const registerNumber = form.registerNumber.value;
    const serviceingDate = new Date(form.serviceingDate.value);

    const order = {
      serviceId: _id,
      serviceName: title,
      price: Number(price),
      customer: name,
      email,
      phone,
      message,
      district,
      registerNumber,
      serviceingDate,
      paymentStatus: false,
    };

    fetch("https://car-doctors-server-sigma.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Service is Alredy Booking");
        }
        return res.json();
      })
      .then((data) => {
        form.reset();

        if (data) {
          toast.success(data?.message);
          navigate("/orders");
        }
      })
      .catch((er) => toast.error(er?.message));
  };

  return (
    <>
      <div className="bg-white border  rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Car Service</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="product-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="product-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="First Name”"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="category"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  id="brand"
                  defaultValue={user?.email}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  minLength={11}
                  maxLength={11}
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="district"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Districts
                </label>
                <select
                  name="district"
                  className="select select-info w-full max-w-full"
                >
                  <option disabled selected>
                    Select District
                  </option>
                  {AllDistrict?.map((district, index) => (
                    <option
                      key={index}
                      value={`${
                        district.upazila_name + " " + district.district_name
                      }`}
                    >
                      {district.upazila_name + " " + district.district_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  readOnly
                  defaultValue={price}
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="registerNumber"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Car Licance Number/RegisterNumber
                </label>
                <input
                  type="text"
                  maxLength={15}
                  name="registerNumber"
                  id="registerNumber"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Car Licance Number/RegisterNumber"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="serviceingDate"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Serviceing Date
                </label>
                <input
                  type="date"
                  name="serviceingDate"
                  id="serviceingDate"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Serviceing Date"
                  required
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="Message"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  maxLength={150}
                  id="product-details"
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details Message"
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 rounded-b">
              <button
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
