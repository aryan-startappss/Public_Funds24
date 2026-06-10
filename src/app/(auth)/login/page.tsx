import type { Metadata } from "next";
import LoginView from "./LoginView";

export const metadata: Metadata = {
  title: "Sign In | Funds24",
  description: "Access your dashboard and financial products securely on Funds24.",
};

export default function LoginPage() {
  return <LoginView />;
}
