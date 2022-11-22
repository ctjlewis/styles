/* eslint-disable no-console */
import { TTY } from "./globs";
import { style } from "./style";
import { LogStyles, PaddingOptions } from "./types";

type LogType = "log" | "info" | "warn" | "error" | "debug";
type Logger = (
  message?: string,
  styles?: LogStyles[],
  padding?: PaddingOptions
) => void;

const logCall = (
  type: LogType,
  raw?: string,
  { level = 0, newlines = raw ? 1 : 0 }: PaddingOptions = {}
) => {
  const logType = console[type];

  if (typeof raw === "undefined") {
    logType();
    return;
  }

  /**
   * Open indentations.
   */
  for (let i = 0; i < level + 1; i++) {
    console.group();
  }
  /**
   * Log the raw string.
   */
  logType(raw);
  /**
   * Close indentations.
   */
  for (let i = 0; i < level + 1; i++) {
    console.groupEnd();
  }
  /**
   * Log newlines.
   */
  for (let i = 0; i < newlines; i++) {
    console.log();
  }
};

export const log: Logger = (message, styles, padding) => {
  logCall("log", style(message, styles), padding);
};

export const success: Logger = (message, styles = [], padding) => {
  logCall("log", style(message, ["green", ...styles]), padding);
};

export const error: Logger = (message, styles = [], padding) => {
  logCall("error", style(message, ["red", ...styles]), padding);
};

const groupStart: Logger = (message, styles = []) => {
  console.group();
  console.log(style(message, ["bold", ...styles]));
  console.log();
};

const groupEnd: Logger = () => {
  console.groupEnd();
};

export const group = {
  start: groupStart,
  end: groupEnd,
};

/**
 * Clear stdout.
 */
export const clear = (flush = true) => {
  /**
   * Clear the console.
   */
  console.clear();
  /**
   * Flush stdout.
   */
  if (TTY) {
    if (flush) {
      logCall("log", "\u001b[3J\u001b[2J\u001b[1J");
    }
  } else {
    logCall("log", `\n  ${"-".repeat(15)} Console was cleared. ${"-".repeat(15)}\n`);
  }

  /**
   * Log an empty line.
   */
  logCall("log");
};

export const info: Logger = (message, styles, padding) => {
  logCall("info", style(message, styles), padding);
};

export const warn: Logger = (message, styles, padding) => {
  logCall("warn", style(message, styles), padding);
};

export const debug: Logger = (message, styles, padding) => {
  logCall("debug", style(message, styles), padding);
};
