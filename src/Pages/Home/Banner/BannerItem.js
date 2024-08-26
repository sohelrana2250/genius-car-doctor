import React from "react";
import "./BannerItem.css";
import { Link } from "react-router-dom";

const BannerItem = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-img">
        <img src={image} alt="" className="w-full rounded-sm" />
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/3">
        <h1 className="text-4xl font-serif text-white ">
          Affordable Price for Car Servicing
        </h1>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 w-2/5 left-24 top-1/2">
        <p className="text-xl text-white">
          There are many variations of passages of available, but the majority
          have suffered alteration in some form
        </p>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-3/4">
        <Link to="/new_products" className="btn btn-primary mr-5">
          New Product
        </Link>
        <Link to="/old_products" className="btn btn-outline btn-primary">
          Old Product
        </Link>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">
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
