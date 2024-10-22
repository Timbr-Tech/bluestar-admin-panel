/* eslint-disable */
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { RouteName } from "../../../constants/routes";
import BillingsSection from "../../../components/BillingsSection";
import styles from "./index.module.scss";

const CreateBilling = () => {
  const location = useLocation();

  console.log(location.pathname, "Pathname");
  return (
    <div className={cn("container", styles.container)}>
      <BillingsSection
        isEdit={false}
        isInvoice={location.pathname === RouteName.CREATE_INVOICE}
      />
    </div>
  );
};

export default CreateBilling;
