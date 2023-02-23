import React, { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="section-heading">{children}</h2>;
}
