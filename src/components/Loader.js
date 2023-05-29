import React from 'react';
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed-top d-flex justify-content-center zindex-tooltip align-items-center bg-white w-100 vh-100">
      <HashLoader size={80} />
    </div>
  );
}

export default Loader;