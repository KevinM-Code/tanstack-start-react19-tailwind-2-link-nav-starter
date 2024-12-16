import { createServerFn } from "@tanstack/start";
import * as fs from "node:fs";
import { z } from "zod";
import * as v from "valibot";

import { drizzle } from 'drizzle-orm/node-postgres';
import { total } from "../db/schema";
import { eq } from "drizzle-orm";
const db = drizzle(process.env.DATABASE_URL!);

const filePath = "count.txt";

async function readCount() {
  const result = await db.select({
    field1: total.total,
  }).from(total);

  if (result.length !== 0) {
    const { field1 } = result[0];
    return field1

  } else {
    const theNumber = await db.insert(total).values({ total: 0 }).returning();
    return theNumber[0].total
  }

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
    await db.update(total)
      .set({ total: count + data.increment })
      .where(eq(total.id, 1));
  });
