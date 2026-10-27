import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const [url, output, widthValue = "390", heightValue = "844", clickSelector] = process.argv.slice(2);
if (!url || !output) throw new Error("Usage: node scripts/capture-viewport.mjs <url> <output.png> [width] [height]");

const width = Number(widthValue);
const height = Number(heightValue);
const profile = await mkdtemp(join(tmpdir(), "aslam-capture-"));

const browser = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new", "--disable-gpu", "--no-first-run", "--remote-debugging-port=0",
  `--user-data-dir=${profile}`, "about:blank",
], { windowsHide: true, stdio: "ignore" });

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
let socket;
try {
  let port;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      port = Number((await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0]);
      if (port) break;
    } catch { /* Chrome is starting. */ }
    await sleep(200);
  }
  if (!port) throw new Error("Chrome debugging endpoint did not start");
  const pages = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  const page = pages.find((entry) => entry.type === "page");
  if (!page) throw new Error("No Chrome page target");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", rejectOpen, { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
  });
  const call = (method, params = {}) => new Promise((resolveCall, rejectCall) => {
    const id = nextId++;
    pending.set(id, { resolve: resolveCall, reject: rejectCall });
    socket.send(JSON.stringify({ id, method, params }));
  });
  await call("Page.enable");
  await call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await call("Emulation.setTouchEmulationEnabled", { enabled: width < 600, maxTouchPoints: 1 });
  await call("Page.navigate", { url });
  await sleep(6000);
  let interaction = null;
  if (clickSelector) {
    const hoverMode = clickSelector.startsWith("hover:");
    const selector = hoverMode ? clickSelector.slice(6) : clickSelector;
    const target = await call("Runtime.evaluate", { expression: `(() => { const target = document.querySelector(${JSON.stringify(selector)}); if (!target) return null; const rect = target.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; })()`, returnByValue: true });
    if (hoverMode && target.result?.value) await call("Input.dispatchMouseEvent", { type: "mouseMoved", x: target.result.value.x, y: target.result.value.y });
    else if (target.result?.value) await call("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(selector)})?.click()` });
    await sleep(600);
    const state = await call("Runtime.evaluate", { expression: `({ activeImage: document.querySelector('.project-gallery .gallery-images img.active')?.getAttribute('src'), galleryLabel: document.querySelector('.project-gallery .gallery-bar')?.textContent, videoPaused: document.querySelector('.project-gallery .gallery-video')?.paused, videoTime: document.querySelector('.project-gallery .gallery-video')?.currentTime })`, returnByValue: true });
    interaction = { found: Boolean(target.result?.value), mode: hoverMode ? "hover" : "click", ...state.result?.value };
  }
  const result = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await mkdir(dirname(resolve(output)), { recursive: true });
  await writeFile(resolve(output), Buffer.from(result.data, "base64"));
  console.log(JSON.stringify({ output: resolve(output), width, height, interaction }));
} finally {
  socket?.close();
  browser.kill();
  await sleep(300);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
