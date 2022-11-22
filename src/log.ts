/* eslint-disable no-console */
import { style } from "./style";
import { LogStyles, PaddingOptions } from "./types";

type LogType = "log" | "clear" | "group" | "groupEnd" | "info" | "warn" | "error" | "debug";
type Logger = (
  message?: string,
  styles?: LogStyles[],
  padding?: PaddingOptions
) => void;

const logCall = (
  type: LogType,
  raw?: string,
) => {
  const logType = console[type];

  if (typeof raw === "undefined") {
    logType();
    return;
  }

  logType(raw);
};

export const log: Logger = (message, styles, padding) => {
  logCall("log", style(message, styles, padding));
};

export const success: Logger = (message, styles = [], padding) => {
  logCall("log", style(message, ["green", ...styles], padding));
};

export const error: Logger = (message, styles = [], padding) => {
  logCall("error", style(message, ["red", ...styles], padding));
};

const groupStart: Logger = (message, styles = [], padding) => {
  logCall("group", style(message, ["bold", ...styles], padding));
};

const groupEnd: Logger = () => {
  logCall("groupEnd");
};

export const group = {
  start: groupStart,
  end: groupEnd,
};

/**
 * Clear stdout.
 */
export const clear: Logger = () => {
  /**
   * Clear the console.
   */
  logCall("clear");
  /**
   * Flush stdout.
   */
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
  /**
   * Log an empty line.
   */
  logCall("log");
};

export const info: Logger = (message, styles, padding) => {
  logCall("info", style(message, styles, padding));
};

export const warn: Logger = (message, styles, padding) => {
  logCall("warn", style(message, styles, padding));
};

export const debug: Logger = (message, styles, padding) => {
  logCall("debug", style(message, styles, padding));
};

export default {
  log,
  error,
  group,
  clear,
  info,
  warn,
  debug,
};