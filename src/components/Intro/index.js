import { NavLink } from "react-router-dom";

const Intro = () => {
  return (
    <div className="mb-12 max-w-lg px-5 lg:mb-0 ">
      <div className="max-w-xl mb-6 py-7">
        <h2 className="max-w-lg mb-6 text-3xl font-normal text-gray sm:text-4xl sm:leading-none ">
          Simplest File Transfer On the Planet!
        </h2>
        <p className="text-base text-gray-font md:text-lg mb-6">
          Send files of any size directly from your device without ever storing
          anything online.
        </p>
        <NavLink
          to={"/register"}
          className=" mt-6 p-3 text-base font-bold rounded-md bg-btn-primary hover:bg-btn-secondry text-white"
        >
          Register Here
        </NavLink>
      </div>
    </div>
  );
};
export default Intro;
