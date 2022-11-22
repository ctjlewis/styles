import { env } from "process";
import { group, log } from "./log";

const addedInitialPadding = env["__ADDED_INITIAL_PADDING__"] || null;

const addFinalPadding = () => {
  log();
  log();
  group.end();
};

const addInitialPadding = () => {
  log();
  log();
  group.start();

  env["__ADDED_INITIAL_PADDING__"] = "true";
};

if (!addedInitialPadding) {
  addInitialPadding();
}

/**
 * Force padding on process close. Fun!
 */
process.addListener("exit", addFinalPadding);

export {};