/* eslint-disable */
import styles from "./index.module.scss";

interface ISecondaryBtn {
  LeadingIcon?: any;
  btnText: string;
  onClick: VoidFunction;
}

const SecondaryBtn = ({ btnText, LeadingIcon, onClick }: ISecondaryBtn) => {
  return (
    <button type={"button"} className={styles.container} onClick={onClick}>
      {LeadingIcon ? <LeadingIcon /> : null}
      <div className={styles.text}>{btnText}</div>
    </button>
  );
};

export default SecondaryBtn;
