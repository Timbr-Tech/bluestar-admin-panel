/* eslint-disable */
import { Spin } from "antd";
import styles from "./index.module.scss";

interface IButton {
  LeadingIcon?: any;
  btnText: string;
  onClick: VoidFunction;
  loading?: boolean;
}

const Button = ({ btnText, LeadingIcon, onClick, loading }: IButton) => {
  return (
    <button type={"button"} className={styles.container} onClick={onClick}>
      {loading && <Spin size="small" />}
      {LeadingIcon ? <LeadingIcon style={{ fontSize: "18px" }} /> : null}
      <div className={styles.text}>{btnText}</div>
    </button>
  );
};

export default Button;
