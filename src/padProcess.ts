import { log } from "./log";

/**
 * Force padding on process close. Fun!
 */

const setPaddingAlready = Boolean((globalThis as any)["__SET_END_PADDING"]);

if (!setPaddingAlready) {
  Object.assign(globalThis, { "__SET_END_PADDING": true });
  process.on("exit", () => {
    log();
    log();
  });
}

export {};