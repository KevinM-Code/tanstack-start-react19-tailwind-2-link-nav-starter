import { createServerFn } from "@tanstack/start";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./utils/crypto";
import { users } from "../db/schema";
import * as v from "valibot";
import crypto from 'node:crypto'

import { type SessionConfig, eventHandler, setResponseStatus, useSession } from "vinxi/http"
import { redirect } from "@tanstack/react-router";

const salt = crypto.randomBytes(16).toString('hex');

const sessionConfig = {
  password: salt,
} as SessionConfig

type SessionData = {
  user: string
  role: string
}

const db = drizzle(process.env.DATABASE_URL!);
const standardSchema = v.object({ email: v.string(), password: v.string() });

export const signupFn = createServerFn({ method: "POST" })
  .validator(standardSchema)
  .handler(async ({ data }) => {
    // Check if the user already exists
    const found = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));    

    // Encrypt the password using Sha256 into plaintext
    const password = await hashPassword(data.password, salt);

    console.log("Hashed Password ", password)

    // Create a session

    const session = await useSession<SessionData>(sessionConfig)

    if (found.length > 0) {
      if (found[0].password !== password) {
        return {
          error: true,
          userExists: true,
          message: "User already exists",
        };
      }

      // Store the user's email in the session
      await session.update({
        user: found[0].email,
        role: "member",
      });

      // Redirect to the prev page stored in the "redirect" search param
      // throw redirect({
      //   href: '/',
      // })
    }

    // Create the user
    await db.insert(users).values({
      email: data.email,
      password,
      salt
    });

    // Store the user's email in the session
    await session.update({
      user: data.email,
      role: 'member'
    });

    return ({email: data.email})  

    // Redirect to the prev page stored in the "redirect" search param
    // throw redirect({
    //   href: '/',
    // })

  });

export const loginFn = createServerFn({ method: "POST" })
  .validator(standardSchema)
  .handler(async ({ data }) => {
    // Check if the user already exists
    const found = await db
      .select({
        email: users.email,
        password: users.password,
        salt: users.salt
      })
      .from(users)
      .where(eq(users.email, data.email));

     const salt = crypto.randomBytes(16).toString('hex');

    // Encrypt the password using Sha256 into plaintext
    const isPasswordValid = await verifyPassword(data.password, found[0].salt, found[0].password);

    if (!isPasswordValid) {
      setResponseStatus(401)
      return new Response('User not Authorized')
    }

    // Create a session
    const session = await useSession<SessionData>(sessionConfig)

    await session.update({
      user: found[0].email,
      role: 'member'
    });

    return ({email: found[0].email})  

  });