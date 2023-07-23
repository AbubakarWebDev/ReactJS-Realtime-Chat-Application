import "../styles/index.css";
import { useState } from "react";
import HomePageGraphic from "../assets/images/animation.gif";
import VideoNav from "../components/VideoNav";
import { BsFillKeyboardFill } from "react-icons/bs";
import { BiVideoPlus } from "react-icons/bi";
import Modal from "../components/Modal";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <div className="bg-gray-200">
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          roomId={roomId}
        />
      )}
      <VideoNav />
      <div className="gap-16 py-10 md:h-full md:pb-0 ">
        <div className="md:flex mx-auto  w-[90%] items-center justify-center md:h-5/6">
          <div className=" mt-10 md:basis-3/4">
            <div className="-mt-10">
              <h1 className="text-3xl leading-tight md:text-[44px]">
                High-quality video conferences.
                <br />
                Now accessible to all.
              </h1>
              <p className="mt-8 text-base md:text-lg ">
                Reimagining Video Conferencing: Introducing Our Secure Business
                Meetings App, Now Free and Available for All.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start justify-between md:flex-row md:items-center text-black">
                  <div className="relative ">
                    <input
                      type="text"
                      placeholder=" Enter Room Code"
                      required
                      className=" text-xl pl-16 py-3 rounded-md border border-gray-700"
                      onChange={(e) => setRoomId(e.target.value)}
                    />
                    <span className="absolute left-5 top-1/2 transform -translate-y-1/2">
                      <BsFillKeyboardFill size={30} />
                    </span>
                  </div>
                  <div className="my-3 md:mx-5">
                    <button
                      type="submit"
                      className=" bg-blue-700 px-16 py-3 text-white text-lg rounded-lg flex items-center hover:bg-blue-600"
                    >
                      <BiVideoPlus size={30} className="mr-1" />
                      Join
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex basis-3/5 justify-center align-top md:z-10 md:ml-40 md:mt-16 md:justify-items-end">
            <img
              src={HomePageGraphic}
              alt="Home-
            Page-Graphic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
