import { VFC, useState, useEffect } from "react";

import styles from "styles/components/Loading.module.scss";

const Loading: VFC = () => (
  <div className={styles.main}>
    <p>Loading...</p>
  </div>
);

export default Loading;
