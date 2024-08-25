import React, { useContext, useState } from "react";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";

const ChnagePasswod = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { UpdatePassword, logOut } = useContext(AuthContext);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    if (data.currentPassword.length < 6) {
      setError("Password should be 6 characters or more.");
      return;
    }

    if (data?.newPassword !== data?.confirmPassword) {
      setError("Your Password did not match");
      return;
    }

    const result = await UpdatePassword(
      data?.currentPassword,
      data?.newPassword
    );

    if (result) {
      logOut()
        .then(() => {
          localStorage.setItem("token", null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    reset();
  };

  return (
    <>
      <div
        className="w-full px-4 py-2 md:w-full  lg:w-full  "
        style={{ backgroundImage: `url("")` }}
      >
        {error && <ErrorPage />}
        <div className=" flex items-center justify-center h-screen">
          <div className=" bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="https://ltnow.com/wp-content/uploads/2015/06/reasons-change-password-700x464.jpg"
                alt="Lock Icon"
                className="rounded-full w-12 h-12"
              />
              <h1 className="text-xl font-serif">Change Password</h1>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Update password for enhanced account security.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="changePasswordForm"
              className="space-y-6"
            >
              <div>
                <label
                  for="currentPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Current Password *
                </label>
                <input
                  type="password"
                  id="dcurrentPasswor"
                  {...register("currentPassword")}
                  className="input input-bordered w-full max-w-full"
                  required
                />
                {errors?.currentPassword && (
                  <p role="alert">{errors?.currentPassword?.message}</p>
                )}
              </div>
              <div>
                <label
                  for="newPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  New Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword")}
                  className="input input-bordered w-full max-w-full"
                  required
                />
                {errors?.newPassword && (
                  <p role="alert">{errors?.newPassword?.message}</p>
                )}
              </div>
              <div>
                <label
                  for="confirmPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className="input input-bordered w-full max-w-full"
                  required
                />
                {errors?.confirmPassword && (
                  <p role="alert">{errors?.confirmPassword?.message}</p>
                )}
                <button
                  type="button"
                  onclick="clearConfirmPassword()"
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  Clear
                </button>
              </div>
              <div id="passwordCriteria" className="text-sm space-y-2">
                <p className="text-red-500">Weak password. Must contain:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>At least 1 uppercase</li>
                  <li>At least 1 number</li>
                  <li>At least 8 characters</li>
                </ul>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onclick="discardChanges()"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-outline btn-sm"
                >
                  Chnage Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChnagePasswod;
