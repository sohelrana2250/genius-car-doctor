import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import html2pdf from "html2pdf.js";

const PaymentLaser = () => {
  ///api/v1/mypayment_laser
  //http://localhost:3012/api/v1/product

  const {
    data: allpaymentlaser = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allpaymentlaser"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:3012/api/v1/mypayment_laser`,
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

  const handleDownload = (payment) => {
    const element = document.getElementById(
      `payment-card-${payment.transactionID}`
    );
    html2pdf().from(element).save();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {allpaymentlaser?.data?.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Payment laser does not exist
              </h2>
              <p className="text-gray-600">
                There are currently no payment laser records available.
              </p>
            </div>
          ) : (
            <>
              {!isLoading &&
                allpaymentlaser?.data?.map((payment, index) => (
                  <div
                    key={index}
                    id={`payment-card-${payment.transactionID}`}
                    className="max-w-md w-full p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-6"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {payment.name}
                    </h2>
                    <p className="text-gray-700 mb-2">
                      Address: {payment.address}
                    </p>
                    <p className="text-gray-700 mb-2">Email: {payment.email}</p>
                    <p className="text-gray-700 mb-2">
                      Phone: {payment.number}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Payable Amount: {payment.payableAmount} {payment.currency}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Transaction ID: {payment.transactionID}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Payment Status:
                      <span
                        className={`${
                          payment.paidStatus ? "text-green-500" : "text-red-500"
                        } font-bold`}
                      >
                        {payment.paidStatus ? "Paid" : "Unpaid"}
                      </span>
                    </p>
                    <p className="text-gray-700 mb-2">
                      Date: {new Date(payment.date).toLocaleString()}
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Products:</h3>
                    <ul className="list-disc ml-5">
                      {payment.combinedData.map((product) => (
                        <li key={product._id}>
                          Product ID: {product.productId}, Quantity:{" "}
                          {product.quantity}
                        </li>
                      ))}
                    </ul>
                    {/* Add Download Button */}
                    <button
                      onClick={() => handleDownload(payment)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Download Payment
                    </button>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentLaser;
