import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import { GrServices } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FcReuse } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { FaAmazonPay } from "react-icons/fa";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";
import useAdmin from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  if (!isAdmin) {
    navigate("/");
  }
  const {
    data: mydashboard = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mydashboard"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/dashboard_graph`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Check if the response is not ok (e.g., 4xx or 5xx status codes)
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        return data;
      } catch (error) {
        // Display a toast message for the error
        toast.error(error.message);

        // Return an empty object or an appropriate default value
        return {};
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
          <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly ">
                <FaRegUser className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total User</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalUserCount}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-b from-black via-black to-green-700 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly ">
                <GrServices className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Service</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalServiceCount}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <TbBrandProducthunt className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Product</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalProductCount}
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <MdProductionQuantityLimits className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Order</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalOrderCount}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-b from-black via-black to-green-700 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <FcReuse className="text-3xl mr-1" />
                <p className="font-serif text-xl">Old Product</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalOldProductCount}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <GiShoppingCart className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Old Card</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalOldProductCardCount}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <GrFavorite className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Favorite</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalFavoriteCount}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <BiCategory className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Categorie</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalCategorieCount}
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <GiShoppingCart className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total New Card</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.totalAdToCardCount}
                </p>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="card bg-gradient-to-b from-black via-black to-red-600 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <FaAmazonPay className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Payment</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.newProductPayment?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-b from-black via-black to-green-700 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <FaAmazonPay className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Payment</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.oldProductPayment?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-b from-black via-black to-blue-900 w-64 shadow-xl m-2 text-white">
            <div className="card-body">
              <div className="flex justify-evenly">
                <FaAmazonPay className="text-3xl mr-1" />
                <p className="font-serif text-xl">Total Service</p>
                <p className="font-serif text-xl">
                  {mydashboard?.data?.serverPayment?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className=" m-3 text-4xl font-serif text-center my-3 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg">
        Car Servicing Payment
      </h1>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={mydashboard?.data?.serverPayment}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currency" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="payableAmount" fill="#73cce7" />
          <Bar dataKey="name" fill="#9a13d4" />
        </BarChart>
      </ResponsiveContainer>
      <h1 className=" m-3 text-4xl font-serif text-center my-3 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg">
        New Product Payments
      </h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={mydashboard?.data?.newProductPayment}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currency" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="payableAmount" fill="#40E0D0" />
          <Bar dataKey="name" fill="#9a13d4" />
        </BarChart>
      </ResponsiveContainer>

      {/* <h1 className=" m-3 text-4xl font-serif text-center my-3 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg">
        Resuable Product Payments
      </h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={mydashboard?.data?.oldProductPayment}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currency" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="payableAmount" fill="#50dad8" />
          <Bar dataKey="name" fill="#9a13d4" />
        </BarChart>
      </ResponsiveContainer> */}
    </>
  );
};

export default Dashboard;
