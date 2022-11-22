import type { BackgroundColor, ForegroundColor, Modifier } from "ansi-styles";

export type LogStyles =
  keyof ForegroundColor |
  keyof BackgroundColor |
  keyof Modifier;

export type PaddingOptions = {
  /**
   * Indent level by 2 spaces.
   */
  level?: number;
  /**
   * Number of newlines that follow.
   */
  newlines?: number;
};