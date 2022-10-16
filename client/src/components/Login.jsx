import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Background from "../assets/background.png";
import Logo from "../assets/logo.png";
import jwt_decode from "jwt-decode";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response));
    const { name, jti, picture } = response;

    const doc = {
      _id: jti,
      _type: "user",
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img src={Background} className="w-full h-full object-cover ml-1" />
      </div>
      <div className="absolute flex flex-col justify-top items-center top-56 right-0 left-0 bottom-0">
        <div className="p-5">
          <p className="text-5xl">Post your next</p>
          <p className="text-4xl text-center mt-2 text-[#146356]">
            trending pin
          </p>
        </div>
        <div>
          <GoogleLogin
            onSuccess={(response) => {
              console.log(response.credential);
              var decode = jwt_decode(response.credential);
              console.log(decode);
              responseGoogle(decode);
            }}
            onError={() => console.log("Error")}
            //render={(renderProps) => (
            // <button
            //type="button"
            // className="bg-mainColor flex justify-center items-center p-4 rounded-lg cursor-pointer outline-none"
            // onClick={renderProps.onClick}
            // disabled={renderProps.disabled}
            //>
            //  <FcGoogle className="mr-4" />
            //</div> Sign in with Google
            //</button>
            // )}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
