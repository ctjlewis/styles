/* eslint-disable no-console */
import { clearScreenDown, cursorTo } from "readline";
import { TTY } from "./globs";
import { style } from "./style";
import { LogStyles, LogOptions } from "./types";

type LogType = "log" | "info" | "warn" | "error" | "debug";
type Logger = (
  message?: string,
  styles?: LogStyles[],
  options?: LogOptions
) => void;

/**
 * The last non-clear log written to the console.
 */
let lastLog: string | undefined;
/**
 * The last log of any kind written to the console.
 */
let lastOutput: string | undefined;

const logCall = (
  type: LogType,
  raw?: string,
  {
    level = 0,
    preLines = raw ? 1 : 0,
    postLines = 0,
    nonTtyDedupe = true,
  }: LogOptions = {},
  clear = false,
) => {
  const logType = console[type];

  if (typeof raw === "undefined") {
    logType();
    return;
  }

  if (nonTtyDedupe && !TTY) {
    if (raw === lastLog || raw === lastOutput) {
      return;
    }

    if (!clear) {
      lastLog = raw;
    }

    lastOutput = raw;
  }

  /**
   * Open indentations.
   */
  for (let i = 0; i < level; i++) {
    console.group();
  }
  /**
   * Log preceding newlines.
   */
  for (let i = 0; i < preLines; i++) {
    console.log();
  }
  /**
   * Log the raw string.
   */
  logType(raw);
  /**
   * Log following newlines.
   */
  for (let i = 0; i < postLines; i++) {
    console.log();
  }
  /**
   * Close indentations.
   */
  for (let i = 0; i < level; i++) {
    console.groupEnd();
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
  { force = false } = {}
) => {
  if (!message) {
    return console.group();
  }

  console.log();
  console.log();
  console.group(style(message, ["bold", ...styles], force));
};

const groupEnd: Logger = () => {
  console.groupEnd();
};

export const group = {
  start: groupStart,
  end: groupEnd,
};

/**
 * Appends a number of newlines to process.stdout, which pushes the end of the
 * current content up to the top of the terminal.
 *
 * Everything after (0, 0) will be cleared, so this pushes existing contents
 * above (0, 0).
 */
export const pushToTop = () => {
  if (TTY) {
    process.stdout.write("\n".repeat(process.stdout.rows));
  }
};

export type ClearOptions = {
  /**
   * Whether to flush the contents of stdout, including history.
   */
  flush?: boolean;
  /**
   * Automatically push the terminal contents out of view.
   *
   * Only apples if `flush` is `false`.
   */
  overwrite?: boolean;
};

/**
 * Clear stdout. `flush` determines whether to flush previous contents of
 * stdout.
 */
export const clear = ({
  flush = false,
  overwrite = false,
}: ClearOptions = {}) => {
  if (TTY) {
    if (!overwrite) {
      pushToTop();
    }

    cursorTo(process.stdout, 0, 0);

    if (flush) {
      logCall("log", "\u001b[3J\u001b[2J\u001b[1J", {}, true);
    } else {
      clearScreenDown(process.stdout);
    }
  } else {
    logCall(
      "log",
      `\n  ${"-".repeat(15)} Console was cleared. ${"-".repeat(15)}\n`,
      {},
      true
    );
  }
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
