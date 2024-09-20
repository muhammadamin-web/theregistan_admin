import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module-react";

import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";
import { postDataFromApi } from "../../utils/api.js";

// Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUploader", ImageUploader);
function ReactQuillComponent({ body, reactRef, setBody }) {
  const TMDB_TOKEN = localStorage.getItem("token");
  const modules = useMemo(
    () => ({
      toolbar: [
        // [{ header: 1 }, { header: 2 }],
        // [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.src = url;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                (blob) => {
                  const fr = new FileReader();
                  fr.readAsDataURL(blob);
                  fr.addEventListener("load", () => {
                    const webpFile = new File([blob], `${Date.now()}.webp`, {
                      type: "image/webp",
                    });
                    const data = new FormData();
                    data.append("image", webpFile);
                    postDataFromApi("/image/upload", data)
                      .then((res) => {
                        console.log(res);
                        resolve(
                          "https://api.theregistan.uz/upload/" + res.data.name
                        );
                      })
                      .catch((error) => {
                        reject("Upload failed");
                        console.error("Error:", error);
                      });
                  });
                },
                "image/webp",
                0.9
              );
            };
          });
        },
      },
      // imageResize: {
      //   parchment: Quill.import("parchment"),
      //   modules: ["Resize", "DisplaySize"],
      // },
    }),
    [TMDB_TOKEN]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "imageBlot",
    "color",
    "size",
    "align",
  ];

  const quill = {
    width: "100%",
    height: "100%",
    marginBlock: "3rem",
  };
  return (
    <ReactQuill
      ref={reactRef}
      modules={modules}
      formats={formats}
      placeholder='compose here'
      value={body?.content?.data || ""}
      onChange={(e) => {
        setBody({ ...body, content: { data: e } });
      }}
      style={quill}
    />
  );
}

export default ReactQuillComponent;
