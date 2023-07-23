import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Error404() {
  return (
    <div className="flex h-screen items-center justify-center p-5 bg-white w-full">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-blue-100 p-4">
          <div className="rounded-full stroke-blue-600 bg-blue-200 p-4">
            <HiOutlineExclamationCircle
              className="w-16 h-16 text-blue-600"
              fill="none"
            />
          </div>
        </div>
        <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
          404 - Page not found
        </h1>
        <p className="text-slate-600 mt-5 lg:text-lg">
          The page you are looking for doesn't exist or <br />
          has been removed.
        </p>
      </div>
    </div>
  );
}

export default Error404;
