import type { BackgroundColor, ForegroundColor, Modifier } from "ansi-styles";

export type LogStyles =
  keyof ForegroundColor |
  keyof BackgroundColor |
  keyof Modifier;

export type PaddingOptions = {
  indent: number;
  newlines: number;
};