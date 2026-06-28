"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { THEMES } from "@/constants/theme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      themes={THEMES.map((t) => t.value)} // register all theme values
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
