import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>岳崇政｜2026 设计作品集<\/title>/i);
  assert.match(html, /2026 设计作品集/);
  assert.match(html, /体验设计/);
  assert.match(html, /AI工作流/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the requested homepage interactions in the client source", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(page, /navigator\.clipboard\.writeText/);
  assert.match(page, /手机号已复制/);
  assert.match(page, /project-nav-menu/);
  assert.match(page, /个人首页/);
  assert.match(page, /在线简历/);
  assert.match(page, /mouse-scroll/);
  assert.match(css, /scroll-snap-type:\s*y mandatory/);
  assert.match(css, /min-width:\s*1180px/);
  assert.match(css, /max-width:\s*min\(1600px/);
  assert.match(css, /\.site-header[\s\S]*?width:\s*100vw/);
  assert.match(css, /height:\s*76px/);
  assert.match(css, /project-card:hover/);
});
