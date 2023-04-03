import fetch from "node-fetch";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  ...[
    rest.post("http://localhost:8080/api/v1/hello-world", (req, res, ctx) => {
      return res(ctx.json({ hello: "world" }), ctx.status(200));
    }),
  ]
);

async function makeApiCall() {
  const result = await fetch("http://localhost:8080/api/v1/hello-world", {
    body: JSON.stringify({ hello: "world" }),
    method: "POST",
  });

  return result.json();
}

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("makeApiCall", () => {
  it("should call hello-world with post", async () => {
    const result = await makeApiCall();
    console.log("hel", result);
  });
});
