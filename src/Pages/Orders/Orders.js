import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../Shared/Loading/LoadingSpinner";
const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/orders?email=${user?.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/orders/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("API ERROR");
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = orders.filter((odr) => odr._id !== id);
              setOrders(remaining);
              Swal.fire("Delete!", "", "success");
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleStatusUpdate = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approving = orders.find((odr) => odr._id === id);
          approving.status = "Approved";

          const newOrders = [approving, ...remaining];
          setOrders(newOrders);
        }
      });
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <h2 className="text-3xl font-serif text-center m-3">
        <span className="text-green-600">Y</span>ou{" "}
        <span className="text-red-500">H</span>ave To {orders.length}{" "}
        <span className="text-yellow-600">O</span>rders
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Delete</th>
              <th>Name</th>
              <th>Job</th>
              <th>User</th>
              <th>Discription</th>
              <th>Register Number</th>
              <th>Is Service</th>
              <th> Is Received</th>
              <th>Delivery Date</th>
              <th>Payment Status</th>
              <th>Update</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
