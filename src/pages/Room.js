import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

const Room = () => {
  const myMeeting = (element) => {
    const appID = 1941361114;
    const serverSecret = "053a5e58828bd7cd2b35495406682964";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter Name"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      showRemoveUserButton: true,
      showRoomTimer: true,
      showRoomDetailsButton: false,
    });
  };

  const { roomId } = useParams();

  return <div className="w-screen h-screen" ref={myMeeting}></div>;
};
export default Room;
