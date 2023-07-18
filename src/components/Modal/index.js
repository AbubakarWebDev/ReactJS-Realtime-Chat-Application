import { HiX } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { handleCopyToClipboard } from "../../utils";

const Modal = ({ showModal, setShowModal, roomId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/room/${roomId}`);
  };

  const handleCopy = () => {
    const url = `http://localhost:5173/room/${roomId}`;
    handleCopyToClipboard(url);
    // Optionally, you can show a tooltip or a notification indicating that the URL is copied.
    // For simplicity, we'll just log a message to the console.
    console.log("URL copied to clipboard:", url);
  };

  return (
    <aside className="fixed w-full h-full top-0 left-0 z-30 flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-white flex flex-col w-[80%] md:w-[30%] justify-center py-10 px-5 rounded-lg drop-shadow-lg ">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-base md:text-lg font-normal">
              Here is the link to your meeting
            </h1>
          </div>
          <div>
            <button
              onClick={() => {
                setShowModal(!showModal);
                handleNavigate();
              }}
              className="text-gray-600 p-4 hover:bg-gray-300 hover:rounded-full"
            >
              <HiX size={25} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p>
            Copy the link and send it to the people you want to meet with. Be
            sure to save it so you can use it latter, too.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <input
            type="text"
            readOnly
            className=" bg-gray-200 px-10 py-4 rounded-md w-full"
            value={`http://localhost:5173/room/${roomId}`}
          />
          <div className="group  -ml-14 relative flex justify-cente">
            <button
              className="p-4 hover:bg-gray-300 hover:rounded-full"
              onClick={handleCopy}
            >
              <MdContentCopy size={25} />
            </button>
            <span className="absolute w-[70px] top-14 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              Copy link
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
