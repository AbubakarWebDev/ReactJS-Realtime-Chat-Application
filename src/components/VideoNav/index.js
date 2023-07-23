import DateTimeDisplay from "../DateTimeDisplay";

const VideoNav = () => {
  return (
    <div className="flex items-center justify-between w-full py-4">
      <div className="flex items-center justify-between  w-full px-10">
        <div className="flex items-center justify-between w-full gap-16">
          <div>
            <h1 className="text-2xl font-normal">FilEnd</h1>
          </div>
          <div>
            <h1 className="text-2xl font-normal">{<DateTimeDisplay />}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoNav;
