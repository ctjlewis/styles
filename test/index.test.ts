import { clear, pushToTop, group, clearLast, postLog } from "../src";



const symbols = ["✓", "✗", "⚠", "⚡", "⚙", "⚛", "⚠", "⚡", "⚙", "⚛"];
const start = Date.now();
let i = 0;
/**
 * Run a test for 5 seconds.
 */
while (Date.now() - start < 10_000) {
  // console.postLog(`${symbols[i++ % symbols.length]} Testing...\n\n\n\n*****`);
  postLog(`${symbols[i++ % symbols.length]} Testing...`, ["bold", "underline", "grey"], { preLines: 0, postLines: 0 });
  await new Promise((resolve) => setTimeout(resolve, 1000 / 10));
  clearLast();
  // console.clear();
}

postLog("✓ Tests passed!", ["bold", "underline", "green"]);


postLog("Styles testing! ", ["white", "bold"]);
postLog("Running tests...", ["bold", "underline", "grey"]);
postLog("✓ 10 tests passed", ["green"]);

pushToTop();
postLog("FIRST CLEAR TEST. Loooooooong loooooooooooong title", ["white", "bold"]);
clear({ overwrite: true, lines: 2 });
postLog("First test cleared");

// pushToTop();
postLog("SECOND CLEAR TEST. Loooooooong loooooooooooong title", ["white", "bold"]);
clear({ overwrite: true, lines: 2 });
postLog("Second test cleared");

postLog("Autoclear test 3 FAILED. LOOOOOONG TITLE");
clearLast();
postLog("Autoclear test passed");

group.start("Group 1");
postLog("Group 1 log 1", ["blue"]);
postLog("Group 1 log 2", ["blue"]);
group.end();

group.start("Group 2", ["red"]);
postLog("Group 2 log 1", ["italic"]);
postLog("Group 2 log 2", ["italic"]);
group.end();

clear();
// clear(true);
// postLog("Hello world!", ["white", "bold"]);