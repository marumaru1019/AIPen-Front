// app/PreviewContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PreviewContextType = {
  type: string | null;
  setType: (type: string) => void;
  previewHTML: string | null;
  setPreviewHTML: (html: string) => void;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<string | null>(null);
  const [previewHTML, setPreviewHTML] = useState<string | null>(null);

  return (
    <PreviewContext.Provider value={{ type, setType, previewHTML, setPreviewHTML }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
}
