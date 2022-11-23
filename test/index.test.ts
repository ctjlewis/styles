import { clear, clearStart, group, log } from "../src";

// clearStart();
// log("Clear test ", ["white", "bold"]);
// clear(false);

log("Styles testing! ", ["white", "bold"]);
log("Running tests...", ["bold", "underline", "grey"]);
log("✓ 10 tests passed", ["green"]);

group.start("Group 1");
log("Group 1 log 1", ["blue"]);
log("Group 1 log 2", ["blue"]);
group.end();

group.start("Group 2", ["red"]);
log("Group 2 log 1", ["italic"]);
log("Group 2 log 2", ["italic"]);
group.end();
