import ansiStyles from "ansi-styles";
import { TTY } from "./globs";
import { LogStyles, PaddingOptions } from "./types";

/**
 * Apply ANSI styles to a message, as well as a given indent and newline
 * padding.
 *
 * If `process.stdout` is not a TTY, the message will not have ANSI styles
 * applied.
 */
export const style = (
  message?: string,
  styles: LogStyles[] = [],
  {
    level = message ? 1 : 0,
    newlines = message ? 1 : 0
  }: PaddingOptions = {},
) => {
  if (typeof message === "undefined") {
    return undefined;
  }

  /**
   * If styles are provided and stdout is TTY, then apply styles.
   */
  if (styles && TTY) {
    let opening = "";
    let closing = "";

    for (const style of styles) {
      const ansiStyle = ansiStyles[style];
      opening += ansiStyle.open;
      closing += ansiStyle.close;
    }

    message = opening + message + closing;
  }

  const lineStartSpacing = " ".repeat(level * 2);
  const lineEndSpacing = "\n".repeat(newlines);

  /**
   * Apply indent and spacing.
   */
  return (
    lineStartSpacing +
    message +
    lineEndSpacing
  );
};