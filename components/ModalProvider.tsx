"use client";
import { createContext, useCallback, useContext, useState, ReactNode } from "react";

type ThankYouData = {
  fullName: string;
  phone: string;
};

type ModalCtx = {
  open: boolean;
  prefilledPackage?: string;
  openModal: (pkgName?: string) => void;
  closeModal: () => void;
  thankYouOpen: boolean;
  thankYouData: ThankYouData | null;
  openThankYou: (data: ThankYouData) => void;
  closeThankYou: () => void;
};

const Ctx = createContext<ModalCtx | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefilledPackage, setPrefilled] = useState<string | undefined>();
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [thankYouData, setThankYouData] = useState<ThankYouData | null>(null);

  const openModal = useCallback((pkgName?: string) => {
    setPrefilled(pkgName);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  const openThankYou = useCallback((data: ThankYouData) => {
    setThankYouData(data);
    setOpen(false);
    setThankYouOpen(true);
  }, []);
  const closeThankYou = useCallback(() => setThankYouOpen(false), []);

  return (
    <Ctx.Provider
      value={{
        open,
        prefilledPackage,
        openModal,
        closeModal,
        thankYouOpen,
        thankYouData,
        openThankYou,
        closeThankYou,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useInquiryModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInquiryModal must be used within ModalProvider");
  return ctx;
}
