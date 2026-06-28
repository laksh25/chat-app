import { Moon, Rose, Sun, TreePine, WavesHorizontal } from "lucide-react";
import { ElementType } from "react";

export type Theme = {
  value: string;
  label: string;
  Icon: ElementType;
};

export const THEMES: Theme[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "theme-rose", label: "Rose", Icon: Rose },
  { value: "theme-forest", label: "Forest", Icon: TreePine },
  { value: "theme-ocean", label: "Ocean", Icon: WavesHorizontal },
];
