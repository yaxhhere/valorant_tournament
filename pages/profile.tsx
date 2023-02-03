import Navbar from "../components/navbar";
import { DarkModeProps } from "../helpers/types/common";

export default function Profile(props: DarkModeProps) {
  return (
    <>
      <Navbar {...props} />
    </>
  );
}
