/* eslint-disable no-console */
import { style } from "./style";
import { LogStyles, PaddingOptions } from "./types";

const getStyledMessage = (
  message: string,
  styles?: LogStyles[],
  { indent, newlines }: PaddingOptions = { indent: 2, newlines: 1 }
) => {
  const { isTTY } = process.stdout;

  const styled = isTTY ? style(message, styles) : message;
  const lineStartSpacing = " ".repeat(indent);
  const lineEndSpacing = "\n".repeat(newlines);

  return (
    lineStartSpacing +
    styled +
    lineEndSpacing
  );
};

export const log = (
  message: string,
  styles?: LogStyles[],
  padding?: PaddingOptions
) => {
  const styledMessage = getStyledMessage(message, styles, padding);
  console.log(styledMessage);
};

export const error = (
  message: string,
  styles?: LogStyles[],
  padding?: PaddingOptions
) => {
  const styledMessage = getStyledMessage(message, styles, padding);
  console.error(styledMessage);
};
