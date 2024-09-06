/* eslint-disable */

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.scss";

const portalDiv = document.getElementById("modal");

// interface IDeleteModal {
//   primaryText: string;
//   secondaryText: string;
// }

const DeleteModal = ({ primaryText, secondaryText }) => {
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.textSection}>
        <div className={styles.primaryText}>{primaryText}</div>
        <div className={styles.secondaryText}>{secondaryText}</div>
      </div>
    </div>,
    portalDiv
  );
};

export default DeleteModal;
