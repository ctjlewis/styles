/**
 * @fileoverview
 *
 * Ensure there is minium vertical and horizontal padding for this process's
 * logs.
 *
 * Involves an `exit` listener and process.env variables. Fun!
 */
import { env } from "process";
import { group, log } from "./log";

const ADDED_INITIAL_PADDING = "__ADDED_INITIAL_PADDING__";
const ADDED_FINAL_PADDING = "__ADDED_FINAL_PADDING__";

const addedInitialPadding = env[ADDED_INITIAL_PADDING] || null;
const addedFinalPadding = env[ADDED_FINAL_PADDING] || null;

const addFinalPadding = () => {
  log();
  log();
  group.end();

  env[ADDED_FINAL_PADDING] = "true";
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
if (!addedInitialPadding) {
  addInitialPadding();
}

/**
 * Force padding on process close.
 */
if (!addedFinalPadding) {
  process.on("exit", addFinalPadding);
}

export {};