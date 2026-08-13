import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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

test("server-renders the experience design detail page", async () => {
  const response = await render("/projects/experience");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /订单进行中页面(?:<[^>]+>)*体验优化/);
  assert.match(html, /Ongoing Order Page Experience Optimization/);
  assert.match(html, /项目概览/);
  assert.match(html, /项目复盘/);
  assert.match(html, /01-overview\/01\.mp4/);
  assert.match(html, /02-insights\/02\.mp4/);
  assert.match(html, /06-motion\/04\.mp4/);

  const detailPage = await readFile(new URL("../app/projects/ProjectDetailTemplate.tsx", import.meta.url), "utf8");
  const detailClient = await readFile(new URL("../app/projects/ProjectDetailClient.tsx", import.meta.url), "utf8");
  assert.match(detailPage, /data-viewport-video/);
  assert.match(detailPage, /preload="none"/);
  assert.match(detailPage, /poster=/);
  assert.match(detailPage, /loop/);
  assert.match(detailPage, /muted/);
  assert.match(detailPage, /data-src=/);
  assert.doesNotMatch(detailPage, /video\/webm/);
  assert.match(detailPage, /image\/avif/);
  assert.match(detailPage, /image\/webp/);
  assert.match(detailClient, /IntersectionObserver/);
  assert.match(detailClient, /MEDIA_PRELOAD_DISTANCE\s*=\s*1600/);
  assert.match(detailClient, /addEventListener\("canplay", handleCanPlay\)/);
  assert.match(detailClient, /addEventListener\("scroll", syncVideoPlayback/);
  assert.match(detailClient, /sourceChanged/);
});

test("server-renders the other project detail pages", async () => {
  const cases = [
    ["/projects/enterprise", "企业级业务(?:<[^>]+>)*系统整合(?:<[^>]+>)*与效率体验优化"],
    ["/projects/ip", "IP改造赋能，全场景(?:<[^>]+>)*品牌价值渗透"],
    ["/projects/ai-workflow", "搭建(?:<[^>]+>)*COZE智能体(?:<[^>]+>)*重塑语义"],
  ];

  for (const [pathname, title] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(title));
  }

  const enterprise = await render("/projects/enterprise");
  assert.match(await enterprise.text(), /04-delivery\/03\.mp4/);
});

test("keeps the requested homepage interactions in the client source", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const interactions = await readFile(new URL("../app/PortfolioInteractions.tsx", import.meta.url), "utf8");
  const hero = await readFile(new URL("../app/HeroVideo.tsx", import.meta.url), "utf8");
  const pointer = await readFile(new URL("../app/PointerEffects.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.doesNotMatch(page, /"use client"/);
  assert.match(interactions, /navigator\.clipboard\.writeText/);
  assert.match(page, /手机号已复制/);
  assert.match(page, /project-nav-menu/);
  assert.match(page, /个人首页/);
  assert.match(page, /下载简历/);
  assert.match(page, /mouse-scroll/);
  assert.match(page, /project-card-hover/);
  assert.match(page, /loading="eager"/);
  assert.match(hero, /setTimeout\(load, 300\)/);
  assert.match(hero, /preload="none"/);
  assert.match(pointer, /requestRender/);
  assert.match(pointer, /pointer:\s*fine/);
  assert.doesNotMatch(pointer, /resize\(\);\s*render\(\)/);
  assert.match(css, /scroll-snap-type:\s*y mandatory/);
  assert.match(css, /min-width:\s*1180px/);
  assert.match(css, /max-width:\s*min\(1504px/);
  assert.match(css, /\.site-header[\s\S]*?width:\s*100vw/);
  assert.match(css, /height:\s*76px/);
  assert.match(css, /padding:\s*0 48px/);
  assert.match(css, /\.site-header::before/);
  assert.match(css, /backdrop-filter:\s*blur\(18px\)/);
  assert.match(css, /project-card-hover-ready:hover/);
  assert.match(css, /grid-template-columns:\s*220px minmax\(800px, 1440px\)/);
  assert.match(css, /max-width:\s*1752px/);
  assert.match(css, /padding:\s*144px 48px 120px/);
});
