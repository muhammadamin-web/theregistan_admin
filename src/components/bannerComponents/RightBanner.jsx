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
  const { bannerData } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [imgData, setImgData] = useState();
  const [body, setBody] = useState({
    ...bannerData,
    image: bannerData?.image?._id,
  });
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({ status: "", message: "" });
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef();

  const putFunc2 = () => {
    dispatch(changeLoadingRefresh(true));
    if (imgUrl && bannerData?.image?._id) {
      console.log(1);
      deleteDataFromApi(`/image/${bannerData.image._id}`).then((res) => {
        postDataFromApi("/image/upload", imgData).then((res) => {
          putDataFromApi(`/banner/${bannerData._id}`, {
            ...body,
            image: res.data._id,
          }).then((res) => {
            dispatch(changeLoadingRefresh(false));
            if (res.success) {
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
        });
      });
    } else if (imgUrl && !bannerData?.image?._id) {
      console.log(2);
      postDataFromApi("/image/upload", imgData).then((res) => {
        putDataFromApi(`/banner/${bannerData._id}`, {
          ...body,
          image: res.data._id,
        }).then((res) => {
          dispatch(changeLoadingRefresh(false));
          if (res.success) {
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
      });
    } else {
      console.log(3);
      putDataFromApi(`/banner/${bannerData._id}`, body).then((res) => {
        dispatch(changeLoadingRefresh(false));
        if (res.success) {
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
    }
  };

  const putFunc = async () => {
    dispatch(changeLoadingRefresh(true));

    if (imgUrl) {
      if (bannerData?.image?._id) {
        await deleteDataFromApi(`/image/${bannerData.image._id}`);
      }
      const uploadedImage = await postDataFromApi("/image/upload", imgData);
      const updatedData = { ...body, image: uploadedImage.data._id };

      const res = await putDataFromApi(
        `/banner/${bannerData._id}`,
        updatedData
      );
      dispatchChangeLoadingAndHandleErrors(
        false,
        res?.success ? "success" : "error",
        res
      );
    } else {
      const res = await putDataFromApi(`/banner/${bannerData._id}`, body);
      dispatchChangeLoadingAndHandleErrors(
        false,
        res?.success ? "success" : "error",
        res
      );
    }
  };

  const dispatchChangeLoadingAndHandleErrors = (
    loadingValue,
    messageType,
    res
  ) => {
    dispatch(changeLoadingRefresh(loadingValue));

    const successMessage =
      messageType === "success" ? "" : `Error Code ${res?.status}`;

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
        <form action="">
          <label htmlFor="">Footer Banner</label>
          <input
            placeholder="Paste Link"
            type="text"
            value={body.link}
            onChange={(e) => {
              setBody({ ...body, link: e.target.value });
            }}
          />
        </form>
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
              postImage(event, setImgUrl, setImgData);
            }}
          />
          {
            <label>
              {(imgUrl || bannerData?.image?.name) && (
                <img
                  src={!imgUrl ? BASE_IMG_URL + bannerData.image.name : imgUrl}
                />
              )}
            </label>
          }
        </div>
        <div className="checkbox-wrapper-48">
          <input
            type="checkbox"
            name="cb"
            id="cb-48"
            checked={body.status}
            onChange={() => {
              setBody({ ...body, status: !body.status });
            }}
          />
          <label htmlFor="cb-48">
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

export default RightBanner;
