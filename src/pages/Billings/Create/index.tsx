/* eslint-disable */
import cn from "classnames";
import BillingsSection from "../../../components/BillingsSection";
import styles from "./index.module.scss";

const CreateBilling = () => {
  return (
    <div className={cn("container", styles.container)}>
      <BillingsSection isEdit={false} isInvoice={true} />
    </div>
  );
};

export default CreateBilling;
