import React, { useEffect, useState } from "react";
// import AllGetAction from "../../../FetchAction/AllGetAction";
import NewProductCard from "../../../Reuseable/NewProductCard";
import ErrorPage from "../../../Pages/Shared/ErrorPage/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Pages/Shared/Loading/LoadingSpinner";
import { allPotterySubCategorie } from "../ProductDashboard";

const ProductHomePage = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(75 / size);
  const [search, setSearchTerm] = useState("");
  const fetchPayments = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/allproduct?page=${Number(
          page
        )}&limit=${Number(size)}`,
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
  };

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["newproduct_payList", page, size],
    queryFn: fetchPayments,
    enabled: !!page || !!size,
  });

  useEffect(() => {
    refetch();
  }, [page, size, refetch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {/* search bar  */}
      <div className="flex items-center justify-center mb-8 m-3">
        <select
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-l-md text-left font-bold bg-base-200 h-14 text-black "
        >
          <option className="font-bold" disabled={true}>
            All Product Name{" "}
          </option>
          <option className="font-bold" value="">
            All Product{" "}
          </option>
          {allPotterySubCategorie?.map((v) =>
            v.subCategorie?.map((v, key) => (
              <option className="font-bold" key={key} value={v.name}>
                {v.name}
              </option>
            ))
          )}
        </select>
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by  company name"
          required
        />
      </div>
      <div className="flex justify-end p-4">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-center">
            Current Page: {page + 1} and Size: {size}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start">
            {[...Array(pages).keys()].map((number) => (
              <button
                key={number}
                className="m-1 md:m-3 text-lg btn btn-outline btn-sm"
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            ))}
          </div>
          <select
            className="rounded-full btn btn-outline btn-sm"
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="10" defaultValue={10}>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}

      {data?.success && <NewProductCard data={data?.data} search={search} />}
    </>
  );
};

export default ProductHomePage;
