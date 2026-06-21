"use client";

import { createContext, useEffect, useState } from "react";

export const LangContext = createContext(null);

export default function LangProvider({
  children,
  initialLang,
  initialTranslations,
  loader,
}) {
  const [lang, setLang] = useState(initialLang);
  const [dict, setDict] = useState(initialTranslations);

  useEffect(() => {
    if (!loader) return;
    loader(lang).then((data) => setDict(data || {}));
  }, [lang, loader]);

  return (
    <LangContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </LangContext.Provider>
  );
}
