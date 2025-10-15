import React from 'react';
import { FaEyeSlash } from 'react-icons/fa6';
import { Link } from 'react-router';

const Signup = () => {
    return (
        <div className="hero py-20 bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="text-center mt-5">
          <h1 className="text-2xl text-purple-500 font-semibold">
            Signup your account
          </h1>
        </div>
        <div className="card-body">
          <form className="fieldset">
            <label className="label text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="input focus:outline-none focus:border-purple-500"
              placeholder="Enter Name"
            />

            <label className="label text-lg font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input focus:outline-none focus:border-purple-500"
              placeholder="Enter Phot URL"
            />

            <label className="label text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input focus:outline-none focus:border-purple-500"
              placeholder="Enter Email"
            />

            <label className="label text-lg font-medium">Password</label>
            <div className="relative">
              <input
                // type={showPass ? "text" : "password"}
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
            <div>
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>
            {/* {errorMessage && (
              <p className="text-red-400 text-base">{errorMessage}</p>
            )} */}

            <button className="btn border-purple-500  text-purple-500 hover:bg-purple-500 hover:text-white mt-4">
              Signup
            </button>

            <p className="text-base mt-3">
              Already have an account ?
              <Link to="/login" className="text-purple-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Signup;