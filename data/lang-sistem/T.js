"use client";

import useLang from "./useLang";

export default function T({ children }) {
  const { dict } = useLang();

  if (typeof children !== "string") return children;

  return dict[children] || children;
}
