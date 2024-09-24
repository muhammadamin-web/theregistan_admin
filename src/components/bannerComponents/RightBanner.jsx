import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi, deleteDataFromApi, postDataFromApi, putDataFromApi, BASE_IMG_URL } from "../../utils/api";
import { changeLoadingRefresh } from "../../store/homeSlice";
import { Alert, Space } from "antd";
import postImage from "../ImageCompressor";

function RightBanner() {
  const [bodyList, setBodyList] = useState([]);
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({ status: "", message: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBannerData = async () => {
      dispatch(changeLoadingRefresh(true));
      const res = await fetchDataFromApi("/banner");
      if (res.data) {
        setBodyList(
          res.data.map((banner) => ({
            ...banner,
            image: banner?.image?._id,
            imgUrl: BASE_IMG_URL + banner?.image?.name, // Initialize the image URL to avoid losing it on refresh
            imgData: null,
            link: banner.link,  // Link initialization
          }))
        );
      }
      dispatch(changeLoadingRefresh(false));
    };
    loadBannerData();
  }, [dispatch]);

  const putFunc = async (index) => {
    try {
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
    } catch (error) {
      dispatchChangeLoadingAndHandleErrors(false, "error", { message: "Failed to update banner." });
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

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      postImage(event, (url) => {
        const newBodyList = [...bodyList];
        newBodyList[index].imgUrl = url; // Update imgUrl with new image link
        setBodyList(newBodyList);
      }, (data) => {
        const newBodyList = [...bodyList];
        newBodyList[index].imgData = data; // Update imgData with file data
        setBodyList(newBodyList);
      });
    }
  };

  const handleLinkChange = (index, event) => {
    const newBodyList = [...bodyList];
    newBodyList[index].link = event.target.value; // Update the link
    setBodyList(newBodyList);
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

      <div className="banner_content">
        {bodyList.map((body, index) => (
          <form key={body._id} onSubmit={(e) => { e.preventDefault(); putFunc(index); }}>
            <label>Footer Banner {index + 1}</label>
            <input
              placeholder="Paste Link"
              type="text"
              value={body.link} // Bind the link value
              onChange={(e) => handleLinkChange(index, e)} // Handle link change
            />

            <div className="changePhotoBtn">
              <button
                type="button"
                onClick={() => document.getElementById(`file-input-${index}`).click()}
              >
                Change Photo
              </button>
            </div>

            <div className="form_div">
              <input
                id={`file-input-${index}`}
                className="input_img"
                type="file"
                accept="image/*"
                style={{ display: "none" }} // Hide the file input button
                onChange={(event) => handleImageChange(index, event)} // Handle image change for the specific index
              />
              {body.imgUrl || body?.image?.name ? (
                <label>
                  <img
                    src={body.imgUrl ? body.imgUrl : BASE_IMG_URL + body.image.name} // Maintain image URL after refresh
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
                  newBodyList[index].status = !newBodyList[index].status; // Update the status for the specific banner
                  setBodyList(newBodyList);
                }}
              />
              <label htmlFor={`cb-${index}`}>
                {body.status ? "Active qilindi" : "Active qilish"}
              </label>
            </div>

            <button onClick={(e) => { e.preventDefault(); putFunc(index); }}>Publish</button>
          </form>
        ))}
      </div>
    </>
  );
}

export default RightBanner;
