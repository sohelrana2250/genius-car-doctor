import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";

const ServicePaymentList = () => {
  const [paymentSchedule, setPaymentSchedule] = useState("");
  const [search, setSearchTerm] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/all_service_payment?sales=${paymentSchedule}`,
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
    data: servicepayment = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["servicepayment", paymentSchedule],
    queryFn: fetchPayments,
    enabled: !!paymentSchedule,
  });

  useEffect(() => {
    refetch();
  }, [paymentSchedule, refetch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex items-center justify-center mb-8 m-1">
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by Email, Number, Name ,Transaction Id"
          required
        />
      </div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your country
        </label>
        <select
          id="tabs"
          name="selectedJob"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5  bg-blue-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setPaymentSchedule(e.target.value)}
        >
          <option value="">All Sales</option>
          <option value="daily">Daily Sales</option>
          <option value="weekly">Weekly Sales</option>
          <option value="monthly">Monthly Sales</option>
          <option value="yearly">Yearly Sales</option>
        </select>
      </div>
      <ul className="mb-3 hidden text-sm font-medium text-center bg-blue-900 text-gray-500 divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
          <button
            onClick={() => setPaymentSchedule("daily")}
            className="inline-block w-full p-4 text-white focus:ring-4 focus:ring-blue-300 active focus:outline-none bg-blue-900 dark:text-white hover:bg-primary"
            aria-current="page"
          >
            Daily Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => setPaymentSchedule("weekly")}
            className="inline-block w-full p-4 text-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white bg-blue-900 dark:hover:bg-blue-700"
          >
            Weekly Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => setPaymentSchedule("monthly")}
            className="inline-block w-full p-4 text-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white bg-blue-900 dark:hover:bg-blue-700"
          >
            Monthly Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => setPaymentSchedule("yearly")}
            className="inline-block w-full p-4 text-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white bg-blue-900 dark:hover:bg-blue-700"
          >
            Yearly Sales
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => setPaymentSchedule("")}
            className="inline-block w-full p-4 text-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white bg-blue-900 dark:hover:bg-blue-700"
          >
            All Years
          </button>
        </li>
      </ul>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Email</th>
              <th>Address</th>
              <th>Number</th>
              <th>Name</th>
              <th>Service ID</th>
              <th>Paid Status</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              servicepayment?.data
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item?.email.includes(search) ||
                        item?.number === search ||
                        (item?.transactionID || "")
                          .toString()
                          .includes(search) ||
                        item?.name
                          ?.toLowerCase()
                          .includes(search.toLowerCase());
                })
                .map((transaction) => (
                  <tr key={transaction._id}>
                    <td>
                      <p className="px-2 py-1 font-semibold leading-tight text-white bg-green-500 rounded-sm">
                        {" "}
                        {transaction._id}
                      </p>
                    </td>
                    <td>
                      <span className="px-2 py-1 font-semibold leading-tight text-white bg-blue-900 rounded-sm">
                        {transaction.payableAmount}
                      </span>
                    </td>
                    <td>
                      <span className="px-2 py-1 font-semibold leading-tight text-white bg-red-900 rounded-sm">
                        {transaction.currency}
                      </span>
                    </td>
                    <td>{transaction.email}</td>
                    <td>
                      <span className="px-2 py-1 font-semibold leading-tight text-white bg-orange-600 rounded-sm">
                        {transaction.address}
                      </span>
                    </td>
                    <td>{transaction.number}</td>
                    <td>{transaction.name}</td>
                    <td>
                      <span className="px-2 py-1 font-semibold leading-tight text-white bg-green-500 rounded-sm">
                        {" "}
                        {transaction.serviceId}
                      </span>
                    </td>
                    <td>
                      {transaction.paidStatus ? (
                        <span className="text-center text-white bg-green-500 rounded-sm p-2">
                          Paid
                        </span>
                      ) : (
                        <span className="text-center  text-white bg-red-500 rounded-sm p-2">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="px-2 py-1 font-semibold leading-tight text-white bg-green-500 rounded-sm">
                        {transaction.transactionID}
                      </span>
                    </td>
                    <td>{new Date(transaction.date).toLocaleString()}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ServicePaymentList;
