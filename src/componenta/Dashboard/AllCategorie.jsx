import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import DeleteAction from "../../FetchAction/DeleteAction";
import { Link } from "react-router-dom";

const AllCategorie = () => {
  const {
    data: allcategorie = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allcategorie"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/allcategorie`,
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
        const data = await res.json();
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

  const handelDeleteCategorie = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/deleteCategorie/${id}`,
        refetch
      );
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {allcategorie?.data?.map((category) => (
            <div key={category._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{category.categorie}</h2>
                <p>
                  Created At:{" "}
                  {new Date(category.createdAt).toLocaleDateString()}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to={`/dashboard/addtoproduct/${category?._id}`}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    Product
                  </Link>

                  <Link
                    to={`/dashboard/update_product_categorie/${category?._id}`}
                    className="btn btn-outline btn-secondary btn-sm"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handelDeleteCategorie(category?._id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCategorie;
