import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";
import "./style.scss";

Quill.register("modules/imageUploader", ImageUploader);

function ReactQuillComponent({ body, reactRef, setBody }) {
  const insertEmbed = (url, quillRef) => {
    let embedHtml = "";

    if (url.includes("t.me")) {
      const urlParts = url.split('/');
      const channelName = urlParts[3];
      const postId = urlParts[4];

      embedHtml = `<div style="text-align:center;"><iframe src="https://t.me/${channelName}/${postId}?embed=1" width="60%" frameborder="0" scrolling="no" style="overflow: hidden; color-scheme: light dark; border: none; max-width: 320px; height: auto;"></iframe>
                   <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post="${channelName}/${postId}" data-width="60%"></script></div>`;
    } else if (url.includes("instagram.com")) {
      const urlParts = url.split('/');
      const postId = urlParts[4];

      embedHtml = `<div class="embed-responsive" style="text-align:center;">
      <iframe src="https://www.instagram.com/p/${postId}/embed" width="100%" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
    </div>`;
    } else if (url.includes("twitter.com")) {
      embedHtml = `<div style="text-align:center;"><blockquote class="twitter-tweet">
                     <a href="${url}"></a>
                   </blockquote>
                   <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>`;
    } else if (url.includes("facebook.com")) {
      embedHtml = `<div style="text-align:center;"><iframe src="https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500" width="500" height="auto" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe></div>`;
    } else {
      alert("Iltimos, haqiqiy URL manzilini kiriting (Telegram, Instagram, Twitter yoki Facebook).");
    }

    const range = quillRef.current.getEditor().getSelection();
    if (embedHtml) {
      quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, embedHtml);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],  // code-block qo'shildi
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
          ["clean"],
          ["socialEmbed"],
        ],
        handlers: {
          socialEmbed: function () {
            const url = prompt("Ijtimoiy tarmoq postining URL manzilini kiriting:");
            if (url) {
              insertEmbed(url, reactRef);
            }
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            // Rasmlar yuklash funksiyasi
          });
        },
      },
    }),
    [reactRef]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",  // code-block formati qo'shildi
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
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
      placeholder="compose here"
      value={body?.content?.data || ""}
      onChange={(e) => {
        setBody({ ...body, content: { data: e } });
      }}
      style={quill}
    />
  );
}

export default ReactQuillComponent;
