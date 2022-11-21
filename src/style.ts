import ansiStyles from "ansi-styles";
import { LogStyles } from "./types";

export const style = (message: string, styles?: LogStyles[]) => {
  if (!styles) {
    return message;
  }

  let opening = "";
  let closing = "";

  for (const style of styles) {
    const ansiStyle = ansiStyles[style];
    opening += ansiStyle.open;
    closing += ansiStyle.close;
  }

  return opening + message + closing;
};