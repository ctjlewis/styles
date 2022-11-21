/* eslint-disable no-console */
import { style } from "./style";
import { LogStyles, PaddingOptions } from "./types";

/**
 * Styled `console.log`.
 */
export const log = (
  message: string,
  styles: LogStyles[] = [],
  padding?: PaddingOptions
) => {
  console.log(style(message, styles, padding));
};

/**
 * Styled `console.error`.
 */
export const error = (
  message: string,
  styles: LogStyles[] = [],
  padding?: PaddingOptions
) => {
  console.error(style(message, styles, padding));
};

/**
 * Styled `console.group`. Creates a bolded heading.
 */
export const group = {
  start: (
    message: string,
    styles: LogStyles[] = [],
    padding?: PaddingOptions
  ) => {
    console.group(style(message, ["bold", ...styles], padding));
  },

  end: () => {
    console.groupEnd();
  }
};