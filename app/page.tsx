import * as Btn from "@/components/authlink/btn";

async function Test() {
  "use server";
  console.log("Hi");
  return {
    hello: true,
    rand: Math.random(),
  };
}

import Navbar from "@/components/authlink/navigation/navbar";
import UpdateProfileDialog from "@/components/authlink/dialogs/update-profile";
import SignOutButton from "@/components/authlink/dialogs/sign-out";

export default async function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
