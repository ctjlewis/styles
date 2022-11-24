import { clear, pushToTop, group, log } from "../src";

log("Styles testing! ", ["white", "bold"], { preLines: 0 });
log("Running tests...", ["bold", "underline", "grey"]);
log("✓ 10 tests passed", ["green"]);

pushToTop();
log("Clear test. Loooooooong loooooooooooong title", ["white", "bold"]);
clear({ overwrite: true });

pushToTop();
log("Clear test. Loooooooong loooooooooooong title", ["white", "bold"]);
clear({ overwrite: true });
log("Replaced!", ["white", "bold"]);

group.start("Group 1");
log("Group 1 log 1", ["blue"]);
log("Group 1 log 2", ["blue"]);
group.end();

group.start("Group 2", ["red"]);
log("Group 2 log 1", ["italic"]);
log("Group 2 log 2", ["italic"]);
group.end();

clear();

// clear(true);
// log("Hello world!", ["white", "bold"]);