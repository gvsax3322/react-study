import styles from "../styles/Header.module.css";

const Header = ({ children }) => {
  // 내부 html을 전달받아서 내용을 변경한다.
  return (
    <header className={styles.wrap}>
      <div>{children}</div>
    </header>
  );
};

export default Header;
