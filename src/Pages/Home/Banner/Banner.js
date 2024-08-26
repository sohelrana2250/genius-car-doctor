import React, { useEffect, useState } from "react";
import img1 from "../../../assets/images/banner/1.jpg";
import img2 from "../../../assets/images/banner/2.jpg";
import img3 from "../../../assets/images/banner/3.jpg";
import img4 from "../../../assets/images/banner/4.jpg";
import img5 from "../../../assets/images/banner/5.jpg";
import img6 from "../../../assets/images/banner/6.jpg";
import BannerItem from "./BannerItem";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const bannerData = [
  {
    image: img1,
    prev: 6,
    id: 1,
    next: 2,
  },
  {
    image: img2,
    prev: 1,
    id: 2,
    next: 3,
  },
  {
    image: img3,
    prev: 2,
    id: 3,
    next: 4,
  },
  {
    image: img4,
    prev: 3,
    id: 4,
    next: 5,
  },
  {
    image: img5,
    prev: 4,
    id: 5,
    next: 6,
  },
  {
    image: img6,
    prev: 5,
    id: 6,
    next: 1,
  },
];

const Banner = () => {
  const images = [
    "https://engineerine.com/wp-content/uploads/2023/01/blog-automotiveparts-eng-1300x980.jpg__1200x690_q85_crop_subsampling-2-1025x589.jpg",
    "https://media.istockphoto.com/id/1034249292/photo/set-of-car-parts-isolated-on-white-background-3d.jpg?s=612x612&w=0&k=20&c=BwXl3LzQau4v40nl9INYToE0mC1SYDA4gBkylspbYis=",
    "https://st2.depositphotos.com/1001335/5886/i/450/depositphotos_58860649-stock-photo-auto-parts-in-the-cardbox.jpg",
    "https://img.freepik.com/premium-photo/new-auto-spare-parts-white-background_93675-89061.jpg",
    "https://t3.ftcdn.net/jpg/07/25/06/10/360_F_725061070_NvRsvD2AhlTIFAYSvJlPmbeHJCFDXUaK.jpg",
    "https://cdn.vectorstock.com/i/500p/20/33/bottle-engine-oil-on-white-background-vector-21192033.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((index) =>
      index === 0 ? images.length - 1 : index - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };
  return (
    <>
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="block mx-auto w-full"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button onClick={goToPrevious} className="btn btn-sm bg-teal-500">
            <FcPrevious className="text-xl text-white" />
          </button>
          <button onClick={goToNext} className="btn  btn-sm bg-teal-500">
            <FcNext className="text-xl text-white" />
          </button>
        </div>
      </div>
      <div className="carousel w-full ">
        {bannerData.map((slide) => (
          <BannerItem key={slide.id} slide={slide}></BannerItem>
        ))}
      </div>
    </>
  );
};

export default Banner;
