import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import { Link } from "react-router-dom";
import DeleteAction from "../../FetchAction/DeleteAction";
import { allPotterySubCategorie } from "../NewProductDashboard/ProductDashboard";

const AllProductList = () => {
  const [search, setSearchTerm] = useState("");
  const {
    data: allproducts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/allproduct`,
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
  console.log(search);
  const handelDeleteProduct = (id) => {
    if (id) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/product/${id}`,
        refetch
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mb-8 m-3">
        <select
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-l-md bg-blue-900 h-14 text-white text-center"
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
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by  company name"
          required
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Company Name</th>
              <th>Available</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              allproducts?.data
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item?.name.toLowerCase() === search.toLowerCase() ||
                        item?.companyName
                          ?.toLowerCase()
                          .includes(search.toLowerCase());
                })
                .map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <p className="bg-blue-900 rounded text-white text-center">
                        {item.discount}
                      </p>
                    </td>
                    <td>{item.companyName}</td>
                    <td>
                      <p className="bg-slate-900 rounded text-white text-center">
                        {item.available}
                      </p>
                    </td>
                    <td>{item.categoryDetails.categorie}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {item.available < 5 ? (
                        <button className="btn btn-error btn-sm mr-2">
                          Stock Out
                        </button>
                      ) : (
                        <button className="btn btn-accent btn-sm mr-2">
                          Stock Available
                        </button>
                      )}
                      <Link
                        to={`/dashboard/update_product_information/${item?._id}`}
                        className="btn btn-primary btn-outline btn-sm mr-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handelDeleteProduct(item?._id)}
                        className="btn btn-error btn-outline btn-sm"
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

export default AllProductList;
