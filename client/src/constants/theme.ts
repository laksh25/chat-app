export type Theme = {
  value: string;
  label: string;
  icon: string;
};

export const THEMES: Theme[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "theme-rose", label: "Rose", icon: "🌸" },
  { value: "theme-forest", label: "Forest", icon: "🌲" },
  { value: "theme-ocean", label: "Ocean", icon: "🌊" },
];
