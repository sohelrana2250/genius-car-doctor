import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../../Pages/Shared/ErrorPage/ErrorPage";
import { TbHttpDelete } from "react-icons/tb";
import DeleteAction from "../../../FetchAction/DeleteAction";
const MyPost = () => {
  const {
    data: AllMyPost = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["AllMyPost"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/my_posted_products`,
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

  const handelDeletePost = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/delete_my_post/${id}`,
        refetch
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4">
          {!isLoading &&
            AllMyPost?.data?.map((mypost, index) => (
              <div
                key={index}
                className="card w-full lg:max-w-2xl  bg-gradient-to-b text-white from-black via-black to-gray-800 m-3"
              >
                <figure>
                  <img
                    src={
                      mypost?.photo ||
                      "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt="Project"
                    className="w-full h-auto"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Product Details
                    <div className="badge badge-secondary p-3  ">Featured</div>
                  </h2>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Type:</strong> {mypost?.type || ""}
                    </p>
                    <p>
                      <strong>Brand:</strong> {mypost?.brand || ""}
                    </p>
                    <p>
                      <strong>Model:</strong> {mypost?.model || ""}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Version:</strong> {mypost?.version || ""}
                    </p>
                    <p>
                      <strong>Number:</strong> {mypost?.number || ""}
                    </p>
                    <p>
                      <strong>Year_Of_Manufacture:</strong>{" "}
                      {mypost?.year_of_manufacture || ""}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Condition</strong> {mypost?.condition || ""}
                    </p>
                    <p>
                      <strong>Selling_Partname:</strong>{" "}
                      {mypost?.selling_partname || ""}
                    </p>
                    <p>
                      <strong>Engine_Capacity </strong>{" "}
                      {mypost?.engine_capacity || ""}
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Price</strong> {mypost?.price || ""}
                    </p>
                    <p>
                      <strong>kilometers_driven</strong>{" "}
                      {mypost?.kilometers_driven || ""}
                    </p>
                    <p>
                      <strong>kilometers_driven</strong>{" "}
                      {mypost?.kilometers_driven || ""}
                    </p>
                  </div>
                  <p>
                    <strong>Actual Address</strong>{" "}
                    {mypost?.actualAddress || ""}
                  </p>
                  <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
                    <p>
                      <strong>Description:</strong> {mypost?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handelDeletePost(mypost?._id)}
                    className="btn btn-error btn-outline btn-sm  m-1"
                  >
                    <TbHttpDelete className="text-2xl" /> -Delete Post
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyPost;
