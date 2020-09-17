import React, { useEffect, useState } from "react";
import { fetchInfo } from "../../lib";
import styles from "./Info.module.css";

const Info = ({ ticker }) => {
  const [companyInfo, setCompanyInfo] = useState({});
  useEffect(() => {
    const fetch = async () => {
      setCompanyInfo(await fetchInfo(ticker));
    };
    fetch();
  }, [ticker]);
  if (companyInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.text}>
          {Object.keys(companyInfo).map((val) => (
            <div className={styles[val]} key={val}>
              {companyInfo[val]}
            </div>
          ))}
        </div>
      </div>
    );
  } else return null;
};

export default Info;
