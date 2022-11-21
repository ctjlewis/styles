# Console styles

Type-safe wrapper around `ansi-styles`, similar to `chalk`. Weighs 4kB.

### Example

You can provide a single style as a string, or multiple as an array of strings
to avoid callback hell common with chalk.

```ts
import { style } from "@tsmodule/log";

console.log(style("Hello world!", ["green", "bold"]))
```

Also includes a `styleLog()` utility, which adds sensible spacing by default:

```ts
import { styleLog } from "@tsmodule/log";

console.log("");
styleLog("Styles testing! ", ["white", "bold"])
styleLog("Running tests...", ["bold", "underline", "grey"])
styleLog("✓ 10 tests passed", ["green"])

/**
 * Equivalent to:
 */
// console.log(
//   "\n\n ",
//   style("Running tests... ", ["bold", "underline", "grey"]),
//   "\n\n ",
//   style("✓ 10 tests passed", ["green"]),
//   "\n\n",
// );
```

![](/assets/example.png)