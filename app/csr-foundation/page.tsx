import type { Metadata } from "next";
import CSRClient from "./CSRClient";

export const metadata: Metadata = {
  title: "CSR Foundation — IShara Foundation",
  description:
    "NexeraTech Solutions contributes to IShara Foundation's digital inclusion programs — using technology for meaningful social change across India.",
};

export default function CSRPage() {
  return <CSRClient />;
}
