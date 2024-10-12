/* eslint-disable */
import { RECEIPTS_STATES } from "../../constants/billings";
import cn from "classnames";
import styles from "./index.module.scss";

interface ReceiptStates {
  status: string;
}

const ReceiptStates = ({ status }: ReceiptStates) => {
  return (
    <>
      {(() => {
        switch (status) {
          case RECEIPTS_STATES.CONFIRMED:
            return (
              <div className={cn(styles.container, styles.confirmed)}>
                <div className={cn(styles.dot, styles.confirmed)}></div>
                <div className={cn(styles.text, styles.confirmed)}>
                  {"Confirmed"}
                </div>
              </div>
            );
          case RECEIPTS_STATES.CANCELLED:
            return (
              <div className={cn(styles.container, styles.cancelled)}>
                <div className={cn(styles.dot, styles.cancelled)}></div>
                <div className={cn(styles.text, styles.cancelled)}>
                  {"Cancelled"}
                </div>
              </div>
            );
        }
      })()}
    </>
  );
};

export default ReceiptStates;
