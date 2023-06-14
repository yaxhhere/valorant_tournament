import { LangEnum } from "../types/common";

export { default as en } from "./en.json";
const langFiles = {
  en: require("./en.json"),
};

const lang = (process.env.NEXT_PUBLIC_LANGUAGE as LangEnum) || "en";
export default langFiles[lang];
