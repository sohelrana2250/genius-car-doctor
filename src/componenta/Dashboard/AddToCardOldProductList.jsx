import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import DeleteAction from "../../FetchAction/DeleteAction";

const AddToCardOldProductList = () => {
  const {
    data: alloldaddtocard = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["alloldaddtocard"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/oldproduct_addtoocard`,
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

  const onDelete = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/delete_addToCard_oldProduct/${id}`,
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
              <th>Photo</th>
              <th>Company</th>
              <th>Price</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              alloldaddtocard?.data?.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td>{product.companyName}</td>
                  <td>
                    <p className="bg-blue-900 text-center text-white rounded-md">
                      {product.price}
                    </p>
                  </td>
                  <td>{product.email}</td>
                  <td>
                    <button
                      className="btn btn-error btn-outline btn-xs"
                      onClick={() => onDelete(product._id)}
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

export default AddToCardOldProductList;
