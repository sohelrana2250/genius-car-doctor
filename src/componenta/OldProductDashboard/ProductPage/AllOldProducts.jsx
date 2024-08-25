import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../../Pages/Shared/ErrorPage/ErrorPage";
import PostAction from "../../../FetchAction/PostAction";
import { allPotterySubCategorie } from "../ProductDashboard";

const AllOldProducts = () => {
  const [search, setSearchTerm] = useState("");
  const {
    data: allOldProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allOldProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/all_old_products`,
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
        const data = await res?.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const handelAddToCard = async (product) => {
    if (product) {
      PostAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/add_to_card_old_product`,
        product
      );
    } else {
      toast.error("Add To Card Error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mb-8 m-3">
        <select
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-l-md text-center bg-blue-900 h-14 text-white"
        >
          <option disabled={true}>All Product Name </option>
          <option value="">All Product </option>
          {allPotterySubCategorie?.map((v) =>
            v.subCategorie?.map((v, key) => (
              <option key={key} value={v.name}>
                {v.name}
              </option>
            ))
          )}
        </select>
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by  company Model Name, Brand Name"
          required
        />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-2">
          {!isLoading &&
            allOldProducts?.data
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item?.selling_partname.toLowerCase() ===
                      search.toLowerCase() ||
                      item?.model
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      item?.brand?.toLowerCase().includes(search.toLowerCase());
              })
              .map((oldproduct, index) => (
                <div
                  key={index}
                  className="card w-full lg:max-w-2xl bg-gradient-to-b text-white from-black via-black to-gray-800 mx-5"
                >
                  <figure>
                    <img
                      src={
                        oldproduct?.photo ||
                        "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                      }
                      alt="Project"
                      className="w-full h-96"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Product Details
                      <div className="badge badge-secondary p-3">Featured</div>
                    </h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                      <p>
                        <strong className="bg-green-500 rounded p-1">
                          Type:
                        </strong>{" "}
                        {oldproduct?.type || ""}
                      </p>
                      <p>
                        <strong className="bg-green-500 rounded p-1">
                          Brand:
                        </strong>{" "}
                        {oldproduct?.brand || ""}
                      </p>
                      <p>
                        <strong className="bg-green-500 rounded p-1">
                          Model:
                        </strong>{" "}
                        {oldproduct?.model || ""}
                      </p>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                      <p>
                        <strong>Version:</strong> {oldproduct?.version || ""}
                      </p>

                      <p>
                        <strong>Year Of Manufacture:</strong>{" "}
                        {oldproduct?.year_of_manufacture || ""}
                      </p>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                      <p>
                        <strong className="bg-green-500 rounded p-1">
                          {" "}
                          Partname:
                        </strong>{" "}
                        {oldproduct?.selling_partname || ""}
                      </p>
                      <p>
                        <strong>Engine Capacity:</strong>{" "}
                        {oldproduct?.engine_capacity || ""}
                      </p>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                      <p>
                        <strong className="bg-green-500 rounded p-1">
                          Price:
                        </strong>{" "}
                        {oldproduct?.price || ""}
                      </p>
                      <p>
                        <strong className="bg-green-500 rounded p-1">
                          Kilometers :
                        </strong>{" "}
                        {oldproduct?.kilometers_driven || ""}
                      </p>
                      <p>
                        <strong>Quantity:</strong>
                        {oldproduct?.quantity || ""}
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
                      <p>
                        <strong>Description:</strong> {oldproduct?.description}
                      </p>
                    </div>

                    {/* User Details */}

                    <div className="max-w-4=xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                      <div className="flex items-center space-x-6">
                        <div>
                          <div className="avatar flex justify-center">
                            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  oldproduct?.user_photo ||
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzF32lbq4BoRPJ3bZ4FrQiFe9uhw5tRZBqxzt7G00uhbmqTW3f-PeYpIMOUzFCsYpuOMI&usqp=CAU"
                                }
                                alt={`${1}`}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h2 className="card-title">
                            <div className="badge  badge-primary p-3">
                              Owner Infomation
                            </div>
                          </h2>
                          <h1 className="text-3xl font-serif text-gray-800">
                            {oldproduct?.user_name || ""}
                          </h1>
                          <p className="text-gray-600">
                            Email Address :{oldproduct?.user_email || ""}
                          </p>

                          <p className="text-gray-600">
                            Contact Number: {oldproduct?.number}
                          </p>
                          <p className="text-gray-600">
                            Address: {oldproduct?.actualAddress || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        handelAddToCard({
                          productId: oldproduct._id,
                          name: oldproduct?.selling_partname,
                          photo: oldproduct?.photo,
                          companyName: oldproduct?.brand,
                          price: oldproduct?.price,
                        })
                      }
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-red-500 to-blue-900 group-hover:from-purple-900 group-hover:to-blue-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 btn-sm m-1 hover:bg-blue-600"
                    >
                      Add To Card
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default AllOldProducts;
