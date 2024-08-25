import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAmazonPay } from "react-icons/fa6";
const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
  const {
    _id,
    serviceName,
    phone,
    customer,
    price,
    service,
    district,
    email,
    message,
    date,
    serviceingDate,
    registerNumber,
    isService,
    received,
    DeliveryDate,
    paymentStatus,
  } = order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`https://car-doctors-server-sigma.vercel.app/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderService(data));
  }, [service]);

  const handelPayment = async () => {
    const paymentData = {
      payableAmount: price,
      currency: "BDT",
      email,
      address: district,
      number: phone,
      name: customer,
      serviceId: _id,
    };
    if (!!paymentData) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/service/payment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          window.open(data?.url, "_blank");
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  return (
    <tr>
      <th>
        <label>
          <button
            onClick={() => handleDelete(_id)}
            disabled={paymentStatus}
            className="btn btn-outline btn-error btn-sm"
          >
            X
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
              {orderService?.img && (
                <img
                  src={orderService.img}
                  alt="Avatar Tailwind CSS Component"
                />
              )}
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
              {phone}
            </div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
          ${price}
        </span>
      </td>
      <td>
        {district}
        <br />
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
          {email}
        </span>
      </td>
      <td>
        {message?.slice(0, 50)}
        <br />
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
          date:{date}
        </span>
      </td>
      <td>
        {registerNumber}
        <br />
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
          Serviceing Date: {serviceingDate}
        </span>
      </td>
      <td className="px-4 py-3 text-xs border">
        {isService ? (
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            Completed
          </span>
        ) : (
          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
            Incomplete
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-xs border">
        {received ? (
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            Received
          </span>
        ) : (
          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
            Not Received
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-xs border">
        {DeliveryDate ? (
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {DeliveryDate}
          </span>
        ) : (
          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
            Pending
          </span>
        )}
      </td>

      <td className="px-4 py-3 text-xs border">
        {paymentStatus ? (
          <span className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
            completed
          </span>
        ) : (
          <span className="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-sm">
            Pending
          </span>
        )}
      </td>
      <th>
        <button
          onClick={() => handleStatusUpdate(_id)}
          disabled={paymentStatus}
          className="btn btn-outline btn-primary btn-xs"
        >
          Update
        </button>
      </th>
      <th>
        <button
          disabled={paymentStatus}
          onClick={handelPayment}
          className="btn btn-primary btn-outline btn-sm "
        >
          <FaAmazonPay className="text-3xl" />
        </button>
      </th>
    </tr>
  );
};

export default OrderRow;
