import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import toast from "react-hot-toast";
import { GrStatusGood } from "react-icons/gr";
import PatchAction from "../../FetchAction/PatchAction";

const AllUsers = () => {
  const [search, setSearchTerm] = useState("");
  const {
    data: allusers = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/allusers`,
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

  const handleAdminToggle = (id, role) => {
    const isRole = role === "user" ? "admin" : "user";

    if (id && role) {
      PatchAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/isAdmin/${id}`,
        { isRole },
        refetch
      );
    } else {
      toast.error("Fatching Error");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 font-mono ">
        <div className="flex items-center justify-center">
          <select
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-l-md text-center bg-blue-900 h-14 text-white"
          >
            <option disabled>All User Role</option>
            <option value="">All User</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find  User Account Type / Search User Email Address"
            required
          />
        </div>
      </div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3"> Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Admin</th>
                  <th className="px-4 py-3">Toggle Admin</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Creator</th>
                </tr>
              </thead>
              <tbody>
                {allusers?.data
                  ?.filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item?.email.includes(search) || item?.role === search;
                  })
                  ?.map((v, index) => {
                    return (
                      <tr key={index} className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div className="relative w-16 h-16 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={
                                  v?.photo
                                    ? v?.photo
                                    : "https://community.fabric.microsoft.com/t5/image/serverpage/image-id/813578i64726DCE0B971C89?v=v2"
                                }
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold text-black">
                                {v?.name}
                              </p>
                              <p className="text-xs text-gray-600">{v?.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {v?.name}
                        </td>
                        <td className="px-4 py-3 text-xs border">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                            {v?.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm border">{v?.email}</td>
                        <td className="px-4 py-3 text-xs border">
                          {v?.role === "admin" ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                              Admin
                            </span>
                          ) : (
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                              {v?.role}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          <button
                            onClick={() => handleAdminToggle(v?._id, v?.role)}
                            className={`${
                              v?.role === "admin"
                                ? "bg-green-500"
                                : "bg-red-500"
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                          >
                            {v?.role === "admin" ? (
                              <GrStatusGood className="text-xl text-green-700" />
                            ) : (
                              <GrStatusGood />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {new Date(v?.createAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {v?.createAt}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllUsers;
