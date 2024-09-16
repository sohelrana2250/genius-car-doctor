import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const HavingTrouble = () => {
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  console.log(user?.displayName);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now use `diseaseName` and `scientificName`
    console.log(message);
    console.log(image);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mt-8 shadow-lg">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>User Name</b>
          </h2>
          <input
            type="text"
            defaultValue={user?.displayName}
            name="name"
            placeholder="Write a Text Messages:"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>Email Address</b>
          </h2>
          <input
            type="email"
            defaultValue={user?.email}
            name="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>Date & Time</b>
          </h2>
          <input
            type="text"
            defaultValue={new Date().toString()}
            name="date"
            placeholder="Email Address"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <div className="flex flex-col items-center justify-center mt-5">
            <h1 className="text-3xl font-serif mb-2">Having Trouble</h1>
            {!image ? (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-64 h-64 bg-gray-200 rounded-lg">
                    <span className="text-gray-500">Upload a plant image</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded plant"
                  className="w-64 h-64 object-contain mb-4"
                />
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>Write a Text Messages:</b>
          </h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a Text Messages:"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-400 text-black rounded p-2 w-full mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default HavingTrouble;
