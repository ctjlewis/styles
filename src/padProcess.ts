/**
 * @fileoverview
 *
 * Ensure there is minium vertical and horizontal padding for this process's
 * logs.
 *
 * Involves an `exit` listener and process.env variables, and making sure both
 * padding logs only run once per process. Fun!
 */
import { env } from "process";
import { group, log } from "./log";

const ADDED_INITIAL_PADDING = "__ADDED_INITIAL_PADDING__";
const SET_FiNAL_PADDING_LISTENER = "__SET_FiNAL_PADDING_LISTENER__";

const setInitialPadding = () => env[ADDED_INITIAL_PADDING] || null;
const setFinalPaddingListener = () => env[SET_FiNAL_PADDING_LISTENER] || null;

const addFinalPadding = () => {
  log();
  log();
  group.end();

  process.removeListener("exit", addFinalPadding);
};

const addInitialPadding = () => {
  log();
  log();
  group.start();

  env[ADDED_INITIAL_PADDING] = "true";
};

/**
 * Force initial padding for this process.
 */
if (!setInitialPadding()) {
  addInitialPadding();
}

/**
 * Force padding on process close.
 */
if (!setFinalPaddingListener()) {
  process.on("exit", addFinalPadding);
  env[SET_FiNAL_PADDING_LISTENER] = "true";
}

export {};