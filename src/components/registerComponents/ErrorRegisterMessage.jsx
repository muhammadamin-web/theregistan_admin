import "./style.scss";
function ErrorRegisterMessage({ access, errText }) {
  return (
    <div className="err-message">
      <p>
        {access ? "You made a mistake when filling out some parts" : errText}
      </p>
    </div>
  );
}

export default ErrorRegisterMessage;
