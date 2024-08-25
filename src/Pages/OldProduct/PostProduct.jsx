import React from "react";
import { useForm } from "react-hook-form";
import AllDistrict from "../../utils/AllDistrict";
import PostAction from "../../FetchAction/PostAction";
import GenerateImage from "../../FetchAction/GenerateImage";
import toast from "react-hot-toast";
import { TypeOfImage } from "../../utils/TypeOfImage";
import { allPotterySubCategorie } from "../../componenta/OldProductDashboard/ProductDashboard";
const PostProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.quantity = Number(data.quantity);
    console.log(data);
    const imageFile = data.photo[0];
    if (
      TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())
    ) {
      const src = await GenerateImage(imageFile);
      data.photo = src;
      PostAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/old_product`,
        data
      );

      reset();
    } else {
      toast.error("No image file selected");
    }
  };

  return (
    <>
      <div className="max-w-2xl m-auto mt-10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-serif mb-6">Sell Your Car Equapment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <input
              className="input input-bordered"
              {...register("type", { required: true })}
              defaultValue="Motorcycle"
            />
            {errors.type && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <input
              className="input input-bordered"
              {...register("brand", { required: true })}
              defaultValue="Bajaj"
            />
            {errors.brand && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Model</span>
            </label>
            <input
              className="input input-bordered"
              {...register("model", { required: true })}
              defaultValue="Discover 125"
            />
            {errors.model && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Version</span>
            </label>
            <input
              className="input input-bordered"
              {...register("version", { required: true })}
              defaultValue="Bajaj Discover 125"
            />
            {errors.version && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...register("number", { required: true })}
              defaultValue={123456789}
            />
            {errors.number && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...register("quantity", { required: true })}
              defaultValue={1}
            />
            {errors.number && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Year of Manufacture</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...register("year_of_manufacture", { required: true })}
              defaultValue={2017}
            />
            {errors.year_of_manufacture && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <input
              className="input input-bordered"
              {...register("condition", { required: true })}
              defaultValue="Used"
            />
            {errors.condition && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Selling Part Name</span>
            </label>

            <select
              className="select select-secondary w-full max-w-full"
              {...register("selling_partname", { required: true })}
            >
              <option disabled selected>
                Pick a subcategory
              </option>
              {allPotterySubCategorie.map((category) =>
                category.subCategorie.map((sub) => (
                  <option key={sub.path} value={sub.name}>
                    {category.categorieName} - {sub.name}
                  </option>
                ))
              )}
            </select>

            {errors.selling_partname && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Engine Capacity</span>
            </label>
            <input
              className="input input-bordered"
              {...register("engine_capacity", { required: true })}
              defaultValue="125 cc"
            />
            {errors.engine_capacity && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              {...register("price", { required: true })}
              defaultValue={3000}
            />
            {errors.price && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Kilometers Driven</span>
            </label>
            <input
              className="input input-bordered"
              {...register("kilometers_driven", { required: true })}
              defaultValue="25,000 km"
            />
            {errors.kilometers_driven && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full max-w-full"
            >
              <option disabled selected>
                Selected Your District
              </option>
              {AllDistrict.map((v, index) => (
                <option key={index} value={v.district_name}>
                  {v.district_name + " " + v.bn_name}
                </option>
              ))}
            </select>

            {errors.district && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Actual Address</span>
            </label>
            <input
              className="input input-bordered"
              {...register("actualAddress", { required: true })}
              defaultValue="Dhanmondi Sonkor 27"
            />
            {errors.actualAddress && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
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
                        {...register("photo", { required: "src is required" })}
                        type="file"
                        className="sr-only"
                      />
                      {errors.src && (
                        <p className="text-red-500 text-xs italic">
                          {errors.src.message}
                        </p>
                      )}
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs">PNG, JPG, GIF up to 800kb</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              {...register("description", { required: true })}
              defaultValue={`♣ Bajaj Discover 125 cc in fresh condition.\n♣ 2 wheels are tubeless.\n♣ 10-year paper done with smart card.\n♣ Digital plate done.\n♣ Approximately 60 km per liter.\n♣ Name transfer available.`}
            ></textarea>
            {errors.description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-outline bg-blue-900 text-white btn-sm w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostProduct;
