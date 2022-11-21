# Console styles

Type-safe wrapper around `ansi-styles`, similar to `chalk`. Weighs 4kB.

### Example

You can provide a single style as a string, or multiple as an array of strings
to avoid callback hell common with chalk.

```ts
import { style } from "@tsmodule/log";

console.log(style("Hello world!", ["green", "bold"]))
```

Also includes `log()` and `error()` proxies for `console.log` and
`console.error`, which add sensible spacing by default (can override via last
`paddingOptions` arg) and allow for easier styling:

```ts
import { group, log } from "@tsmodule/log";

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
```

![](https://github.com/tsmodule/log/blob/master/example.png?raw=true)