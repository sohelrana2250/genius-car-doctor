import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://car-doctors-server-sigma.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="text-5xl font-serif text-orange-600">Our Services</h1>
        <h2 className="text-4xl font-semibold">
          Best Car Service Center In Dhaka, Bangladesh
        </h2>
        <p className="text-x2 m-3">
          Car Doctor- The best car service center in Dhaka providing top quality
          auto repair services for all vehicle types. If you are looking for the
          best car repair services, Then we are the best leading multi-brand car
          workshop for you.{" "}
        </p>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services?.slice(0, 3)?.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
      <div className="flex justify-center items-center m-3">
        <Link
          to="/more-services"
          className="btn btn-outline btn-primary btn-sm "
        >
          More Services
        </Link>
      </div>
    </div>
  );
};

export default Services;
