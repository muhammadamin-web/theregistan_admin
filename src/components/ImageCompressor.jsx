const postImage = (event, setImgUrl, setImgData) => {
  if (event.target.files[0]) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImgUrl(url);
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
            // const dataURL = fr.result;
            const webpFile = new File([blob], `${Date.now()}.webp`, {
              type: "image/webp",
            });
            const data = new FormData();
            data.append("image", webpFile);
            setImgData(data);
          });
        },
        "image/webp",
        0.9
      );
    };
  }
};
export default postImage;
