import type { Metadata } from "next";
import DonationImpactSection from "@/components/DonationImpactSection";

export const metadata: Metadata = {
  title: "Give With Purpose",
  description:
    "Join Edunite2Serve’s monthly giving program and support education, healthy food, and farming initiatives in Malawi.",
};

export default function DonatePage() {
  return <DonationImpactSection headingLevel="h1" />;
}
