import Navbar from "@/components/authlink/navigation/navbar";
import InspectAnalytics from "@/components/authlink/project-view/analytics";
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

      <InspectAnalytics />
    </>
  );
}
