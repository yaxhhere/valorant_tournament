import React, { useEffect, useState } from "react";
import { darkModeSwitch, getDarkMode } from "../../helpers/localstorage";
import { Routes } from "../../helpers/routes";
import styles from "./navbar.module.css";

export default () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const isDarkMode: boolean = getDarkMode();
    setDarkMode(isDarkMode);
  }, []);

  const onDarkMode = (e: { target: { checked: boolean } }) => {
    setDarkMode(e.target.checked);
    if (e.target.checked) {
      darkModeSwitch("true");
    } else {
      darkModeSwitch("false");
    }
  };

  return (
    <div className={styles.navbar}>
      <span className={`${styles.heading} font-valo`}>VALORANT</span>
      <ul className={styles["nav-list"]}>
        {Routes.map((el, key) => {
          return (
            <li className={styles["nav-item"]} key={key}>
              <a
                className={`${styles["route-link"]} font-lexend`}
                href={`${el.link}`}
              >
                {el.label}
              </a>
            </li>
          );
        })}
        <li className={styles["nav-item"]} key={"dark-switch"}>
          <input
            className={styles["dark-mode-switch"]}
            type={"checkbox"}
            onChange={onDarkMode}
            checked={darkMode}
          />
        </li>
      </ul>
    </div>
  );
};
