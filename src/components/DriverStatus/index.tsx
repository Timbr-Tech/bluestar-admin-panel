import styles from "./index.module.scss";
import cn from "classnames";

interface IDriverStatus {
  status: string;
}

const DriverStatus = ({ status }: IDriverStatus) => {
  const renderContent = () => {
    switch (status) {
      case "active":
        return (
          <div className={styles.active}>
            <div className={styles.activeDot} />
            {"Active"}
          </div>
        );
      case "inactive":
        return (
          <div className={styles.inactive}>
            <div className={styles.inactiveDot} />
            {"Inactive"}
          </div>
        );
    }
  };

  return renderContent();
};

export default DriverStatus;
