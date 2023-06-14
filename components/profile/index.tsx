import { useEffect, useState } from "react";
import { getSession } from "../../helpers/localstorage";
import { DarkModeProps } from "../../helpers/types/common";
import labels from "../../helpers/langs";
import styles from "./profile.module.css";

export default ({ setDarkMode, darkMode }: DarkModeProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [gameInfo, setGameInfo] = useState<any>(null);
  const [username, setUserName] = useState("");
  const [tag, setTag] = useState("");
  useEffect(() => {
    if (getSession()) {
      setUserInfo(getSession());
    }
  }, []);

  const getUserInfo = () => {
    
  }

  return (
    <div
      className={`${styles.profile} ${
        darkMode ? " dark-mode-default" : ""
      }  font-lexend`}
    >
      {userInfo && (
        <h1 className={`${styles["greetings"]}`}>
          {labels.greetings} {userInfo.name} !
        </h1>
      )}
      {!gameInfo ? (
        <div className={styles.valoInputContainer}>
          <h2>{labels.verificationHead}</h2>
          <div>
            <input
              className={`${styles[`valoInputBase`]} ${
                styles[`valoUsernameInput${darkMode ? "Dark" : ""}`]
              } font-lexend`}
              placeholder={labels.username}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span className={styles.tagDivider}>#</span>
            <input
              className={`${styles[`valoInputBase`]} ${
                styles[`valoTagInput${darkMode ? "Dark" : ""}`]
              } font-lexend`}
              placeholder={labels.tag}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <button className={`${styles.verifyButton} font-lexend`}>
            {labels.verifyButtonText}
          </button>
        </div>
      ) : (
        <div className={`${styles.center}`}></div>
      )}
    </div>
  );
};
