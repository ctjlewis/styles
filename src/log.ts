/* eslint-disable no-console */
import { TTY } from "./globs";
import { style } from "./style";
import { LogStyles, LogOptions } from "./types";

type LogType = "log" | "info" | "warn" | "error" | "debug";
type Logger = (
  message?: string,
  styles?: LogStyles[],
  options?: LogOptions
) => void;

const logCall = (
  type: LogType,
  raw?: string,
  {
    level = 0,
    newlines = raw ? 1 : 0,
  }: LogOptions = {}
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

export const log: Logger = (
  message,
  styles,
  { force = false, ...options } = {}
) => {
  logCall("log", style(message, styles, force), options);
};

export const success: Logger = (
  message,
  styles = [],
  { force = false, ...options } = {}
) => {
  logCall("log", style(message, ["green", ...styles], force), options);
};

export const error: Logger = (
  message,
  styles = [],
  { force = false, ...options } = {}
) => {
  logCall("error", style(message, ["red", ...styles], force), options);
};

const groupStart: Logger = (
  message,
  styles = [],
  { force = false } = {}) => {
  console.group();
  if (message) {
    console.log(style(message, ["bold", ...styles], force));
    console.log();
  }
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

export const info: Logger = (message, styles, options) => {
  logCall("info", style(message, styles), options);
};

export const warn: Logger = (message, styles, options) => {
  logCall("warn", style(message, styles), options);
};

export const debug: Logger = (message, styles, options) => {
  logCall("debug", style(message, styles), options);
};
