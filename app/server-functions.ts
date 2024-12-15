import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import * as v from "valibot";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const filePath = "count.txt";

async function readCount() {
  let total = await prisma.total.findFirst()
  if (total?.total === undefined) {
    total = await prisma.total.create({
      data: {
        id: 1,
        total: 0,
      },
    })
  }
  return total?.total
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
    const count = await readCount();
    
    let newTotal
    if (count !== undefined) {
      newTotal = count + data.increment
    }
    await prisma.total.update({
      where: {
        id: 1,
      },
      data: {
        total: newTotal
      },
    })
  });
