export type Shape =
  | { kind: "rect"; x: number; y: number; width: number; height: number }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "path"; d: string };

export type BuildItem = {
  n: string;
  title: string;
  tags: string[];
  term: [string, string];
  stat: { value: number; suffix: string; label: string };
  desc: string;
  shapes: Shape[];
  pulse?: { cx: number; cy: number };
};

export const ITEMS: BuildItem[] = [
  { n: "01", title: "Frontend", tags: ["REACT", "NEXT.JS", "TYPESCRIPT", "JAVASCRIPT", "HTML / CSS", "TAILWIND CSS", "FRAMER MOTION", "REDUX", "RESPONSIVE DESIGN", "FIGMA TO CODE"], term: ["npm run dev", "responsive UI ready"], stat: { value: 10, suffix: "", label: "SKILLS" }, desc: "Interfaces shaped for clarity, responsiveness and useful feedback.", shapes: [
    { kind: "rect", x: 10, y: 7, width: 90, height: 58 },
    { kind: "line", x1: 10, y1: 20, x2: 100, y2: 20 },
    { kind: "circle", cx: 18, cy: 14, r: 2 }, { kind: "circle", cx: 26, cy: 14, r: 2 }, { kind: "circle", cx: 34, cy: 14, r: 2 },
    { kind: "path", d: "M40 33L30 43l10 10 M70 33l10 10-10 10 M61 29L49 57" },
  ] },
  { n: "02", title: "Backend", tags: ["NODE.JS", "EXPRESS", "NESTJS", "AUTH (JWT / SESSIONS)", "OAUTH", "ROLE-BASED ACCESS", "VALIDATION (ZOD)", "RATE LIMITING", "FILE UPLOADS", "EMAIL (SMTP)"], term: ["$ node server.js", "listening on :3000"], stat: { value: 99.9, suffix: "%", label: "UPTIME" }, desc: "APIs, auth and business logic. Clean REST endpoints with validation and rate limiting.", shapes: [
    { kind: "rect", x: 15, y: 6, width: 80, height: 17 }, { kind: "rect", x: 15, y: 28, width: 80, height: 17 }, { kind: "rect", x: 15, y: 50, width: 80, height: 17 },
    { kind: "line", x1: 24, y1: 14, x2: 43, y2: 14 }, { kind: "line", x1: 24, y1: 36, x2: 43, y2: 36 }, { kind: "line", x1: 24, y1: 58, x2: 43, y2: 58 },
  ], pulse: { cx: 83, cy: 58 } },
  { n: "03", title: "Data", tags: ["POSTGRESQL", "MONGODB", "REDIS", "SUPABASE", "FIREBASE", "PRISMA", "MONGOOSE", "SCHEMA DESIGN", "INDEXING", "BACKUPS"], term: ["SELECT * FROM projects;", "42 rows in 3ms"], stat: { value: 5, suffix: "ms", label: "AVG QUERY" }, desc: "Schema design, indexes and caching so reads stay fast as data grows.", shapes: [
    { kind: "ellipse", cx: 55, cy: 14, rx: 34, ry: 8 },
    { kind: "path", d: "M21 14v43c0 5 15 9 34 9s34-4 34-9V14 M21 35c0 5 15 9 34 9s34-4 34-9" },
  ] },
  { n: "04", title: "Real-time", tags: ["WEBSOCKETS", "SOCKET.IO", "LIVE NOTIFICATIONS", "LIVE CHAT", "WEBRTC"], term: ["ws.connect()", "connected, 18ms ping"], stat: { value: 18, suffix: "ms", label: "LATENCY" }, desc: "Live updates over WebSockets with reconnect logic and presence handling.", shapes: [
    { kind: "path", d: "M4 36h18l8-24 12 48 12-40 9 16h10l5-8h22" },
  ], pulse: { cx: 100, cy: 28 } },
  { n: "05", title: "Integrations", tags: ["STRIPE", "WEBHOOKS", "OAUTH (GOOGLE / GITHUB)", "GOOGLE MAPS", "CLOUDINARY"], term: ["POST /webhooks/stripe", "200 OK"], stat: { value: 12, suffix: "", label: "APIS WIRED" }, desc: "Third-party APIs, OAuth flows and webhooks that fail safely and retry.", shapes: [
    { kind: "circle", cx: 18, cy: 36, r: 10 }, { kind: "circle", cx: 92, cy: 14, r: 10 }, { kind: "circle", cx: 92, cy: 58, r: 10 },
    { kind: "line", x1: 28, y1: 33, x2: 82, y2: 17 }, { kind: "line", x1: 28, y1: 39, x2: 82, y2: 55 },
  ], pulse: { cx: 55, cy: 36 } },
  { n: "06", title: "Infrastructure", tags: ["DOCKER", "CI/CD", "GITHUB ACTIONS", "AWS", "VERCEL", "RENDER", "NGINX", "GIT / GITHUB"], term: ["docker compose up -d", "4 services healthy"], stat: { value: 120, suffix: "", label: "DEPLOYS" }, desc: "Containers, CI/CD pipelines and monitoring so shipping is boring and safe.", shapes: [
    { kind: "rect", x: 15, y: 6, width: 34, height: 25 }, { kind: "rect", x: 61, y: 6, width: 34, height: 25 },
    { kind: "rect", x: 15, y: 41, width: 34, height: 25 }, { kind: "rect", x: 61, y: 41, width: 34, height: 25 },
    { kind: "line", x1: 49, y1: 18, x2: 61, y2: 18 }, { kind: "line", x1: 49, y1: 54, x2: 61, y2: 54 },
    { kind: "line", x1: 32, y1: 31, x2: 32, y2: 41 }, { kind: "line", x1: 78, y1: 31, x2: 78, y2: 41 },
  ] },
];
