import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import worker from "../dist/server/index.js";

const output = new URL("../github-pages/", import.meta.url);
const outputPath = fileURLToPath(output);
const routes = [
  ["/", "index.html"],
  ["/projects/experience", "projects/experience/index.html"],
  ["/projects/enterprise", "projects/enterprise/index.html"],
  ["/projects/ip", "projects/ip/index.html"],
  ["/projects/ai-workflow", "projects/ai-workflow/index.html"],
];

const context = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const execution = { waitUntil() {}, passThroughOnException() {} };

await rm(outputPath, { recursive: true, force: true });
await mkdir(outputPath, { recursive: true });
await cp(new URL("../dist/client/", import.meta.url), output, { recursive: true });
await writeFile(join(outputPath, ".nojekyll"), "");

async function removeMatching(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return removeMatching(path);
    if (entry.name.endsWith(".source.mp4")) await rm(path);
  }));
}

await removeMatching(outputPath);
await Promise.all([
  ".assetsignore",
  ".vite",
  "_headers",
  "favicon.svg",
  "file.svg",
  "globe.svg",
  "vinext-client-entry-manifest.json",
  "window.svg",
].map((entry) => rm(join(outputPath, entry), { recursive: true, force: true })));

for (const [pathname, file] of routes) {
  const response = await worker.fetch(
    new Request(`https://charonycz.github.io${pathname}`, {
      headers: { accept: "text/html" },
    }),
    context,
    execution,
  );

  if (!response.ok) throw new Error(`无法导出 ${pathname}: ${response.status}`);

  const target = join(outputPath, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await response.text());
}

await writeFile(
  join(outputPath, "404.html"),
  await (await worker.fetch(new Request("https://charonycz.github.io/", { headers: { accept: "text/html" } }), context, execution)).text(),
);

console.log(`GitHub Pages 静态文件已导出到 ${outputPath}`);
