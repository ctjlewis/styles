import type { BackgroundColor, ForegroundColor, Modifier } from "ansi-styles";

export type LogStyles =
  keyof ForegroundColor |
  keyof BackgroundColor |
  keyof Modifier;

export type LogOptions = {
  /**
   * Indent level by 2 spaces.
   */
  level?: number;
  /**
   * Number of lines that precede the message.
   */
  preLines?: number;
  /**
   * Number of newlines that follow the message.
   */
  postLines?: number;
  /**
   * Whether to force styling regardless of TTY.
   */
  force?: boolean;
};