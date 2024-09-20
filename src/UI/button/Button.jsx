import "./style.scss";

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`button-component ${className}`}>
      {children}
    </button>
  );
}

export default Button;
