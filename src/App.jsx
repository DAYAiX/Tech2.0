import { useState, useEffect, useRef, useCallback } from "react";
import {
  Monitor,
  Wrench,
  Rocket,
  SprayCan,
  Shield,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  ClipboardCheck,
  TrendingUp,
  MapPin,
  Lock,
  CheckCircle2,
  Star,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Building2,
  Zap,
  Users,
  FileText,
  Award,
  BadgeCheck,
  Shirt,
  Send,
  ChevronUp,
  BarChart3,
  ShieldCheck,
  Truck,
  CircleDot,
  LogIn,
  LogOut,
  Home,
  Ticket,
  CalendarDays,
  PieChart,
  Search,
  Filter,
  Plus,
  Eye,
  AlertTriangle,
  ChevronLeft,
  User,
  Settings,
  Bell,
  Clipboard,
  Package,
  RefreshCw,
  Calendar,
  MapPinned,
  Hash,
  Layers,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   PORTAL MOCK DATA
   ══════════════════════════════════════════════════════════════ */

const TECHNICIANS = [
  {
    id: "T1",
    name: "Marcus Thompson",
    level: 2,
    levelLabel: "Lvl 2 — Laptop & Printer",
    borough: "Brooklyn",
    avatar: "MT",
    color: "#DC2626",
  },
  {
    id: "T2",
    name: "Jordan Mitchell",
    level: 3,
    levelLabel: "Lvl 3 — Master Technician",
    borough: "Manhattan",
    avatar: "JM",
    color: "#111827",
  },
  {
    id: "T3",
    name: "Keisha Brown",
    level: 1,
    levelLabel: "Lvl 1 — PC & Laptop",
    borough: "Queens",
    avatar: "KB",
    color: "#7C3AED",
  },
  {
    id: "T4",
    name: "David Chen",
    level: 2,
    levelLabel: "Lvl 2 — Laptop & Printer",
    borough: "The Bronx",
    avatar: "DC",
    color: "#DC2626",
  },
  {
    id: "T5",
    name: "Aaliyah Reyes",
    level: 1,
    levelLabel: "Lvl 1 — PC & Laptop",
    borough: "Staten Island",
    avatar: "AR",
    color: "#7C3AED",
  },
];

const MOCK_DEVICES = [
  {
    id: "D-001",
    type: "Laptop",
    model: "Dell Chromebook 11",
    serial: "DL4X9201",
    location: "Room 204",
    school: "PS 127",
    status: "Active",
    condition: "Good",
    lastService: "Jan 12, 2026",
    borough: "Brooklyn",
  },
  {
    id: "D-002",
    type: "Tablet",
    model: "iPad 9th Gen",
    serial: "IPAD88210",
    location: "Room 101",
    school: "PS 127",
    status: "In Repair",
    condition: "Fair",
    lastService: "Mar 18, 2026",
    borough: "Brooklyn",
  },
  {
    id: "D-003",
    type: "Laptop",
    model: "Lenovo 300e",
    serial: "LN7C3309",
    location: "Library",
    school: "PS 127",
    status: "Active",
    condition: "Good",
    lastService: "Feb 02, 2026",
    borough: "Brooklyn",
  },
  {
    id: "D-004",
    type: "Laptop",
    model: "Dell Chromebook 11",
    serial: "DL4X9388",
    location: "Room 307",
    school: "PS 127",
    status: "Pending Repair",
    condition: "Damaged",
    lastService: "Mar 28, 2026",
    borough: "Brooklyn",
  },
  {
    id: "D-005",
    type: "Tablet",
    model: "iPad 10th Gen",
    serial: "IPAD99103",
    location: "Room 204",
    school: "PS 127",
    status: "Active",
    condition: "Excellent",
    lastService: "Dec 14, 2025",
    borough: "Brooklyn",
  },
  {
    id: "D-006",
    type: "Laptop",
    model: "Lenovo 300e",
    serial: "LN7C4410",
    location: "Room 112",
    school: "PS 127",
    status: "Active",
    condition: "Good",
    lastService: "Mar 25, 2026",
    borough: "Brooklyn",
  },
  {
    id: "D-007",
    type: "Laptop",
    model: "HP Chromebook 14",
    serial: "HP2X8811",
    location: "Room 305",
    school: "MS 442",
    status: "Active",
    condition: "Good",
    lastService: "Feb 15, 2026",
    borough: "Manhattan",
  },
  {
    id: "D-008",
    type: "Tablet",
    model: "iPad 9th Gen",
    serial: "IPAD88504",
    location: "Room 101",
    school: "MS 442",
    status: "Pending Repair",
    condition: "Cracked Screen",
    lastService: "Mar 29, 2026",
    borough: "Manhattan",
  },
  {
    id: "D-009",
    type: "Laptop",
    model: "Dell Chromebook 11",
    serial: "DL4X7700",
    location: "Room 205",
    school: "MS 442",
    status: "Active",
    condition: "Good",
    lastService: "Jan 30, 2026",
    borough: "Manhattan",
  },
  {
    id: "D-010",
    type: "Laptop",
    model: "Lenovo 300e",
    serial: "LN7C5590",
    location: "Lab A",
    school: "MS 442",
    status: "Retired",
    condition: "Poor",
    lastService: "Nov 10, 2025",
    borough: "Manhattan",
  },
  {
    id: "D-011",
    type: "Laptop",
    model: "Dell Chromebook 11",
    serial: "DL4X3301",
    location: "Room 102",
    school: "Charter Academy BX",
    status: "Active",
    condition: "Good",
    lastService: "Mar 01, 2026",
    borough: "The Bronx",
  },
  {
    id: "D-012",
    type: "Tablet",
    model: "iPad 10th Gen",
    serial: "IPAD99207",
    location: "Room 210",
    school: "Charter Academy BX",
    status: "In Repair",
    condition: "Fair",
    lastService: "Mar 22, 2026",
    borough: "The Bronx",
  },
];

const MOCK_TICKETS = [
  {
    id: "TK-1041",
    device: "D-004",
    model: "Dell Chromebook 11",
    school: "PS 127",
    issue: "Cracked screen, touchpad not responding",
    status: "Pending",
    submitted: "Mar 28, 2026",
    tech: null,
    priority: "High",
    borough: "Brooklyn",
    notes: [],
  },
  {
    id: "TK-1040",
    device: "D-002",
    model: "iPad 9th Gen",
    school: "PS 127",
    issue: "Battery draining fast, won't hold charge",
    status: "In Progress",
    submitted: "Mar 18, 2026",
    tech: "T1",
    priority: "Medium",
    borough: "Brooklyn",
    notes: [
      {
        by: "Marcus T.",
        date: "Mar 19",
        text: "Battery tested at 40% capacity. Replacement ordered.",
      },
    ],
  },
  {
    id: "TK-1039",
    device: "D-008",
    model: "iPad 9th Gen",
    school: "MS 442",
    issue: "Screen cracked, touch unresponsive",
    status: "Pending",
    submitted: "Mar 29, 2026",
    tech: null,
    priority: "High",
    borough: "Manhattan",
    notes: [],
  },
  {
    id: "TK-1038",
    device: "D-006",
    model: "Lenovo 300e",
    school: "PS 127",
    issue: "Keyboard cleaning + thermal paste replacement",
    status: "Completed",
    submitted: "Mar 22, 2026",
    tech: "T2",
    priority: "Low",
    borough: "Brooklyn",
    notes: [
      {
        by: "Jordan M.",
        date: "Mar 24",
        text: "Deep clean done. Thermal paste replaced. Temps dropped 12C.",
      },
    ],
  },
  {
    id: "TK-1037",
    device: "D-012",
    model: "iPad 10th Gen",
    school: "Charter Academy BX",
    issue: "Charging port loose, intermittent connection",
    status: "In Progress",
    submitted: "Mar 25, 2026",
    tech: "T4",
    priority: "Medium",
    borough: "The Bronx",
    notes: [
      {
        by: "David C.",
        date: "Mar 26",
        text: "Port housing cracked internally. Micro-soldering required.",
      },
    ],
  },
  {
    id: "TK-1036",
    device: "D-001",
    model: "Dell Chromebook 11",
    school: "PS 127",
    issue: "Charging port loose",
    status: "Completed",
    submitted: "Jan 10, 2026",
    tech: "T3",
    priority: "Medium",
    borough: "Brooklyn",
    notes: [
      {
        by: "Keisha B.",
        date: "Jan 12",
        text: "Port replaced and tested. All good.",
      },
    ],
  },
  {
    id: "TK-1035",
    device: "D-009",
    model: "Dell Chromebook 11",
    school: "MS 442",
    issue: "Hinge broken on left side",
    status: "Completed",
    submitted: "Feb 20, 2026",
    tech: "T2",
    priority: "Low",
    borough: "Manhattan",
    notes: [
      {
        by: "Jordan M.",
        date: "Feb 22",
        text: "Hinge replaced. Full function restored.",
      },
    ],
  },
];

const MOCK_SCHEDULE = [
  {
    id: "S1",
    date: "2026-03-30",
    tech: "T1",
    school: "PS 127",
    borough: "Brooklyn",
    type: "Repair",
    ticketId: "TK-1040",
    time: "9:00 AM",
    duration: "2h",
    desc: "iPad battery replacement",
  },
  {
    id: "S2",
    date: "2026-03-30",
    tech: "T2",
    school: "MS 442",
    borough: "Manhattan",
    type: "Maintenance",
    ticketId: null,
    time: "10:00 AM",
    duration: "3h",
    desc: "Quarterly device cleaning - Lab A",
  },
  {
    id: "S3",
    date: "2026-03-30",
    tech: "T4",
    school: "Charter Academy BX",
    borough: "The Bronx",
    type: "Repair",
    ticketId: "TK-1037",
    time: "11:00 AM",
    duration: "2h",
    desc: "iPad charging port micro-solder",
  },
  {
    id: "S4",
    date: "2026-03-31",
    tech: "T3",
    school: "PS 127",
    borough: "Brooklyn",
    type: "Deployment",
    ticketId: null,
    time: "8:30 AM",
    duration: "4h",
    desc: "Bulk deployment - 25 Chromebooks",
  },
  {
    id: "S5",
    date: "2026-03-31",
    tech: "T1",
    school: "MS 442",
    borough: "Manhattan",
    type: "Repair",
    ticketId: "TK-1039",
    time: "9:00 AM",
    duration: "1.5h",
    desc: "iPad screen replacement",
  },
  {
    id: "S6",
    date: "2026-03-31",
    tech: "T2",
    school: "PS 127",
    borough: "Brooklyn",
    type: "Maintenance",
    ticketId: null,
    time: "1:00 PM",
    duration: "2h",
    desc: "Fan cleaning + thermal check",
  },
  {
    id: "S7",
    date: "2026-04-01",
    tech: "T5",
    school: "SI Tech Prep",
    borough: "Staten Island",
    type: "Repair",
    ticketId: null,
    time: "9:00 AM",
    duration: "3h",
    desc: "Batch screen repairs - 4 units",
  },
  {
    id: "S8",
    date: "2026-04-01",
    tech: "T4",
    school: "Charter Academy BX",
    borough: "The Bronx",
    type: "Maintenance",
    ticketId: null,
    time: "10:00 AM",
    duration: "2h",
    desc: "Monthly cleaning cycle",
  },
  {
    id: "S9",
    date: "2026-04-02",
    tech: "T2",
    school: "PS 127",
    borough: "Brooklyn",
    type: "Deployment",
    ticketId: null,
    time: "8:00 AM",
    duration: "5h",
    desc: "New iPad rollout - K-2 classrooms",
  },
  {
    id: "S10",
    date: "2026-04-02",
    tech: "T3",
    school: "MS 442",
    borough: "Manhattan",
    type: "Repair",
    ticketId: null,
    time: "10:00 AM",
    duration: "2h",
    desc: "Keyboard replacements x3",
  },
];

const REPORT_DATA = {
  monthly: {
    ticketsOpened: 38,
    ticketsClosed: 34,
    avgTurnaround: "1.8 days",
    devicesCleaned: 85,
    satisfaction: "4.8/5",
  },
  byBorough: [
    { borough: "Brooklyn", tickets: 14, hours: 32 },
    { borough: "Manhattan", tickets: 10, hours: 24 },
    { borough: "The Bronx", tickets: 8, hours: 18 },
    { borough: "Queens", tickets: 4, hours: 8 },
    { borough: "Staten Island", tickets: 2, hours: 5 },
  ],
  costSummary: [
    { category: "Screen Repairs", count: 12, cost: "$3,840" },
    { category: "Battery Replacements", count: 6, cost: "$1,140" },
    { category: "Keyboard/Port Repairs", count: 8, cost: "$1,520" },
    { category: "Maintenance & Cleaning", count: 85, cost: "$4,250" },
    { category: "Deployments", count: 3, cost: "$2,100" },
  ],
};

const BOROUGHS = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "The Bronx",
  "Staten Island",
];

const SITE_SERVICES = [
  {
    Icon: Monitor,
    title: "Device Lifecycle Management",
    tag: "Full Scope",
    desc: "We manage your devices from arrival to retirement - intake, tagging, deployment, maintenance, and end-of-life processing.",
    bullets: [
      "Asset tagging & inventory logging",
      "Deployment & redeployment planning",
      "Scheduled maintenance intervals",
      "End-of-life decommissioning support",
    ],
  },
  {
    Icon: Wrench,
    title: "On-Site & Emergency Repairs",
    tag: "Rapid Response",
    desc: "Borough-based field teams enable same-day dispatch when hardware fails.",
    bullets: [
      "Same-day emergency dispatch",
      "Screen, battery & port repairs",
      "Hardware swap & replacement",
      "Certified Level 1-3 technicians on-site",
    ],
  },
  {
    Icon: Rocket,
    title: "Bulk Device Deployment",
    tag: "Scale Ready",
    desc: "Rolling out 50 or 500 devices - PTC executes structured deployment programs.",
    bullets: [
      "Pre-deployment device staging",
      "Classroom-by-classroom rollout",
      "Configuration & labeling",
      "Full deployment summary reports",
    ],
  },
  {
    Icon: SprayCan,
    title: "Maintenance & Cleaning",
    tag: "Preventive Care",
    desc: "Scheduled cleaning and inspection programs keep student devices in peak condition.",
    bullets: [
      "Keyboard & port deep cleaning",
      "Fan & vent dust removal",
      "Thermal paste reapplication",
      "Visual inspection & damage logging",
    ],
  },
  {
    Icon: Shield,
    title: "Device Protection Plans",
    tag: "Risk Reduction",
    desc: "Per-device monthly coverage gives schools predictable repair costs.",
    bullets: [
      "Per-device monthly coverage",
      "Accidental damage repair included",
      "Priority turnaround guaranteed",
      "Monthly usage & cost reporting",
    ],
  },
];

const SITE_STEPS = [
  {
    num: "01",
    Icon: ClipboardCheck,
    title: "Submit a Request",
    desc: "Use our online form, email, or phone. We confirm receipt within 2 hours.",
  },
  {
    num: "02",
    Icon: Truck,
    title: "Device Pickup or Drop-Off",
    desc: "Schedule a drop-off or request on-site service. Our field team comes to you.",
  },
  {
    num: "03",
    Icon: Wrench,
    title: "Repair & Real-Time Tracking",
    desc: "Every device gets a ticket number. Track status in real time through our portal.",
  },
  {
    num: "04",
    Icon: Monitor,
    title: "Device Return & Docs",
    desc: "Repaired devices returned organized with a full service report.",
  },
  {
    num: "05",
    Icon: BarChart3,
    title: "Monthly Reporting",
    desc: "Monthly summaries covering devices serviced, turnaround times, and costs.",
  },
];

const SITE_PLANS = [
  {
    name: "Basic",
    price: "$299",
    period: "/mo",
    color: "#0EA5E9",
    popular: false,
    ideal: "Small schools - up to 100 devices",
    contract: "Monthly or annual",
    response: "Next business day",
    support: "Email & phone",
    features: [
      "Up to 10 repair tickets/month",
      "Standard hardware repairs",
      "Free diagnostics",
      "Monthly summary report",
      "Walk-in & drop-off repair",
      "90-day repair warranty",
    ],
  },
  {
    name: "Standard",
    price: "$699",
    period: "/mo",
    color: "#F59E0B",
    popular: true,
    ideal: "Mid-size - 100-300 devices",
    contract: "Annual (monthly billing)",
    response: "Same-day emergency",
    support: "Dedicated rep + priority",
    features: [
      "Up to 30 repair tickets/month",
      "All repair types including bulk",
      "On-site maintenance visits",
      "Device inventory management",
      "Real-time status tracking",
      "Quarterly cleaning",
      "DOE-compliant reports",
      "90-day warranty",
    ],
  },
  {
    name: "Premium",
    price: "Custom",
    period: "",
    color: "#7C3AED",
    popular: false,
    ideal: "Large schools & districts - 300+",
    contract: "Annual - multi-site",
    response: "Same-day guaranteed SLA",
    support: "On-site tech + 24hr SLA",
    features: [
      "Unlimited repair tickets",
      "Full lifecycle management",
      "Priority emergency dispatch",
      "Bulk deployment",
      "Protection plan included",
      "Monthly on-site maintenance",
      "Custom reporting",
      "Procurement coordination",
      "DOE-compliant docs",
      "1-year warranty",
    ],
  },
];

const SITE_BENEFITS = [
  {
    Icon: Clock,
    title: "Reduced Downtime",
    desc: "Broken devices repaired fast - keeping students on devices and teachers focused.",
  },
  {
    Icon: DollarSign,
    title: "Predictable Costs",
    desc: "Flat monthly plans eliminate surprise bills. Budget confidently.",
  },
  {
    Icon: ClipboardCheck,
    title: "Full Accountability",
    desc: "Every repair logged, every technician identified, every cost documented.",
  },
  {
    Icon: TrendingUp,
    title: "Extended Device Life",
    desc: "Preventive maintenance keeps devices in service longer.",
  },
  {
    Icon: MapPin,
    title: "Local Response Teams",
    desc: "Borough-based teams - never waiting for a technician to travel across the city.",
  },
  {
    Icon: Lock,
    title: "Data-Safe Handling",
    desc: "Hardware-only. Technicians never access software or student accounts.",
  },
];

const SITE_TRUST = [
  {
    Icon: BadgeCheck,
    title: "Background-Checked Technicians",
    desc: "Every technician undergoes comprehensive background screening.",
  },
  {
    Icon: Lock,
    title: "Student Data Security",
    desc: "Hardware-only services. No access to student data, ever.",
  },
  {
    Icon: FileText,
    title: "Fully Insured",
    desc: "General liability, workers comp, and commercial auto coverage.",
  },
  {
    Icon: Award,
    title: "Service Level Guarantees",
    desc: "Written SLAs on response times, turnaround, and reporting.",
  },
  {
    Icon: ClipboardCheck,
    title: "DOE-Aligned Reporting",
    desc: "Documentation formatted for institutional record-keeping and audits.",
  },
  {
    Icon: Shirt,
    title: "Uniformed & Identified",
    desc: "Marked uniforms with visible role IDs. Staff can verify immediately.",
  },
];

const COMPARISON = [
  ["Response Time", "Same-day borough dispatch", "2-5 days from central hub"],
  ["Scope", "Hardware-only, clear pricing", "Bundled software & IT overhead"],
  ["Reporting", "DOE-compliant every job", "Generic summaries"],
  ["Pricing", "Competitive contract rates", "Overhead-heavy blended rates"],
  [
    "Coverage",
    "All 5 boroughs locally staffed",
    "Centralized, slow to respond",
  ],
];

/* ══════════════════════════════════════════════════════════════ */

const STATUS_COLORS = {
  Active: { bg: "#DCFCE7", color: "#166534" },
  "In Repair": { bg: "#FEF9C3", color: "#854D0E" },
  "In Progress": { bg: "#FEF9C3", color: "#854D0E" },
  "Pending Repair": { bg: "#FEE2E2", color: "#991B1B" },
  Pending: { bg: "#FEE2E2", color: "#991B1B" },
  Completed: { bg: "#E0F2FE", color: "#075985" },
  Retired: { bg: "#F3F4F6", color: "#6B7280" },
};
const PRIORITY_COLORS = { High: "#EF4444", Medium: "#F59E0B", Low: "#22C55E" };
const TYPE_COLORS = {
  Repair: "#EF4444",
  Maintenance: "#0EA5E9",
  Deployment: "#7C3AED",
};

function Badge({ children, bg, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 50,
        fontSize: 11.5,
        fontWeight: 700,
        background: bg || "#F3F4F6",
        color: color || "#374151",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <Badge bg={c.bg} color={c.color}>
      {status}
    </Badge>
  );
}
function PriorityDot({ priority }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: PRIORITY_COLORS[priority] || "#999",
        }}
      />
      {priority}
    </span>
  );
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, visible] = useReveal(0.12);
  const t = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : t[direction],
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PORTAL COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function PortalSidebar({ role, activeTab, setActiveTab, onLogout }) {
  const techTabs = [
    { id: "overview", Icon: Home, label: "Overview" },
    { id: "tickets", Icon: Ticket, label: "Tickets" },
    { id: "devices", Icon: Monitor, label: "Devices" },
    { id: "schedule", Icon: CalendarDays, label: "Schedule" },
    { id: "reports", Icon: PieChart, label: "Reports" },
  ];
  const schoolTabs = [
    { id: "overview", Icon: Home, label: "Overview" },
    { id: "tickets", Icon: Ticket, label: "My Tickets" },
    { id: "devices", Icon: Monitor, label: "My Devices" },
    { id: "reports", Icon: PieChart, label: "Reports" },
  ];
  const tabs = role === "tech" ? techTabs : schoolTabs;
  return (
    <div style={P.sidebar} data-portal-sidebar>
      <div style={P.sidebarLogo}>
        <div style={P.sidebarMark}>PTC</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>
            Precision Tech Care
          </div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>
            {role === "tech" ? "Technician Portal" : "School Portal"}
          </div>
        </div>
      </div>
      <div style={P.sidebarNav}>
        {tabs.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              ...P.sidebarItem,
              ...(activeTab === id ? P.sidebarItemActive : {}),
            }}
          >
            <Icon size={18} strokeWidth={activeTab === id ? 2.5 : 2} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div style={P.sidebarFooter}>
        <button onClick={onLogout} style={P.sidebarLogout}>
          <LogOut size={16} />
          <span>Back to Site</span>
        </button>
      </div>
    </div>
  );
}

function PortalHeader({ title, subtitle, role, user }) {
  return (
    <div style={P.header}>
      <div>
        <h1 style={P.headerTitle}>{title}</h1>
        {subtitle && <p style={P.headerSub}>{subtitle}</p>}
      </div>
      <div style={P.headerUser}>
        <div
          style={{
            ...P.avatar,
            background: role === "tech" ? "#7C3AED" : "#0EA5E9",
          }}
        >
          {user.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>{user.role}</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div style={P.statCard}>
      <div
        style={{
          ...P.statIcon,
          background: accent ? `${accent}15` : "#F3F4F6",
          color: accent || "#6B7280",
        }}
      >
        <Icon size={20} />
      </div>
      <div>
        <div style={P.statValue}>{value}</div>
        <div style={P.statLabel}>{label}</div>
      </div>
    </div>
  );
}

function TechOverview({ tickets, schedule }) {
  const pending = tickets.filter((t) => t.status === "Pending").length;
  const inProg = tickets.filter((t) => t.status === "In Progress").length;
  const completed = tickets.filter((t) => t.status === "Completed").length;
  const today = schedule.filter((s) => s.date === "2026-03-30");
  return (
    <div>
      <div style={P.statsRow}>
        <StatCard
          icon={AlertTriangle}
          label="Pending Tickets"
          value={pending}
          accent="#EF4444"
        />
        <StatCard
          icon={Wrench}
          label="In Progress"
          value={inProg}
          accent="#F59E0B"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed (Mar)"
          value={completed}
          accent="#22C55E"
        />
        <StatCard
          icon={Monitor}
          label="Total Devices"
          value={MOCK_DEVICES.length}
          accent="#0EA5E9"
        />
      </div>
      <div style={P.twoCol}>
        <div style={P.card}>
          <h3 style={P.cardTitle}>Today's Schedule - Mar 30</h3>
          {today.map((s) => {
            const tech = TECHNICIANS.find((t) => t.id === s.tech);
            return (
              <div key={s.id} style={P.scheduleRow}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <div
                    style={{ ...P.typeDot, background: TYPE_COLORS[s.type] }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {s.desc}
                    </div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                      {s.school} - {s.borough}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{s.time}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                    {tech?.name} - {s.duration}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={P.card}>
          <h3 style={P.cardTitle}>Urgent Tickets</h3>
          {tickets
            .filter((t) => t.priority === "High" && t.status !== "Completed")
            .map((t) => (
              <div key={t.id} style={P.urgentRow}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 13 }}>
                      {t.id}
                    </span>
                    <StatusBadge status={t.status} />
                  </div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                    {t.issue}
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                    {t.school} - {t.borough}
                  </div>
                </div>
                <PriorityDot priority={t.priority} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function TechTickets({ tickets, setTickets }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = tickets.filter((t) => {
    const mf = filter === "All" || t.status === filter;
    const ms =
      !search ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.issue.toLowerCase().includes(search.toLowerCase()) ||
      t.school.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });
  const updateStatus = (id, ns) =>
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: ns } : t))
    );
  const assignTech = (tid, techId) =>
    setTickets((prev) =>
      prev.map((t) =>
        t.id === tid
          ? {
              ...t,
              tech: techId,
              status: t.status === "Pending" ? "In Progress" : t.status,
            }
          : t
      )
    );

  if (selected) {
    const t = tickets.find((x) => x.id === selected);
    const tech = t?.tech ? TECHNICIANS.find((x) => x.id === t.tech) : null;
    if (!t) return null;
    return (
      <div>
        <button onClick={() => setSelected(null)} style={P.backBtn}>
          <ChevronLeft size={16} /> Back to Tickets
        </button>
        <div style={P.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                  }}
                >
                  {t.id}
                </h2>
                <StatusBadge status={t.status} />
                <PriorityDot priority={t.priority} />
              </div>
              <p style={{ color: "#6B7280", fontSize: 14 }}>{t.issue}</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Pending", "In Progress", "Completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(t.id, s)}
                  style={{
                    ...P.smallBtn,
                    ...(t.status === s
                      ? { background: "#111827", color: "#fff" }
                      : {}),
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 16,
              marginBottom: 24,
              padding: 20,
              background: "#F9FAFB",
              borderRadius: 12,
            }}
          >
            {[
              ["Device", `${t.device} - ${t.model}`],
              ["School", t.school],
              ["Borough", t.borough],
              ["Submitted", t.submitted],
              ["Technician", tech ? tech.name : "Unassigned"],
            ].map(([l, v]) => (
              <div key={l}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  {l}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
          {!tech && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                Assign Technician
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TECHNICIANS.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => assignTech(t.id, tc.id)}
                    style={P.assignBtn}
                  >
                    <div
                      style={{
                        ...P.miniAvatar,
                        background: tc.color,
                        color: tc.color === "#111827" ? "#F59E0B" : "#fff",
                      }}
                    >
                      {tc.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>
                        {tc.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                        {tc.levelLabel}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
              Activity Log
            </div>
            {t.notes.length === 0 ? (
              <p style={{ color: "#9CA3AF", fontSize: 13 }}>No notes yet.</p>
            ) : (
              t.notes.map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    background: "#F9FAFB",
                    borderRadius: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {n.by}
                    </span>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                      {n.date}
                    </span>
                  </div>
                  <p
                    style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}
                  >
                    {n.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={P.toolbar}>
        <div style={P.searchBox}>
          <Search size={16} style={{ color: "#9CA3AF" }} />
          <input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={P.searchInput}
          />
        </div>
        <div style={P.filterRow}>
          {["All", "Pending", "In Progress", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...P.filterBtn,
                ...(filter === f ? P.filterBtnActive : {}),
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={P.card}>
        <div style={P.tableWrap}>
          <table style={P.table}>
            <thead>
              <tr>
                {[
                  "Ticket",
                  "Device",
                  "School",
                  "Issue",
                  "Priority",
                  "Status",
                  "Tech",
                  "",
                ].map((h) => (
                  <th key={h} style={P.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const tech = t.tech
                  ? TECHNICIANS.find((x) => x.id === t.tech)
                  : null;
                return (
                  <tr key={t.id} style={P.tr} className="table-row">
                    <td style={P.td}>
                      <span style={{ fontWeight: 700 }}>{t.id}</span>
                    </td>
                    <td style={P.td}>
                      {t.device} - {t.model}
                    </td>
                    <td style={P.td}>{t.school}</td>
                    <td style={{ ...P.td, maxWidth: 200 }}>
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.issue}
                      </span>
                    </td>
                    <td style={P.td}>
                      <PriorityDot priority={t.priority} />
                    </td>
                    <td style={P.td}>
                      <StatusBadge status={t.status} />
                    </td>
                    <td style={P.td}>{tech ? tech.name : "-"}</td>
                    <td style={P.td}>
                      <button
                        onClick={() => setSelected(t.id)}
                        style={P.viewBtn}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TechDevices() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = MOCK_DEVICES.filter((d) => {
    const mf = filter === "All" || d.status === filter;
    const ms =
      !search ||
      d.model.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.school.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });
  return (
    <div>
      <div style={P.toolbar}>
        <div style={P.searchBox}>
          <Search size={16} style={{ color: "#9CA3AF" }} />
          <input
            placeholder="Search devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={P.searchInput}
          />
        </div>
        <div style={P.filterRow}>
          {["All", "Active", "In Repair", "Pending Repair", "Retired"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...P.filterBtn,
                  ...(filter === f ? P.filterBtnActive : {}),
                }}
              >
                {f}
              </button>
            )
          )}
        </div>
      </div>
      <div style={P.card}>
        <div style={P.tableWrap}>
          <table style={P.table}>
            <thead>
              <tr>
                {[
                  "ID",
                  "Type",
                  "Model",
                  "Serial",
                  "School",
                  "Location",
                  "Status",
                  "Condition",
                  "Last Service",
                ].map((h) => (
                  <th key={h} style={P.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} style={P.tr} className="table-row">
                  <td style={P.td}>
                    <span style={{ fontWeight: 700 }}>{d.id}</span>
                  </td>
                  <td style={P.td}>{d.type}</td>
                  <td style={P.td}>{d.model}</td>
                  <td style={P.td}>
                    <span style={{ fontFamily: "monospace", fontSize: 12 }}>
                      {d.serial}
                    </span>
                  </td>
                  <td style={P.td}>{d.school}</td>
                  <td style={P.td}>{d.location}</td>
                  <td style={P.td}>
                    <StatusBadge status={d.status} />
                  </td>
                  <td style={P.td}>{d.condition}</td>
                  <td style={{ ...P.td, color: "#6B7280" }}>{d.lastService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TechSchedule() {
  const [dayFilter, setDayFilter] = useState("All");
  const days = [...new Set(MOCK_SCHEDULE.map((s) => s.date))].sort();
  const dayLabels = {
    "2026-03-30": "Mon 3/30",
    "2026-03-31": "Tue 3/31",
    "2026-04-01": "Wed 4/1",
    "2026-04-02": "Thu 4/2",
  };
  const filtered =
    dayFilter === "All"
      ? MOCK_SCHEDULE
      : MOCK_SCHEDULE.filter((s) => s.date === dayFilter);
  return (
    <div>
      <div style={P.toolbar}>
        <div style={P.filterRow}>
          <button
            onClick={() => setDayFilter("All")}
            style={{
              ...P.filterBtn,
              ...(dayFilter === "All" ? P.filterBtnActive : {}),
            }}
          >
            All Days
          </button>
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setDayFilter(d)}
              style={{
                ...P.filterBtn,
                ...(dayFilter === d ? P.filterBtnActive : {}),
              }}
            >
              {dayLabels[d] || d}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
          gap: 16,
        }}
      >
        {filtered.map((s) => {
          const tech = TECHNICIANS.find((t) => t.id === s.tech);
          return (
            <div key={s.id} style={P.schedCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <Badge
                  bg={`${TYPE_COLORS[s.type]}18`}
                  color={TYPE_COLORS[s.type]}
                >
                  {s.type}
                </Badge>
                <span
                  style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}
                >
                  {dayLabels[s.date]}
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                {s.desc}
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MapPinned size={14} style={{ color: "#9CA3AF" }} />
                  {s.school} - {s.borough}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Clock size={14} style={{ color: "#9CA3AF" }} />
                  {s.time} - {s.duration}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <User size={14} style={{ color: "#9CA3AF" }} />
                  {tech?.name} - {tech?.levelLabel}
                </div>
                {s.ticketId && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Hash size={14} style={{ color: "#9CA3AF" }} />
                    {s.ticketId}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReportsView() {
  const r = REPORT_DATA;
  return (
    <div>
      <div style={P.statsRow}>
        <StatCard
          icon={Ticket}
          label="Tickets Opened"
          value={r.monthly.ticketsOpened}
          accent="#EF4444"
        />
        <StatCard
          icon={CheckCircle2}
          label="Tickets Closed"
          value={r.monthly.ticketsClosed}
          accent="#22C55E"
        />
        <StatCard
          icon={Clock}
          label="Avg Turnaround"
          value={r.monthly.avgTurnaround}
          accent="#F59E0B"
        />
        <StatCard
          icon={Star}
          label="Satisfaction"
          value={r.monthly.satisfaction}
          accent="#7C3AED"
        />
      </div>
      <div style={P.twoCol}>
        <div style={P.card}>
          <h3 style={P.cardTitle}>Volume by Borough - March 2026</h3>
          {r.byBorough.map((b) => {
            const max = Math.max(...r.byBorough.map((x) => x.tickets));
            return (
              <div key={b.borough} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600 }}>
                    {b.borough}
                  </span>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>
                    {b.tickets} tickets - {b.hours}h
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#F3F4F6",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(b.tickets / max) * 100}%`,
                      background: "#F59E0B",
                      borderRadius: 4,
                      transition: "width 1s",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div style={P.card}>
          <h3 style={P.cardTitle}>Cost Breakdown - March 2026</h3>
          <div style={P.tableWrap}>
            <table style={P.table}>
              <thead>
                <tr>
                  {["Category", "Count", "Cost"].map((h) => (
                    <th key={h} style={P.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.costSummary.map((c) => (
                  <tr key={c.category} style={P.tr} className="table-row">
                    <td style={P.td}>
                      <span style={{ fontWeight: 600 }}>{c.category}</span>
                    </td>
                    <td style={P.td}>{c.count}</td>
                    <td style={P.td}>
                      <span style={{ fontWeight: 700 }}>{c.cost}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchoolOverview({ tickets }) {
  const my = tickets.filter((t) => t.school === "PS 127");
  const myD = MOCK_DEVICES.filter((d) => d.school === "PS 127");
  return (
    <div>
      <div style={P.statsRow}>
        <StatCard
          icon={Monitor}
          label="Your Devices"
          value={myD.length}
          accent="#0EA5E9"
        />
        <StatCard
          icon={Ticket}
          label="Active Tickets"
          value={my.filter((t) => t.status !== "Completed").length}
          accent="#F59E0B"
        />
        <StatCard
          icon={CheckCircle2}
          label="Resolved This Month"
          value={my.filter((t) => t.status === "Completed").length}
          accent="#22C55E"
        />
        <StatCard
          icon={ShieldCheck}
          label="Healthy Devices"
          value={
            myD.filter(
              (d) => d.condition === "Good" || d.condition === "Excellent"
            ).length
          }
          accent="#7C3AED"
        />
      </div>
      <div style={P.twoCol}>
        <div style={P.card}>
          <h3 style={P.cardTitle}>Active Tickets</h3>
          {my
            .filter((t) => t.status !== "Completed")
            .map((t) => {
              const tech = t.tech
                ? TECHNICIANS.find((x) => x.id === t.tech)
                : null;
              return (
                <div key={t.id} style={P.urgentRow}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: 13 }}>
                        {t.id}
                      </span>
                      <StatusBadge status={t.status} />
                      <PriorityDot priority={t.priority} />
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>
                      {t.issue}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}
                    >
                      {tech ? `Assigned: ${tech.name}` : "Awaiting assignment"}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div style={P.card}>
          <h3 style={P.cardTitle}>Device Fleet</h3>
          {["Active", "In Repair", "Pending Repair"].map((st) => (
            <div
              key={st}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid #F3F4F6",
              }}
            >
              <StatusBadge status={st} />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                {myD.filter((d) => d.status === st).length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SchoolTickets({ tickets, setTickets }) {
  const my = tickets.filter((t) => t.school === "PS 127");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    device: "",
    priority: "Medium",
    details: "",
  });
  const submitTicket = () => {
    setTickets((prev) => [
      {
        id: `TK-${1042 + prev.length}`,
        device: form.device,
        model: "-",
        school: "PS 127",
        issue: form.details,
        status: "Pending",
        submitted: "Mar 30, 2026",
        tech: null,
        priority: form.priority,
        borough: "Brooklyn",
        notes: [],
      },
      ...prev,
    ]);
    setShowForm(false);
    setForm({ device: "", priority: "Medium", details: "" });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            ...P.smallBtn,
            background: "#111827",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 20px",
          }}
        >
          <Plus size={16} /> New Ticket
        </button>
      </div>
      {showForm && (
        <div
          style={{ ...P.card, marginBottom: 20, border: "2px solid #F59E0B" }}
        >
          <h3 style={P.cardTitle}>Submit a New Repair Ticket</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={P.formLabel}>Device ID</label>
                <select
                  style={P.formInput}
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                >
                  <option value="">Select device...</option>
                  {MOCK_DEVICES.filter((d) => d.school === "PS 127").map(
                    (d) => (
                      <option key={d.id} value={d.id}>
                        {d.id} - {d.model}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={P.formLabel}>Priority</label>
                <select
                  style={P.formInput}
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  {["Low", "Medium", "High"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={P.formLabel}>Issue Description</label>
              <textarea
                rows={3}
                style={{ ...P.formInput, resize: "vertical" }}
                placeholder="Describe the issue..."
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={submitTicket}
                style={{
                  ...P.smallBtn,
                  background: "#F59E0B",
                  color: "#111827",
                  fontWeight: 700,
                  padding: "10px 24px",
                }}
              >
                Submit Ticket
              </button>
              <button onClick={() => setShowForm(false)} style={P.smallBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={P.card}>
        <div style={P.tableWrap}>
          <table style={P.table}>
            <thead>
              <tr>
                {[
                  "Ticket",
                  "Device",
                  "Issue",
                  "Priority",
                  "Status",
                  "Tech",
                  "Submitted",
                ].map((h) => (
                  <th key={h} style={P.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {my.map((t) => {
                const tech = t.tech
                  ? TECHNICIANS.find((x) => x.id === t.tech)
                  : null;
                return (
                  <tr key={t.id} style={P.tr} className="table-row">
                    <td style={P.td}>
                      <span style={{ fontWeight: 700 }}>{t.id}</span>
                    </td>
                    <td style={P.td}>{t.device}</td>
                    <td style={{ ...P.td, maxWidth: 220 }}>
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.issue}
                      </span>
                    </td>
                    <td style={P.td}>
                      <PriorityDot priority={t.priority} />
                    </td>
                    <td style={P.td}>
                      <StatusBadge status={t.status} />
                    </td>
                    <td style={P.td}>{tech ? tech.name : "-"}</td>
                    <td style={{ ...P.td, color: "#6B7280" }}>{t.submitted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SchoolDevices() {
  const my = MOCK_DEVICES.filter((d) => d.school === "PS 127");
  return (
    <div style={P.card}>
      <div style={P.tableWrap}>
        <table style={P.table}>
          <thead>
            <tr>
              {[
                "ID",
                "Type",
                "Model",
                "Location",
                "Status",
                "Condition",
                "Last Service",
              ].map((h) => (
                <th key={h} style={P.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {my.map((d) => (
              <tr key={d.id} style={P.tr} className="table-row">
                <td style={P.td}>
                  <span style={{ fontWeight: 700 }}>{d.id}</span>
                </td>
                <td style={P.td}>{d.type}</td>
                <td style={P.td}>{d.model}</td>
                <td style={P.td}>{d.location}</td>
                <td style={P.td}>
                  <StatusBadge status={d.status} />
                </td>
                <td style={P.td}>{d.condition}</td>
                <td style={{ ...P.td, color: "#6B7280" }}>{d.lastService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PORTAL WRAPPER
   ══════════════════════════════════════════════════════════════ */

function Portal({ role, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const user =
    role === "tech"
      ? {
          name: "Jordan Mitchell",
          avatar: "JM",
          role: "Level 3 Master Technician",
        }
      : { name: "Sarah Rodriguez", avatar: "SR", role: "IT Director - PS 127" };
  const titles = {
    overview: ["Dashboard Overview", "Real-time snapshot of operations"],
    tickets:
      role === "tech"
        ? ["Ticket Management", "View, assign, and update all tickets"]
        : ["My Tickets", "Track and submit repair tickets"],
    devices:
      role === "tech"
        ? ["Device Inventory", "Full fleet across all schools"]
        : ["My Devices", "Your school's device inventory"],
    schedule: ["Technician Schedule", "Weekly dispatch and assignments"],
    reports: ["Reports & Analytics", "Monthly performance and cost data"],
  };
  return (
    <div style={P.portalRoot}>
      <style>{PORTAL_CSS}</style>
      <PortalSidebar
        role={role}
        activeTab={tab}
        setActiveTab={setTab}
        onLogout={onLogout}
      />
      <div style={P.portalMain} data-portal-main>
        <PortalHeader
          title={titles[tab]?.[0] || ""}
          subtitle={titles[tab]?.[1] || ""}
          role={role}
          user={user}
        />
        <div style={P.portalContent}>
          {tab === "overview" &&
            (role === "tech" ? (
              <TechOverview tickets={tickets} schedule={MOCK_SCHEDULE} />
            ) : (
              <SchoolOverview tickets={tickets} />
            ))}
          {tab === "tickets" &&
            (role === "tech" ? (
              <TechTickets tickets={tickets} setTickets={setTickets} />
            ) : (
              <SchoolTickets tickets={tickets} setTickets={setTickets} />
            ))}
          {tab === "devices" &&
            (role === "tech" ? <TechDevices /> : <SchoolDevices />)}
          {tab === "schedule" && <TechSchedule />}
          {tab === "reports" && <ReportsView />}
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, onBack }) {
  const [role, setRole] = useState(null);
  return (
    <div style={P.loginRoot}>
      <style>{PORTAL_CSS}</style>
      <div style={P.loginCard}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "#111827",
              color: "#F59E0B",
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: 18,
              padding: "10px 14px",
              borderRadius: 12,
              letterSpacing: 1.5,
            }}
          >
            PTC
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Service Portal
            </div>
            <div style={{ fontSize: 13, color: "#9CA3AF" }}>
              Precision Tech Care
            </div>
          </div>
        </div>
        <h2
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 800,
            fontSize: 26,
            marginBottom: 8,
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            color: "#6B7280",
            fontSize: 15,
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Select your role to access the portal.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {[
            {
              id: "tech",
              Icon: Wrench,
              title: "PTC Technician",
              desc: "Ticket queue, schedule, inventory, reports",
              color: "#7C3AED",
            },
            {
              id: "school",
              Icon: Building2,
              title: "School Administrator",
              desc: "Submit tickets, track repairs, view fleet",
              color: "#0EA5E9",
            },
          ].map(({ id, Icon, title, desc, color }) => (
            <button
              key={id}
              onClick={() => setRole(id)}
              style={{
                ...P.roleCard,
                ...(role === id
                  ? {
                      border: `2px solid ${color}`,
                      boxShadow: `0 0 0 4px ${color}18`,
                    }
                  : {}),
              }}
            >
              <div style={{ ...P.roleIcon, background: `${color}12`, color }}>
                <Icon size={22} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
                <div
                  style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}
                >
                  {desc}
                </div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => role && onLogin(role)}
          disabled={!role}
          style={{
            ...P.loginBtn,
            opacity: role ? 1 : 0.5,
            cursor: role ? "pointer" : "not-allowed",
          }}
        >
          <LogIn size={16} style={{ marginRight: 8 }} /> Access Portal
        </button>
        <button onClick={onBack} style={P.loginBackBtn}>
          <ChevronLeft size={16} /> Back to Website
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PUBLIC SITE
   ══════════════════════════════════════════════════════════════ */

function PublicSite({ onPortalClick }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedService, setExpandedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    org: "",
    email: "",
    phone: "",
    borough: "",
    devices: "",
    plan: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const iv = setInterval(
      () => setActiveStep((s) => (s + 1) % SITE_STEPS.length),
      4000
    );
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(iv);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const u = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  return (
    <div style={S.root}>
      <style>{SITE_CSS}</style>
      {/* NAV */}
      <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
        <div style={S.navInner}>
          <div
            style={S.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div style={S.logoMark}>PTC</div>
            <div>
              <div style={S.logoName}>Precision Tech Care</div>
              <div style={S.logoSub}>School & Institutional Services</div>
            </div>
          </div>
          <div style={S.navDesktop} data-desktop-nav>
            {[
              ["Services", "svc"],
              ["Process", "process"],
              ["Packages", "pkg"],
              ["Why PTC", "benefits"],
              ["Trust", "trust"],
              ["Contact", "contact"],
            ].map(([l, id]) => (
              <button
                key={id}
                className="nav-link"
                onClick={() => scrollTo(id)}
              >
                {l}
              </button>
            ))}
            <button className="portal-link" onClick={onPortalClick}>
              Portal Login
            </button>
            <button className="nav-cta" onClick={() => scrollTo("contact")}>
              Request a Quote
            </button>
          </div>
          <button
            style={S.burger}
            data-burger
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileNav && (
          <div style={S.mobileMenu}>
            {[
              ["Services", "svc"],
              ["Process", "process"],
              ["Packages", "pkg"],
              ["Why PTC", "benefits"],
              ["Trust", "trust"],
              ["Contact", "contact"],
            ].map(([l, id]) => (
              <button
                key={id}
                style={S.mobileLink}
                onClick={() => scrollTo(id)}
              >
                {l}
              </button>
            ))}
            <button
              style={{ ...S.mobileLink, color: "#7C3AED" }}
              onClick={() => {
                setMobileNav(false);
                onPortalClick();
              }}
            >
              Portal Login
            </button>
            <button
              className="nav-cta"
              style={{ width: "100%", marginTop: 8 }}
              onClick={() => scrollTo("contact")}
            >
              Request a Quote
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroPattern} />
        <div style={S.heroGlow} />
        <div
          style={{
            ...S.heroContent,
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "none" : "translateY(30px)",
            transition: "all 1s cubic-bezier(.22,1,.36,1) 0.1s",
          }}
        >
          <div style={S.heroBadge}>
            <CircleDot size={14} style={{ color: "#F59E0B" }} />
            <span>NYC DOE - Charter - Private - Nonprofit Schools</span>
          </div>
          <h1 style={S.heroTitle}>
            Your School's Devices,
            <br />
            <span style={S.heroAccent}>Managed & Always Ready.</span>
          </h1>
          <p style={S.heroDesc}>
            NYC-based hardware field services built for schools at scale -
            borough-based teams, transparent reporting, zero software overhead.
          </p>
          <div style={S.heroCards}>
            {[
              [Zap, "Same-day emergency response across all 5 boroughs"],
              [
                DollarSign,
                "Hardware-only focus keeps costs lower than IT vendors",
              ],
              [FileText, "DOE-compliant documentation on every service job"],
              [
                ShieldCheck,
                "Background-checked techs. Student data never accessed.",
              ],
            ].map(([Icon, text], i) => (
              <div
                key={i}
                className="hero-card"
                style={{
                  ...S.heroCard,
                  transitionDelay: `${0.3 + i * 0.1}s`,
                  opacity: heroLoaded ? 1 : 0,
                  transform: heroLoaded ? "none" : "translateY(20px)",
                }}
              >
                <div style={S.heroCardIcon}>
                  <Icon size={16} strokeWidth={2.5} />
                </div>
                <span style={S.heroCardText}>{text}</span>
              </div>
            ))}
          </div>
          <div style={S.heroBtns}>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>
              Request a Partnership Quote{" "}
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
            <button className="btn-outline" onClick={() => scrollTo("svc")}>
              View Services
            </button>
          </div>
        </div>
        <div
          style={{
            ...S.statsStrip,
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 1s ease 0.8s",
          }}
        >
          {[
            ["5", "NYC Boroughs"],
            ["3", "Technician Levels"],
            ["Same-Day", "Emergency Response"],
            ["100%", "Hardware-Only"],
            ["Free", "Diagnostics"],
          ].map(([v, l], i) => (
            <div key={i} style={S.statItem}>
              <span style={S.statVal}>{v}</span>
              <span style={S.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="svc" style={S.sectionLight}>
        <div style={S.container}>
          <Reveal>
            <div style={S.sectionHeader}>
              <span style={S.eyebrow}>Services</span>
              <h2 style={S.sectionTitle}>
                Everything Schools Need.
                <br />
                Nothing Schools Don't.
              </h2>
              <p style={S.sectionDesc}>
                PTC focuses exclusively on hardware - no software licensing, no
                network config, no IT overhead.
              </p>
            </div>
          </Reveal>
          <div style={S.servicesGrid}>
            {SITE_SERVICES.map(({ Icon, title, tag, desc, bullets }, i) => {
              const open = expandedService === i;
              return (
                <Reveal key={title} delay={i * 0.08}>
                  <div
                    className="service-card"
                    style={{
                      ...S.serviceCard,
                      ...(open ? S.serviceCardOpen : {}),
                    }}
                    onClick={() => setExpandedService(open ? null : i)}
                  >
                    <div style={S.serviceTop}>
                      <div
                        style={{
                          ...S.serviceIcon,
                          ...(open
                            ? { background: "#F59E0B", color: "#fff" }
                            : {}),
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span style={S.serviceTag}>{tag}</span>
                    </div>
                    <h3 style={S.serviceTitle}>{title}</h3>
                    <p style={S.serviceDesc}>{desc}</p>
                    {open && (
                      <ul style={S.serviceBullets}>
                        {bullets.map((b, j) => (
                          <li key={j} style={S.serviceBullet}>
                            <CheckCircle2
                              size={15}
                              style={{
                                color: "#F59E0B",
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div style={S.serviceToggle}>
                      {open ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      <span>{open ? "Less" : "See details"}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={S.sectionDark}>
        <div style={S.container}>
          <Reveal>
            <div style={S.sectionHeader}>
              <span style={{ ...S.eyebrow, color: "#F59E0B" }}>Process</span>
              <h2 style={{ ...S.sectionTitle, color: "#fff" }}>How It Works</h2>
              <p style={{ ...S.sectionDesc, color: "#9CA3AF" }}>
                A clear, repeatable process designed for institutional
                procurement.
              </p>
            </div>
          </Reveal>
          <div style={S.stepsGrid}>
            {SITE_STEPS.map(({ num, Icon, title, desc }, i) => {
              const a = activeStep === i;
              return (
                <Reveal key={num} delay={i * 0.07}>
                  <div
                    className="step-card"
                    style={{ ...S.stepCard, ...(a ? S.stepCardActive : {}) }}
                    onMouseEnter={() => setActiveStep(i)}
                  >
                    <div style={S.stepHeader}>
                      <div
                        style={{
                          ...S.stepIconBox,
                          ...(a
                            ? {
                                background: "rgba(245,158,11,.15)",
                                color: "#F59E0B",
                              }
                            : {}),
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        style={{
                          ...S.stepNum,
                          ...(a ? { color: "#F59E0B" } : {}),
                        }}
                      >
                        {num}
                      </span>
                    </div>
                    <h3 style={S.stepTitle}>{title}</h3>
                    <p style={S.stepDesc}>{desc}</p>
                    <div style={{ ...S.stepBar, width: a ? "100%" : "0%" }} />
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div style={S.dotsRow}>
            {SITE_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                style={{ ...S.dot, ...(activeStep === i ? S.dotActive : {}) }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="pkg" style={S.sectionLight}>
        <div style={S.container}>
          <Reveal>
            <div style={S.sectionHeader}>
              <span style={S.eyebrow}>Packages</span>
              <h2 style={S.sectionTitle}>
                Flexible Plans for Every School Size.
              </h2>
              <p style={S.sectionDesc}>
                Monthly and annual contracts - no surprise bills, no hidden
                fees.
              </p>
            </div>
          </Reveal>
          <div style={S.plansGrid}>
            {SITE_PLANS.map(
              (
                {
                  name,
                  price,
                  period,
                  color,
                  popular,
                  ideal,
                  contract,
                  response,
                  support,
                  features,
                },
                i
              ) => (
                <Reveal key={name} delay={i * 0.1}>
                  <div
                    className="plan-card"
                    style={{
                      ...S.planCard,
                      ...(popular
                        ? {
                            border: `2px solid ${color}`,
                            boxShadow: `0 8px 40px ${color}18`,
                          }
                        : {}),
                    }}
                  >
                    {popular && (
                      <div style={{ ...S.popularTag, background: color }}>
                        Most Popular
                      </div>
                    )}
                    <div style={{ ...S.planColorBar, background: color }} />
                    <div style={S.planBody}>
                      <h3 style={S.planName}>{name}</h3>
                      <div style={S.planPriceRow}>
                        <span style={{ ...S.planPrice, color }}>{price}</span>
                        {period && <span style={S.planPeriod}>{period}</span>}
                      </div>
                      <div style={S.planMeta}>
                        {[
                          ["Ideal for", ideal],
                          ["Contract", contract],
                          ["Response", response],
                          ["Support", support],
                        ].map(([l, v]) => (
                          <div key={l} style={S.planMetaRow}>
                            <span style={S.planMetaLabel}>{l}</span>
                            <span style={S.planMetaVal}>{v}</span>
                          </div>
                        ))}
                      </div>
                      <div style={S.planDivider} />
                      <ul style={S.planFeatures}>
                        {features.map((f, j) => (
                          <li key={j} style={S.planFeature}>
                            <CheckCircle2
                              size={15}
                              style={{ color, flexShrink: 0, marginTop: 2 }}
                            />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="plan-btn"
                        style={{
                          ...S.planBtn,
                          background: color,
                          color: "#fff",
                        }}
                        onClick={() => scrollTo("contact")}
                      >
                        Get Started{" "}
                        <ArrowRight size={14} style={{ marginLeft: 6 }} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              )
            )}
          </div>
          <Reveal>
            <p style={S.planNote}>
              All plans are customizable. Contact us to discuss your needs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        id="benefits"
        style={{ ...S.sectionLight, background: "#F8F9FB" }}
      >
        <div style={S.container}>
          <Reveal>
            <div style={S.sectionHeader}>
              <span style={S.eyebrow}>Why PTC</span>
              <h2 style={S.sectionTitle}>
                Built Around What Schools Actually Need.
              </h2>
            </div>
          </Reveal>
          <div style={S.benefitsGrid}>
            {SITE_BENEFITS.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="benefit-card" style={S.benefitCard}>
                  <div style={S.benefitIcon}>
                    <Icon size={22} />
                  </div>
                  <h3 style={S.benefitTitle}>{title}</h3>
                  <p style={S.benefitDesc}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" style={S.sectionLight}>
        <div style={S.container}>
          <Reveal>
            <div style={S.sectionHeader}>
              <span style={S.eyebrow}>Trust & Compliance</span>
              <h2 style={S.sectionTitle}>
                Accountability Built Into Every Job.
              </h2>
              <p style={S.sectionDesc}>
                Schools require proof - of safety, insurance, compliance, and
                reliability.
              </p>
            </div>
          </Reveal>
          <div style={S.trustGrid}>
            {SITE_TRUST.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="trust-card" style={S.trustCard}>
                  <div style={S.trustIcon}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={S.trustTitle}>{title}</h3>
                    <p style={S.trustDesc}>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div style={S.techLevels}>
              <h3 style={S.techLevelsTitle}>
                On-Site Technician Identification
              </h3>
              <p style={S.techLevelsSub}>
                Every PTC technician wears a clearly marked uniform.
              </p>
              <div style={S.techBadges}>
                {[
                  { l: "Level 1 - PC & Laptop Tech", bg: "#7C3AED", c: "#fff" },
                  {
                    l: "Level 2 - Laptop & Printer Tech",
                    bg: "#DC2626",
                    c: "#fff",
                  },
                  {
                    l: "Level 3 - Master Technician",
                    bg: "#111827",
                    c: "#F59E0B",
                  },
                ].map(({ l, bg, c }) => (
                  <div
                    key={l}
                    style={{ ...S.techBadge, background: bg, color: c }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COVERAGE */}
      <section style={S.sectionDark}>
        <div style={S.container}>
          <div style={S.coverageLayout}>
            <Reveal direction="right" style={{ flex: 1, minWidth: 280 }}>
              <span style={{ ...S.eyebrow, color: "#F59E0B" }}>Coverage</span>
              <h2
                style={{
                  ...S.sectionTitle,
                  color: "#fff",
                  textAlign: "left",
                  marginTop: 8,
                }}
              >
                A Dedicated Team in Every Borough.
              </h2>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: 15,
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                PTC stations field teams across all 5 NYC boroughs.
              </p>
              <div>
                {BOROUGHS.map((b) => (
                  <div key={b} style={S.boroughRow}>
                    <div style={S.boroughDot} />
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        flex: 1,
                        fontSize: 15,
                      }}
                    >
                      {b}
                    </span>
                    <span style={S.boroughStatus}>Active</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal
              direction="left"
              delay={0.15}
              style={{ flex: 1, minWidth: 300 }}
            >
              <div style={S.comparisonBox}>
                <h3 style={S.comparisonTitle}>PTC vs. Large Vendors</h3>
                <div style={S.comparisonHeader}>
                  <span style={S.compColLabel}>Feature</span>
                  <span style={{ ...S.compColLabel, color: "#34D399" }}>
                    PTC
                  </span>
                  <span style={{ ...S.compColLabel, color: "#6B7280" }}>
                    Others
                  </span>
                </div>
                {COMPARISON.map(([f, p, o]) => (
                  <div key={f} style={S.comparisonRow}>
                    <span
                      style={{
                        color: "#9CA3AF",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {f}
                    </span>
                    <span
                      style={{
                        color: "#34D399",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {p}
                    </span>
                    <span style={{ color: "#6B7280", fontSize: 13 }}>{o}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={S.sectionLight}>
        <div style={S.container}>
          <div style={S.contactLayout}>
            <Reveal
              direction="right"
              style={{ flex: "0 0 380px", minWidth: 260 }}
            >
              <span style={S.eyebrow}>Get Started</span>
              <h2
                style={{ ...S.sectionTitle, textAlign: "left", marginTop: 8 }}
              >
                Request a Partnership Quote.
              </h2>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: 15,
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                Fill out the form and we will respond within one business day.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {[
                  [Mail, "hello@precisiontechcare.com"],
                  [MapPin, "Serving all 5 NYC Boroughs"],
                  [Building2, "DOE, charter, private & nonprofit schools"],
                  [FileText, "RFQ documentation available"],
                ].map(([Icon, text]) => (
                  <div key={text} style={S.contactInfo}>
                    <Icon
                      size={16}
                      style={{ color: "#F59E0B", flexShrink: 0, marginTop: 2 }}
                    />
                    <span
                      style={{
                        color: "#6B7280",
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal
              direction="left"
              delay={0.1}
              style={{ flex: 1, minWidth: 300 }}
            >
              <div style={S.formCard}>
                {submitted ? (
                  <div style={S.successBox}>
                    <div style={S.successIcon}>
                      <CheckCircle2 size={40} style={{ color: "#34D399" }} />
                    </div>
                    <h3 style={S.successTitle}>Quote Request Received</h3>
                    <p style={S.successDesc}>
                      We will contact you within one business day.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 style={S.formTitle}>Tell us about your needs</h3>
                    <form onSubmit={handleSubmit} style={S.form}>
                      <div style={S.formRow}>
                        <div style={S.formGroup}>
                          <label style={S.label}>Full Name *</label>
                          <input
                            required
                            style={S.input}
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={(e) => u("name", e.target.value)}
                          />
                        </div>
                        <div style={S.formGroup}>
                          <label style={S.label}>Job Title *</label>
                          <input
                            required
                            style={S.input}
                            placeholder="IT Director..."
                            value={formData.title}
                            onChange={(e) => u("title", e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={S.formGroup}>
                        <label style={S.label}>School / Organization *</label>
                        <input
                          required
                          style={S.input}
                          placeholder="PS 123, NYC DOE District 7..."
                          value={formData.org}
                          onChange={(e) => u("org", e.target.value)}
                        />
                      </div>
                      <div style={S.formRow}>
                        <div style={S.formGroup}>
                          <label style={S.label}>Work Email *</label>
                          <input
                            required
                            type="email"
                            style={S.input}
                            placeholder="jsmith@schools.nyc.gov"
                            value={formData.email}
                            onChange={(e) => u("email", e.target.value)}
                          />
                        </div>
                        <div style={S.formGroup}>
                          <label style={S.label}>Phone</label>
                          <input
                            style={S.input}
                            placeholder="(212) 555-0100"
                            value={formData.phone}
                            onChange={(e) => u("phone", e.target.value)}
                          />
                        </div>
                      </div>
                      <div style={S.formRow}>
                        <div style={S.formGroup}>
                          <label style={S.label}>Borough *</label>
                          <select
                            required
                            style={S.input}
                            value={formData.borough}
                            onChange={(e) => u("borough", e.target.value)}
                          >
                            <option value="">Select...</option>
                            {BOROUGHS.map((b) => (
                              <option key={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                        <div style={S.formGroup}>
                          <label style={S.label}>Device Count</label>
                          <select
                            style={S.input}
                            value={formData.devices}
                            onChange={(e) => u("devices", e.target.value)}
                          >
                            <option value="">Estimate...</option>
                            {[
                              "1-50",
                              "51-100",
                              "101-300",
                              "301-500",
                              "500+",
                            ].map((d) => (
                              <option key={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div style={S.formGroup}>
                        <label style={S.label}>Interested Plan</label>
                        <select
                          style={S.input}
                          value={formData.plan}
                          onChange={(e) => u("plan", e.target.value)}
                        >
                          <option value="">Optional...</option>
                          {["Basic", "Standard", "Premium", "Not sure"].map(
                            (p) => (
                              <option key={p}>{p}</option>
                            )
                          )}
                        </select>
                      </div>
                      <div style={S.formGroup}>
                        <label style={S.label}>Describe Your Needs *</label>
                        <textarea
                          required
                          rows={4}
                          style={{ ...S.input, resize: "vertical" }}
                          placeholder="Tell us about your device fleet..."
                          value={formData.details}
                          onChange={(e) => u("details", e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        <Send size={16} style={{ marginRight: 8 }} /> Submit
                        Quote Request
                      </button>
                      <p
                        style={{
                          color: "#9CA3AF",
                          fontSize: 12,
                          textAlign: "center",
                          marginTop: 8,
                        }}
                      >
                        We respond within 1 business day.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={S.logo}>
            <div style={{ ...S.logoMark, background: "#fff", color: "#111" }}>
              PTC
            </div>
            <div>
              <div style={{ ...S.logoName, color: "#fff" }}>
                Precision Tech Care LLC
              </div>
              <div style={{ ...S.logoSub, color: "#6B7280" }}>
                School & Institutional Hardware Services - NYC
              </div>
            </div>
          </div>
          <p style={{ color: "#6B7280", fontSize: 13 }}>
            2026 Precision Tech Care LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════ */

export default function App() {
  const [view, setView] = useState("site");
  const [role, setRole] = useState(null);
  if (view === "login")
    return (
      <LoginScreen
        onLogin={(r) => {
          setRole(r);
          setView("portal");
        }}
        onBack={() => setView("site")}
      />
    );
  if (view === "portal" && role)
    return (
      <Portal
        role={role}
        onLogout={() => {
          setView("site");
          setRole(null);
          window.scrollTo(0, 0);
        }}
      />
    );
  return <PublicSite onPortalClick={() => setView("login")} />;
}

/* ══════════════════════════════════════════════════════════════
   CSS
   ══════════════════════════════════════════════════════════════ */

const SITE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.nav-link{background:none;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;font-size:13.5px;color:#6B7280;padding:8px 14px;border-radius:8px;transition:all .2s}
.nav-link:hover{color:#111827;background:#F3F4F6}
.portal-link{background:none;border:1.5px solid #E5E7EB;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;font-size:13px;color:#7C3AED;padding:8px 16px;border-radius:8px;transition:all .2s}
.portal-link:hover{background:#7C3AED;color:#fff}
.nav-cta{background:#111827;color:#F59E0B;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:13.5px;padding:10px 22px;border-radius:10px;transition:all .2s}
.nav-cta:hover{background:#1F2937;transform:translateY(-1px)}
.btn-primary{display:inline-flex;align-items:center;background:#F59E0B;color:#111827;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:15px;padding:16px 32px;border-radius:12px;transition:all .25s;box-shadow:0 4px 14px rgba(245,158,11,.3)}
.btn-primary:hover{background:#D97706;transform:translateY(-2px);box-shadow:0 8px 24px rgba(245,158,11,.35)}
.btn-outline{display:inline-flex;align-items:center;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.2);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;font-size:15px;padding:16px 32px;border-radius:12px;transition:all .25s}
.btn-outline:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.4)}
.service-card,.benefit-card,.trust-card{transition:all .25s}.service-card:hover,.benefit-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.08)}.trust-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.06)}
.step-card{transition:all .3s}.step-card:hover{transform:translateY(-3px)}
.plan-card{transition:all .25s}.plan-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.08)}
.plan-btn{transition:all .25s}.plan-btn:hover{opacity:.9;transform:translateY(-2px)}
.hero-card{transition:all .7s cubic-bezier(.22,1,.36,1)}
input:focus,select:focus,textarea:focus{border-color:#F59E0B!important;box-shadow:0 0 0 3px rgba(245,158,11,.1)!important;outline:none}
@media(min-width:769px){[data-burger]{display:none!important}}
@media(max-width:768px){[data-desktop-nav]{display:none!important}}
`;

const PORTAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.table-row{transition:background .15s}.table-row:hover{background:#F9FAFB}
input:focus,select:focus,textarea:focus{border-color:#F59E0B!important;box-shadow:0 0 0 3px rgba(245,158,11,.1)!important;outline:none}
@media(max-width:900px){[data-portal-sidebar]{display:none!important}[data-portal-main]{margin-left:0!important}}
`;

/* ══════════════════════════════════════════════════════════════
   STYLES
   ══════════════════════════════════════════════════════════════ */

const S = {
  root: {
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    background: "#fff",
    color: "#111827",
    overflowX: "hidden",
    WebkitFontSmoothing: "antialiased",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    borderBottom: "1px solid transparent",
    padding: "0 24px",
    transition: "all .3s",
  },
  navScrolled: {
    borderBottom: "1px solid #E5E7EB",
    boxShadow: "0 1px 8px rgba(0,0,0,.04)",
  },
  navInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72,
  },
  logo: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoMark: {
    background: "#111827",
    color: "#F59E0B",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 15,
    padding: "8px 12px",
    borderRadius: 10,
    letterSpacing: 1.5,
  },
  logoName: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: "#111827",
    lineHeight: 1.2,
  },
  logoSub: { fontSize: 11, color: "#9CA3AF", fontWeight: 500 },
  navDesktop: { display: "flex", alignItems: "center", gap: 4 },
  burger: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#111827",
    padding: 8,
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "12px 0 20px",
    gap: 4,
    borderTop: "1px solid #E5E7EB",
  },
  mobileLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 15,
    color: "#374151",
    padding: "12px 16px",
    borderRadius: 10,
    textAlign: "left",
  },
  hero: {
    background: "#111827",
    padding: "100px 24px 0",
    position: "relative",
    overflow: "hidden",
  },
  heroPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(rgba(245,158,11,.04) 1px,transparent 1px)",
    backgroundSize: "32px 32px",
  },
  heroGlow: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "60%",
    height: "140%",
    background:
      "radial-gradient(ellipse,rgba(245,158,11,.06) 0%,transparent 60%)",
    pointerEvents: "none",
  },
  heroContent: {
    maxWidth: 1200,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(245,158,11,.1)",
    border: "1px solid rgba(245,158,11,.2)",
    borderRadius: 50,
    padding: "8px 18px",
    marginBottom: 32,
    fontSize: 13,
    fontWeight: 600,
    color: "#D1D5DB",
  },
  heroTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontSize: "clamp(36px,5.5vw,64px)",
    fontWeight: 800,
    lineHeight: 1.06,
    color: "#fff",
    marginBottom: 24,
    letterSpacing: -1.5,
    maxWidth: 720,
  },
  heroAccent: { color: "#F59E0B" },
  heroDesc: {
    fontSize: 17,
    color: "#9CA3AF",
    lineHeight: 1.8,
    maxWidth: 600,
    marginBottom: 40,
  },
  heroCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 12,
    marginBottom: 40,
    maxWidth: 860,
  },
  heroCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    background: "rgba(255,255,255,.04)",
    borderRadius: 12,
    padding: "14px 18px",
    border: "1px solid rgba(255,255,255,.06)",
  },
  heroCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "rgba(245,158,11,.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F59E0B",
    flexShrink: 0,
  },
  heroCardText: { color: "#D1D5DB", fontSize: 14, lineHeight: 1.55 },
  heroBtns: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 72 },
  statsStrip: {
    display: "flex",
    borderTop: "1px solid rgba(255,255,255,.08)",
    maxWidth: 1200,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    flexWrap: "wrap",
  },
  statItem: {
    flex: 1,
    minWidth: 120,
    padding: "28px 20px",
    borderRight: "1px solid rgba(255,255,255,.06)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  statVal: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 24,
    color: "#F59E0B",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  sectionLight: { padding: "96px 24px" },
  sectionDark: { background: "#111827", padding: "96px 24px" },
  container: { maxWidth: 1200, margin: "0 auto" },
  sectionHeader: { textAlign: "center", marginBottom: 60 },
  eyebrow: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "#F59E0B",
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: "clamp(28px,4vw,44px)",
    lineHeight: 1.15,
    marginBottom: 16,
    letterSpacing: -0.8,
    color: "#111827",
  },
  sectionDesc: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 1.75,
    maxWidth: 620,
    margin: "0 auto",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 20,
  },
  serviceCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "28px 24px",
    border: "1px solid #E5E7EB",
    cursor: "pointer",
  },
  serviceCardOpen: {
    border: "1px solid #F59E0B",
    boxShadow: "0 8px 32px rgba(245,158,11,.08)",
  },
  serviceTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#374151",
    transition: "all .3s",
  },
  serviceTag: {
    background: "#F3F4F6",
    color: "#6B7280",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 12px",
    borderRadius: 50,
  },
  serviceTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 17,
    marginBottom: 10,
  },
  serviceDesc: { color: "#6B7280", fontSize: 14, lineHeight: 1.7 },
  serviceBullets: {
    listStyle: "none",
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 18,
    borderTop: "1px solid #F3F4F6",
  },
  serviceBullet: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    color: "#374151",
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  serviceToggle: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: 600,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 16,
  },
  stepCard: {
    background: "rgba(255,255,255,.04)",
    borderRadius: 16,
    padding: "28px 22px",
    border: "1px solid rgba(255,255,255,.06)",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  },
  stepCardActive: {
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(245,158,11,.3)",
  },
  stepHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stepIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "rgba(255,255,255,.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9CA3AF",
    transition: "all .3s",
  },
  stepNum: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 28,
    color: "rgba(255,255,255,.08)",
    lineHeight: 1,
    transition: "color .3s",
  },
  stepTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: "#fff",
    marginBottom: 10,
  },
  stepDesc: { color: "#9CA3AF", fontSize: 13.5, lineHeight: 1.65 },
  stepBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 3,
    background: "#F59E0B",
    borderRadius: 3,
    transition: "width .5s",
  },
  dotsRow: { display: "flex", gap: 8, justifyContent: "center", marginTop: 32 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "rgba(255,255,255,.15)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all .3s",
  },
  dotActive: { background: "#F59E0B", transform: "scale(1.3)" },
  plansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 28,
  },
  planCard: {
    background: "#fff",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    border: "1px solid #E5E7EB",
  },
  popularTag: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 14px",
    borderRadius: 50,
  },
  planColorBar: { height: 4 },
  planBody: { padding: "32px 28px 28px" },
  planName: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 24,
    marginBottom: 6,
  },
  planPriceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 2,
    marginBottom: 24,
  },
  planPrice: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 36,
  },
  planPeriod: { fontSize: 16, color: "#9CA3AF", fontWeight: 600 },
  planMeta: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 24,
  },
  planMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    fontSize: 13,
  },
  planMetaLabel: { color: "#9CA3AF", fontWeight: 600, flexShrink: 0 },
  planMetaVal: { color: "#374151", fontWeight: 600, textAlign: "right" },
  planDivider: { height: 1, background: "#F3F4F6", marginBottom: 24 },
  planFeatures: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 28,
  },
  planFeature: {
    fontSize: 14,
    color: "#374151",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    lineHeight: 1.5,
  },
  planBtn: {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    padding: "14px 24px",
    borderRadius: 12,
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 700,
    fontSize: 14,
  },
  planNote: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 28,
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: 20,
  },
  benefitCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "28px 24px",
    border: "1px solid #E5E7EB",
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background:
      "linear-gradient(135deg,rgba(245,158,11,.1),rgba(245,158,11,.04))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F59E0B",
    marginBottom: 16,
  },
  benefitTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 17,
    marginBottom: 10,
  },
  benefitDesc: { color: "#6B7280", fontSize: 14, lineHeight: 1.7 },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
    gap: 20,
    marginBottom: 40,
  },
  trustCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "24px 22px",
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    border: "1px solid #E5E7EB",
  },
  trustIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#374151",
    flexShrink: 0,
  },
  trustTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 6,
  },
  trustDesc: { color: "#6B7280", fontSize: 13.5, lineHeight: 1.65 },
  techLevels: {
    background: "#F8F9FB",
    borderRadius: 20,
    padding: 40,
    textAlign: "center",
    border: "1px solid #E5E7EB",
  },
  techLevelsTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 20,
    marginBottom: 10,
  },
  techLevelsSub: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 28,
    maxWidth: 480,
    margin: "10px auto 28px",
    lineHeight: 1.7,
  },
  techBadges: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  techBadge: {
    borderRadius: 12,
    padding: "14px 26px",
    fontSize: 13.5,
    fontWeight: 700,
    minWidth: 200,
    textAlign: "center",
  },
  coverageLayout: {
    display: "flex",
    gap: 60,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  boroughRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 0",
    borderBottom: "1px solid rgba(255,255,255,.06)",
  },
  boroughDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#F59E0B",
    flexShrink: 0,
  },
  boroughStatus: { color: "#34D399", fontSize: 12, fontWeight: 700 },
  comparisonBox: {
    background: "rgba(255,255,255,.04)",
    borderRadius: 20,
    padding: "32px 28px",
    border: "1px solid rgba(255,255,255,.06)",
  },
  comparisonTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  comparisonHeader: {
    display: "grid",
    gridTemplateColumns: "0.8fr 1.1fr 1.1fr",
    gap: 10,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(255,255,255,.08)",
    marginBottom: 4,
  },
  compColLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6B7280",
  },
  comparisonRow: {
    display: "grid",
    gridTemplateColumns: "0.8fr 1.1fr 1.1fr",
    gap: 10,
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,.04)",
  },
  contactLayout: {
    display: "flex",
    gap: 60,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  contactInfo: { display: "flex", gap: 12, alignItems: "flex-start" },
  formCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 36px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 4px 32px rgba(0,0,0,.04)",
  },
  formTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 24,
  },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  formRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
    minWidth: 200,
  },
  label: { fontWeight: 600, fontSize: 13, color: "#374151" },
  input: {
    padding: "12px 16px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: 14,
    outline: "none",
    background: "#FAFAFA",
    width: "100%",
    color: "#111827",
    transition: "all .2s",
  },
  successBox: {
    textAlign: "center",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "rgba(52,211,153,.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 22,
  },
  successDesc: {
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 1.7,
    maxWidth: 360,
  },
  footer: {
    background: "#111827",
    padding: "28px 24px",
    borderTop: "1px solid rgba(255,255,255,.06)",
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
};

const P = {
  loginRoot: {
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    minHeight: "100vh",
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loginCard: {
    background: "#fff",
    borderRadius: 24,
    padding: "48px 40px",
    maxWidth: 460,
    width: "100%",
    boxShadow: "0 8px 40px rgba(0,0,0,.06)",
    border: "1px solid #E5E7EB",
  },
  roleCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 20px",
    borderRadius: 14,
    border: "2px solid #E5E7EB",
    cursor: "pointer",
    background: "#fff",
    transition: "all .2s",
    width: "100%",
    textAlign: "left",
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  loginBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#111827",
    color: "#F59E0B",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 700,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .2s",
    marginBottom: 12,
  },
  loginBackBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "transparent",
    color: "#9CA3AF",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  portalRoot: {
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    display: "flex",
    minHeight: "100vh",
    background: "#F3F4F6",
    color: "#111827",
  },
  sidebar: {
    width: 260,
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 50,
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "24px 20px",
    borderBottom: "1px solid rgba(255,255,255,.06)",
  },
  sidebarMark: {
    background: "#F59E0B",
    color: "#111827",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 14,
    padding: "7px 10px",
    borderRadius: 8,
    letterSpacing: 1,
  },
  sidebarNav: {
    flex: 1,
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: "transparent",
    color: "#9CA3AF",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 14,
    width: "100%",
    textAlign: "left",
    transition: "all .2s",
  },
  sidebarItemActive: { background: "rgba(245,158,11,.1)", color: "#F59E0B" },
  sidebarFooter: {
    padding: "16px 12px",
    borderTop: "1px solid rgba(255,255,255,.06)",
  },
  sidebarLogout: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: "transparent",
    color: "#6B7280",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 13,
    width: "100%",
    transition: "all .2s",
  },
  portalMain: {
    flex: 1,
    marginLeft: 260,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#fff",
    padding: "20px 32px",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  headerTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 22,
  },
  headerSub: { fontSize: 14, color: "#9CA3AF", marginTop: 2 },
  headerUser: { display: "flex", alignItems: "center", gap: 12 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 13,
    fontFamily: "'Outfit',sans-serif",
  },
  portalContent: { padding: 32, flex: 1, overflowY: "auto" },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "20px 22px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    border: "1px solid #E5E7EB",
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statValue: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 800,
    fontSize: 26,
    lineHeight: 1.1,
  },
  statLabel: { fontSize: 13, color: "#6B7280", fontWeight: 500 },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #E5E7EB",
  },
  cardTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid #F3F4F6",
  },
  scheduleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #F3F4F6",
    gap: 12,
  },
  typeDot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  urgentRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "14px 0",
    borderBottom: "1px solid #F3F4F6",
    gap: 12,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    border: "1.5px solid #E5E7EB",
    borderRadius: 10,
    padding: "10px 14px",
    flex: "0 1 320px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: 14,
    color: "#111827",
    flex: 1,
    background: "transparent",
  },
  filterRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: "#6B7280",
    transition: "all .2s",
  },
  filterBtnActive: {
    background: "#111827",
    color: "#F59E0B",
    borderColor: "#111827",
  },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: "1px solid #F3F4F6",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 14px",
    borderBottom: "1px solid #F3F4F6",
    color: "#374151",
    fontSize: 13,
    whiteSpace: "nowrap",
  },
  tr: { cursor: "default" },
  viewBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 12,
    color: "#6B7280",
    transition: "all .2s",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    padding: 0,
  },
  smallBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: "#374151",
    transition: "all .2s",
  },
  assignBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    cursor: "pointer",
    transition: "all .2s",
  },
  miniAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 11,
    fontFamily: "'Outfit',sans-serif",
    flexShrink: 0,
  },
  schedCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 22,
    border: "1px solid #E5E7EB",
  },
  formLabel: {
    fontWeight: 600,
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
    display: "block",
  },
  formInput: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: 14,
    outline: "none",
    background: "#FAFAFA",
    width: "100%",
    color: "#111827",
    transition: "all .2s",
  },
};
