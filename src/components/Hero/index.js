import Intro from "../Intro";
import FileContainer from "../FileContainer";

const Hero = () => {
  return (
    <div className="px-4 py-16 w-full md:px-24 lg:px-8 lg:py-20 bg-main">
      <div className="flex flex-col justify-between lg:flex-row">
        <Intro />
        <FileContainer />
      </div>
    </div>
  );
};
export default Hero;
