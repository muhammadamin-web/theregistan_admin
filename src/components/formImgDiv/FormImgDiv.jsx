import { useDispatch } from "react-redux";
import { setCurrentImgUrl } from "../../store/homeSlice.js";
import postImage from "../ImageCompressor.jsx";

function FormImgDiv({ imgRef, imgUrl, setImgUrl, setImgData }) {
  const dispatch = useDispatch();
  return (
    <div className="form_img_div">
      <div className="form_input_div">
        <input
          ref={imgRef}
          className="form_input_img"
          id="categoryImage"
          type="file"
          accept="image/*"
          onChange={(event) => {
            postImage(event, setImgUrl, setImgData);
          }}
        />
        {
          <label
            style={imgUrl ? { cursor: "auto" } : {}}
            htmlFor={imgUrl ? "" : "categoryImage"}
          >
            {!imgUrl && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="190"
                  height="160"
                  viewBox="0 0 190 160"
                  fill="none"
                >
                  <path
                    d="M55.4167 139.873C44.6029 139.174 34.328 135.616 26.059 129.706C17.79 123.796 11.9498 115.837 9.37223 106.966C6.7947 98.0942 7.61166 88.7637 11.7064 80.3065C15.8012 71.8493 22.9645 64.6979 32.1734 59.8733C34.1328 47.0072 41.5926 35.1833 53.1566 26.6144C64.7207 18.0454 79.5964 13.3186 95 13.3186C110.404 13.3186 125.279 18.0454 136.843 26.6144C148.407 35.1833 155.867 47.0072 157.827 59.8733C167.036 64.6979 174.199 71.8493 178.294 80.3065C182.388 88.7637 183.205 98.0942 180.628 106.966C178.05 115.837 172.21 123.796 163.941 129.706C155.672 135.616 145.397 139.174 134.583 139.873V140H55.4167V139.873ZM102.917 86.6667H126.667L95 53.3333L63.3334 86.6667H87.0834V113.333H102.917V86.6667Z"
                    fill="#1E77CC"
                  />
                </svg>
                Browse Photo to upload
              </>
            )}
            {imgUrl && <img id="add-img" src={imgUrl} />}
          </label>
        }
      </div>
      <div className="span_div">
        <span
          onClick={() => {
            if (imgUrl) {
              setImgUrl("");
              dispatch(setCurrentImgUrl(""));
            } else {
              imgRef.current.click();
            }
          }}
        >
          {imgUrl ? "Delete Photo" : "Upload Photo"}
        </span>
      </div>
    </div>
  );
}

export default FormImgDiv;
