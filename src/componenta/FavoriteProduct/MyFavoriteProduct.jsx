import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Pages/Shared/Loading/LoadingSpinner";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import DeleteAction from "../../FetchAction/DeleteAction";
import PostAction from "../../FetchAction/PostAction";

const MyFavoriteProduct = () => {
  const {
    data: myfavorite = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myfavorite"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/my_favorite_product`,
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
        const data = await res?.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  const handleAddToCart = (product) => {
    let { name, image, price, productId, companyName } = product || {};
    PostAction(`${process.env.REACT_APP_SERVER_URL}/addToCard`, {
      name,
      image,
      price,
      productId,
      companyName,
    });
  };

  const handleDelete = (productId) => {
    if (productId) {
      DeleteAction(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/delete_my_favoriteproduct/${productId}`,
        refetch
      );
    }
  };

  return (
    <>
      <section className="bg-white   dark:bg-gray-900 md:py-6">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-serif text-center text-gray-900 dark:text-white sm:text-2xl ">
            My Favorite List
          </h2>
          <br />
          <div className="grid   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-2">
            {!isLoading &&
              myfavorite?.data?.map((product, index) => (
                <div
                  key={index}
                  className="relative rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg dark:border-gray-700 dark:bg-gray-800  transition-shadow duration-300"
                >
                  <div className="avatar">
                    <div className="w-full rounded">
                      <img src={product?.image} />
                    </div>
                  </div>
                  <div className="Q 1p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Product Name: {product?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Company Name: {product?.companyName}
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                      Price: {product?.price} TK
                    </p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn  btn-outline btn-sm"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyFavoriteProduct;
