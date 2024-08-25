import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser, EmailVarification, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    createUser(email, password)
      .then((data) => {
        const userInfo = {
          email: data?.user?.email,
          name: name,
          photo: data?.user?.photoURL,
          createAt: data?.user?.metadata?.creationTime,
          role: "user",
        };
        EmailVarification();
        toast.success("Checked Your Email and Varified");
        fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!!data) {
              localStorage.setItem("token", data?.token);
              logOut()
                .then(() => {
                  localStorage.setItem("token", null);
                  navigate("/login");
                })
                .catch((error) => {
                  console.log(error.message);
                });
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-full" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 py-20">
          <h1 className="text-3xl text-center font-bold">Sign Up</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-orange-600 font-bold" to="/login">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
