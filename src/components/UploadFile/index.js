import { FaFileUpload } from "react-icons/fa";

const UploadFile = ({ handleUpload }) => {
  return (
    <div className="p-5  lg:w-2/5 rounded-md bg-gray shadow-md ">
      <div className="group h-full flex justify-center items-center py-10  border border-gray-secondry border-dashed hover:bg-white">
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <FaFileUpload
            className="fill-gray-secondry group-hover:fill-blue-600"
            size={40}
          />
          <span className="text-gray-font text-base font-medium">
            Click to browse or drag files here
          </span>
        </label>
        <input
          id="upload"
          type="file"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
};
export default UploadFile;
