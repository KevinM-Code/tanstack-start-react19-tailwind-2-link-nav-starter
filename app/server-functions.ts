import { createServerFn } from "@tanstack/start";
import * as fs from "node:fs";
import { z } from "zod";
import * as v from "valibot";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

export const getCount = createServerFn({ method: "GET" }).handler(() => {
  console.log("getCount");
  return readCount();
});

const zodSchema = z.number();
const valibotSchema = v.pipe(
  v.string(),
  v.transform((str) => parseInt(str))
);
const standardSchema = v.object({ increment: v.number() });

export const updateCount = createServerFn({ method: "POST" })
  .validator(standardSchema)
  .handler(async ({ data }) => {
    console.log("updateCount");
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data.increment}`);
  });
