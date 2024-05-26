import { useSetRecoilState } from "recoil";
import StockInfor from "./components/stockInfor";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { popUp } from "../../state";

const PopUpForm = ({ emits }) => {
  const setPopUp = useSetRecoilState(popUp);

  const handleClosed = () => {
    setPopUp({
      open: false,
      data: {},
    });
  };

  return (
    <div className=" bg-slate-900 p-5 rounded-sm shadow-2xl  shadow-blue-950">
      <div className="float-end text-white">
        <HighlightOffIcon sx={{ color: "white" }} onClick={handleClosed} />
      </div>
      <StockInfor dataStock={emits.data} />
    </div>
  );
};

export default PopUpForm;
