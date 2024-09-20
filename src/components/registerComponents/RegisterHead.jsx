import "./style.scss";

function RegisterHead({ maintext, smallText }) {
  return (
    <div className="form-head-div text-center">
      <h1>{maintext}</h1>
      <p>{smallText}</p>
    </div>
  );
}

export default RegisterHead;
