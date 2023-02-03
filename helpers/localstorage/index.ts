import { setCookie, getCookie } from "cookies-next";

type userSession = {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
};

export const darkModeSwitch = (darkMode: string) => {
  localStorage.setItem("darkMode", darkMode);
};

export const getDarkMode = (): boolean => {
  return localStorage.getItem("darkMode") == "true" ? true : false;
};

export const setSession = (data: userSession) => {
  setCookie("session", data);
};

export const getSession = (): userSession | null => {
  const cookie: any = getCookie("session");
  if (cookie) {
    return JSON.parse(cookie) as userSession;
  } else {
    return null;
  }
};
