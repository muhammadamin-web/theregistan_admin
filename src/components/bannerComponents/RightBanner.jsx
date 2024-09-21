import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BASE_IMG_URL,
  deleteDataFromApi,
  postDataFromApi,
  putDataFromApi,
} from "../../utils/api.js";
import { Alert, Space } from "antd";
import { changeLoadingRefresh } from "../../store/homeSlice.js";
import postImage from "./../ImageCompressor";

function RightBanner() {
  // bannerData ni Redux storidan olamiz
  const { bannerData } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  // bannerData ni tekshiramiz va massiv qilib sozlaymiz
  const [bodyList, setBodyList] = useState(
    Array.isArray(bannerData)
      ? bannerData.map((banner) => ({
          ...banner,
          image: banner?.image?._id,
          imgUrl: "",
          imgData: null,
        }))
      : []
  );

  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({ status: "", message: "" });
  const imgRef = useRef();

  const putFunc = async (index) => {
    dispatch(changeLoadingRefresh(true));

    const currentBody = bodyList[index];

    if (currentBody.imgUrl) {
      if (currentBody?.image?._id) {
        await deleteDataFromApi(`/image/${currentBody.image._id}`);
      }
      const uploadedImage = await postDataFromApi("/image/upload", currentBody.imgData);
      const updatedData = { ...currentBody, image: uploadedImage.data._id };

      const res = await putDataFromApi(`/banner/${currentBody._id}`, updatedData);
      dispatchChangeLoadingAndHandleErrors(false, res?.success ? "success" : "error", res);
    } else {
      const res = await putDataFromApi(`/banner/${currentBody._id}`, currentBody);
      dispatchChangeLoadingAndHandleErrors(false, res?.success ? "success" : "error", res);
    }
  };

  const dispatchChangeLoadingAndHandleErrors = (loadingValue, messageType, res) => {
    dispatch(changeLoadingRefresh(loadingValue));

    const successMessage = messageType === "success" ? "" : `Error Code ${res?.status}`;

    setErrorInfos({
      status: successMessage,
      message: res?.success ? res?.message : res?.data?.message,
      type: messageType,
    });

    setErrorTrue(true);

    setTimeout(() => {
      setErrorTrue(false);
    }, 3000);
  };

  return (
    <>
      {errorTrue && (
        <Space
          direction="vertical"
          style={{
            minWidth: "25%",
            position: "fixed",
            zIndex: "0",
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
        {bodyList.map((body, index) => (
          <form key={body._id} action="">
            <label htmlFor="">Footer Banner {index + 1}</label>
            <input
              placeholder="Paste Link"
              type="text"
              value={body.link}
              onChange={(e) => {
                const newBodyList = [...bodyList];
                newBodyList[index].link = e.target.value;
                setBodyList(newBodyList);
              }}
            />

            <div className="changePhotoBtn">
              <button
                onClick={() => {
                  imgRef.current.click();
                }}
              >
                Change Photo
              </button>
            </div>

            <div className="form_div">
              <input
                ref={imgRef}
                className={"input_img"}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  postImage(event, (url) => {
                    const newBodyList = [...bodyList];
                    newBodyList[index].imgUrl = url;
                    setBodyList(newBodyList);
                  }, (data) => {
                    const newBodyList = [...bodyList];
                    newBodyList[index].imgData = data;
                    setBodyList(newBodyList);
                  });
                }}
              />
              {body.imgUrl || body?.image?.name ? (
                <label>
                  <img
                    src={!body.imgUrl ? BASE_IMG_URL + body.image.name : body.imgUrl}
                    alt="Banner"
                  />
                </label>
              ) : null}
            </div>

            <div className="checkbox-wrapper-48">
              <input
                type="checkbox"
                name="cb"
                id={`cb-${index}`}
                checked={body.status}
                onChange={() => {
                  const newBodyList = [...bodyList];
                  newBodyList[index].status = !newBodyList[index].status;
                  setBodyList(newBodyList);
                }}
              />
              <label htmlFor={`cb-${index}`}>
                {body.status ? "Active qilindi" : "Active qilish"}
              </label>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                putFunc(index);
              }}
            >
              Publish
            </button>
          </form>
        ))}
      </div>
    </>
  );
}

export default RightBanner;
