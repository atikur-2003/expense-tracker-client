import React from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router";
import GoogleSignin from "./GoogleSignin";

const Login = () => {
  return (
    <div className="py-20 px-3 md:px-0">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <div className="text-center mt-5">
          <h1 className="text-2xl text-purple-500 font-semibold">
            Log In your account
          </h1>
        </div>
        <div className="card-body">
          <form className="fieldset">
            <label className="label text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input focus:outline-none focus:border-purple-500"
              placeholder="Email"
              //   ref={emailRef}
              required
            />

            <label className="label text-lg font-medium">Password</label>
            <div className="relative">
              <input
                // type={showPass ? "text" : "password"}
                type="password"
                name="password"
                className="input focus:outline-none focus:border-purple-500"
                placeholder="Password"
                required
              />
              <button
                // onClick={() => {
                //   setShowPass(!showPass);
                // }}
                className="btn btn-xs absolute right-5 top-2 z-10"
              >
                <FaEyeSlash />
                {/* {showPass ? <FaRegEye></FaRegEye> : <FaEyeSlash></FaEyeSlash>} */}
              </button>
            </div>
            <div className="mt-2">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="btn border border-purple-500  text-purple-500 hover:bg-purple-500 hover:text-white mt-4 mb-2"
            >
              Log In
            </button>

            {/* {error && (
              <p className="text-red-400 text-base">
                Invalid Email or Password
              </p>
            )} */}

            <p className="text-base mt-3">
              Don't have an account ?{" "}
              <Link to="/signup" className="text-purple-500 hover:underline">
                Signup here
              </Link>
            </p>
          </form>
          <GoogleSignin />
        </div>
      </div>
    </div>
  );
};

export default Login;
