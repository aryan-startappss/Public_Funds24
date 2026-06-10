import type { Metadata } from "next";
import SignupView from "./SignupView";

export const metadata: Metadata = {
  title: "Create Account | Funds24",
  description: "Register with Funds24 to get fast approvals on loans and financial products.",
};

export default function SignupPage() {
  return <SignupView />;
}
