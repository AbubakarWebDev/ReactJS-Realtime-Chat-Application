import React from "react";

const Feature = ({ title, disc, icon }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-4 rounded-[20px] bg-white p-10 shadow-lg hover:shadow-xl md:px-7 xl:px-10">
        <div className="bg-btn-primary  mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl hover:bg-btn-secondry">
          {React.createElement(icon, { size: 30, className: "text-white" })}
        </div>
        <h4 className="text-dark mb-3 text-xl font-semibold">{title}</h4>
        <p className="text-body-color">{disc}</p>
      </div>
    </div>
  );
};
export default Feature;
