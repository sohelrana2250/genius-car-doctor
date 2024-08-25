import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "daisyui/dist/full.css";
import { TypeOfImage } from "../../utils/TypeOfImage";
import GenerateImage from "../../FetchAction/GenerateImage";
import PostAction from "../../FetchAction/PostAction";
import { allPotterySubCategorie } from "../OldProductDashboard/ProductDashboard";
const AddToProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const imageFile = data.photo[0];
    data.discount = Number(data.discount);
    if (
      TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())
    ) {
      const photo = await GenerateImage(imageFile);
      data.photo = photo;
      PostAction(`${process.env.REACT_APP_SERVER_URL}/api/v1/product/`, {
        categorieId: id,
        ...data,
      });
      reset();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Product Form</h2>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>

            <select
              {...register("name")}
              className="select select-primary w-full max-w-full"
            >
              <option disabled selected>
                Product Categorie & Sub Chatagorie
              </option>
              {allPotterySubCategorie.map((category) =>
                category.subCategorie.map((sub) => (
                  <option key={sub.path} value={sub.name}>
                    {category.categorieName} - {sub.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              defaultValue={4000}
              {...register("price")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Discount (%)</span>
            </label>
            <input
              type="number"
              placeholder="Discount"
              defaultValue={10}
              {...register("discount")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              type="text"
              placeholder="Company Name"
              defaultValue="mahenra"
              {...register("companyName")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Available</span>
            </label>
            <input
              type="number"
              placeholder="Available"
              defaultValue={50}
              {...register("available")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Photo Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="photo"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a Photo</span>
                    <input
                      id="photo"
                      name="photo"
                      {...register("photo", { required: "Photo is required" })}
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs">PNG, JPG, GIF up to 800kb</p>
              </div>
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary btn-outline btn-sm w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddToProduct;
