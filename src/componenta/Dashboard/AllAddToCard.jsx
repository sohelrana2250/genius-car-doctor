import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import DeleteAction from "../../FetchAction/DeleteAction";

const AllAddToCard = () => {
  const {
    data: alladdtocard = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["alladdtocard "],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/newproduct_addtocard`,
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

  const handleDelete = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/delete_addToCard/${id}`,
        refetch
      );
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              alladdtocard?.data?.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td>
                    <p className="bg-blue-900 rounded-sm text-white text-center">
                      {item.price}
                    </p>
                  </td>
                  <td>{item.companyName}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-error btn-outline btn-xs"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllAddToCard;
