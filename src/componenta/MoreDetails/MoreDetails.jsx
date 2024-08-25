import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImPointRight } from "react-icons/im";
import { Spin } from "antd";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";

const MoreDetails = () => {
  const { id } = useParams();
  const url = `https://car-doctors-server-sigma.vercel.app/api/v1/services/${id}`;

  const {
    data: specificService = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["specificService"],
    queryFn: async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          // headers: {
          //   authorization: localStorage.getItem("token"),
          // },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        if (data && data?.data) {
          return data; // Return the reviews array
        } else {
          toast.error("Data structure from API is invalid");
        }
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    },
  });

  if (error) {
    return <ErrorPage message={error?.message || "Server Error"}></ErrorPage>;
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div className="max-w-full rounded overflow-hidden shadow-lg m-4">
            <img
              className="w-full h-96"
              src={specificService?.data?.img}
              alt={specificService?.data?.title}
            />
            <div className="px-6 py-4">
              <div className="font-serif text-xl mb-2">
                {specificService?.data?.title}
              </div>
              <p className="text-gray-700 text-base">
                {specificService?.data?.description}
              </p>
            </div>

            <div className="px-6 py-4">
              {specificService?.data?.facility.map((item, index) => (
                <div key={index} className="flex m-3">
                  <ImPointRight className="text-xl m-3" />
                  <span className="font-bold text-blue-500">
                    {item?.name}:{" "}
                  </span>
                  <span className="text-gray-700 font-serif">
                    {item?.details}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                price: ${specificService?.data?.price}
              </span>
              <span className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Service Available: ## {`Only Bangladesh`}
              </span>
              <span className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Date: {new Date().toString()}
              </span>
            </div>
            <div className="flex justify-end m-1">
              <button className="btn btn-primary btn-sm">CheckOut</button>
            </div>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default MoreDetails;
