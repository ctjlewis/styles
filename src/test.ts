import { stdout } from "process";
import { style } from "./style";


stdout.cursorTo(0, 0);

for (let row = 0; row < stdout.rows; row++) {
  for (let column = 0; column < stdout.columns; column++) {
    console.log({ row, column });
    stdout.cursorTo(column, row);
    stdout.write(style(" ", ["white"]) ?? "", "utf-8");
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  await new Promise((resolve) => setTimeout(resolve, 300));
}