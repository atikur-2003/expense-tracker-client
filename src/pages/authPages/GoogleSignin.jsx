import React from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const GoogleSignin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignin = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/dashboard/overview');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="text-center my-2">
        <p className="text-lg font-semibold text-purple-500">OR</p>
      </div>
      <button
        onClick={handleGoogleSignin}
        className="btn w-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default GoogleSignin;
