import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { allPotterySubCategorie } from "../ProductDashboard";
import toast from "react-hot-toast";
import AllGetAction from "../../../FetchAction/AllGetAction";
import ErrorPage from "../../../Pages/Shared/ErrorPage/ErrorPage";
import PostAction from "../../../FetchAction/PostAction";

const OldProductComponents = () => {
  const { categorie, subcaregorie } = useParams();
  const [search, setSearchTerm] = useState("");
  const { name } = allPotterySubCategorie
    .find((v) => v.id === Number(categorie))
    .subCategorie.filter((sub) => sub.path === Number(subcaregorie))[0];
  if (!name) {
    toast.error("Your Categories Not Founded");
  }

  const { data, error, isLoading } = AllGetAction(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/allOldProducts`
  );

  const categories =
    (data?.success &&
      data?.data?.filter((v) => v?.selling_partname === name)) ||
    [];
  if (error) {
    return <ErrorPage />;
  }

  const handelAddToCard = async (product) => {
    if (product) {
      PostAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/add_to_card_old_product`,
        product
      );
    } else {
      toast.error("add To Card Error");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mb-8 m-3">
        <select
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-l-md text-center bg-blue-900 h-14 text-white"
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
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-r-lg  focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by  company Model Name, Brand Name"
          required
        />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-2">
          {categories.length === 0 && (
            <div className="avatar">
              <div className="w-fill h-full">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/04/85/57/20/1000_F_485572039_DJyDin7Z1uvoky1184GLXYON1uA6INQ2.jpg"
                  alt=""
                />
              </div>
            </div>
          )}

          {!isLoading &&
            categories?.map((oldproduct, index) => (
              <div
                key={index}
                className="card w-full lg:max-w-2xl  bg-gradient-to-b text-white from-black via-black to-gray-800"
              >
                <figure>
                  <img
                    src={
                      oldproduct?.photo ||
                      "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                    }
                    alt="Project"
                    className="w-full h-96"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Product Details
                    <div className="badge badge-secondary p-3  ">Featured</div>
                  </h2>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Type:</strong> {oldproduct?.type || ""}
                    </p>
                    <p>
                      <strong>Brand:</strong> {oldproduct?.brand || ""}
                    </p>
                    <p>
                      <strong>Model:</strong> {oldproduct?.model || ""}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Version:</strong> {oldproduct?.version || ""}
                    </p>
                    <p>
                      <strong>Number:</strong> {oldproduct?.number || ""}
                    </p>
                    <p>
                      <strong>Year_Of_Manufacture:</strong>{" "}
                      {oldproduct?.year_of_manufacture || ""}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Condition</strong> {oldproduct?.condition || ""}
                    </p>
                    <p>
                      <strong>Selling_Partname:</strong>{" "}
                      {oldproduct?.selling_partname || ""}
                    </p>
                    <p>
                      <strong>Engine_Capacity </strong>{" "}
                      {oldproduct?.engine_capacity || ""}
                    </p>
                  </div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    <p>
                      <strong>Price</strong> {oldproduct?.price || ""}
                    </p>
                    <p>
                      <strong>kilometers_driven</strong>{" "}
                      {oldproduct?.kilometers_driven || ""}
                    </p>
                    <p>
                      <strong>kilometers_driven</strong>{" "}
                      {oldproduct?.kilometers_driven || ""}
                    </p>
                  </div>
                  <p>
                    <strong>Actual Address</strong>{" "}
                    {oldproduct?.actualAddress || ""}
                  </p>
                  <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
                    <p>
                      <strong>Description:</strong> {oldproduct?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() =>
                      handelAddToCard({
                        productId: oldproduct._id,
                        name: oldproduct?.selling_partname,
                        photo: oldproduct?.photo,
                        companyName: oldproduct?.brand,
                        price: oldproduct?.price,
                      })
                    }
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-red-500 to-blue-900 group-hover:from-purple-900 group-hover:to-blue-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 btn-sm m-1 hover:bg-blue-600"
                  >
                    Add To Card
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default OldProductComponents;
