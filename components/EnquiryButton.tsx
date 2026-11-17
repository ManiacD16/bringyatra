"use client";

import type { ReactNode } from "react";
import { useEnquiry } from "./Enquiry";

export default function EnquiryButton({ subject, className = "btn-primary", children }: { subject?: string; className?: string; children: ReactNode }) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => open(subject)}>
      {children}
    </button>
  );
}
