const Button = ({ children, bg, ratio }) => {
  return (
    <button
      style={{
        background: bg,
        width: ratio,
        color: "#fff",
        cursor: "pointer",
        fontSize: 9,
      }}
    >
      <div>{children}</div>
    </button>
  );
};
export default Button;
