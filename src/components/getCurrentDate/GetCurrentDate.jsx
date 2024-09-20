export const getCurrentDate = () => {
  const nowTime = Date.now();
  const hozirgiVaqt = new Date(nowTime);
  const yil = hozirgiVaqt.getFullYear();
  const oy = ("0" + (hozirgiVaqt.getMonth() + 1)).slice(-2);
  const kun = ("0" + hozirgiVaqt.getDate()).slice(-2);
  return `${yil}-${oy}-${kun}`;
};
