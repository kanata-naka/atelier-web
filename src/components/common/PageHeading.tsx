import React, { ReactNode } from "react";

export default function PageHeading({ children }: { children: ReactNode }) {
  return <h2 className="page-heading">{children}</h2>;
}
