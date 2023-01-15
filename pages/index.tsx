import Navbar from "../components/navbar";
import { DarkModeProps } from "../helpers/types/common";

export default function Home(props: DarkModeProps) {
  return <Navbar {...props} />;
}
