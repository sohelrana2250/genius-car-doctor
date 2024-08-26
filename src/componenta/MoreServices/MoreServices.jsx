import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import { Spin } from "antd";
import ServiceCard from "../../Pages/Home/Services/ServiceCard";

const MoreServices = () => {
  const url = "https://car-doctors-server-sigma.vercel.app/services";
  const {
    data: services = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
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
        return data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error.message}`);
      }
    },
  });

  if (error) {
    return <ErrorPage message={error?.message} />;
  }
  return (
    <>
      <div className="text-center mt-6">
        <h2 className="text-3xl font-serif">Our All Service Area</h2>
        <p className="text-xl font-serif ">
          We Services Have to <span className="text-green-500">P</span>rovid
          <span className="text-red-500">E</span>{" "}
          <span className="text-2xl">{services?.length}</span> types of services
        </p>
      </div>

      <div className=" flex justify-start m-3">
        <select className="select select-info w-full max-w-xs">
          <option disabled selected>
            Select Your Service
          </option>
          <option value="">All Services</option>
          {services?.map((v, index) => (
            <option key={index}>{v?.title}</option>
          ))}
        </select>
      </div>

      {!isLoading ? (
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default MoreServices;
