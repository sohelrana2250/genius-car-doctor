import React from "react";
import "./BannerItem.css";
import { Link } from "react-router-dom";

const BannerItem = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div className="absolute flex flex-col justify-center transform -translate-y-1/2 left-5 md:left-10 lg:left-24 top-1/3">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-serif text-white">
          Affordable Price for Car Servicing
        </h1>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 w-4/5 md:w-3/5 lg:w-2/5 left-5 md:left-10 lg:left-24 top-1/2">
        <p className="text-sm md:text-lg lg:text-xl text-white">
          There are many variations of passages of available, but the majority
          have suffered alteration in some form
        </p>
      </div>
      <div className="absolute flex flex-col sm:flex-row justify-start transform -translate-y-1/2 w-4/5 md:w-3/5 lg:w-2/5 left-5 md:left-10 lg:left-24 top-3/4 space-y-2 sm:space-y-0 sm:space-x-5">
        <Link to="/new_products" className="btn btn-primary">
          New Product
        </Link>
        <Link to="/old_products" className="btn  btn-primary">
          Old Product
        </Link>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItem;
