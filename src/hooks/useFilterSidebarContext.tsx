"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SidebarContextType = {
  defaultOpen: boolean;
  open: boolean;
  openSidebar: (hidden?: boolean) => void;
  closeSidebar: () => void;
};

const FilterSidebarContext = createContext<SidebarContextType>({
  defaultOpen: false,
  open: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const FilterSidebarProvider = ({
  children,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const openSidebar = (hidden = true) => {
    setOpen(true);

    if (hidden) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeSidebar = () => {
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

  const value = useMemo(
    () => ({
      open,
      openSidebar,
      closeSidebar,
      defaultOpen,
    }),
    [open, defaultOpen]
  );

  return (
    <FilterSidebarContext.Provider value={value}>
      {children}
    </FilterSidebarContext.Provider>
  );
};

export const useFilterSidebarContext = () => useContext(FilterSidebarContext);
