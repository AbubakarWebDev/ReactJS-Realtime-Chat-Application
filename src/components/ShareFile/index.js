import QRCode from "react-qr-code";
import { HiOutlineClipboard, HiOutlineX, HiBadgeCheck } from "react-icons/hi";
import {
  BsFacebook,
  BsWhatsapp,
  BsFillChatLeftTextFill,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";

const ShareFile = ({ file, handleCopyToClipboard, showToast }) => {
  return (
    <div className="p-5 flex flex-col  lg:w-2/5  h-full rounded-md bg-white shadow-md ">
      <div className="flex justify-end mb-6">
        <HiOutlineX className="cursor-pointer" size={30} />
      </div>
      <div className="mb-6">
        <h1 className="text-base font-medium ">{file.name}</h1>
      </div>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          className="w-[80%] border-b-4 border-btn-primary focus:outline-0"
          value={file.name}
          readOnly
        />
        <HiOutlineClipboard
          className="cursor-pointer text-btn-primary"
          size={30}
          onClick={handleCopyToClipboard}
        />
      </div>
      <div className="flex mb-6 ">
        <div>
          <QRCode value={file.name} />
        </div>
        <div className="flex flex-wrap">
          <BsWhatsapp className="cursor-pointer text-[#28D146] m-4" size={30} />
          <BsFacebook
            className="cursor-pointer m-4  text-[#3b5998]"
            size={30}
          />
          <BsFillChatLeftTextFill
            className="cursor-pointer m-4 text-[#28D146]"
            size={30}
          />
          <BsTwitter className="cursor-pointer m-4  text-[#00acee]" size={30} />
          <BsLinkedin
            className="cursor-pointer m-4  text-[#0072b1]"
            size={30}
          />
        </div>
      </div>
      {showToast && (
        <div
          className="mb-3 inline-flex w-full items-center rounded-lg bg-green-500 px-6 py-5 text-base text-black"
          role="alert"
        >
          <span className="mr-2">
            <HiBadgeCheck size={20} className="text-white" />
          </span>
          URL Copied - check it out!
        </div>
      )}
    </div>
  );
};
export default ShareFile;
