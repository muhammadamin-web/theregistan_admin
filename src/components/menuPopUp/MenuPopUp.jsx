import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLoadingRefresh,
  setCurrentId,
  setCurrentImgId,
} from "../../store/homeSlice.js";
import { IoMdClose } from "react-icons/io";
import { postDataFromApi, putDataFromApi } from "../../utils/api.js";

function MenuPopUp({
  setEditPopUp,
  editPopUp,
  setBody,
  body,
  isPost,
  setIsPost,
  refreshFunc,
  setErrorInfos,
  setErrorTrue,
}) {
  const dispatch = useDispatch();
  const { categories, currentId } = useSelector((state) => state.home);

  const handleCategory = (categoryId) => {
    setBody({ ...body, category: categoryId });
  };
  const handleOrder = (orderNum) => {
    setBody({ ...body, OrderNumber: orderNum.target.value });
  };

  const postFunc = () => {
    setEditPopUp(false);
    dispatch(changeLoadingRefresh(true));

    postDataFromApi("/menu", body).then((res) => {
      if (res.success) {
        refreshFunc();
        setErrorInfos({
          status: "",
          message: res?.message,
          type: "success",
        });
        setErrorTrue(true);
        setTimeout(() => {
          setErrorTrue(false);
        }, 5000);
        setBody({});
      } else {
        dispatch(changeLoadingRefresh(false));
        setBody({});
        setErrorInfos({
          status: `Error Code ${res?.status}`,
          message: res?.data?.message,
          type: "error",
        });
        setErrorTrue(true);
        dispatch(changeLoadingRefresh(false));
        setBody({ link: "https://...com" });
        setTimeout(() => {
          setErrorTrue(false);
        }, 5000);
      }
    });
  };

  const putFunc = () => {
    console.log(body);
    setEditPopUp(false);
    dispatch(changeLoadingRefresh(true));

    putDataFromApi(`/menu/${currentId}`, body).then((res) => {
      if (res.success) {
        refreshFunc();
        setErrorInfos({
          status: "",
          message: res?.message,
          type: "success",
        });
        setErrorTrue(true);
        setTimeout(() => {
          setErrorTrue(false);
        }, 5000);
        setBody({});
      } else {
        setErrorInfos({
          status: `Error Code ${res?.status}`,
          message: res?.data?.message,
          type: "error",
        });
        dispatch(changeLoadingRefresh(false));
        setBody({});
        setErrorTrue(true);
        setTimeout(() => {
          setErrorTrue(false);
        }, 5000);
      }
    });
  };

  return (
    <div
      id="popUp_menu_bg"
      className="popUp_menu"
      onClick={(e) => {
        if (e.target.id == "popUp_menu_bg") {
          setEditPopUp(false);
          setBody({});
          dispatch(setCurrentImgId(""));
        }
      }}
    >
      <form action="">
        <div
          className="close_btn"
          onClick={() => {
            setEditPopUp(false);
            setBody({});
            dispatch(setCurrentId(""));
          }}
        >
          <IoMdClose />
        </div>
        <div>
          <Input
            onChange={handleOrder}
            defaultValue={body.OrderNumber}
            placeholder="Order"
            type="number"
            maxLength={16}
            style={{
              width: "80px",
              borderColor: "#08a284",
              color: "#000",
            }}
          />
          <Select
            showSearch
            style={{
              width: "100%",
              color: "#000",
            }}
            defaultValue={body.category}
            onChange={handleCategory}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={categories.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
          />
        </div>
        <div>
          <button
            disabled={!editPopUp}
            onClick={(e) => {
              e.preventDefault();
              if (isPost) {
                postFunc();
              } else {
                putFunc();
                setIsPost(true);
              }
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuPopUp;
