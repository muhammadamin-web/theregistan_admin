import "./style.scss";

function Loading() {
  return (
    <section className="loading-main">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

export default Loading;
