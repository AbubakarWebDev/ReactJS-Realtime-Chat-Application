import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useState } from "react";

const Navbar = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <nav>
      {/* Large Screen Menu  */}

      <div className="flex items-center justify-between fixed top-0 z-30 w-full py-6 bg-gray-400">
        <div className="flex items-center justify-between w-5/6 mx-auto">
          <div className="flex items-center justify-between w-full gap-16">
            <h1 className="text-3xl">FilEnd</h1>
            {isAboveMediumScreen ? (
              <div className="flex items-center justify-between gap-8 text-lg font-medium ">
                <Link
                  to="/"
                  className="text-black no-underline hover:underline hover:uppercase"
                >
                  Chat
                </Link>
                <Link
                  to="/video-home"
                  className="text-black no-underline hover:underline hover:uppercase"
                >
                  Video Call
                </Link>
                <Link
                  to="/about-us"
                  className="text-black no-underline hover:underline hover:uppercase"
                >
                  About Us
                </Link>
              </div>
            ) : (
              <button
                className="rounded-full p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <HiOutlineMenu className="h-6 w-6 text-black" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Screen Menu  */}

      {!isAboveMediumScreen && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-gray-400 drop-shadow-xl">
          {/* Close Icon  */}

          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <HiX className="h-6 w-6 text-black" />
            </button>
          </div>

          {/* Menu  */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl ">
            <Link
              to="/"
              className="text-black no-underline hover:underline hover:uppercase"
            >
              Chat
            </Link>
            <Link
              to="/video-home"
              className="text-black no-underline hover:underline hover:uppercase"
            >
              Video Call
            </Link>
            <Link
              to="/about-us"
              className="text-black no-underline hover:underline hover:uppercase"
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
