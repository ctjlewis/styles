import { clear, pushToTop, group, log } from "../src";



const symbols = ["✓", "✗", "⚠", "⚡", "⚙", "⚛", "⚠", "⚡", "⚙", "⚛"];
const start = Date.now();
let i = 0;
/**
 * Run a test for 5 seconds.
 */
while (Date.now() - start < 10_000) {
  log(`${symbols[i++ % symbols.length]} Testing...`, ["bold", "underline", "grey"]);
  await new Promise((resolve) => setTimeout(resolve, 1000 / 10));
  clear({ overwrite: true, lines: 3 });
}

log("✓ Tests passed!", ["bold", "underline", "green"]);


log("Styles testing! ", ["white", "bold"]);
log("Running tests...", ["bold", "underline", "grey"]);
log("✓ 10 tests passed", ["green"]);

pushToTop();
log("FIRST CLEAR TEST. Loooooooong loooooooooooong title", ["white", "bold"]);
clear({ overwrite: true });
log("First test cleared");

// pushToTop();
log("SECOND CLEAR TEST. Loooooooong loooooooooooong title", ["white", "bold"]);
clear({ overwrite: true, lines: 2 });
log("Second test cleared");

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