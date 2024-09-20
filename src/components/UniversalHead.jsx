import { Link, useNavigate } from "react-router-dom";
import "./universal.scss";
import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { changeShow, putBody } from "../store/homeSlice.js";
import { memo } from "react";

function UniversalHead({ data, setPopUp }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="universal_head">
      <IoIosMenu
        onClick={() => {
          dispatch(changeShow(true));
        }}
      />
      <h2>{data.title}</h2>
      {data.btn && (
        <Link
          onClick={() => {
            if (data.link.slice(0, 1) == "/") {
              dispatch(putBody(""));
              navigate(data.link);
            } else {
              setPopUp(true);
            }
          }}
        >
          {data.btn}
        </Link>
      )}
    </div>
  );
}

export default memo(UniversalHead);
