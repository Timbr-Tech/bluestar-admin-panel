/* eslint-disable */
import { INVOICES_STATES } from "../../constants/billings";
import cn from "classnames";
import styles from "./index.module.scss";

interface InvoicesStates {
  status: string;
}

const InvoicesStates = ({ status }: InvoicesStates) => {
  return (
    <>
      {(() => {
        switch (status) {
          case INVOICES_STATES.PAID:
            return (
              <div className={cn(styles.container, styles.paid)}>
                <div className={cn(styles.dot, styles.paid)}></div>
                <div className={cn(styles.text, styles.paid)}>{"Paid"}</div>
              </div>
            );

          case INVOICES_STATES.GENERATED:
            return (
              <div className={cn(styles.container, styles.generated)}>
                <div className={cn(styles.dot, styles.generated)}></div>
                <div className={cn(styles.text, styles.generated)}>
                  {"Generated"}
                </div>
              </div>
            );
          case INVOICES_STATES.CANCELLED:
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

export default InvoicesStates;
