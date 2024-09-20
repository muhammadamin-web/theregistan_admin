import { IoIosCreate, IoIosTrash } from "react-icons/io";
import { BASE_IMG_URL } from "../../utils/api.js";
import emptyImage from "../../assets/images/empty-image.png";
import { useDispatch } from "react-redux";
import {
  setCurrentId,
  setCurrentImgId,
  setWarningPopUp,
} from "../../store/homeSlice.js";
function CategoryTableData({ singleData, setEditPopUp, setBody, setImgUrl }) {
  const dispatch = useDispatch();
  return (
    <tr className="category-tr">
      <td>
        <div className="main__table-text">
          <img
            src={
              singleData?.image?.name
                ? `${BASE_IMG_URL + singleData?.image?.name}`
                : emptyImage
            }
          />
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <a>{singleData.name}</a>
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <a
            className={`main__table-btn main__table-edit`}
            onClick={() => {
              setEditPopUp(true);
              setBody({ name: singleData.name });
              dispatch(setCurrentId(singleData._id));
              dispatch(setCurrentImgId(singleData?.image?._id));
              setImgUrl(
                singleData?.image?.name
                  ? BASE_IMG_URL + singleData?.image?.name
                  : ""
              );
            }}
          >
            <IoIosCreate />
          </a>
          <a
            className={`main__table-btn main__table-trash`}
            onClick={() => {
              dispatch(setCurrentId(singleData._id));
              dispatch(setWarningPopUp(true));
            }}
          >
            <IoIosTrash />
          </a>
        </div>
      </td>
    </tr>
  );
}

export default CategoryTableData;
