import styles from "./index.module.scss";
interface IPrimaryBtn {
  LeadingIcon: any;
  btnText: string;
}

const PrimaryBtn = ({ btnText, LeadingIcon }: IPrimaryBtn) => {
  return (
    <button type={"button"} className={styles.container}>
      <LeadingIcon />
      <div className={styles.text}>{btnText}</div>
    </button>
  );
};

export default PrimaryBtn;
