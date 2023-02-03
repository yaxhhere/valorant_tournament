import { SetStateAction } from "react";

export interface DarkModeProps {
  setDarkMode: React.Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
}

export enum LangEnum {
  en = 'en'
}