import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { getDarkMode } from "../helpers/localstorage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from 'next/script'

const client_id =
  "926324832611-oafn867ddacqv3fn7b5bl9e1v6tqib3p.apps.googleusercontent.com";

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const isDarkMode: boolean = getDarkMode();
    if (isDarkMode && typeof window != undefined) {
      document.body.style.backgroundColor = "#000";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
    setDarkMode(isDarkMode);
  }, [darkMode]);
  return (
    <GoogleOAuthProvider clientId={client_id}>
      <Component darkMode={darkMode} setDarkMode={setDarkMode} {...pageProps} />
    </GoogleOAuthProvider>
  );
}
