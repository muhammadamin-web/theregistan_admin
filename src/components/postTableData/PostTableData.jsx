// External Dependencies
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

// Style
import "./style.scss";

// Image
import emptyImage from "../../assets/images/empty-image.png";

// Redux Actions
import {
  putBody,
  setCurrentId,
  setCurrentImgId,
  setCurrentImgUrl,
  setWarningPopUp,
} from "../../store/homeSlice.js";

// Icons
import { FaEye } from "react-icons/fa";
import { IoIosCreate, IoIosTrash } from "react-icons/io";

// Image URL from API
import { BASE_IMG_URL } from "../../utils/api.js";

function PostTableData({ dataSingle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <tr>
      <td>
        <div className="main__table-text">
          <img
            src={
              dataSingle?.image?.name
                ? `${BASE_IMG_URL + dataSingle?.image?.name}`
                : emptyImage
            }
          />
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <a>{dataSingle.title}</a>
        </div>
      </td>
      <td>
        <div className="main__table-text">
          {dayjs(dataSingle.date).format("MMMM DD, YYYY")}
        </div>
      </td>
      <td>
        <div className="main__table-text">{dataSingle.readTime}m</div>
      </td>
      <td>
        <div className="main__table-text">
          {dataSingle.category.map((categ, i) => (
            <span key={i}>{categ?.name}</span>
          ))}
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <Link className="main__table-btn main__table-eye">
            <FaEye />
          </Link>
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <button
            onClick={() => {
              dispatch(
                putBody({ ...dataSingle, image: dataSingle?.image?._id })
              );
              dispatch(
                setCurrentImgUrl(
                  dataSingle?.image?.name
                    ? BASE_IMG_URL + dataSingle?.image?.name
                    : ""
                )
              );
              dispatch(setCurrentImgId(dataSingle?.image?._id));
              dispatch(setCurrentId(dataSingle._id));
              navigate("/editPost");
            }}
            className="main__table-btn main__table-edit"
          >
            <IoIosCreate />
          </button>
          <button
            className="main__table-btn main__table-trash"
            onClick={() => {
              dispatch(setCurrentId(dataSingle._id));
              dispatch(setWarningPopUp(true));
            }}
          >
            <IoIosTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PostTableData;
