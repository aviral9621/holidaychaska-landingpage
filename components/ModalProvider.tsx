"use client";
import { createContext, useCallback, useContext, useState, ReactNode } from "react";

type ModalCtx = {
  open: boolean;
  prefilledPackage?: string;
  openModal: (pkgName?: string) => void;
  closeModal: () => void;
};

const Ctx = createContext<ModalCtx | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefilledPackage, setPrefilled] = useState<string | undefined>();

  const openModal = useCallback((pkgName?: string) => {
    setPrefilled(pkgName);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <Ctx.Provider value={{ open, prefilledPackage, openModal, closeModal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useInquiryModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInquiryModal must be used within ModalProvider");
  return ctx;
}
