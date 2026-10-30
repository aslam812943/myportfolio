export type ProjectScreenshot = {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  projectType?: string;
  year: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  learning?: string;
  features: string[];
  techStack: string[];
  heroImage: string;
  /** Light WebP screenshot shown instantly in the live-preview frame (desktop shot, or phone shot for phone projects). */
  previewImage?: string;
  screenshots: ProjectScreenshot[];
  video?: string;
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  hidden?: boolean;
  status: "verified" | "partially-verified" | "verification-pending";
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "openlaw",
    name: "OpenLaw",
    category: "Legal technology",
    projectType: "Full-stack legal services web application",
    year: "2025",
    summary: "OpenLaw helps clients find lawyers, book and pay for consultations, and communicate with them online.",
    overview: "OpenLaw combines lawyer discovery, appointment scheduling, payments and real-time communication in one role-based legal services platform.",
    challenge: "Keep appointment availability and payment records consistent when multiple clients try to book or a payment confirmation arrives later.",
    approach: "A Next.js frontend connects to a TypeScript and Express backend organized with Clean Architecture. Temporary slot reservations, conditional updates, Stripe verification and webhook-based confirmation keep booking state reliable.",
    learning: "I learned to build a full-stack platform with role-based access, real-time communication, appointment scheduling and online payments.",
    features: ["Lawyer discovery", "Appointment booking", "Real-time chat and video calls", "Reviews and notifications", "Wallets, subscriptions and payouts", "User, lawyer and admin dashboards"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Stripe", "Cloudinary", "Nodemailer"],
    heroImage: "/projects/openlaw-home.png",
    previewImage: "/projects/openlaw-home.webp",
    screenshots: [
      { src: "/projects/openlaw-home.png", alt: "OpenLaw home page with a lawyer search field and consultation introduction", label: "Live home page", width: 1879, height: 864 },
      { src: "/projects/openlaw-mobile.png", alt: "OpenLaw mobile home page with search field and legal consultation introduction", label: "Mobile home page" },
    ],
    liveUrl: "https://www.openlaw.sbs/",
    githubUrl: "https://github.com/aslam812943/OpenLaw-Frontend",
    featured: true,
    status: "verified",
  },
  {
    id: "03",
    slug: "point-management",
    name: "Point Management",
    category: "Web application",
    year: "Year to confirm",
    summary: "DuffPoints is a team points platform with a season leaderboard, category rankings, schedules and team registration paths.",
    overview: "The live DuffPoints deployment presents ranked teams and a navigation path for the leaderboard, full overview, schedule, team registration and administration.",
    challenge: "Make team standings and current season information easy to scan.",
    approach: "Pending repository or owner notes.",
    features: ["Season leaderboard", "Style 1 and Style 2 rankings", "Schedule and team registration navigation", "Admin navigation"],
    techStack: ["Technology verification pending"],
    heroImage: "/projects/point-home.png",
    previewImage: "/projects/point-home.webp",
    screenshots: [
      { src: "/projects/point-home.png", alt: "DuffPoints desktop season leaderboard with ranked teams", label: "Season leaderboard", width: 1440, height: 900 },
      { src: "/projects/point-mobile.png", alt: "DuffPoints mobile leaderboard with team summary cards", label: "Mobile leaderboard" },
    ],
    liveUrl: "https://point-management-ebon.vercel.app/",
    featured: true,
    status: "partially-verified",
  },
  {
    id: "02",
    slug: "wine-heaven",
    name: "Wine Heaven",
    category: "E-commerce",
    projectType: "Full-stack web application",
    year: "2025",
    summary: "Wine Heaven is an online wine store with customer shopping features and an admin system for managing products, orders and sales.",
    overview: "Wine Heaven supports the complete shopping journey, from browsing and wishlists to coupons, checkout, wallet activity and order tracking.",
    challenge: "Coordinate payments, discounts, order status and wallet balances across checkout and failed-payment recovery.",
    approach: "Payment and order responsibilities are separated into controllers, Razorpay signatures are verified, and order and wallet state are persisted in MongoDB.",
    learning: "I learned how to build an e-commerce application with Express and MongoDB, including authentication, payments, image uploads and order management.",
    features: ["Wine browsing and wishlist", "Cart, coupons and checkout", "Wallet and order tracking", "Customer authentication and email verification", "Product and customer administration", "Order management and sales reports"],
    techStack: ["EJS", "CSS", "Tailwind CSS", "JavaScript", "Chart.js", "Node.js", "Express", "MongoDB", "Mongoose", "Google OAuth", "Razorpay", "Cloudinary", "Nodemailer"],
    heroImage: "/projects/wine-home.png",
    previewImage: "/projects/wine-home.webp",
    screenshots: [
      { src: "/projects/wine-home.png", alt: "Wine Heaven storefront hero with collection and account navigation", label: "Storefront home", width: 1875, height: 877 },
      { src: "/projects/wine-mobile.png", alt: "Wine Heaven storefront on a narrow mobile viewport", label: "Mobile storefront" },
    ],
    liveUrl: "https://wine-heaven.vercel.app/",
    githubUrl: "https://github.com/aslam812943/Wine-heaven",
    featured: true,
    status: "verified",
  },
  {
    id: "06",
    slug: "ajmal-portfolio",
    name: "Ajmal Portfolio",
    category: "Creative portfolio",
    year: "Year to confirm",
    summary: "A live portfolio presentation centered on visual work. Photography authorship is intentionally not claimed.",
    overview: "A visual portfolio deployment with editorial intent.",
    challenge: "Present image-led work while preserving clarity across viewport sizes.",
    approach: "Verified implementation notes are pending source access.",
    features: ["Image-led presentation", "Responsive live deployment"],
    techStack: ["Technology verification pending"],
    heroImage: "/projects/ajmal-home.png",
    previewImage: "/projects/ajmal-home.webp",
    screenshots: [
      { src: "/projects/ajmal-home.png", alt: "Ajmal Maithani portfolio desktop home page with editorial portrait presentation", label: "Desktop home" },
      { src: "/projects/ajmal-mobile.png", alt: "Ajmal Maithani portfolio mobile home page", label: "Mobile home" },
    ],
    liveUrl: "https://ajmal-folio.vercel.app/",
    featured: false,
    hidden: true,
    status: "partially-verified",
  },
  {
    id: "04",
    slug: "dream-wedding",
    name: "Dream Wedding",
    category: "Creative web experience",
    projectType: "Frontend wedding website",
    year: "Year to confirm",
    summary: "A responsive digital wedding invitation presenting the bride and groom, event timing and celebration details through an image-led experience.",
    overview: "Dream Wedding turns a traditional invitation into a mobile-friendly web experience that guests can open and explore from any device.",
    challenge: "Present personal photos and essential event information without losing the emotional, celebration-led atmosphere.",
    approach: "A React frontend combines responsive layouts, couple imagery and clearly structured event content in a focused invitation flow.",
    learning: "I learned how to translate personal event content into a responsive, image-led frontend experience while keeping important details easy to find.",
    features: ["Bride and groom presentation", "Couple image gallery", "Wedding date and time", "Event details", "Responsive phone experience"],
    techStack: ["React", "JavaScript", "CSS"],
    heroImage: "/projects/wedding-intro.png",
    previewImage: "/projects/wedding-mobile.webp",
    screenshots: [
      { src: "/projects/wedding-intro.png", alt: "Dream Wedding invitation opening screen with an Open Invitation button", label: "Invitation opening" },
      { src: "/projects/wedding-mobile.png", alt: "Dream Wedding mobile invitation opening screen", label: "Mobile invitation", width: 390, height: 844 },
    ],
    liveUrl: "https://dream-wedding-web.vercel.app/",
    featured: true,
    status: "partially-verified",
  },
  {
    id: "05",
    slug: "moneymate",
    name: "MoneyMate",
    category: "Personal finance / Full stack",
    projectType: "Full-stack personal finance application",
    year: "Year to confirm",
    summary: "MoneyMate brings income, expenses, budgets, savings goals, EMIs and personal lending into one responsive financial workspace.",
    overview: "MoneyMate helps users understand monthly cash flow, identify spending patterns and compare everyday expenses against a plan through account and browser-based demo modes.",
    challenge: "Keep interconnected balances, recurring entries, budgets, savings, repayments and lending calculations accurate while supporting both persisted accounts and local demo data.",
    approach: "A React and TypeScript interface shares validated finance rules with an Express API. Account data is stored in MongoDB, while demo changes remain in browser storage. Zod validation, revision checks and secure cookie sessions protect persisted state.",
    learning: "I learned that financial products need explicit calculation rules, strong validation and careful state handling so every total remains explainable and consistent.",
    features: ["Monthly dashboard and spending insights", "Income, expenses and recurring entries", "Budgets and savings goals", "EMIs and amortization schedules", "Personal lending, repayments and proof attachments", "Reports, forecasts and CSV export", "Browser-based demo mode", "Responsive light and dark themes"],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Recharts", "React Hook Form", "Zod", "Node.js", "Express 5", "MongoDB", "Mongoose", "Playwright"],
    heroImage: "/projects/moneymate-signin.png",
    previewImage: "/projects/moneymate-signin.webp",
    screenshots: [
      { src: "/projects/moneymate-signin.png", alt: "MoneyMate sign-in page with a live demo option", label: "Sign-in and demo" },
      { src: "/projects/moneymate-mobile.png", alt: "MoneyMate mobile sign-in screen with a live demo option", label: "Mobile sign-in" },
    ],
    liveUrl: "https://moneymate-rjn0.onrender.com/",
    featured: false,
    status: "verified",
  },
];

const projectOrder = ["openlaw", "wine-heaven", "point-management", "dream-wedding", "moneymate"];

export const visibleProjects = projects
  .filter((project) => !project.hidden)
  .sort((first, second) => projectOrder.indexOf(first.slug) - projectOrder.indexOf(second.slug));
export const getProject = (slug: string) => visibleProjects.find((project) => project.slug === slug);

