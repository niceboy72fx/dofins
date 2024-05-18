import { useSetRecoilState } from "recoil";
import PopUpForm from "./popUpForm";
import { popUp } from "../../state";

const PopUp = ({ emits }) => {
  const setPopUp = useSetRecoilState(popUp);

  return (
    <div
      className="min-h-full min-w-full  flex items-center fixed justify-center overflow-auto z-50 "
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <PopUpForm emits={emits} />
    </div>
  );
};

export default PopUp;
