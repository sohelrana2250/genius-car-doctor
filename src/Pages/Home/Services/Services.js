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
        <p className="text-2xl font-serif text-orange-600">Services</p>
        <h2 className="text-5xl font-semibold">Our Service Area</h2>
        <p className="text-xl m-3">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services?.slice(0, 6)?.map((service) => (
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
