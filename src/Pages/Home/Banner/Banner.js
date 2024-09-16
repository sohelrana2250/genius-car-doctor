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

// const bannerData = [
//   {
//     image: img1,
//     prev: 6,
//     id: 1,
//     next: 2,
//   },
//   {
//     image: img2,
//     prev: 1,
//     id: 2,
//     next: 3,
//   },
//   {
//     image: img3,
//     prev: 2,
//     id: 3,
//     next: 4,
//   },
//   {
//     image: img4,
//     prev: 3,
//     id: 4,
//     next: 5,
//   },
//   {
//     image: img5,
//     prev: 4,
//     id: 5,
//     next: 6,
//   },
//   {
//     image: img6,
//     prev: 5,
//     id: 6,
//     next: 1,
//   },
// ];

const bannerData = [
  {
    image: img6,
    prev: 6,
    id: 1,
    next: 2,
  },
  {
    image: img5,
    prev: 1,
    id: 2,
    next: 3,
  },
  {
    image: "https://etimg.etb2bimg.com/photo/86529545.cms",
    prev: 2,
    id: 3,
    next: 4,
  },
  {
    image:
      "https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    prev: 3,
    id: 4,
    next: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/13065697/pexels-photo-13065697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    prev: 4,
    id: 5,
    next: 6,
  },
  {
    image:
      "https://engineerine.com/wp-content/uploads/2023/01/blog-automotiveparts-eng-1300x980.jpg__1200x690_q85_crop_subsampling-2-1025x589.jpg",
    prev: 5,
    id: 6,
    next: 7,
  },
  {
    image:
      "https://images.pexels.com/photos/21407448/pexels-photo-21407448/free-photo-of-screen-in-a-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    prev: 6,
    id: 7,
    next: 8,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1682147836683-75f42f4f1c59?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prev: 7,
    id: 8,
    next: 9,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664298955509-88ea1e6f7bc4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prev: 8,
    id: 9,
    next: 10,
  },
  {
    image: img4,
    prev: 9,
    id: 10,
    next: 11,
  },
  {
    image: img3,
    prev: 10,
    id: 11,
    next: 12,
  },
  {
    image: img2,
    prev: 11,
    id: 12,
    next: 13,
  },
  {
    image: img1,
    prev: 12,
    id: 13,
    next: 14,
  },
  {
    image:
      "https://t3.ftcdn.net/jpg/07/25/06/10/360_F_725061070_NvRsvD2AhlTIFAYSvJlPmbeHJCFDXUaK.jpg",
    prev: 13,
    id: 14,
    next: 15,
  },
  {
    image:
      "https://cdn.vectorstock.com/i/500p/20/33/bottle-engine-oil-on-white-background-vector-21192033.jpg",
    prev: 14,
    id: 15,
    next: 16,
  },
  {
    image:
      "https://images.unsplash.com/photo-1594535182308-8ffefbb661e1?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    prev: 15,
    id: 16,
    next: 17,
  },
  {
    image:
      "https://cdn.vectorstock.com/i/500p/20/33/bottle-engine-oil-on-white-background-vector-21192033.jpg",
    prev: 16,
    id: 17,
    next: 1, // Looping back to the first banner
  },
];

const Banner = () => {
  const images = [
    "https://images.pexels.com/photos/4488654/pexels-photo-4488654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/8a367195680017.5e9d68225fa65.png",
    "https://images.pexels.com/photos/7144226/pexels-photo-7144226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3862618/pexels-photo-3862618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/13065697/pexels-photo-13065697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://engineerine.com/wp-content/uploads/2023/01/blog-automotiveparts-eng-1300x980.jpg__1200x690_q85_crop_subsampling-2-1025x589.jpg",
    "https://images.pexels.com/photos/21407448/pexels-photo-21407448/free-photo-of-screen-in-a-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://plus.unsplash.com/premium_photo-1682147836683-75f42f4f1c59?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664298955509-88ea1e6f7bc4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1708063785769-43da3123684d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.istockphoto.com/id/1034249292/photo/set-of-car-parts-isolated-on-white-background-3d.jpg?s=612x612&w=0&k=20&c=BwXl3LzQau4v40nl9INYToE0mC1SYDA4gBkylspbYis=",
    "https://st2.depositphotos.com/1001335/5886/i/450/depositphotos_58860649-stock-photo-auto-parts-in-the-cardbox.jpg",
    "https://img.freepik.com/premium-photo/new-auto-spare-parts-white-background_93675-89061.jpg",
    "https://t3.ftcdn.net/jpg/07/25/06/10/360_F_725061070_NvRsvD2AhlTIFAYSvJlPmbeHJCFDXUaK.jpg",
    "https://cdn.vectorstock.com/i/500p/20/33/bottle-engine-oil-on-white-background-vector-21192033.jpg",
    "https://images.unsplash.com/photo-1594535182308-8ffefbb661e1?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      {/* <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="block mx-auto w-full h-fit"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button onClick={goToPrevious} className="btn btn-sm bg-teal-500">
            <FcPrevious className="text-xl text-white" />
          </button>
          <button onClick={goToNext} className="btn  btn-sm bg-teal-500">
            <FcNext className="text-xl text-white" />
          </button>
        </div>
      </div> */}
      <div className="carousel w-full ">
        {bannerData.map((slide) => (
          <BannerItem key={slide.id} slide={slide}></BannerItem>
        ))}
      </div>
    </>
  );
};

export default Banner;
