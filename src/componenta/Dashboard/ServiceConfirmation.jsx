import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import toast from "react-hot-toast";
import ServiceConfirmationDetails from "./ServiceConfirmationDetails";

const ServiceConfirmation = () => {
  const [search, setSearchTerm] = useState("");
  const {
    data: allservices = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allservices "],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/Admin/AllOrder`,
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
        return data;
      } catch (error) {
        toast.error(`Failed to fetch users: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const AllUniqueServices = [
    ...new Set(allservices?.data?.map((item) => item.serviceName)),
  ];

  return (
    <>
      <div className="container mx-auto p-6 font-mono ">
        <div className="flex items-center justify-center">
          <select
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-l-md text-center bg-blue-900 h-14 text-white"
          >
            <option disabled>All Services </option>
            <option value="">All Services </option>
            {AllUniqueServices?.map((v, index) => (
              <option key={index} value={v}>
                {v}
              </option>
            ))}
          </select>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find  User Search Register Number, Email, And Customer Name"
            required
          />
        </div>
      </div>
      <h2 className="text-3xl font-serif text-center m-3">
        <span className="text-green-600">Y</span>ou{" "}
        <span className="text-red-500">H</span>ave To{" "}
        {allservices?.data?.length} <span className="text-yellow-600">O</span>
        rders
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Delete</th>
              <th>Name</th>
              <th>Job</th>
              <th>User</th>
              <th>Discription</th>
              <th>Register Number</th>
              <th>Is Service</th>
              <th> Is Received</th>
              <th>Delivery Date</th>
              <th>Payment Status</th>
              <th>Update</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              allservices?.data
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item?.email.includes(search) ||
                        item?.serviceName?.toLowerCase() ===
                          search.toLowerCase() ||
                        item?.registerNumber === search ||
                        item?.email.includes(search) ||
                        item?.customer?.toLowerCase() === search.toLowerCase();
                })
                .map((order) => (
                  <ServiceConfirmationDetails
                    key={order._id}
                    order={order}
                    refetch={refetch}
                  ></ServiceConfirmationDetails>
                ))}
            {/* {!isLoading &&
              allservices?.data?.map((order) => (
                <ServiceConfirmationDetails
                  key={order._id}
                  order={order}
                  refetch={refetch}
                ></ServiceConfirmationDetails>
              ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ServiceConfirmation;
