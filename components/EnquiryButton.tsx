"use client";

import type { ReactNode } from "react";
import { useEnquiry } from "./Enquiry";

/** Opens the general enquiry popup, or the package booking popup when `packageSlug` is given. */
export default function EnquiryButton({
  subject,
  packageSlug,
  className = "btn-primary",
  children,
}: {
  subject?: string;
  packageSlug?: string;
  className?: string;
  children: ReactNode;
}) {
  const { open, openPackage } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => (packageSlug ? openPackage(packageSlug) : open(subject))}>
      {children}
    </button>
  );
}
