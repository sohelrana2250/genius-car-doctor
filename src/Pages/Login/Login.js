import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((data) => {
        if (data?.user?.emailVerified) {
          fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data?.user?.email }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem("token", result?.token);
              console.log("create token");
              const form = location.state?.from?.pathname || "/";
              navigate(form, { replace: true });
              toast.success(data?.message);
            })
            .catch((error) => {
              toast.error(error?.message);
            });
        } else {
          toast.error("You Are Not Varified, Checked Your Email");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handelGoogleSinIn = () => {
    googleLogin().then(async (data) => {
      if (data?.user?.emailVerified) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data?.user?.email,
            name: data?.user?.displayName,
            photo: data?.user?.photoURL,
            createAt: data?.user?.metadata?.creationTime,
            role: "user",
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            localStorage.setItem("token", result?.token);
            const form = location.state?.from?.pathname || "/";
            navigate(form, { replace: true });
            toast.success(data?.message);
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }
    });
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-full" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 py-20">
          <h1 className="text-3xl text-center font-bold">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
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
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <div className="ml-7 mr-7">
            <button
              type="submit"
              onClick={handelGoogleSinIn}
              className=" w-full font-bold text-white text-sm  rounded btn btn-success  btn-outline h-10"
            >
              <FcGoogle className="text-xl mr-3" /> Sing In With Google
            </button>
          </div>
          <p className="text-center mt-3">
            New to Genius Car{" "}
            <Link className="text-orange-600 font-bold" to="/signup">
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
