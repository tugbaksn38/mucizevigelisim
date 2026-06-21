"use client";
import { useContext } from "react";
import { LangContext } from "./LangProvider";

export default function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used inside LangProvider");
  }
  return ctx;
}
