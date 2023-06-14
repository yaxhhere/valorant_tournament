import { useState } from "react";
import Navbar from "../components/navbar";
import ProfileComponent from "../components/profile";
import { DarkModeProps } from "../helpers/types/common";

export default function Profile(props: DarkModeProps) {
  return (
    <>
      <Navbar {...props} />
      <ProfileComponent {...props} />
    </>
  );
}
