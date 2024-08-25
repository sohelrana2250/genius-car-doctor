import React from "react";
import { useParams } from "react-router-dom";
import { allPotterySubCategorie } from "../OldProductDashboard/ProductDashboard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import PatchAction from "../../FetchAction/PatchAction";

const UpdateCategorie = () => {
  const { id } = useParams();
  const {
    data: catagorie = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["catagorie"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/update_product_categorie/${id}`,
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
        toast.error(`Failed to fetch users: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const handeCreateCategorie = (event) => {
    event.preventDefault();
    const element = event.target;
    const categorie = element.categorie.value;
    if (categorie) {
      PatchAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/update_product_categorie/${id}`,
        { categorie },
        refetch
      );
    }
  };
  return (
    <>
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-serif">
                  Update Product Categorie
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handeCreateCategorie}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="date"
                      name="date"
                      type="text"
                      required
                      defaultValue={new Date().toString()}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Date"
                    />
                    <label
                      htmlFor="date"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Date
                    </label>
                  </div>
                  {/* jdhkjahsf */}
                  <div className="form-control w-full max-w-full">
                    <label className="label">
                      <span className="label-text">Select Categorie</span>
                    </label>
                    <select
                      name="categorie"
                      id="categorie"
                      required
                      className="select select-bordered"
                    >
                      <option disabled={true} className="text-xl font-serif">
                        Selected Product:{catagorie?.data?.categorie}
                      </option>
                      {allPotterySubCategorie.map((categorie, index) => (
                        <option key={index} value={categorie.categorieName}>
                          {categorie.categorieName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategorie;
