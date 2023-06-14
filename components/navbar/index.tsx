import React, { useEffect, useState } from "react";
import {
  darkModeSwitch,
  getSession,
  setSession,
} from "../../helpers/localstorage";
import { Routes } from "../../helpers/routes";
import { DarkModeProps } from "../../helpers/types/common";
import styles from "./navbar.module.css";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import labels from "../../helpers/langs";

const navCollapseAt = 620;

export default ({ setDarkMode, darkMode }: DarkModeProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedMenu, setCollapsedMenu] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  // handle Login
  const onSuccess = (res: any) => {
    console.log(res);
    if (res.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${res.access_token}`,
          {
            headers: {
              Authorization: `bearer ${res.access_token}`,
            },
          }
        )
        .then((response) => {
          setSession(response.data);
          setUserInfo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const signIn = useGoogleLogin({
    onSuccess,
  });

  const handleResize = () => {
    setIsCollapsed(window.innerWidth <= navCollapseAt ? true : false);
  };

  useEffect(() => {
    console.log(getSession());
    setUserInfo(getSession());
    if (typeof window != undefined) {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const onDarkMode = (e: { target: { checked: boolean } }) => {
    setDarkMode(e.target.checked);
    if (e.target.checked) {
      darkModeSwitch("true");
    } else {
      darkModeSwitch("false");
    }
  };

  const NavListing = () => (
    <ul className={styles["nav-list"]}>
      {Routes.map((el, key) => {
        return (
          <li className={styles["nav-item"]} key={key}>
            <a
              aria-label={el.ariaLabel}
              className={`${styles["route-link"]} font-lexend`}
              href={`${el.link}`}
            >
              {el.label}
            </a>
          </li>
        );
      })}
      <li className={styles["nav-item"]} key={"login"}>
        {userInfo ? (
          <a
            className={`${styles["route-link"]} font-lexend`}
            href={"/profile"}
            aria-label={labels.profileAriaLabel}
          >
            {labels.profileHeading}
          </a>
        ) : (
          <button
            className={`${styles["login-button"]} font-lexend`}
            onClick={() => signIn()}
            aria-label={labels.loginAriaLabel}
          >
            {labels.loginButtonText}
          </button>
        )}
      </li>
      <li className={styles["nav-item"]} key={"dark-switch"}>
        <input
          className={styles["dark-mode-switch"]}
          type={"checkbox"}
          onChange={onDarkMode}
          checked={darkMode}
        />
      </li>
    </ul>
  );

  return (
    <div className={`${styles.navbar} ${darkMode ? " dark-mode-default" : ""}`}>
      <span className={`${styles.heading} font-valo`}>
        {labels.valorantHeading}
      </span>
      {isCollapsed ? (
        collapsedMenu ? (
          <AiOutlineMenu
            className={styles["menu"]}
            onClick={() => setCollapsedMenu(false)}
          />
        ) : (
          <AiOutlineClose
            className={styles["menu"]}
            onClick={() => setCollapsedMenu(true)}
          />
        )
      ) : (
        <></>
      )}
      {collapsedMenu && isCollapsed ? <></> : <NavListing />}
    </div>
  );
};
