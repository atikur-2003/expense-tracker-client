import React, { useRef, useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import GoogleSignin from "./GoogleSignin";

const Login = () => {
  const { signIn, } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const [showPass, setShowPass] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "SigIn successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };
  return (
    <div className="py-20 px-3 md:px-0">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <div className="text-center mt-5">
          <h1 className="text-2xl text-purple-500 font-semibold">Log In your account</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input focus:outline-none focus:border-purple-500 mb-2"
              placeholder="Email"
              ref={emailRef}
              required
            />

            <label className="label text-lg font-medium">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="input focus:outline-none focus:border-purple-500 mb-2"
                placeholder="Password"
                required
              />
              <button
                onClick={() => {
                  setShowPass(!showPass);
                }}
                className="btn btn-xs absolute right-5 top-2 z-10"
              >
                {showPass ? <FaRegEye></FaRegEye> : <FaEyeSlash></FaEyeSlash>}
              </button>
            </div>
            <div className="mt-2">
              <a className="link link-hover text-sm">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="btn border border-purple-500  text-purple-500 hover:bg-purple-500 hover:text-white mt-4 mb-2"
            >
              Log In
            </button>

            {error && (
              <p className="text-red-400 text-base">
                Invalid Email or Password
              </p>
            )}

            <p className="text-base mt-3">
              Don't have an account ?{" "}
              <Link to="/signup" className="text-purple-500 underline">
                Signup here
              </Link>
            </p>
          </form>
          <GoogleSignin/>
        </div>
      </div>
    </div>
  );
};

export default Login;
