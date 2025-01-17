/**
 *
 * deno run --allow-net deno.ts
 *
 * This works in any JavaScript environment: Web, Node, Deno, Bum.
 *
 * This import statement is important as it will create all of our
 * commands and queries so they can be dispatched later on.
 */
import { Application, Router } from "https://deno.land/x/oak@14.2.0/mod.ts";
import "./mediator/create.ts";
import { dispatch } from "./mediator/mediator.ts";
const router = new Router()
  .get("/notes", async (ctx) => {
    await dispatch({
      type: "GET_NOTES",
      arg: {
        userId: "get user Id from token",
      },
    });
  })
  .post("/notes", async (ctx) => {
    const post = await dispatch({
      type: "CREATE_NOTE",
      arg: {
        post: {
          content: "the content",
          title: "the title",
        },
        userId: "The user Id",
      },
    });
    console.log("Created post is", post.title);
  })
  .get("/users", async (ctx) => {
    await dispatch({
      type: "GET_USERS",
      arg: {
        sort: "ascending",
      },
    });
  })
  .post("/users", async (ctx) => {
    await dispatch({
      type: "CREATE_USER",
      arg: {
        password: "pass",
        username: "user",
      },
    });
  });
const port = 8000;
console.log(`Listening on port: ${port}`);
await new Application().use(router.routes()).listen({ port });
