/* eslint-disable */

import styles from "./index.module.scss";
interface IPrimaryBtn {
  LeadingIcon?: any;
  btnText: string;
  onClick: VoidFunction;
}

const PrimaryBtn = ({ btnText, LeadingIcon, onClick }: IPrimaryBtn) => {
  return (
    <button type={"button"} className={styles.container} onClick={onClick}>
      {LeadingIcon ? <LeadingIcon style={{ fontSize: "18px" }} /> : null}
      <div className={styles.text}>{btnText}</div>
    </button>
  );
};

export default PrimaryBtn;
