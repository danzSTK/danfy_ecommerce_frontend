"use client";
import React, { useContext, useEffect, useState } from "react";

type SidebarType = "cart" | "favorites" | "menu" | "profile" | null;

type SidebarContextType = {
  type: SidebarType;
  open: boolean;
  openSidebar: (type: SidebarType) => void;
  closeSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextType>({
  type: null,
  open: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SidebarType>(null);

  const openSidebar = (type: SidebarType) => {
    setType(type);
    setOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    setType(null);
    setOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <SidebarContext.Provider value={{ type, open, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
