import { useEffect, useState } from "react";
import { BASE_IMG_URL } from "../../utils/api.js";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { putDataFromApi } from "./../../utils/api";
import { Alert, Space } from "antd";
import { changeLoadingRefresh } from "../../store/homeSlice.js";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused || state.isSelected ? "#08a284" : "#08a284",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#08a284",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
  }),
};
function LeftBanner() {
  const { posts, topBanner } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    news: topBanner?.news?._id,
    status: topBanner?.status,
  });

  const [showBody, setShowBody] = useState(
    posts.filter((post) => post._id == body.news)
  );
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({
    status: "",
    message: "",
    type: "",
  });
  const [selectedItem, setSelectedItem] = useState({
    label: topBanner?.news?.title,
    value: body.news,
  });

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setShowBody(posts.filter((post) => post._id == selectedOption.value));
      setSelectedItem(selectedOption);
      setBody({ ...body, news: selectedOption.value });
    } else {
      setBody("");
      setShowBody("");
      setSelectedItem("");
    }
  };

  const putFunc = () => {
    dispatch(changeLoadingRefresh(true));
    putDataFromApi(`/topbanner/${topBanner._id}`, body).then((res) => {
      dispatch(changeLoadingRefresh(false));
      if (res.success) {
        console.log(res);
        setErrorInfos({
          status: "",
          message: res?.message,
          type: "success",
        });
        setErrorTrue(true);
      } else {
        setErrorInfos({
          status: `Error Code ${res?.status}`,
          message: res?.data?.message,
          type: "error",
        });
        setErrorTrue(true);
      }
      setTimeout(() => {
        setErrorTrue(false);
      }, 3000);
    });
  };

  return (
    <>
      {errorTrue && (
        <Space
          direction="vertical"
          style={{
            minWidth: "25%",
            position: "fixed",
            zIndex: "1",
            left: "50%",
            transform: "translateX(-40%)",
            top: "1%",
          }}
        >
          <Alert
            message={`${errorInfos.status}`}
            description={`${errorInfos.message}`}
            type={errorInfos.type}
            showIcon
            closable
            onClose={() => {
              setErrorTrue(false);
            }}
          />
        </Space>
      )}
      <div className={"banner_content"}>
        <form action="">
          <label htmlFor="">Main Banner</label>
          <Select
            options={posts.map((item) => ({
              value: item?._id,
              label: item.title,
            }))}
            value={selectedItem}
            onChange={handleChange}
            styles={customStyles}
          />
        </form>
        <div className={"banner_img_div"}>
          <h1>{selectedItem.label ? selectedItem.label : "Tanlang"}</h1>
          <div>
            <img
              src={
                showBody[0]?.image
                  ? BASE_IMG_URL + showBody[0]?.image?.name
                  : "https://www.designtak.se/doesnotexist.png"
              }
            />
          </div>
        </div>
        <div className="checkbox-wrapper-47">
          <input
            type="checkbox"
            name="cb"
            id="cb-47"
            checked={body.status}
            onChange={() => {
              setBody({ ...body, status: !body.status });
            }}
          />
          <label htmlFor="cb-47">
            {body.status ? "Active qilindi" : "Active qilish"}{" "}
          </label>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();

            putFunc();
          }}
        >
          Publish
        </button>
      </div>
    </>
  );
}

export default LeftBanner;
