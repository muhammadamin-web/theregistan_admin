import { useDispatch } from "react-redux";
import { setCurrentId, setWarningPopUp } from "../../store/homeSlice.js";
import { IoIosCreate, IoIosTrash } from "react-icons/io";

function MenuSingle({ menuSingle, setEditPopUp, setBody, setIsPost }) {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>
        <div className="main__table-text">{menuSingle.OrderNumber}</div>
      </td>
      <td>
        <div className="main__table-text">{menuSingle?.category?.name}</div>
      </td>
      <td>
        <div className="main__table-text">
          <a
            className={`main__table-btn main__table-edit`}
            onClick={() => {
              setEditPopUp(true);
              dispatch(setCurrentId(menuSingle._id));
              setBody({
                OrderNumber: menuSingle.OrderNumber,
                category: menuSingle?.category?._id,
              });
              setIsPost(false);
            }}
          >
            <IoIosCreate />
          </a>
          <a
            className={`main__table-btn main__table-trash`}
            onClick={() => {
              dispatch(setCurrentId(menuSingle._id));
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

export default MenuSingle;
