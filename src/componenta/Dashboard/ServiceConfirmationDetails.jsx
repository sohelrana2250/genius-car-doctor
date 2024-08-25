import React, { useState } from "react";
import { FaAmazonPay } from "react-icons/fa";
import PatchAction from "../../FetchAction/PatchAction";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ServiceConfirmationDetails = ({ order, refetch }) => {
  const [deliverydate, setDelivaryDate] = useState("");
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

  if (deliverydate) {
    PatchAction(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/IsDeliveryDate/${_id}`,
      { DeliveryDate: deliverydate },
      refetch
    );
    setDelivaryDate("");
  }

  const handelChnageStatusReceived = (common, key) => {
    if (key === "received") {
      const received = !common;
      PatchAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/IsService_IsRecived/${_id}`,
        { received },
        refetch
      );
    } else {
      const isService = !common;
      PatchAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/IsService_IsRecived/${_id}`,
        { isService },
        refetch
      );
    }
  };
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
              Swal.fire("Delete!", "", "success");
              refetch();
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
  return (
    <>
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
          {customer}
          <br />
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
            {phone}
          </span>
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
            <button
              onClick={() => handelChnageStatusReceived(isService, "isService")}
              className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"
            >
              Incomplete
            </button>
          )}
        </td>
        <td className="px-4 py-3 text-xs border">
          {received ? (
            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
              Received
            </span>
          ) : (
            <button
              onClick={() => handelChnageStatusReceived(received, "received")}
              className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"
            >
              Not Received
            </button>
          )}
        </td>
        <td className="px-4 py-3 text-xs border">
          <input
            onChange={(e) => setDelivaryDate(e.target.value)}
            type="date"
            defaultValue={DeliveryDate}
          />
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
            //   onClick={() => handleStatusUpdate(_id)}
            disabled={paymentStatus}
            className="btn btn-outline btn-primary btn-xs"
          >
            Update
          </button>
        </th>
        <th>
          <button
            disabled={paymentStatus}
            // onClick={handelPayment}
            className="btn btn-primary btn-outline btn-sm "
          >
            <FaAmazonPay className="text-3xl" />
          </button>
        </th>
      </tr>
    </>
  );
};

export default ServiceConfirmationDetails;
