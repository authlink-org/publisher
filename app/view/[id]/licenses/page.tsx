import Navbar from "@/components/authlink/navigation/navbar";
import InspectLicenses from "@/components/authlink/project-view/inspect-licenses";
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

      <InspectLicenses />
    </>
  );
}
