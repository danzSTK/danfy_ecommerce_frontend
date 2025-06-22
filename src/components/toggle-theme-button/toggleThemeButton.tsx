import { getCookie, setCookie } from "@/utils/theme";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ToggleThemeButton({
  className,
}: {
  className?: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = getCookie("theme");

    if (!savedTheme) {
      setCookie("theme", "light", 1);
    }

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setTheme("dark");
    } else {
      document.body.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme, 1);

    if (newTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-14 h-7 rounded-full bg-muted-foreground/40 transition-colors duration-300 flex items-center",
        className
      )}
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-background shadow-md flex items-center justify-center transition-all duration-300 ${
          theme === "dark" ? "translate-x-7" : ""
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
}
