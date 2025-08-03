"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
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
  defaultOpen = true,
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

  return (
    <FilterSidebarContext.Provider
      value={{ open, openSidebar, closeSidebar, defaultOpen }}
    >
      {children}
    </FilterSidebarContext.Provider>
  );
};

export const useFilterSidebarContext = () => useContext(FilterSidebarContext);
