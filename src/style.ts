import ansiStyles from "ansi-styles";
import { TTY } from "./globs";
import { LogStyles } from "./types";

/**
 * Apply ANSI styles to a message, as well as a given indent and newline
 * padding.
 *
 * If `process.stdout` is not a TTY, the message will not have ANSI styles
 * applied.
 */
export const style = (
  /**
   * The string to style.
   */
  str?: string,
  /**
   * The styles to apply.
   */
  styles: LogStyles[] = [],
  /**
   * Whether to force styling regardless of TTY.
   */
  force = false
) => {
  if (typeof str === "undefined") {
    return undefined;
  }

  /**
   * If styles are provided and stdout is TTY, then apply styles.
   */
  if (styles && (force || TTY)) {
    let opening = "";
    let closing = "";

    for (const style of styles) {
      const ansiStyle = ansiStyles[style];
      opening += ansiStyle.open;
      closing += ansiStyle.close;
    }

    str = opening + str + closing;
  }

  return str;
};