import Navbar from "@/components/authlink/navigation/navbar";
import InspectProject from "@/components/authlink/project-view/inspect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import numeral from "numeral";

export default function Home() {
  return (
    <>
      <Navbar />

      <InspectProject />
    </>
  );
}
