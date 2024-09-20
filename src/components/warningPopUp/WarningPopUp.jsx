// External Dependencies
import { useDispatch } from "react-redux";

// Icon
import { IoIosWarning } from "react-icons/io";

// Style
import "./style.scss";

// Redux Actions
import { setWarningPopUp } from "../../store/homeSlice.js";

const WarningPopUp = ({ deleteItem, warningDatas, logout, setIsTrue }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="popUp__blur"
      onClick={(e) => {
        if (e.target.classList.contains("popUp__blur")) {
          dispatch(setWarningPopUp(false));
        }
      }}
    >
      <div className="popUp">
        <span className="popUp__icon">
          <IoIosWarning />
        </span>
        <h2 className="popUp__title">Caution!</h2>
        <span className="popUp__texts">
          Are you sure you are almost {warningDatas.type}? <br />{" "}
          {warningDatas.warning}
        </span>
        <div className="popUp__btns">
          <button
            className="popUp__btn popUp__btn--yes"
            onClick={(e) => {
              e.preventDefault();
              if (logout) {
                logout();
              }
              if (deleteItem) {
                deleteItem();
              }
            }}
          >
            yes
          </button>
          <button
            className="popUp__btn popUp__btn--no"
            onClick={() => {
              if (setIsTrue) {
                setIsTrue(false);
              }
              dispatch(setWarningPopUp(false));
            }}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};
export default WarningPopUp;
