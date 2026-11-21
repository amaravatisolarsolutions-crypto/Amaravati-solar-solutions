import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Eye,
  LogOut,
  Plus,
  RefreshCw,
  Wrench,
  FolderGit2,
  MessageSquare,
  Search,
  Trash2,
  Edit3,
  Sun,
  Zap,
  Phone,
  PhoneCall,
  Calendar,
  Mail,
  CheckCircle2,
  X,
  Menu,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  FileText,
  Printer,
  Home,
  Building2,
  MapPin,
  CreditCard,
  IndianRupee,
  ShieldCheck,
  Check,
  KeyRound,
  Lock,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { buildQuotationPrintHtml, numberToIndianWords } from "@/lib/quotationPrint";
import residential from "@/assets/hero-residential.jpg";
import commercial from "@/assets/hero-commercial.jpg";
import industrial from "@/assets/hero-industrial.jpg";
import future from "@/assets/hero-future.jpg";
import installation from "@/assets/installation.jpg";
import solarFarm from "@/assets/solar-farm.jpg";
import solarHyderabadRooftop from "@/assets/solar-hyderabad-rooftop.jpg";
import solarPanelsArray from "@/assets/solar-panels-array.jpg";
import { PROJECTS, type Project } from "@/lib/site-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Amaravati Solar Solutions | Admin Portal" },
      { name: "description", content: "Manage Services, Projects, and Inquiries." },
    ],
  }),
  component: AdminDashboard,
});

export type AdminService = {
  id: string;
  title: string;
  order: number;
  category: "SOLAR" | "ELECTRICAL" | "EV CHARGING" | "MAINTENANCE / AMC";
  description: string;
  image: string;
};

export type AdminInquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  date: string;
  status: "New" | "Contacted" | "Completed";
  notes?: string;
  timestamp?: number;
};

// Default initial services matching the exact structure from the reference screenshot
const DEFAULT_SERVICES: AdminService[] = [
  {
    id: "s1",
    title: "Residential Rooftop Solar",
    order: 1,
    category: "SOLAR",
    description:
      "Designed to help homeowners reduce electricity costs and generate clean, renewable energy from their own rooftop.",
    image: residential,
  },
  {
    id: "s2",
    title: "Commercial & Industrial Solar",
    order: 2,
    category: "SOLAR",
    description:
      "Efficient solar power solutions for industries, factories, hospitals, educational institutions, office buildings, hotels, warehouses, and commercial spaces.",
    image: commercial,
  },
  {
    id: "s3",
    title: "Ground Mounted Solar Power Plants",
    order: 3,
    category: "SOLAR",
    description:
      "Complete EPC solutions for MW-scale solar projects including design, engineering, procurement, installation, testing, and commissioning.",
    image: solarFarm,
  },
  {
    id: "s4",
    title: "On-Grid Solar Systems",
    order: 4,
    category: "SOLAR",
    description:
      "Grid-tied solar systems that sync seamlessly with utility power, lowering electricity bills through net metering credits.",
    image: solarHyderabadRooftop,
  },
  {
    id: "s5",
    title: "Off-Grid Solar Systems",
    order: 5,
    category: "SOLAR",
    description:
      "Independent solar power systems equipped with advanced battery energy storage for farmhouses, remote areas, and outage protection.",
    image: future,
  },
  {
    id: "s6",
    title: "Hybrid Solar Systems",
    order: 6,
    category: "SOLAR",
    description:
      "Smart multi-mode systems delivering the economic savings of grid export alongside battery storage backup during power cuts.",
    image: installation,
  },
  {
    id: "s7",
    title: "HT / LT Substation & Transformer Works",
    order: 7,
    category: "ELECTRICAL",
    description:
      "Complete electrical infrastructure installation, HT yard switchgear commissioning, power transformer erection, and statutory inspections.",
    image: industrial,
  },
  {
    id: "s8",
    title: "Industrial Power Distribution & Cabling",
    order: 8,
    category: "ELECTRICAL",
    description:
      "Heavy duty cabling, bus duct trunking, motor control centers (MCC), and APFC panel integration for optimal power factor.",
    image: solarPanelsArray,
  },
  {
    id: "s9",
    title: "Commercial EV Charging Stations",
    order: 9,
    category: "EV CHARGING",
    description:
      "Fast DC and AC dual gun smart charging stations for commercial complexes, highway corridors, corporate parks, and fleet depots.",
    image: future,
  },
  {
    id: "s10",
    title: "Solar AMC & Preventive Maintenance",
    order: 10,
    category: "MAINTENANCE / AMC",
    description:
      "Annual maintenance contracts (AMC), scheduled robotic/manual module washing, IV curve tracing, thermographic drone audit, and inverter servicing.",
    image: installation,
  },
];

const DEFAULT_INQUIRIES: AdminInquiry[] = [
  {
    id: "inq-1",
    name: "Ramesh Kumar",
    phone: "+91 98480 22334",
    email: "ramesh.k@gmail.com",
    service: "Residential Rooftop Solar (5 kW)",
    location: "Vijayawada, Andhra Pradesh",
    date: "Today, 10:30 AM",
    status: "New",
    notes: "Interested in On-grid rooftop system under PM Surya Ghar Muft Bijli Yojana.",
  },
  {
    id: "inq-2",
    name: "Srinivas Rao",
    phone: "+91 94401 55667",
    email: "srinivas.rao@yahoo.com",
    service: "Commercial Solar Power Plant (50 kW)",
    location: "Guntur, Andhra Pradesh",
    date: "Yesterday, 04:15 PM",
    status: "New",
    notes: "Requires site survey for cold storage unit rooftop.",
  },
];

export type AdminQuotationItem = {
  id: string;
  description: string;
  specification: string;
  qty: number;
  unitPrice: number;
  amount: number;
};

// Solar module types and kW-per-module factor used for Project Size
const MODULE_TYPES = [
  { label: "545Wp-Monoperc", kw: 0.54 },
  { label: "575Wp-Monoperc", kw: 0.57 },
  { label: "610Wp-Topcon", kw: 0.61 },
  { label: "625Wp-Topcon", kw: 0.62 },
] as const;
type ModuleType = (typeof MODULE_TYPES)[number]["label"];

export type AdminQuotation = {
  id: string;
  quotationNo: string;
  date: string;
  validUpto: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  systemCapacity: string;
  items: AdminQuotationItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  terms: string[];
  status: "Pending" | "Sent" | "Approved";

  // Site Details
  housingType: "Independent" | "Apartment" | "Commercial";
  subsidyType: "Non- Subsidy" | "Subsidy National DBT";
  noOfFloors: string;
  sanctionedPhase: "Single Phase" | "Three Phase";
  sanctionedLoad: string;
  cluster: string;
  discom: string;

  // Structure Details
  roofType: "Manglore tiles" | "Tin shed" | "RCC";
  structureType: "Pre fab - 4ft" | "Pre fab - 6ft" | "Pre fab - 8ft";
  noOfModules: number | string;
  moduleType?: string;
  projectSize?: string;
  overhangPossibility: "Yes" | "No";
  overhangSide?: "North" | "South" | "East" | "West" | "";
  amc: "Included" | "Not Included";

  // Bill Corrections
  loadChange: "Yes" | "No";
  phaseChange: "Yes" | "No";
  nameChange: "Yes" | "No";

  // Payment Summary
  paymentMode: "Direct" | "EMI";
  totalPrice: number;
  discount: number;
  finalPrice: number;
  subsidyAmount: number;
  fromHand: number;
};

const DEFAULT_QUOTATIONS: AdminQuotation[] = [
  {
    id: "quot-1",
    quotationNo: "ASS/2026/001",
    date: "10 Oct 2026",
    validUpto: "25 Oct 2026",
    customerName: "K. Satyanarayana",
    customerPhone: "+91 98480 33445",
    customerAddress: "Plot No. 14, 2nd Cross, Ring Road, Vijayawada, AP - 520010",
    systemCapacity: "3.66 kW On-Grid Rooftop",
    housingType: "Independent",
    subsidyType: "Subsidy National DBT",
    noOfFloors: "G+1",
    sanctionedPhase: "Single Phase",
    sanctionedLoad: "3 kW",
    cluster: "Vijayawada Urban",
    discom: "APCPDCL",
    roofType: "RCC",
    structureType: "Pre fab - 6ft",
    noOfModules: 6,
    overhangPossibility: "Yes",
    overhangSide: "South",
    amc: "Included",
    loadChange: "No",
    phaseChange: "No",
    nameChange: "No",
    paymentMode: "Direct",
    totalPrice: 217740,
    discount: 7740,
    finalPrice: 210000,
    subsidyAmount: 78000,
    fromHand: 132000,
    items: [
      { id: "1", description: "Solar Panel (Topcon)", specification: "610W Mono PERC", qty: 6, unitPrice: 18500, amount: 111000 },
      { id: "2", description: "Solar Inverter", specification: "3kW (Single Phase On-Grid)", qty: 1, unitPrice: 38000, amount: 38000 },
      { id: "3", description: "Mounting Structure", specification: "Galvanized Iron (GI Elevated)", qty: 1, unitPrice: 16000, amount: 16000 },
      { id: "4", description: "AC/DC DB & Accessories", specification: "SPD, MCB, Cables, Earthing kit", qty: 1, unitPrice: 14000, amount: 14000 },
      { id: "5", description: "Installation & Commissioning", specification: "Labor, Net-metering liaison, testing", qty: 1, unitPrice: 12000, amount: 12000 },
    ],
    subtotal: 191000,
    gstAmount: 26740,
    totalAmount: 210000,
    terms: [
      "Price valid for 15 days from issuance.",
      "Includes complete professional installation and commissioning.",
      "5 years comprehensive AMC support included.",
      "Net metering assistance and discom approvals provided.",
      "Payment terms: 50% advance, balance after installation.",
    ],
    status: "Approved",
  },
  {
    id: "quot-2",
    quotationNo: "ASS/2026/002",
    date: "22 Oct 2026",
    validUpto: "06 Nov 2026",
    customerName: "Venkata Raman",
    customerPhone: "+91 94405 66778",
    customerAddress: "7th Line, Electricity Colony, Vijayawada - 520010",
    systemCapacity: "5 kW Hybrid Solar Rooftop",
    housingType: "Apartment",
    subsidyType: "Non- Subsidy",
    noOfFloors: "G+2",
    sanctionedPhase: "Three Phase",
    sanctionedLoad: "5 kW",
    cluster: "Electricity Colony",
    discom: "APCPDCL",
    roofType: "Tin shed",
    structureType: "Pre fab - 4ft",
    noOfModules: 9,
    overhangPossibility: "No",
    overhangSide: "",
    amc: "Not Included",
    loadChange: "Yes",
    phaseChange: "No",
    nameChange: "No",
    paymentMode: "EMI",
    totalPrice: 373920,
    discount: 13920,
    finalPrice: 360000,
    subsidyAmount: 0,
    fromHand: 360000,
    items: [
      { id: "1", description: "Solar Panel (Topcon)", specification: "550W Bifacial", qty: 9, unitPrice: 17000, amount: 153000 },
      { id: "2", description: "Hybrid Inverter", specification: "5kW Smart Hybrid Inverter", qty: 1, unitPrice: 58000, amount: 58000 },
      { id: "3", description: "Lithium Battery Pack", specification: "5.12 kWh LiFePO4 Battery", qty: 1, unitPrice: 75000, amount: 75000 },
      { id: "4", description: "Mounting Structure & Electricals", specification: "GI Elevated structure + Dual DBs", qty: 1, unitPrice: 24000, amount: 24000 },
      { id: "5", description: "Installation & Commissioning", specification: "Full EPC setup, testing & liaison", qty: 1, unitPrice: 18000, amount: 18000 },
    ],
    subtotal: 328000,
    gstAmount: 45920,
    totalAmount: 360000,
    terms: [
      "Price valid for 15 days from issuance.",
      "Includes complete professional installation and commissioning.",
      "5 years comprehensive AMC support included.",
      "Net metering assistance and discom approvals provided.",
      "Payment terms: 50% advance, balance after installation.",
    ],
    status: "Pending",
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  // Navigation & Filter states
  const [activeTab, setActiveTab] = useState<"services" | "projects" | "quotation" | "inquiries">("services");
  const [serviceCategory, setServiceCategory] = useState<string>("ALL");
  const [projectCategory, setProjectCategory] = useState<string>("ALL");
  const [inquirySearch, setInquirySearch] = useState<string>("");
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<"ALL" | "WHATSAPP" | "APPLIED_PLAN" | "DEMO" | "GENERAL">("ALL");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<"ALL" | "New" | "Contacted" | "Completed">("ALL");
  const [quotationSearch, setQuotationSearch] = useState<string>("");
  const [quotationStatusFilter, setQuotationStatusFilter] = useState<"All" | "Pending" | "Sent" | "Approved">("All");
  const [quotationDateFrom, setQuotationDateFrom] = useState<string>("");
  const [quotationDateTo, setQuotationDateTo] = useState<string>("");
  const [isRefreshingQuotations, setIsRefreshingQuotations] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
  const [adminEmail, setAdminEmail] = useState("amaravatisolarsolutions@gmail.com");
  const [services, setServices] = useState<AdminService[]>(DEFAULT_SERVICES);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(DEFAULT_INQUIRIES);
  const [quotations, setQuotations] = useState<AdminQuotation[]>(DEFAULT_QUOTATIONS);

  // Modal states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [viewingQuotation, setViewingQuotation] = useState<AdminQuotation | null>(null);
  const [viewingInquiry, setViewingInquiry] = useState<AdminInquiry | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRefreshingInquiries, setIsRefreshingInquiries] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication check & initial state hydration
  useEffect(() => {
    try {
      const isAuth = localStorage.getItem("admin_auth");
      if (isAuth !== "true") {
        navigate({ to: "/admin/login" });
        return;
      }

      const savedEmail = localStorage.getItem("admin_email");
      if (savedEmail) setAdminEmail(savedEmail);

      const savedServices = localStorage.getItem("amaravati_admin_services");
      if (savedServices) {
        try { setServices(JSON.parse(savedServices)); } catch {}
      }

      const savedProjects = localStorage.getItem("amaravati_admin_projects");
      if (savedProjects) {
        try { setProjects(JSON.parse(savedProjects)); } catch {}
      }

      const savedInquiries = localStorage.getItem("amaravati_admin_inquiries");
      if (savedInquiries) {
        try { setInquiries(JSON.parse(savedInquiries)); } catch {}
      }

      const savedQuotations = localStorage.getItem("amaravati_admin_quotations");
      if (savedQuotations) {
        try { setQuotations(JSON.parse(savedQuotations)); } catch {}
      }

      // Fetch all live data directly from Hostinger MySQL Database!
      fetchLiveServices();
      fetchLiveProjects();
      fetchLiveQuotations();
      fetchLiveInquiries();
    } catch (e) {
      console.warn("Storage hydration error", e);
    }
  }, [navigate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem("admin_auth");
    } catch {
      // ignore
    }
    navigate({ to: "/admin/login" });
  };

  // 1. Fetch Live Services from MySQL Database
  const fetchLiveServices = async () => {
    try {
      const res = await fetch("/api/services?all=1").then((r) => (r.ok ? r.json() : null)).catch(() => null);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        const liveServices: AdminService[] = res.data.map((s: any, idx: number) => {
          let resolvedImage = s.image || residential;
          const imgStr = String(s.image || "");
          if (imgStr.includes("residential")) resolvedImage = residential;
          else if (imgStr.includes("commercial")) resolvedImage = commercial;
          else if (imgStr.includes("industrial")) resolvedImage = industrial;
          else if (imgStr.includes("future")) resolvedImage = future;
          else if (imgStr.includes("installation")) resolvedImage = installation;
          else if (imgStr.includes("farm")) resolvedImage = solarFarm;
          else if (imgStr.includes("rooftop") || imgStr.includes("hyderabad")) resolvedImage = solarHyderabadRooftop;
          else if (imgStr.includes("array") || imgStr.includes("panels")) resolvedImage = solarPanelsArray;

          return {
            id: String(s.id),
            title: s.title || "Solar Service",
            order: parseInt(s.service_order) || idx + 1,
            category: (s.category as any) || "SOLAR",
            description: s.description || "",
            image: resolvedImage,
          };
        });
        setServices(liveServices);
        try { localStorage.setItem("amaravati_admin_services", JSON.stringify(liveServices)); } catch {}
      }
    } catch (e) {
      console.warn("Could not fetch live services:", e);
    }
  };

  // 2. Fetch Live Projects from MySQL Database
  const fetchLiveProjects = async () => {
    try {
      const res = await fetch("/api/projects").then((r) => (r.ok ? r.json() : null)).catch(() => null);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        const liveProjects: Project[] = res.data.map((p: any) => {
          let resolvedImage = p.image || commercial;
          const imgStr = String(p.image || "");
          if (imgStr.includes("rooftop") || imgStr.includes("hyderabad")) resolvedImage = solarHyderabadRooftop;
          else if (imgStr.includes("residential")) resolvedImage = residential;
          else if (imgStr.includes("commercial")) resolvedImage = commercial;
          else if (imgStr.includes("future")) resolvedImage = future;
          else if (imgStr.includes("industrial")) resolvedImage = industrial;
          else if (imgStr.includes("array") || imgStr.includes("panels")) resolvedImage = solarPanelsArray;
          else if (imgStr.includes("installation")) resolvedImage = installation;

          return {
            id: String(p.id),
            slug: String(p.id),
            title: p.title || "Solar Project",
            category: (p.category as any) || "Commercial",
            image: resolvedImage,
            images: [resolvedImage],
            summary: p.description || "",
            placeholder: false,
            capacity: p.capacity || "",
            location: p.location || "Andhra Pradesh",
            clientType: p.client || "",
            completionTime: "Standard",
            annualGeneration: "",
            co2Saved: "",
            savings: "",
            overview: p.description || "",
            systemDetails: {
              panelType: "Tier-1 Mono PERC High Efficiency Modules",
              inverterType: "Three-Phase Smart Grid-Tie Inverter",
              mountingStructure: "Hot-Dip Galvanized Structure",
              monitoring: "Cloud WiFi Remote Telemetry",
              warranty: "25-Year Performance Guarantee",
            },
          };
        });
        setProjects(liveProjects);
        try { localStorage.setItem("amaravati_admin_projects", JSON.stringify(liveProjects)); } catch {}
      }
    } catch (e) {
      console.warn("Could not fetch live projects:", e);
    }
  };

  // 3. Fetch Live Quotations from MySQL Database
  // Remember the open tab in the URL (#quotation etc.) so a page refresh stays on the same section
  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (ADMIN_NAV.some((n) => n.key === fromHash)) setActiveTab(fromHash as typeof activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (window.location.hash !== `#${activeTab}`) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${activeTab}`);
    }
  }, [activeTab]);

  // Keep the quotation list live: refresh from the database every 30s while the tab is open
  useEffect(() => {
    if (activeTab !== "quotation") return;
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") fetchLiveQuotations();
    }, 30000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchLiveQuotations = async () => {
    try {
      const res = await fetch("/api/quotations").then((r) => (r.ok ? r.json() : null)).catch(() => null);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        const liveQuotations: AdminQuotation[] = res.data.map((q: any) => {
          let items: any[] = [];
          try {
            items = typeof q.items_json === "string" ? JSON.parse(q.items_json) : (q.items_json || []);
          } catch {}

          let siteDetails: any = {};
          try {
            siteDetails = typeof q.site_details_json === "string" ? JSON.parse(q.site_details_json) : (q.site_details_json || {});
          } catch {}

          return {
            id: String(q.id),
            quotationNo: q.quotation_no || "QT-2026-001",
            date: q.date || "",
            validUpto: q.valid_upto || "",
            customerName: q.customer_name || "",
            customerPhone: q.customer_phone || "",
            customerAddress: q.customer_address || "",
            systemCapacity: q.system_capacity || "",
            housingType: q.housing_type || siteDetails.housingType || "Independent",
            subsidyType: q.subsidy_type || siteDetails.subsidyType || "Subsidy National DBT",
            noOfFloors: siteDetails.noOfFloors || "G+1",
            sanctionedPhase: siteDetails.sanctionedPhase || "Single Phase",
            sanctionedLoad: siteDetails.sanctionedLoad || "3 kW",
            cluster: siteDetails.cluster || "Vijayawada Urban",
            discom: siteDetails.discom || "APCPDCL",
            roofType: siteDetails.roofType || "RCC",
            structureType: siteDetails.structureType || "Pre fab - 6ft",
            noOfModules: siteDetails.noOfModules || 6,
            moduleType: siteDetails.moduleType || "",
            projectSize: siteDetails.projectSize || "",
            overhangPossibility: siteDetails.overhangPossibility || "No",
            overhangSide: siteDetails.overhangSide || "",
            amc: siteDetails.amc || "Included",
            loadChange: siteDetails.loadChange || "No",
            phaseChange: siteDetails.phaseChange || "No",
            nameChange: siteDetails.nameChange || "No",
            paymentMode: siteDetails.paymentMode || "Direct",
            totalPrice: siteDetails.totalPrice || parseFloat(q.total_amount) || 0,
            discount: siteDetails.discount || 0,
            finalPrice: siteDetails.finalPrice || parseFloat(q.total_amount) || 0,
            subsidyAmount: parseFloat(q.subsidy_amount) || 0,
            fromHand: parseFloat(q.from_hand) || 0,
            items: Array.isArray(items) && items.length > 0 ? items : (DEFAULT_QUOTATIONS[0]?.items || []),
            subtotal: parseFloat(q.subtotal) || 0,
            gstAmount: parseFloat(q.gst_amount) || 0,
            totalAmount: parseFloat(q.total_amount) || 0,
            terms: siteDetails.terms || (DEFAULT_QUOTATIONS[0]?.terms || []),
            status: (q.status as any) || "Pending",
          };
        });
        setQuotations(liveQuotations);
        try { localStorage.setItem("amaravati_admin_quotations", JSON.stringify(liveQuotations)); } catch {}
      }
    } catch (e) {
      console.warn("Could not fetch live quotations:", e);
    }
  };

  // 4. Fetch Live Inquiries & Bookings from MySQL Database
  const fetchLiveInquiries = async () => {
    setIsRefreshingInquiries(true);
    try {
      const [enqRes, bookRes] = await Promise.all([
        fetch("/api/enquiries").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch("/api/bookings").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);

      const liveItems: AdminInquiry[] = [];

      if (enqRes?.success && Array.isArray(enqRes.data)) {
        enqRes.data.forEach((r: any) => {
          const rawMsg = (r.message || "").trim();
          const rawNotes = (r.notes || "").trim();
          let combinedNotes = rawMsg;
          if (rawNotes && !rawMsg.includes(rawNotes)) {
            combinedNotes = combinedNotes ? `${rawNotes}\n\n${combinedNotes}` : rawNotes;
          }

          const parsedDate = r.created_at ? new Date(r.created_at) : null;
          const formattedDate = parsedDate && !isNaN(parsedDate.getTime())
            ? parsedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
              ", " +
              parsedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Recent";

          liveItems.push({
            id: String(r.id),
            name: r.full_name || "Customer",
            phone: r.phone || "",
            email: r.email || "",
            service: r.service || "Solar Enquiry",
            location: r.city || "Amaravati",
            date: formattedDate,
            status: (r.status as any) || "New",
            notes: combinedNotes || "Direct Enquiry",
            timestamp: parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : parseInt(r.id) || 0,
          });
        });
      }

      if (bookRes?.success && Array.isArray(bookRes.data)) {
        bookRes.data.forEach((r: any) => {
          const detailParts = [
            r.reference ? `Reference: ${r.reference}` : null,
            r.property_type ? `Property: ${r.property_type}` : null,
            r.monthly_bill ? `Monthly Bill: ${r.monthly_bill}` : null,
            r.preferred_date ? `Preferred Date: ${r.preferred_date}` : null,
            r.preferred_time ? `Preferred Time: ${r.preferred_time}` : null,
            r.requirements ? `Requirements: ${r.requirements}` : null,
            r.notes ? `Notes: ${r.notes}` : null,
          ].filter(Boolean).join("\n");

          const parsedDate = r.created_at ? new Date(r.created_at) : null;
          const formattedDate = parsedDate && !isNaN(parsedDate.getTime())
            ? parsedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
              ", " +
              parsedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Recent";

          liveItems.push({
            id: "b-" + (r.reference || r.id),
            name: r.full_name || "Customer",
            phone: r.phone || "",
            email: r.email || "",
            service: "Demo: " + (r.solution || "Rooftop Solar") + (r.property_type ? ` (${r.property_type})` : ""),
            location: (r.city || "Amaravati") + (r.preferred_date ? " [" + r.preferred_date + "]" : ""),
            date: formattedDate,
            status: r.status === "completed" ? "Completed" : r.status === "contacted" ? "Contacted" : "New",
            notes: detailParts || "Consultation Request",
            timestamp: parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : parseInt(r.id) || 0,
          });
        });
      }

      if (liveItems.length > 0) {
        liveItems.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setInquiries(liveItems);
        try { localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(liveItems)); } catch {}
      }
    } catch (e) {
      console.warn("Could not fetch live enquiries:", e);
    } finally {
      setIsRefreshingInquiries(false);
    }
  };

  // Sync / Refresh All Live Data from MySQL Database
  const handleRefreshData = async () => {
    showToast("Fetching live data from MySQL database...");
    await Promise.all([
      fetchLiveServices(),
      fetchLiveProjects(),
      fetchLiveQuotations(),
      fetchLiveInquiries(),
    ]);
    showToast("All data synchronized with live MySQL database!");
  };

  // Quotation CRUD handlers with MySQL Sync
  const handleSaveQuotation = async (quotationData: Omit<AdminQuotation, "id"> & { id?: string | undefined }) => {
    const targetId = quotationData.id || `quot-${Date.now()}`;
    const newQuot: AdminQuotation = {
      ...quotationData,
      id: targetId,
    };

    let updated: AdminQuotation[];
    if (quotationData.id) {
      updated = quotations.map((q) => (q.id === quotationData.id ? newQuot : q));
      showToast("Quotation updated successfully!");
    } else {
      updated = [newQuot, ...quotations];
      showToast("New quotation generated successfully!");
    }
    setQuotations(updated);
    try { localStorage.setItem("amaravati_admin_quotations", JSON.stringify(updated)); } catch {}
    setIsQuotationModalOpen(false);
    setViewingQuotation(newQuot);

    // Open the PDF tab right away (inside the submit click, so the browser does not block it),
    // then fill it after the server confirms the final quotation number.
    const pdfWindow = window.open("", "_blank");
    try {
      pdfWindow?.document.write(
        '<p style="font-family:Segoe UI,Arial,sans-serif;padding:40px;color:#555">Preparing quotation&hellip;</p>'
      );
    } catch {}

    let savedQuot = newQuot;
    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuot),
      });
      const json = await res.json().catch(() => null);
      const serverNo: string | undefined = json?.success ? json.quotation_no : undefined;
      if (serverNo && serverNo !== newQuot.quotationNo) {
        savedQuot = { ...newQuot, quotationNo: serverNo };
        setQuotations((prev) => prev.map((q) => (q.id === targetId ? savedQuot : q)));
        setViewingQuotation(savedQuot);
      }
      fetchLiveQuotations();
    } catch (err) {
      console.warn("Failed to persist quotation to MySQL:", err);
    }
    openQuotationPdf(savedQuot, pdfWindow);
  };

  const handleDeleteQuotation = async (id: string, quotationNo: string) => {
    if (confirm(`Are you sure you want to delete quotation "${quotationNo}"?`)) {
      const updated = quotations.filter((q) => q.id !== id);
      setQuotations(updated);
      try { localStorage.setItem("amaravati_admin_quotations", JSON.stringify(updated)); } catch {}
      showToast("Quotation deleted.");

      // Sync deletion to MySQL
      try {
        await fetch(`/api/quotations?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        fetchLiveQuotations();
      } catch (err) {
        console.warn("Failed to delete quotation from MySQL:", err);
      }
    }
  };

  const handleUpdateQuotationStatus = async (id: string, status: "Pending" | "Sent" | "Approved") => {
    const updated = quotations.map((q) => (q.id === id ? { ...q, status } : q));
    setQuotations(updated);
    try { localStorage.setItem("amaravati_admin_quotations", JSON.stringify(updated)); } catch {}
    showToast(`Quotation status updated to ${status}`);

    // Sync status to MySQL
    try {
      await fetch("/api/quotations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      console.warn("Failed to update status in MySQL:", err);
    }
  };

  // Service CRUD handlers with MySQL Sync
  const handleSaveService = async (serviceData: Omit<AdminService, "id"> & { id?: string | undefined }) => {
    const targetId = serviceData.id || `svc-${Date.now()}`;
    const payload = {
      id: targetId,
      title: serviceData.title,
      order: serviceData.order,
      category: serviceData.category,
      description: serviceData.description,
      image: typeof serviceData.image === "string" ? serviceData.image : "/assets/hero-residential-D28_GEsT.jpg",
      status: "Active",
    };

    let updated: AdminService[];
    if (serviceData.id) {
      updated = services.map((s) => (s.id === serviceData.id ? ({ ...s, ...serviceData } as AdminService) : s));
      showToast("Service updated successfully!");
    } else {
      const newService: AdminService = {
        ...serviceData,
        id: targetId,
      };
      updated = [newService, ...services];
      showToast("New service added successfully!");
    }
    setServices(updated);
    try { localStorage.setItem("amaravati_admin_services", JSON.stringify(updated)); } catch {}
    setIsServiceModalOpen(false);
    setEditingService(null);

    // Save to MySQL
    try {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      fetchLiveServices();
    } catch (err) {
      console.warn("Failed to save service to MySQL:", err);
    }
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      try { localStorage.setItem("amaravati_admin_services", JSON.stringify(updated)); } catch {}
      showToast("Service deleted.");

      // Sync deletion to MySQL
      try {
        await fetch(`/api/services?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        fetchLiveServices();
      } catch (err) {
        console.warn("Failed to delete service from MySQL:", err);
      }
    }
  };

  // Project CRUD handlers with MySQL Sync
  const handleDeleteProject = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove project "${title}"?`)) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      try { localStorage.setItem("amaravati_admin_projects", JSON.stringify(updated)); } catch {}
      showToast("Project removed.");

      // Sync deletion to MySQL
      try {
        await fetch(`/api/projects?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        fetchLiveProjects();
      } catch (err) {
        console.warn("Failed to delete project from MySQL:", err);
      }
    }
  };

  // Inquiry Status handler
  const handleUpdateInquiryStatus = (id: string, status: "New" | "Contacted" | "Completed") => {
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    setInquiries(updated);
    try { localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(updated)); } catch {}
    showToast(`Inquiry marked as ${status}`);

    // Sync to MySQL
    if (id.startsWith("b-")) {
      const ref = id.replace("b-", "");
      fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref, status: status.toLowerCase() }),
      }).catch(() => {});
    } else {
      const cleanId = id.replace(/^e-/, "");
      const isNum = /^\d+$/.test(cleanId);
      fetch("/api/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNum ? { id: Number(cleanId), status } : { reference: cleanId, status }),
      }).catch(() => {});
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm("Delete this customer inquiry record?")) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      try { localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(updated)); } catch {}
      showToast("Inquiry deleted.");

      // Sync deletion to MySQL
      if (id.startsWith("b-")) {
        const ref = id.replace(/^b-/, "");
        fetch(`/api/bookings?reference=${encodeURIComponent(ref)}`, { method: "DELETE" }).catch(() => {});
      } else {
        const cleanId = id.replace(/^e-/, "");
        const isNum = /^\d+$/.test(cleanId);
        fetch(`/api/enquiries?${isNum ? `id=${encodeURIComponent(cleanId)}` : `reference=${encodeURIComponent(cleanId)}`}`, { method: "DELETE" }).catch(() => {});
      }
    }
  };

  // Export Inquiries as CSV
  const handleExportInquiriesCSV = () => {
    if (inquiries.length === 0) {
      showToast("No inquiries available to export.");
      return;
    }

    const headers = [
      "Inquiry ID",
      "Date & Time",
      "Customer Name",
      "Phone",
      "Email",
      "Category / Source",
      "Service / System",
      "Location / City",
      "Status",
      "Details / Sizing & Notes",
    ];

    const rows = inquiries.map((inq) => {
      const badge = getInquirySourceBadge(inq);
      const safe = (val: string | undefined | null) =>
        `"${String(val || "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

      return [
        safe(inq.id),
        safe(inq.date),
        safe(inq.name),
        safe(inq.phone),
        safe(inq.email),
        safe(badge.label),
        safe(inq.service),
        safe(inq.location),
        safe(inq.status),
        safe(inq.notes),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Amaravati_Solar_Inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${inquiries.length} customer records to CSV!`);
  };

  // Filter calculations
  const solarCount = services.filter((s) => s.category === "SOLAR").length;
  const electricalCount = services.filter((s) => s.category === "ELECTRICAL").length;
  const evCount = services.filter((s) => s.category === "EV CHARGING").length;
  const maintenanceCount = services.filter((s) => s.category === "MAINTENANCE / AMC").length;

  const filteredServices =
    serviceCategory === "ALL"
      ? services
      : services.filter((s) => s.category === serviceCategory);

  const filteredProjects =
    projectCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === projectCategory.toUpperCase());

  const getInquirySourceBadge = (inq: AdminInquiry) => {
    const sUpper = inq.service.toUpperCase();
    const nUpper = (inq.notes || "").toUpperCase();
    if (sUpper.includes("WHATSAPP") || nUpper.includes("WHATSAPP")) {
      return {
        label: "WhatsApp Quote",
        bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
        icon: PhoneCall,
      };
    }
    if (sUpper.includes("APPLIED") || nUpper.includes("APPLIED") || nUpper.includes("APPLIED SOLAR PLAN")) {
      return {
        label: "Applied Solar Plan",
        bg: "bg-orange-50 text-[#D9410E] border-orange-300",
        icon: CheckCircle2,
      };
    }
    if (inq.id.startsWith("b-") || sUpper.includes("DEMO")) {
      return {
        label: "Demo Booking",
        bg: "bg-sky-50 text-sky-800 border-sky-300",
        icon: Calendar,
      };
    }
    return {
      label: "Contact Inquiry",
      bg: "bg-slate-50 text-slate-700 border-slate-300",
      icon: MessageSquare,
    };
  };

  const whatsappInquiriesCount = inquiries.filter((inq) => {
    const sUpper = inq.service.toUpperCase();
    const nUpper = (inq.notes || "").toUpperCase();
    return sUpper.includes("WHATSAPP") || nUpper.includes("WHATSAPP");
  }).length;

  const appliedPlanInquiriesCount = inquiries.filter((inq) => {
    const sUpper = inq.service.toUpperCase();
    const nUpper = (inq.notes || "").toUpperCase();
    return sUpper.includes("APPLIED") || nUpper.includes("APPLIED") || nUpper.includes("APPLIED SOLAR PLAN");
  }).length;

  const demoInquiriesCount = inquiries.filter((inq) => {
    const sUpper = inq.service.toUpperCase();
    return inq.id.startsWith("b-") || sUpper.includes("DEMO");
  }).length;

  const generalInquiriesCount = inquiries.filter((inq) => {
    const sUpper = inq.service.toUpperCase();
    const nUpper = (inq.notes || "").toUpperCase();
    return (
      !sUpper.includes("WHATSAPP") &&
      !nUpper.includes("WHATSAPP") &&
      !sUpper.includes("APPLIED") &&
      !nUpper.includes("APPLIED") &&
      !inq.id.startsWith("b-") &&
      !sUpper.includes("DEMO")
    );
  }).length;

  const filteredInquiries = inquiries.filter((inq) => {
    // 1. Text Search
    const q = inquirySearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.service.toLowerCase().includes(q) ||
      inq.location.toLowerCase().includes(q) ||
      (inq.notes && inq.notes.toLowerCase().includes(q));

    // 2. Status Filter
    const matchesStatus =
      inquiryStatusFilter === "ALL" || inq.status === inquiryStatusFilter;

    // 3. Category / Source Filter
    const sUpper = inq.service.toUpperCase();
    const nUpper = (inq.notes || "").toUpperCase();
    let matchesType = true;
    if (inquiryTypeFilter === "WHATSAPP") {
      matchesType = sUpper.includes("WHATSAPP") || nUpper.includes("WHATSAPP");
    } else if (inquiryTypeFilter === "APPLIED_PLAN") {
      matchesType = sUpper.includes("APPLIED") || nUpper.includes("APPLIED") || nUpper.includes("APPLIED SOLAR PLAN");
    } else if (inquiryTypeFilter === "DEMO") {
      matchesType = inq.id.startsWith("b-") || sUpper.includes("DEMO");
    } else if (inquiryTypeFilter === "GENERAL") {
      matchesType =
        !sUpper.includes("WHATSAPP") &&
        !nUpper.includes("WHATSAPP") &&
        !sUpper.includes("APPLIED") &&
        !nUpper.includes("APPLIED") &&
        !inq.id.startsWith("b-") &&
        !sUpper.includes("DEMO");
    }

    return matchesSearch && matchesStatus && matchesType;
  });

  const qSearch = quotationSearch.trim().toLowerCase();
  const qSearchDigits = qSearch.replace(/\D/g, "");
  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      !qSearch ||
      [q.quotationNo, q.customerName, q.customerAddress, q.systemCapacity, q.discom, q.cluster].some((v) =>
        (v || "").toLowerCase().includes(qSearch)
      ) ||
      (qSearchDigits.length >= 3 && (q.customerPhone || "").replace(/\D/g, "").includes(qSearchDigits));
    const matchesStatus = quotationStatusFilter === "All" || q.status === quotationStatusFilter;
    const iso = quoteDateToIso(q.date);
    const matchesFrom = !quotationDateFrom || (!!iso && iso >= quotationDateFrom);
    const matchesTo = !quotationDateTo || (!!iso && iso <= quotationDateTo);
    return matchesSearch && matchesStatus && matchesFrom && matchesTo;
  });
  const hasQuotationFilters = !!qSearch || quotationStatusFilter !== "All" || !!quotationDateFrom || !!quotationDateTo;
  const clearQuotationFilters = () => {
    setQuotationSearch("");
    setQuotationStatusFilter("All");
    setQuotationDateFrom("");
    setQuotationDateTo("");
  };
  const applyQuotationDatePreset = (preset: "today" | "7d" | "30d" | "month") => {
    const now = new Date();
    const to = toLocalIso(now);
    const from = new Date(now);
    if (preset === "7d") from.setDate(from.getDate() - 6);
    if (preset === "30d") from.setDate(from.getDate() - 29);
    if (preset === "month") from.setDate(1);
    setQuotationDateFrom(toLocalIso(from));
    setQuotationDateTo(to);
  };
  const refreshQuotations = async () => {
    setIsRefreshingQuotations(true);
    await fetchLiveQuotations();
    setIsRefreshingQuotations(false);
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="admin-portal h-screen w-full bg-[#f8fafc] text-[#344054] flex flex-col antialiased overflow-hidden" data-admin="true">
      {/* 1. TOP GLOBAL HEADER (100% RESPONSIVE ACROSS ALL DEVICES: MOBILE 320PX, TABLET 768PX, LAPTOPS 13"-18") */}
      <header className="h-16 shrink-0 sticky top-0 z-40 bg-white border-b border-slate-200 select-none">
        <div className="px-2.5 sm:px-5 lg:px-8 h-full flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Left: Mobile hamburger + Admin Portal branding */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-[#082B4C] transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="size-5" />
            </button>

            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink">
              <img src={logo} alt="Amaravati Solar Solutions" className="h-8 sm:h-9 w-auto object-contain shrink-0" />
              <span className="hidden sm:block h-6 w-px bg-slate-200 shrink-0" />
              <span className="hidden sm:inline text-sm font-semibold text-slate-700 truncate">Admin Panel</span>
            </div>
          </div>

          {/* Right: User Profile, Live Site, Change Password, Logout */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs shrink-0">
            {/* User Profile Info Pill */}
            <div className="hidden sm:flex lg:hidden items-center shrink-0" title={`Logged in as ${adminEmail}`}>
              <div className="size-8 rounded-full bg-[#E8590C] text-white grid place-items-center text-xs font-bold">
                {(adminEmail || "A").charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Live Site Shortcut */}
            <Link
              to="/"
              target="_blank"
              title="View Live Website"
              className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shrink-0"
            >
              <ExternalLink className="size-3.5 text-slate-500 shrink-0" />
              <span className="hidden md:inline">Live Site</span>
            </Link>

            {/* Change Password Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              title="Change Password"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
            >
              <KeyRound className="size-3.5 text-slate-500 shrink-0" />
              <span className="hidden lg:inline">Change Password</span>
            </button>

            {/* Logout Trigger */}
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-xs font-semibold text-red-600 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="size-3.5 shrink-0" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#082B4C] text-white px-4 py-3 shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. MAIN LAYOUT (STICKY SIDEBAR + INDEPENDENT SCROLLING CONTENT PANEL) */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* SIDEBAR (Desktop) — clean white with brand-orange active state */}
        <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-white border-r border-slate-200 shrink-0 h-full overflow-y-auto select-none">
          <div className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Menu</div>
          <nav className="flex flex-col gap-1 px-3">
            {ADMIN_NAV.map(({ key, label, Icon }) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveTab(key);
                  }}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors cursor-pointer",
                    active ? "bg-orange-50 text-[#B83A16]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span className={cn("absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full", active ? "bg-[#E8590C]" : "bg-transparent")} />
                  <Icon className={cn("size-[18px] shrink-0", active ? "text-[#E8590C]" : "text-slate-400 group-hover:text-slate-600")} />
                  <span className="flex-1">{label}</span>
                  {key === "inquiries" && newInquiriesCount > 0 && (
                    <span className="min-w-5 h-5 px-1.5 grid place-items-center rounded-full bg-[#E8590C] text-white text-[10px] font-bold">
                      {newInquiriesCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-3 border-t border-slate-100">
            <div className="flex items-center gap-2.5 px-2 py-2">
                  <div className="size-8 rounded-full bg-[#E8590C] text-white grid place-items-center text-xs font-bold shrink-0">
                    {(adminEmail || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate" title={adminEmail}>{adminEmail}</div>
                    <div className="text-[10px] font-medium text-slate-400">Administrator</div>
                  </div>
                </div>
          </div>
        </aside>

        {/* MOBILE / TABLET DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/50 animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full bg-white flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 shrink-0">
                <img src={logo} alt="Amaravati Solar Solutions" className="h-8 w-auto object-contain" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="px-6 pt-5 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Menu</div>
              <nav className="flex flex-col gap-1 px-3">
                {ADMIN_NAV.map(({ key, label, Icon }) => {
                  const active = activeTab === key;
                  return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setActiveTab(key);
                          setMobileMenuOpen(false);
                        }}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors cursor-pointer",
                          active ? "bg-orange-50 text-[#B83A16]" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <span className={cn("absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full", active ? "bg-[#E8590C]" : "bg-transparent")} />
                        <Icon className={cn("size-[18px] shrink-0", active ? "text-[#E8590C]" : "text-slate-400 group-hover:text-slate-600")} />
                        <span className="flex-1">{label}</span>
                        {key === "inquiries" && newInquiriesCount > 0 && (
                          <span className="min-w-5 h-5 px-1.5 grid place-items-center rounded-full bg-[#E8590C] text-white text-[10px] font-bold">
                            {newInquiriesCount}
                          </span>
                        )}
                      </button>
                  );
                })}
              </nav>

              <div className="mt-auto p-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2.5 px-2 py-2">
                  <div className="size-8 rounded-full bg-[#E8590C] text-white grid place-items-center text-xs font-bold shrink-0">
                    {(adminEmail || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate" title={adminEmail}>{adminEmail}</div>
                    <div className="text-[10px] font-medium text-slate-400">Administrator</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Live Site</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsPasswordModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <KeyRound className="size-3.5" />
                    <span>Password</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT PANEL (INDEPENDENT SMOOTH SCROLLING) */}
        <main className="flex-1 h-full overflow-y-auto p-3 sm:p-6 lg:p-8 xl:p-10 scroll-smooth bg-[#f8fafc]">
          {/* TAB 1: SERVICES PORTFOLIO (Exact Match to User's Example Reference) */}
          {activeTab === "services" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title Banner */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="inline-flex items-center rounded-md bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-emerald-800">
                      CONTENT PANEL
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                      Services Portfolio
                    </h1>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                    Manage the engineering services, summaries, and categories shown on the main page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRefreshData}
                  className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#082B4C] shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  <RefreshCw className="size-3.5 text-slate-500" />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Action Bar: Manage Services (Count) + ADD SERVICE Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#082B4C]">
                  Manage Services ({services.length})
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsServiceModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>ADD SERVICE</span>
                </button>
              </div>

              {/* Category Filter Pills (Exact match to reference image with crisp white text & responsive scroll) */}
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-2xs overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setServiceCategory("ALL")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    serviceCategory === "ALL"
                      ? "bg-[#B83A16] border border-[#B83A16] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  ALL ({services.length})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("SOLAR")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    serviceCategory === "SOLAR"
                      ? "bg-[#B83A16] border border-[#B83A16] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  SOLAR ({solarCount})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("ELECTRICAL")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    serviceCategory === "ELECTRICAL"
                      ? "bg-[#B83A16] border border-[#B83A16] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  ELECTRICAL ({electricalCount})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("EV CHARGING")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    serviceCategory === "EV CHARGING"
                      ? "bg-[#B83A16] border border-[#B83A16] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  EV CHARGING ({evCount})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("MAINTENANCE / AMC")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    serviceCategory === "MAINTENANCE / AMC"
                      ? "bg-[#B83A16] border border-[#B83A16] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  MAINTENANCE / AMC ({maintenanceCount})
                </button>
              </div>

              {/* Service Cards Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail with Floating Circular Sun Icon */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white text-[#B83A16] shadow-md border border-slate-100">
                          <Sun className="size-4.5" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base sm:text-[17px] font-extrabold text-[#082B4C] leading-snug line-clamp-2">
                            {service.title}
                          </h3>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[11px] font-bold text-slate-400">
                              Order: {service.order}
                            </span>
                            <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 border border-emerald-100">
                              {service.category}
                            </span>
                          </div>
                        </div>

                        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-4 pt-0 sm:p-5 sm:pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Active on Site
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(service);
                            setIsServiceModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#082B4C] transition-all cursor-pointer"
                          aria-label="Edit service"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(service.id, service.title)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          aria-label="Delete service"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS PORTFOLIO */}
          {activeTab === "projects" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title Banner */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-800">
                      CONTENT PANEL
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                      Projects Portfolio
                    </h1>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                    Manage installation showcase, capacity stats, and customer case studies.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRefreshData}
                  className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#082B4C] shadow-2xs hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
                >
                  <RefreshCw className="size-3.5 text-slate-500" />
                  <span>Refresh Data</span>
                </button>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#082B4C]">
                  Manage Projects ({projects.length})
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setIsProjectModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>ADD PROJECT</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-2xs overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
                {["ALL", "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProjectCategory(cat)}
                    className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                      projectCategory === cat
                        ? "bg-[#B83A16] border border-[#B83A16] text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 rounded-md bg-[#082B4C]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
                          <Zap className="size-3 text-[#F5A623]" />
                          <span>{project.capacity}</span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-400">
                            {project.location}
                          </span>
                          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-black uppercase text-amber-700 border border-amber-100">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="mt-2 text-base font-extrabold text-[#082B4C] line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 sm:p-5 sm:pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                      <Link
                        to={`/projects/${project.id}` as any}
                        target="_blank"
                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        <span>View Project</span>
                        <ArrowUpRight className="size-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(project);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project.id, project.title)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: QUOTATIONS */}
          {activeTab === "quotation" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title Banner */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-900">
                      QUOTATION PORTFOLIO
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                      Official Quotations
                    </h1>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                    Create, track and share rooftop solar quotations with your customers.
                  </p>
                </div>

                <div className="flex items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={refreshQuotations}
                    disabled={isRefreshingQuotations}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs disabled:opacity-60 shrink-0"
                    title="Refresh from database"
                  >
                    <RefreshCw className={cn("size-3.5 text-slate-500", isRefreshingQuotations && "animate-spin text-[#B83A16]")} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsQuotationModalOpen(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#B83A16] hover:bg-[#9a3012] text-white px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="size-4 stroke-[2.5]" />
                    <span>CREATE QUOTATION</span>
                  </button>
                </div>
              </div>

              {/* Quotation Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Quotations</span>
                  <div className="mt-1 text-2xl font-black text-[#082B4C]">{quotations.length}</div>
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Approved Quotations</span>
                  <div className="mt-1 text-2xl font-black text-emerald-600">
                    {quotations.filter((q) => q.status === "Approved").length}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B83A16]">Total Quoted Pipeline</span>
                  <div className="mt-1 text-2xl font-black text-[#B83A16]">
                    ₹{quotations.reduce((sum, q) => sum + q.totalAmount, 0).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Search & Filters (instant, no submit needed) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-end gap-2.5">
                  <div className="w-full md:w-auto md:flex-1 md:min-w-[240px]">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Name, phone, quotation no, address…"
                        value={quotationSearch}
                        onChange={(e) => setQuotationSearch(e.target.value)}
                        className="w-full h-9 rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                      />
                      {quotationSearch && (
                        <button
                          type="button"
                          onClick={() => setQuotationSearch("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Clear search"
                        >
                          <X className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="w-full sm:w-[calc(33.333%-7px)] md:w-36">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Status</label>
                    <select
                      value={quotationStatusFilter}
                      onChange={(e) => setQuotationStatusFilter(e.target.value as "All" | "Pending" | "Sent" | "Approved")}
                      className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 cursor-pointer"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Sent">Sent</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>

                  <div className="w-[calc(50%-5px)] sm:w-[calc(33.333%-7px)] md:w-40">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">From Date</label>
                    <input
                      type="date"
                      value={quotationDateFrom}
                      max={quotationDateTo || undefined}
                      onChange={(e) => setQuotationDateFrom(e.target.value)}
                      className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 cursor-pointer"
                      onKeyDown={(e) => { if (e.key !== "Tab") e.preventDefault(); }}
                      onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                    />
                  </div>

                  <div className="w-[calc(50%-5px)] sm:w-[calc(33.333%-7px)] md:w-40">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">To Date</label>
                    <input
                      type="date"
                      value={quotationDateTo}
                      min={quotationDateFrom || undefined}
                      onChange={(e) => setQuotationDateTo(e.target.value)}
                      className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 cursor-pointer"
                      onKeyDown={(e) => { if (e.key !== "Tab") e.preventDefault(); }}
                      onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={clearQuotationFilters}
                    disabled={!hasQuotationFilters}
                    className="w-full md:w-auto h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <X className="size-3.5" />
                    <span>Clear</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Calendar className="size-3.5 text-slate-400" />
                    {([
                      ["today", "Today"],
                      ["7d", "Last 7 Days"],
                      ["30d", "Last 30 Days"],
                      ["month", "This Month"],
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => applyQuotationDatePreset(key)}
                        className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-bold text-slate-600 hover:border-[#B83A16] hover:text-[#B83A16] transition-all cursor-pointer"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Showing <strong className="text-[#082B4C]">{filteredQuotations.length}</strong> of {quotations.length} quotations
                  </span>
                </div>
              </div>

              {/* Quotations Table — fits laptop screens (13"+) without horizontal scroll */}
              <div className="hidden xl:block rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
                <table className="w-full table-fixed text-left text-xs">
                  <colgroup>
                    <col className="w-[15%]" />
                    <col className="w-[24%]" />
                    <col className="w-[15%]" />
                    <col className="w-[19%]" />
                    <col className="w-[13%]" />
                    <col className="w-[14%]" />
                  </colgroup>
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-3 py-3">Quotation</th>
                      <th className="px-3 py-3">Customer</th>
                      <th className="px-3 py-3">System</th>
                      <th className="px-3 py-3">Amount</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuotations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                          No quotations found for the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotations.map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50/60 transition-colors align-top">
                          <td className="px-3 py-3">
                            <span className="inline-block max-w-full truncate font-extrabold text-[#082B4C] bg-slate-100 px-2 py-0.5 rounded-md text-[11px] border border-slate-200">
                              {q.quotationNo}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1 font-semibold">{q.date}</div>
                            <div className="text-[10px] text-slate-400">Valid: {q.validUpto}</div>
                          </td>
                          <td className="px-3 py-3 min-w-0">
                            <div className="font-extrabold text-slate-800 text-sm truncate" title={q.customerName}>{q.customerName}</div>
                            <div className="text-slate-600 text-[11px] mt-0.5 truncate">{q.customerPhone}</div>
                            <div className="text-slate-400 text-[10px] truncate" title={q.customerAddress}>{q.customerAddress}</div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="font-extrabold text-[#B83A16] text-[13px]">
                              {q.projectSize || q.systemCapacity.replace(/\s*On-Grid Rooftop$/i, "")}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">{q.moduleType || "On-Grid Rooftop"}</div>
                            <div className="text-[10px] font-semibold text-emerald-700 truncate">
                              {q.subsidyType === "Non- Subsidy" ? "Non-Subsidy" : "DBT Subsidy"}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="font-black text-[#082B4C] text-[13px]">
                              ₹{(q.finalPrice || q.totalAmount || 0).toLocaleString("en-IN")}
                            </div>
                            <div className="text-[10px] text-emerald-700 font-semibold">
                              Subsidy ₹{(q.subsidyAmount || 0).toLocaleString("en-IN")}
                            </div>
                            <div className="text-[10px] text-slate-700 font-bold">
                              Hand ₹{(q.fromHand || 0).toLocaleString("en-IN")}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <select
                              value={q.status}
                              onChange={(e) =>
                                handleUpdateQuotationStatus(q.id, e.target.value as "Pending" | "Sent" | "Approved")
                              }
                              className={`w-full text-[11px] font-extrabold rounded-lg px-2 py-1 border transition-all cursor-pointer ${
                                  q.status === "Approved"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                    : q.status === "Sent"
                                    ? "bg-sky-50 text-sky-800 border-sky-200"
                                    : "bg-amber-50 text-amber-800 border-amber-200"
                                }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Sent">Sent</option>
                              <option value="Approved">Approved</option>
                            </select>
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => setViewingQuotation(q)}
                                className="p-1.5 rounded-lg border border-slate-200 text-[#082B4C] hover:bg-slate-50 transition-all cursor-pointer"
                                title="View quotation"
                              >
                                <Eye className="size-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openQuotationPdf(q)}
                                className="p-1.5 rounded-lg border border-[#B83A16] bg-[#B83A16] text-white hover:bg-[#9a3012] transition-all cursor-pointer"
                                title="Print / Download PDF"
                              >
                                <Printer className="size-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteQuotation(q.id, q.quotationNo)}
                                className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                                title="Delete quotation"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Quotations Responsive Cards View (Phones: 1-col, Tablets: 2-cols) */}
              <div className="xl:hidden">
                {filteredQuotations.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center text-slate-400 text-xs">
                    No quotations found for the selected filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredQuotations.map((q) => (
                      <div key={q.id} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-[#082B4C] bg-slate-100 px-2.5 py-1 rounded-md text-[11px] tracking-wide border border-slate-200">
                          {q.quotationNo}
                        </span>
                        <select
                          value={q.status}
                          onChange={(e) =>
                            handleUpdateQuotationStatus(q.id, e.target.value as "Pending" | "Sent" | "Approved")
                          }
                          className={`text-[11px] font-extrabold rounded-lg px-2.5 py-1 border transition-all cursor-pointer ${
                            q.status === "Approved"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : q.status === "Sent"
                              ? "bg-sky-50 text-sky-800 border-sky-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Sent">Sent</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{q.customerName}</div>
                        <a
                          href={`tel:${q.customerPhone}`}
                          className="text-[#082B4C] font-semibold text-xs mt-0.5 inline-flex items-center gap-1 hover:underline"
                        >
                          <Phone className="size-3 text-slate-400" />
                          <span>{q.customerPhone}</span>
                        </a>
                        <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{q.customerAddress}</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {q.systemCapacity}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {q.housingType || "Independent"} ({q.noOfFloors || "G+1"})
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                          {q.subsidyType || "National DBT"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Final Quoted</span>
                          <span className="font-black text-[#082B4C] text-sm">
                            ₹{(q.finalPrice || q.totalAmount || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">From the Hand</span>
                          <span className="font-black text-[#B83A16] text-sm">
                            ₹{(q.fromHand || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Date: {q.date}</span>
                        <span>Valid: {q.validUpto}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setViewingQuotation(q)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#082B4C] bg-white text-[#082B4C] hover:bg-slate-50 font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                        >
                          <Eye className="size-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openQuotationPdf(q)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#B83A16] text-white hover:bg-[#9a3012] font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                        >
                          <Printer className="size-3.5" />
                          <span>PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuotation(q.id, q.quotationNo)}
                          className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete quotation"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES & LEADS */}
          {activeTab === "inquiries" && (
            <div className="max-w-7xl mx-auto space-y-5">
              {/* Header Title Banner */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-1">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="inline-flex items-center rounded-md bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-sky-800">
                      LEADS &amp; INQUIRIES
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                      Customer Inquiries
                    </h1>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    Real-time customer inquiries from Calculator WhatsApp Quotes, Applied Solar Plans, Demo Bookings &amp; Contact forms.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Refresh from Database */}
                  <button
                    type="button"
                    onClick={() => {
                      fetchLiveInquiries();
                      showToast("Refreshing inquiries from database...");
                    }}
                    disabled={isRefreshingInquiries}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs disabled:opacity-60"
                    title="Refresh from MySQL Database"
                  >
                    <RefreshCw className={cn("size-3.5 text-slate-500", isRefreshingInquiries && "animate-spin text-primary")} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  {/* Export to CSV */}
                  <button
                    type="button"
                    onClick={handleExportInquiriesCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all cursor-pointer shadow-2xs"
                    title="Export all inquiries to CSV for Excel"
                  >
                    <FileText className="size-3.5 text-emerald-600" />
                    <span>Export CSV</span>
                  </button>

                  {/* Status Filter */}
                  <select
                    value={inquiryStatusFilter}
                    onChange={(e) => setInquiryStatusFilter(e.target.value as any)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                  >
                    <option value="ALL">All Status ({inquiries.length})</option>
                    <option value="New">New ({newInquiriesCount})</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Completed">Completed</option>
                  </select>

                  {/* Search Input */}
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search inquiries, phone, ref…"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full sm:w-60 rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Source / Category Filter Tabs (Swipeable on mobile, wrapping on desktop) */}
              <div className="flex items-center gap-2 border-b border-slate-200/90 pb-3 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setInquiryTypeFilter("ALL")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                    inquiryTypeFilter === "ALL"
                      ? "bg-[#082B4C] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  )}
                >
                  <span>All Inquiries</span>
                  <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-mono", inquiryTypeFilter === "ALL" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")}>
                    {inquiries.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryTypeFilter("WHATSAPP")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                    inquiryTypeFilter === "WHATSAPP"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300"
                  )}
                >
                  <PhoneCall className={cn("size-3.5", inquiryTypeFilter === "WHATSAPP" ? "text-white" : "text-emerald-500")} />
                  <span>WhatsApp Quotes</span>
                  <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-mono", inquiryTypeFilter === "WHATSAPP" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700 font-bold")}>
                    {whatsappInquiriesCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryTypeFilter("APPLIED_PLAN")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                    inquiryTypeFilter === "APPLIED_PLAN"
                      ? "bg-[#D9410E] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
                  )}
                >
                  <CheckCircle2 className={cn("size-3.5", inquiryTypeFilter === "APPLIED_PLAN" ? "text-white" : "text-[#D9410E]")} />
                  <span>Applied Solar Plans</span>
                  <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-mono", inquiryTypeFilter === "APPLIED_PLAN" ? "bg-white/20 text-white" : "bg-orange-50 text-orange-700 font-bold")}>
                    {appliedPlanInquiriesCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryTypeFilter("DEMO")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                    inquiryTypeFilter === "DEMO"
                      ? "bg-sky-600 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300"
                  )}
                >
                  <Calendar className={cn("size-3.5", inquiryTypeFilter === "DEMO" ? "text-white" : "text-sky-500")} />
                  <span>Demo Bookings</span>
                  <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-mono", inquiryTypeFilter === "DEMO" ? "bg-white/20 text-white" : "bg-sky-50 text-sky-700 font-bold")}>
                    {demoInquiriesCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryTypeFilter("GENERAL")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap",
                    inquiryTypeFilter === "GENERAL"
                      ? "bg-slate-700 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  )}
                >
                  <MessageSquare className={cn("size-3.5", inquiryTypeFilter === "GENERAL" ? "text-white" : "text-slate-400")} />
                  <span>Contact Inquiries</span>
                  <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-mono", inquiryTypeFilter === "GENERAL" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")}>
                    {generalInquiriesCount}
                  </span>
                </button>
              </div>

              {/* Inquiries Desktop Table (Visible on xl+ screens with min-w-[920px]) */}
              <div className="hidden xl:block rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[920px] text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-5 py-3.5">Customer &amp; Source</th>
                        <th className="px-5 py-3.5">Contact Details</th>
                        <th className="px-5 py-3.5">Service / System</th>
                        <th className="px-5 py-3.5">Location</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                            No inquiries found matching your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => {
                          const badge = getInquirySourceBadge(inq);
                          const BadgeIcon = badge.icon;
                          return (
                            <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-5 py-3.5 font-bold text-[#082B4C] whitespace-nowrap">
                                <div className="text-sm font-extrabold">{inq.name}</div>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className={cn("inline-flex items-center gap-1 text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-md border", badge.bg)}>
                                    <BadgeIcon className="size-2.5" />
                                    <span>{badge.label}</span>
                                  </span>
                                  <span className="text-[10px] font-normal text-slate-400">{inq.date}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 whitespace-nowrap">
                                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                  <Phone className="size-3 text-slate-400" />
                                  <a href={`tel:${inq.phone}`} className="hover:text-primary">
                                    {inq.phone}
                                  </a>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                                  <Mail className="size-3 text-slate-400" />
                                  <a href={`mailto:${inq.email}`} className="hover:text-primary">
                                    {inq.email}
                                  </a>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 font-semibold text-slate-700 max-w-[220px]">
                                <div className="truncate font-bold text-[#082B4C]">{inq.service}</div>
                                {inq.notes && (
                                  <div className="text-[10.5px] text-slate-500 truncate mt-0.5">
                                    {inq.notes}
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <MapPin className="size-3 text-amber-500 shrink-0" />
                                  <span>{inq.location}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5 whitespace-nowrap">
                                <select
                                  value={inq.status}
                                  onChange={(e) =>
                                    handleUpdateInquiryStatus(
                                      inq.id,
                                      e.target.value as "New" | "Contacted" | "Completed"
                                    )
                                  }
                                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                                    inq.status === "New"
                                      ? "bg-amber-50 text-amber-800 border-amber-200"
                                      : inq.status === "Contacted"
                                      ? "bg-sky-50 text-sky-800 border-sky-200"
                                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  }`}
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                              <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* View Details */}
                                  <button
                                    type="button"
                                    onClick={() => setViewingInquiry(inq)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-[#082B4C] hover:bg-slate-100 transition-all cursor-pointer"
                                    title="View full calculation & lead details"
                                  >
                                    <Eye className="size-3.5" />
                                  </button>
                                  {/* WhatsApp Customer */}
                                  <a
                                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer"
                                    title="Chat on WhatsApp"
                                  >
                                    <PhoneCall className="size-3.5" />
                                  </a>
                                  {/* Call Customer */}
                                  <a
                                    href={`tel:${inq.phone}`}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
                                    title="Call customer"
                                  >
                                    <Phone className="size-3.5" />
                                  </a>
                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                                    title="Delete inquiry"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiries Responsive Cards View (Phones: 1-col, Tablets: 2-cols) */}
              <div className="xl:hidden">
                {filteredInquiries.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center text-slate-400 text-xs">
                    No inquiries found matching your filter criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredInquiries.map((inq) => {
                      const badge = getInquirySourceBadge(inq);
                      const BadgeIcon = badge.icon;
                      return (
                        <div key={inq.id} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col justify-between gap-3">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="font-extrabold text-[#082B4C] text-sm">{inq.name}</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className={cn("inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md border", badge.bg)}>
                                    <BadgeIcon className="size-2.5" />
                                    <span>{badge.label}</span>
                                  </span>
                                  <span className="text-[10px] text-slate-400">{inq.date}</span>
                                </div>
                              </div>
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  handleUpdateInquiryStatus(
                                    inq.id,
                                    e.target.value as "New" | "Contacted" | "Completed"
                                  )
                                }
                                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                                  inq.status === "New"
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : inq.status === "Contacted"
                                    ? "bg-sky-50 text-sky-800 border-sky-200"
                                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>

                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                                Requested System &amp; Location
                              </span>
                              <div className="font-bold text-[#082B4C]">{inq.service}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                                <MapPin className="size-3 text-amber-500" />
                                <span>{inq.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setViewingInquiry(inq)}
                                className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-[#082B4C] font-bold text-xs"
                              >
                                <Eye className="size-3" />
                                <span>View</span>
                              </button>
                              <a
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-xs"
                              >
                                <PhoneCall className="size-3" />
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`tel:${inq.phone}`}
                                className="inline-flex items-center gap-1 py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs"
                              >
                                <Phone className="size-3" />
                                <span>Call</span>
                              </a>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* VIEW INQUIRY DETAILS MODAL */}
              {viewingInquiry && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
                >
                  <div className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => setViewingInquiry(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="size-5" />
                    </button>

                    {/* Modal Header */}
                    <div className="pr-8 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        {(() => {
                          const badge = getInquirySourceBadge(viewingInquiry);
                          const IconComp = badge.icon;
                          return (
                            <span className={cn("inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border", badge.bg)}>
                              <IconComp className="size-3" />
                              <span>{badge.label}</span>
                            </span>
                          );
                        })()}
                        <span className="text-[11px] text-slate-400 font-medium">
                          {viewingInquiry.date}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#082B4C]">
                        {viewingInquiry.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {viewingInquiry.service}
                      </p>
                    </div>

                    {/* Contact & Location Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone / WhatsApp</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs sm:text-sm font-black text-[#082B4C]">{viewingInquiry.phone}</span>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${viewingInquiry.phone}`}
                              className="p-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-primary"
                              title="Call"
                            >
                              <Phone className="size-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/${viewingInquiry.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                              title="Chat on WhatsApp"
                            >
                              <PhoneCall className="size-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Email Address</span>
                        <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                          <Mail className="size-3.5 text-slate-400 shrink-0" />
                          <a
                            href={`mailto:${viewingInquiry.email}`}
                            className="text-xs font-bold text-slate-700 hover:text-primary truncate block"
                            title={viewingInquiry.email}
                          >
                            {viewingInquiry.email || "No email"}
                          </a>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">City / Location</span>
                        <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#082B4C] mt-1">
                          <MapPin className="size-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{viewingInquiry.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* System Calculations & Requirements Breakdown */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Full Sizing &amp; Calculation Breakdown
                      </span>
                      <div className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/80 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-mono">
                        {viewingInquiry.notes || viewingInquiry.service}
                      </div>
                    </div>

                    {/* Status Changer & Quick Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-xs font-bold text-slate-600">Status:</span>
                        <select
                          value={viewingInquiry.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as "New" | "Contacted" | "Completed";
                            handleUpdateInquiryStatus(viewingInquiry.id, newStatus);
                            setViewingInquiry({ ...viewingInquiry, status: newStatus });
                          }}
                          className={cn(
                            "rounded-lg px-2.5 py-1 text-xs font-bold border transition-colors cursor-pointer",
                            viewingInquiry.status === "New"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : viewingInquiry.status === "Contacted"
                              ? "bg-sky-50 text-sky-800 border-sky-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          )}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto justify-end">
                        <a
                          href={`https://wa.me/${viewingInquiry.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs transition-all w-full sm:w-auto text-center"
                        >
                          <PhoneCall className="size-3.5" />
                          <span>Chat on WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setViewingInquiry(null)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm text-center"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* 3. ADD / EDIT SERVICE MODAL */}
      {isServiceModalOpen && (
        <ServiceModal
          service={editingService}
          onClose={() => {
            setIsServiceModalOpen(false);
            setEditingService(null);
          }}
          onSave={handleSaveService}
        />
      )}

      {/* 4. ADD / EDIT PROJECT MODAL */}
      {isProjectModalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
          onSave={(projectData) => {
            let updated: Project[];
            if (editingProject) {
              updated = projects.map((p) =>
                p.id === editingProject.id ? { ...p, ...projectData } : p
              );
              showToast("Project updated successfully!");
            } else {
              const newProj: Project = {
                ...projectData,
                id: `p-${Date.now()}`,
                slug: projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                images: [projectData.image],
                placeholder: false,
                overview: projectData.summary,
                systemDetails: {
                  panelType: "Mono PERC High Efficiency",
                  inverterType: "String Inverter",
                  mountingStructure: "Galvanized Iron Rooftop Structure",
                  monitoring: "Smart WiFi Cloud Portal",
                  warranty: "25 Years Performance",
                },
                highlights: ["Full EPC Support", "Net Metering Approvals", "5 Years AMC Guarantee"],
              };
              updated = [newProj, ...projects];
              showToast("New project added successfully!");
            }
            setProjects(updated);
            localStorage.setItem("amaravati_admin_projects", JSON.stringify(updated));
            setIsProjectModalOpen(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* 5. ADD / EDIT QUOTATION MODAL */}
      {isQuotationModalOpen && (
        <QuotationModal
          onClose={() => setIsQuotationModalOpen(false)}
          onSave={handleSaveQuotation}
          existingQuotationNos={quotations.map((q) => q.quotationNo)}
        />
      )}

      {/* 6. VIEW & PRINT QUOTATION MODAL */}
      {viewingQuotation && (
        <QuotationViewModal
          quotation={viewingQuotation}
          onClose={() => setViewingQuotation(null)}
        />
      )}

      {/* 7. CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={(msg) => showToast(msg)}
          adminEmail={adminEmail}
        />
      )}
    </div>
  );
}

// =========================================================================
// CHANGE PASSWORD MODAL COMPONENT (INSTANT PASSWORD UPDATE FOR LOGGED-IN ADMIN)
// =========================================================================
function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
  adminEmail,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  adminEmail: string;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanNew = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (cleanNew.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }
    if (cleanNew !== cleanConfirm) {
      setError("New password and Confirm Password do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword: cleanNew,
          confirmPassword: cleanConfirm,
        }),
      });

      const data = await res.json().catch(() => ({
        success: false,
        error: "Server response error. Please try again.",
      }));

      if ((res.ok || data.success) && data.success) {
        setSuccess(data.message || "Password updated successfully!");
        onSuccess(data.message || "Password changed successfully! Active immediately.");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          onClose();
        }, 1100);
      } else {
        setError(data.error || "Failed to update password. Please try again.");
      }
    } catch (err: any) {
      console.error("Change password error:", err);
      setError("Network connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = newPassword.trim().length >= 8 && newPassword.trim() === confirmPassword.trim();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Navy Header */}
        <div className="bg-[#082B4C] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <KeyRound className="size-5" />
            </div>
            <div className="min-w-0">
              <h3 id="change-password-modal-title" className="text-base font-extrabold tracking-tight truncate">
                Change Admin Password
              </h3>
              <p className="text-xs text-slate-300 font-medium truncate max-w-[220px]">
                {adminEmail}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-700 flex items-start gap-2">
              <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="flex-1 leading-relaxed">{success}</div>
            </div>
          )}

          {/* Helper notice */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>Enter your new password below. It will update immediately for your next login.</span>
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              New Password (min 8 chars) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter strong new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all font-mono"
                required
                minLength={8}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Minimum 8 characters with letters, numbers, and symbols.
            </p>
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 focus:border-[#082B4C] transition-all font-mono"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="text-[11px] text-red-500 mt-1 font-semibold">
                Passwords do not match
              </p>
            )}
            {newPassword && confirmPassword && newPassword === confirmPassword && (
              <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>Passwords match</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-sm text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-98 disabled:opacity-40 cursor-pointer text-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin text-amber-400" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <KeyRound className="size-3.5 text-amber-400" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Component for Adding/Editing Service
function ServiceModal({
  service,
  onClose,
  onSave,
}: {
  service: AdminService | null;
  onClose: () => void;
  onSave: (data: Omit<AdminService, "id"> & { id?: string | undefined }) => void;
}) {
  const [title, setTitle] = useState(service?.title || "");
  const [order, setOrder] = useState<number>(service?.order || 1);
  const [category, setCategory] = useState<AdminService["category"]>(
    service?.category || "SOLAR"
  );
  const [description, setDescription] = useState(service?.description || "");
  const [image, setImage] = useState(service?.image || residential);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      ...(service?.id ? { id: service.id } : {}),
      title,
      order: Number(order),
      category,
      description,
      image,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-extrabold text-[#082B4C]">
            {service ? "Edit Service" : "Add New Service"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-600 mb-1">Service Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Residential Rooftop Solar"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AdminService["category"])}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
              >
                <option value="SOLAR">SOLAR</option>
                <option value="ELECTRICAL">ELECTRICAL</option>
                <option value="EV CHARGING">EV CHARGING</option>
                <option value="MAINTENANCE / AMC">MAINTENANCE / AMC</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Display Order</label>
              <input
                type="number"
                min={1}
                required
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service details and benefits…"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Image Thumbnail</label>
            <div className="grid grid-cols-4 gap-2">
              {[residential, commercial, industrial, solarFarm].map((img, i) => (
                <div
                  key={i}
                  onClick={() => setImage(img)}
                  className={`h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    image === img ? "border-[#B83A16] scale-95 shadow" : "border-slate-200 opacity-60"
                  }`}
                >
                  <img src={img} alt="Thumbnail choice" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
            >
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Component for Adding/Editing Project
function ProjectModal({
  project,
  onClose,
  onSave,
}: {
  project: Project | null;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [title, setTitle] = useState(project?.title || "");
  const [category, setCategory] = useState<Project["category"]>(
    project?.category || "Residential"
  );
  const [capacity, setCapacity] = useState(project?.capacity || "10 kW");
  const [location, setLocation] = useState(project?.location || "Vijayawada, AP");
  const [savings, setSavings] = useState(project?.savings || "₹85,000 / year");
  const [annualGeneration, setAnnualGeneration] = useState(
    project?.annualGeneration || "14,500 kWh"
  );
  const [co2Saved, setCo2Saved] = useState(project?.co2Saved || "12.2 Tons");
  const [summary, setSummary] = useState(project?.summary || "");
  const [image, setImage] = useState(project?.image || commercial);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title,
      category,
      capacity,
      location,
      savings,
      annualGeneration,
      co2Saved,
      summary,
      image,
      clientType: `${category} Rooftop`,
      completionTime: "10 Days",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-extrabold text-[#082B4C]">
            {project ? "Edit Project" : "Add New Project"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-600 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Commercial Rooftop Solar Installation"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project["category"])}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Capacity</label>
              <input
                type="text"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. 25 kW"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Vijayawada, AP"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Annual Savings</label>
              <input
                type="text"
                required
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                placeholder="e.g. ₹2,40,000 / year"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Summary Description</label>
            <textarea
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief project details, scope and impact…"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal Component for Creating an Official Quotation
function QuotationModal({
  onClose,
  onSave,
  existingQuotationNos,
}: {
  onClose: () => void;
  onSave: (data: Omit<AdminQuotation, "id"> & { id?: string | undefined }) => void;
  existingQuotationNos: string[];
}) {
  // Auto-generated, e.g. ASS/2026/1121/001 (updates live if the list refreshes while the form is open)
  const quotationNo = getNextQuotationNo(existingQuotationNos);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+91 ");
  const [customerAddress, setCustomerAddress] = useState("");

  // Format today's date & valid upto (15 days from now)
  const todayStr = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());
  // Local YYYY-MM-DD (for the native date picker)
  const toIsoLocal = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const todayIso = toIsoLocal(new Date());
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 15);

  const [date] = useState(todayStr);
  const [validUptoIso, setValidUptoIso] = useState(() => toIsoLocal(futureDate));
  // Display format saved & printed on the quotation, e.g. "06 Dec 2026"
  const validUpto = (() => {
    const [y, m, d] = validUptoIso.split("-").map(Number);
    if (!y || !m || !d) return "";
    return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
  })();

  // 1. Site Details
  const [housingType, setHousingType] = useState<"Independent" | "Apartment" | "Commercial">("Independent");
  const [subsidyType, setSubsidyType] = useState<"Non- Subsidy" | "Subsidy National DBT">("Subsidy National DBT");
  const [noOfFloors, setNoOfFloors] = useState<string>("G+1");
  const [customFloors, setCustomFloors] = useState<string>("");
  const [sanctionedPhase, setSanctionedPhase] = useState<"Single Phase" | "Three Phase">("Single Phase");
  const [sanctionedLoad, setSanctionedLoad] = useState<string>("3 kW");
  const [cluster, setCluster] = useState<string>("Vijayawada Urban");
  const [discom, setDiscom] = useState<string>("APCPDCL");

  // 2. Structure Details
  const [roofType, setRoofType] = useState<"Manglore tiles" | "Tin shed" | "RCC">("RCC");
  const [structureType, setStructureType] = useState<"Pre fab - 4ft" | "Pre fab - 6ft" | "Pre fab - 8ft">("Pre fab - 6ft");
  const [noOfModules, setNoOfModules] = useState<number | string>(6);
  const [overhangPossibility, setOverhangPossibility] = useState<"Yes" | "No">("No");
  const [overhangSide, setOverhangSide] = useState<"North" | "South" | "East" | "West" | "">("");
  const [amc, setAmc] = useState<"Included" | "Not Included">("Included");

  // Module type → kW per module; Project Size = modules × factor
  const [moduleType, setModuleType] = useState<ModuleType>("610Wp-Topcon");
  const moduleFactor = MODULE_TYPES.find((m) => m.label === moduleType)?.kw ?? 0.61;
  const projectSizeKw = Number(((Number(noOfModules) || 0) * moduleFactor).toFixed(2));
  const systemCapacity = `${projectSizeKw} kW On-Grid Rooftop`;

  // 3. Bill Corrections
  const [loadChange, setLoadChange] = useState<"Yes" | "No">("No");
  const [phaseChange, setPhaseChange] = useState<"Yes" | "No">("No");
  const [nameChange, setNameChange] = useState<"Yes" | "No">("No");

  // 4. Payment Summary
  const [paymentMode, setPaymentMode] = useState<"Direct" | "EMI">("Direct");
  // Admin enters these manually (digits only)
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [subsidyAmount, setSubsidyAmount] = useState<string>("");
  const [paymentTouched, setPaymentTouched] = useState(false);
  const onlyDigits = (v: string) => v.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 9);

  // Calculated fields
  const totalNum = Number(totalPrice) || 0;
  const discountNum = Number(discount) || 0;
  const subsidyNum = subsidyType === "Non- Subsidy" ? 0 : Number(subsidyAmount) || 0;
  const finalPrice = Math.max(0, totalNum - discountNum);
  const fromHand = Math.max(0, finalPrice - subsidyNum);

  const totalError = totalNum <= 0 ? "Enter the total price" : "";
  const discountError = discountNum > totalNum ? "Discount cannot be more than total price" : "";
  const subsidyError =
    subsidyType === "Subsidy National DBT" && subsidyAmount === ""
      ? "Enter the subsidy amount"
      : subsidyNum > finalPrice
        ? "Subsidy cannot be more than final price"
        : "";
  const paymentValid = !totalError && !discountError && !subsidyError;

  // Scope of supply (bill of materials) printed on the quotation — derived from the form, no per-item prices
  const items: AdminQuotationItem[] = [
    { id: "1", description: "Solar PV Modules", specification: `${moduleType} high-efficiency modules`, qty: Number(noOfModules) || 0, unitPrice: 0, amount: 0 },
    { id: "2", description: "On-Grid Solar Inverter", specification: `${sanctionedPhase}, ${projectSizeKw} kW class with WiFi monitoring`, qty: 1, unitPrice: 0, amount: 0 },
    { id: "3", description: "Module Mounting Structure", specification: `${structureType} GI elevated structure for ${roofType} roof`, qty: 1, unitPrice: 0, amount: 0 },
    { id: "4", description: "ACDB / DCDB, Cabling & Earthing", specification: "SPD, MCBs, DC/AC cables, earthing kit & lightning arrestor", qty: 1, unitPrice: 0, amount: 0 },
    { id: "5", description: "Installation, Net-metering & Commissioning", specification: `${discom} liaison, net-meter & subsidy portal assistance`, qty: 1, unitPrice: 0, amount: 0 },
  ];

  const handleSubsidyTypeSelect = (type: "Non- Subsidy" | "Subsidy National DBT") => {
    setSubsidyType(type);
    if (type === "Non- Subsidy") setSubsidyAmount("");
  };

  const phoneDigits = customerPhone.replace(/^\+91\s*/, "").replace(/\D/g, "");
  const phoneValid = /^[6-9]\d{9}$/.test(phoneDigits);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const nameValid = /^[A-Za-z][A-Za-z .']{1,}$/.test(customerName.trim());

  const handlePhoneChange = (val: string) => {
    // Allow only digits after the fixed +91 prefix, max 10 digits
    const digits = val.replace(/^\+91\s*/, "").replace(/\D/g, "").slice(0, 10);
    const formatted = digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
    setCustomerPhone(`+91 ${formatted}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    setNameTouched(true);
    setPaymentTouched(true);
    if (!nameValid || !phoneValid || !validUpto || !paymentValid) return;

    const resolvedFloors = noOfFloors === "Other" ? (customFloors.trim() || "Ground") : noOfFloors;

    onSave({
      quotationNo,
      date,
      validUpto,
      customerName,
      customerPhone,
      customerAddress: customerAddress || "Vijayawada, Andhra Pradesh",
      systemCapacity,
      items,
      subtotal: finalPrice,
      gstAmount: 0,
      totalAmount: finalPrice,
      terms: [
        "Price valid for 15 days from issuance date.",
        "Includes complete system supply, structure fabrication, installation, and commissioning.",
        `Comprehensive AMC: ${amc === "Included" ? "5 years included" : "Available on request"}.`,
        "Complete assistance with DISCOM net-metering approvals and National DBT subsidy portal.",
        `Payment Mode: ${paymentMode}.`,
      ],
      status: "Pending",

      // Site Details
      housingType,
      subsidyType,
      noOfFloors: resolvedFloors,
      sanctionedPhase,
      sanctionedLoad,
      cluster,
      discom,

      // Structure Details
      roofType,
      structureType,
      noOfModules,
      moduleType,
      projectSize: `${projectSizeKw} kW`,
      overhangPossibility,
      overhangSide: overhangPossibility === "Yes" ? overhangSide : "",
      amc,

      // Bill Corrections
      loadChange,
      phaseChange,
      nameChange,

      // Payment Summary
      paymentMode,
      totalPrice: totalNum,
      discount: discountNum,
      finalPrice,
      subsidyAmount: subsidyNum,
      fromHand,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-3.5 sm:p-6 md:p-7 shadow-2xl my-4 sm:my-6 max-h-[94vh] overflow-y-auto border border-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid size-8 sm:size-9 place-items-center rounded-xl bg-[#082B4C] text-[#F5A623] shadow-xs shrink-0">
              <FileText className="size-4 sm:size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#082B4C] uppercase tracking-tight">Create Quotation</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 sm:line-clamp-none">Enter site survey details, structure specifications, bill corrections, and payment summary</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-6 text-xs font-semibold">
          {/* Header Row: Quotation Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200">
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Quotation No</label>
              <input
                type="text"
                readOnly
                tabIndex={-1}
                value={quotationNo}
                title="Auto-generated: ASS / Year / MonthDay / Number of the day"
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-[#B83A16] bg-orange-50/60 font-mono font-bold cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Quotation Date</label>
              <input
                type="text"
                disabled
                value={date}
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-500 bg-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-bold">Valid Upto</label>
              <input
                type="date"
                required
                min={todayIso}
                value={validUptoIso}
                onChange={(e) => setValidUptoIso(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Tab") e.preventDefault();
                }}
                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-slate-800 bg-white cursor-pointer"
              />
            </div>
          </div>

          {/* Customer & Basic Information */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-3.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#082B4C] flex items-center gap-1.5">
              <span>Customer & System Overview</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value.replace(/[^A-Za-z .']/g, ""))}
                  onBlur={() => setNameTouched(true)}
                  maxLength={60}
                  placeholder="e.g. K. Satyanarayana"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${nameTouched && !nameValid ? "border-red-500" : "border-slate-300"}`}
                />
                {nameTouched && !nameValid && (
                  <p className="mt-1 text-[11px] font-semibold text-red-600">Enter a valid name (letters only, min 2 characters)</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Contact Phone Number *</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  required
                  value={customerPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => setPhoneTouched(true)}
                  placeholder="+91 98480 33445"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${phoneTouched && !phoneValid ? "border-red-500" : "border-slate-300"}`}
                />
                {phoneTouched && !phoneValid && (
                  <p className="mt-1 text-[11px] font-semibold text-red-600">Enter a valid 10-digit mobile number starting with 6-9</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Site / Installation Address</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="e.g. Ring Road, Vijayawada, Andhra Pradesh - 520010"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>
          </div>

          {/* 1. SITE DETAILS */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <div className="size-6 rounded-lg bg-sky-100 text-sky-800 grid place-items-center font-bold text-xs">1</div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Site Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Housing Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Housing Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {(["Independent", "Apartment", "Commercial"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setHousingType(type)}
                      className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        housingType === type
                          ? "bg-[#082B4C] text-white border-[#082B4C] shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subsidy Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Subsidy Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {(["Non- Subsidy", "Subsidy National DBT"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSubsidyTypeSelect(type)}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        subsidyType === type
                          ? "bg-[#B83A16] text-white border-[#B83A16] shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* No of Floors */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">No of Floors</label>
                <div className="flex gap-1.5">
                  <select
                    value={noOfFloors}
                    onChange={(e) => setNoOfFloors(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                  >
                    <option value="Ground">Ground</option>
                    <option value="G+1">G+1</option>
                    <option value="G+2">G+2</option>
                    <option value="G+3">G+3</option>
                    <option value="G+4">G+4</option>
                    <option value="Other">Other (Custom)</option>
                  </select>
                  {noOfFloors === "Other" && (
                    <input
                      type="text"
                      placeholder="e.g. G+5"
                      value={customFloors}
                      onChange={(e) => setCustomFloors(e.target.value)}
                      className="w-24 rounded-xl border border-slate-300 px-2 py-2 text-slate-800 bg-white"
                    />
                  )}
                </div>
              </div>

              {/* Sanctioned Phase */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Sanctioned Phase</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Single Phase", "Three Phase"] as const).map((ph) => (
                    <button
                      key={ph}
                      type="button"
                      onClick={() => setSanctionedPhase(ph)}
                      className={`py-2 px-1.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        sanctionedPhase === ph
                          ? "bg-[#082B4C] text-white border-[#082B4C]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {ph}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sanctioned Load */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Sanctioned Load</label>
                <input
                  type="text"
                  value={sanctionedLoad}
                  onChange={(e) => setSanctionedLoad(e.target.value)}
                  placeholder="e.g. 3 kW / 5 kW"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cluster */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Cluster</label>
                <input
                  type="text"
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value)}
                  placeholder="e.g. Vijayawada Urban / Cluster 1"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              {/* DISCOM */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">DISCOM</label>
                <input
                  type="text"
                  value={discom}
                  onChange={(e) => setDiscom(e.target.value)}
                  placeholder="e.g. APCPDCL / APEPDCL / APSPDCL"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>
          </div>

          {/* 2. STRUCTURE DETAILS */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <div className="size-6 rounded-lg bg-amber-100 text-amber-800 grid place-items-center font-bold text-xs">2</div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Structure Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Roof Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Roof Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {(["Manglore tiles", "Tin shed", "RCC"] as const).map((roof) => (
                    <button
                      key={roof}
                      type="button"
                      onClick={() => setRoofType(roof)}
                      className={`py-2 px-1.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        roofType === roof
                          ? "bg-[#082B4C] text-white border-[#082B4C]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {roof}
                    </button>
                  ))}
                </div>
              </div>

              {/* Structure Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Structure Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {(["Pre fab - 4ft", "Pre fab - 6ft", "Pre fab - 8ft"] as const).map((struct) => (
                    <button
                      key={struct}
                      type="button"
                      onClick={() => setStructureType(struct)}
                      className={`py-2 px-1.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        structureType === struct
                          ? "bg-[#082B4C] text-white border-[#082B4C]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {struct}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Module Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Module Type</label>
                <select
                  value={moduleType}
                  onChange={(e) => setModuleType(e.target.value as ModuleType)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 cursor-pointer"
                >
                  {MODULE_TYPES.map((m) => (
                    <option key={m.label} value={m.label}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* No of Modules */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">No of Modules</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={noOfModules}
                  onChange={(e) => setNoOfModules(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 6 / 8 / 10"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              {/* Project Size (auto-calculated) */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">
                  Project Size <span className="text-slate-400 font-normal">(auto)</span>
                </label>
                <input
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={`${projectSizeKw} kW`}
                  className="w-full rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 font-extrabold text-[#B83A16] cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Overhang Possibility */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Overhang Possibility</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setOverhangPossibility(val);
                        if (val === "Yes" && !overhangSide) setOverhangSide("South");
                      }}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        overhangPossibility === val
                          ? val === "Yes" ? "bg-emerald-600 text-white border-emerald-600" : "bg-slate-700 text-white border-slate-700"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overhang Side (Conditional) */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">
                  Which Side? {overhangPossibility === "No" && <span className="text-slate-400 font-normal">(N/A)</span>}
                </label>
                <select
                  disabled={overhangPossibility === "No"}
                  value={overhangSide}
                  onChange={(e) => setOverhangSide(e.target.value as "North" | "South" | "East" | "West")}
                  className={`w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${
                    overhangPossibility === "No" ? "opacity-50 cursor-not-allowed bg-slate-100" : ""
                  }`}
                >
                  <option value="">Select Side</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
            </div>

            {/* AMC */}
            <div>
              <label className="block text-slate-700 mb-1.5 font-bold">AMC (Annual Maintenance Contract)</label>
              <div className="grid grid-cols-2 max-w-xs gap-2">
                {(["Included", "Not Included"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmc(val)}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                      amc === val
                        ? val === "Included" ? "bg-emerald-600 text-white border-emerald-600 shadow-xs" : "bg-slate-700 text-white border-slate-700 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. BILL CORRECTIONS */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <div className="size-6 rounded-lg bg-purple-100 text-purple-800 grid place-items-center font-bold text-xs">3</div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Bill Corrections</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Load Change */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-700 font-bold mb-2">Load Change</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setLoadChange(val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                        loadChange === val
                          ? val === "Yes" ? "bg-[#B83A16] text-white border-[#B83A16]" : "bg-slate-700 text-white border-slate-700"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phase Change */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-700 font-bold mb-2">Phase Change</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPhaseChange(val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                        phaseChange === val
                          ? val === "Yes" ? "bg-[#B83A16] text-white border-[#B83A16]" : "bg-slate-700 text-white border-slate-700"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Change */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-slate-700 font-bold mb-2">Name Change</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Yes", "No"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setNameChange(val)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                        nameChange === val
                          ? val === "Yes" ? "bg-[#B83A16] text-white border-[#B83A16]" : "bg-slate-700 text-white border-slate-700"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. PAYMENT SUMMARY */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg bg-emerald-100 text-emerald-800 grid place-items-center font-bold text-xs">4</div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C]">Payment Summary</h3>
              </div>

              {/* Mode of Payment Pills */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px] font-bold">Mode:</span>
                {(["Direct", "EMI"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`py-1 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      paymentMode === mode
                        ? "bg-[#082B4C] text-white border-[#082B4C] shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Total Price (₹) *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(onlyDigits(e.target.value))}
                  onBlur={() => setPaymentTouched(true)}
                  placeholder="Enter total price"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${paymentTouched && totalError ? "border-red-500" : "border-slate-300"}`}
                />
                {paymentTouched && totalError && <p className="mt-1 text-[11px] font-semibold text-red-600">{totalError}</p>}
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Discount (₹)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={discount}
                  onChange={(e) => setDiscount(onlyDigits(e.target.value))}
                  onBlur={() => setPaymentTouched(true)}
                  placeholder="0"
                  className={`w-full rounded-xl border px-3.5 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 ${paymentTouched && discountError ? "border-red-500" : "border-slate-300"}`}
                />
                {paymentTouched && discountError && <p className="mt-1 text-[11px] font-semibold text-red-600">{discountError}</p>}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Final Price (Total - Discount)</span>
                <span className="text-lg font-black text-[#082B4C]">₹{finalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">
                  Subsidy Amount (₹) {subsidyType === "Subsidy National DBT" ? "*" : <span className="text-slate-400 font-normal">(Non-Subsidy)</span>}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  disabled={subsidyType === "Non- Subsidy"}
                  value={subsidyType === "Non- Subsidy" ? "0" : subsidyAmount}
                  onChange={(e) => setSubsidyAmount(onlyDigits(e.target.value))}
                  onBlur={() => setPaymentTouched(true)}
                  placeholder="Enter subsidy amount"
                  className={`w-full rounded-xl border px-3.5 py-2 text-emerald-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${paymentTouched && subsidyError ? "border-red-500" : "border-slate-300"}`}
                />
                {paymentTouched && subsidyError && <p className="mt-1 text-[11px] font-semibold text-red-600">{subsidyError}</p>}
              </div>

              {/* From the Hand Highlight Box */}
              <div className="rounded-xl bg-[#082B4C] text-white p-3.5 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5A623] block">
                    FROM THE HAND (NET PAYABLE)
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5">Final Price minus DBT Subsidy</p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    ₹{fromHand.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Submit Footer (Responsive Stacking for Mobile) */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#B83A16] hover:bg-[#9a3012] text-white font-extrabold transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider text-center"
            >
              <Check className="size-4 stroke-[3]" />
              <span>Create Quotation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Admin sidebar navigation
const ADMIN_NAV = [
  { key: "services", label: "Services", Icon: Wrench },
  { key: "projects", label: "Projects", Icon: FolderGit2 },
  { key: "quotation", label: "Quotations", Icon: FileText },
  { key: "inquiries", label: "Inquiries", Icon: MessageSquare },
] as const;

// Date helpers for quotation filters ("21 Nov 2026" or ISO → "2026-11-21")
function toLocalIso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const MONTH_INDEX: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};
function quoteDateToIso(value: string | undefined): string {
  const v = (value || "").trim();
  if (!v) return "";
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const dmy = /^(\d{1,2})[\s-]+([A-Za-z]{3})[A-Za-z]*[\s-]+(\d{4})$/.exec(v);
  if (dmy) {
    const [, day = "", mon = "", year = ""] = dmy;
    const m = MONTH_INDEX[mon.toLowerCase()];
    if (m !== undefined) return `${year}-${String(m + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const t = new Date(v);
  return isNaN(t.getTime()) ? "" : toLocalIso(t);
}

// Opens the professional A4 quotation in a new tab (Print / Save as PDF)
function openQuotationPdf(quotation: AdminQuotation, existingWindow?: Window | null) {
  const w = existingWindow && !existingWindow.closed ? existingWindow : window.open("", "_blank");
  if (!w) return false;
  w.document.open();
  w.document.write(buildQuotationPrintHtml(quotation, new URL(logo, window.location.origin).href));
  w.document.close();
  return true;
}

// Quotation number: ASS/YYYY/MMDD/NNN — sequence restarts at 001 every day (server confirms the final number)
function getNextQuotationNo(existingNos: string[], now: Date = new Date()) {
  const prefix = `ASS/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}/`;
  let max = 0;
  for (const no of existingNos) {
    if (!no || !no.startsWith(prefix)) continue;
    const suffix = no.slice(prefix.length);
    if (/^\d+$/.test(suffix)) max = Math.max(max, Number(suffix));
  }
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

// Modal Component for Viewing and Printing Official Quotation (Panel 3 Match + Full Survey Data)
function QuotationViewModal({
  quotation,
  onClose,
}: {
  quotation: AdminQuotation;
  onClose: () => void;
}) {
  const handlePrint = () => openQuotationPdf(quotation);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl my-4 sm:my-6 max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Top Control Bar (Hidden when printed) */}
        <div className="print:hidden flex items-center justify-between p-3 sm:p-4 bg-[#082B4C] text-white">
          <div className="flex items-center gap-2 truncate">
            <Printer className="size-4 sm:size-5 text-[#F5A623] shrink-0" />
            <span className="font-black text-xs sm:text-sm tracking-wide uppercase truncate">
              Quotation — {quotation.quotationNo}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#B83A16] hover:bg-[#9a3012] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Printer className="size-3.5 sm:size-4" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 bg-white text-slate-800" id="printable-quotation">
          {/* Header: Company Details & Quotation Meta Box */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 pb-5 sm:pb-6 border-b-2 border-[#082B4C]">
            <div className="flex items-start sm:items-center gap-3">
              <img src={logo} alt="Amaravati Solar Solutions" width={1016} height={307} className="h-12 sm:h-16 w-auto object-contain shrink-0 mt-1 sm:mt-0" />
              <div>
                <h1 className="text-lg sm:text-2xl font-black text-[#082B4C] tracking-tight leading-none uppercase">
                  Amaravati Solar Solutions
                </h1>
                <p className="text-[11px] sm:text-xs font-bold text-[#B83A16] tracking-wide mt-1">
                  Roof Top Solar EPC • On-Grid • Off-Grid • Hybrid
                </p>
                <div className="text-[10px] sm:text-[11px] text-slate-600 mt-1.5 space-y-0.5 leading-tight">
                  <p>74-12/1-12/5, Electricity Colony, 9th Line, opp to Auto Nagar gate, Patamata, Vijayawada – 520010</p>
                  <p>Contact / WhatsApp: +91 63058 25402 | Mon - Sat: 10:00AM - 7:00PM</p>
                  <p>Email: sales@amaravatisolarsolutions.com | info@amaravatisolarsolutions.com</p>
                </div>
              </div>
            </div>

            {/* Right Meta Card (Navy Blue Block) */}
            <div className="w-full sm:w-60 bg-[#082B4C] text-white p-3.5 rounded-xl shrink-0 shadow-sm">
              <div className="text-[10px] font-bold text-[#F5A623] tracking-widest uppercase mb-1">
                OFFICIAL QUOTATION
              </div>
              <div className="text-xs font-semibold space-y-1">
                <div>
                  <span className="text-slate-300">Quote No:</span>{" "}
                  <span className="font-extrabold text-white">{quotation.quotationNo}</span>
                </div>
                <div>
                  <span className="text-slate-300">Date:</span>{" "}
                  <span className="font-bold text-white">{quotation.date}</span>
                </div>
                <div>
                  <span className="text-slate-300">Valid Upto:</span>{" "}
                  <span className="font-bold text-[#F5A623]">{quotation.validUpto}</span>
                </div>
                <div>
                  <span className="text-slate-300">Payment:</span>{" "}
                  <span className="font-bold text-emerald-400">{quotation.paymentMode || "Direct"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Proposed System Box */}
          <div className="my-5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#B83A16]">
              QUOTATION ISSUED TO:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-1.5 text-xs">
              <div>
                <p className="font-extrabold text-slate-900 text-sm">{quotation.customerName}</p>
                <p className="text-slate-600 mt-0.5">Contact: {quotation.customerPhone}</p>
                <p className="text-slate-500 mt-0.5">Site Address: {quotation.customerAddress}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">Proposed Solar System</span>
                <p className="font-black text-[#082B4C] text-sm mt-0.5">{quotation.systemCapacity}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Status: {quotation.status}
                </span>
              </div>
            </div>
          </div>

          {/* Site, Structure & Bill Corrections Survey Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            {/* Site Details Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#082B4C] block border-b border-slate-200 pb-1">
                Site Survey Details
              </span>
              <div><span className="text-slate-500">Housing Type:</span> <strong className="text-slate-800">{quotation.housingType || "Independent"}</strong></div>
              <div><span className="text-slate-500">Subsidy Scheme:</span> <strong className="text-emerald-700">{quotation.subsidyType || "Subsidy National DBT"}</strong></div>
              <div><span className="text-slate-500">Floors:</span> <strong className="text-slate-800">{quotation.noOfFloors || "G+1"}</strong></div>
              <div><span className="text-slate-500">Phase & Load:</span> <strong className="text-slate-800">{quotation.sanctionedPhase || "Single Phase"} • {quotation.sanctionedLoad || "3 kW"}</strong></div>
              <div><span className="text-slate-500">DISCOM:</span> <strong className="text-slate-800">{quotation.discom || "APCPDCL"}</strong> ({quotation.cluster || "Urban"})</div>
            </div>

            {/* Structure Details Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#082B4C] block border-b border-slate-200 pb-1">
                Structure & Technical Specs
              </span>
              <div><span className="text-slate-500">Roof Type:</span> <strong className="text-slate-800">{quotation.roofType || "RCC"}</strong></div>
              <div><span className="text-slate-500">Structure Type:</span> <strong className="text-slate-800">{quotation.structureType || "Pre fab - 6ft"}</strong></div>
              {quotation.moduleType && (
                <div><span className="text-slate-500">Module Type:</span> <strong className="text-slate-800">{quotation.moduleType}</strong></div>
              )}
              <div><span className="text-slate-500">No of Modules:</span> <strong className="text-slate-800">{quotation.noOfModules || 6} Panels</strong></div>
              {quotation.projectSize && (
                <div><span className="text-slate-500">Project Size:</span> <strong className="text-[#B83A16]">{quotation.projectSize}</strong></div>
              )}
              <div>
                <span className="text-slate-500">Overhang:</span>{" "}
                <strong className="text-slate-800">
                  {quotation.overhangPossibility === "Yes" ? `Yes (${quotation.overhangSide || "South"} side)` : "No"}
                </strong>
              </div>
              <div><span className="text-slate-500">AMC:</span> <strong className="text-emerald-700">{quotation.amc || "Included"}</strong></div>
            </div>

            {/* Bill Corrections Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#082B4C] block border-b border-slate-200 pb-1">
                Bill Corrections Required
              </span>
              <div><span className="text-slate-500">Load Change:</span> <strong className={quotation.loadChange === "Yes" ? "text-amber-700" : "text-slate-800"}>{quotation.loadChange || "No"}</strong></div>
              <div><span className="text-slate-500">Phase Change:</span> <strong className={quotation.phaseChange === "Yes" ? "text-amber-700" : "text-slate-800"}>{quotation.phaseChange || "No"}</strong></div>
              <div><span className="text-slate-500">Name Change:</span> <strong className={quotation.nameChange === "Yes" ? "text-amber-700" : "text-slate-800"}>{quotation.nameChange || "No"}</strong></div>
              <div className="pt-1.5 text-[10px] text-slate-500">Liaison and paperwork handled by Amaravati Solar.</div>
            </div>
          </div>

          {/* Investment Summary (same layout as the A4 PDF) */}
          {(() => {
            const total = quotation.totalPrice || quotation.totalAmount || 0;
            const discount = quotation.discount || 0;
            const finalPrice = quotation.finalPrice || quotation.totalAmount || 0;
            const subsidy = quotation.subsidyAmount || 0;
            const fromHand = quotation.fromHand || Math.max(0, finalPrice - subsidy);
            return (
              <div className="my-5 rounded-xl border border-orange-200 overflow-hidden">
                <div className="flex items-center justify-between gap-2 bg-[#E8590C] text-white px-4 sm:px-5 py-2.5">
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em]">Investment Summary</span>
                  <span className="text-[10px] sm:text-[11px] font-bold rounded-full border border-white/40 bg-white/15 px-2.5 py-0.5">
                    Payment Mode: {quotation.paymentMode || "Direct"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1.15fr_1fr]">
                  <div className="px-4 sm:px-5 py-3 text-xs sm:text-sm">
                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-b border-dashed border-orange-100">
                      <span className="text-slate-600">
                        Total System Price
                        <span className="block text-[10px] text-slate-400">Supply, installation &amp; commissioning</span>
                      </span>
                      <span className="font-bold text-slate-900">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-baseline justify-between gap-3 py-2.5 border-b border-dashed border-orange-100 text-emerald-700">
                        <span>Special Discount</span>
                        <span className="font-bold">− ₹{discount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t-2 border-slate-900 mt-1 font-extrabold text-slate-900">
                      <span>Final Price</span>
                      <span>₹{finalPrice.toLocaleString("en-IN")}</span>
                    </div>
                    {subsidy > 0 && (
                      <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-dashed border-orange-100 text-emerald-700">
                        <span>
                          Govt. DBT Subsidy
                          <span className="block text-[10px] text-slate-400">PM Surya Ghar – National DBT</span>
                        </span>
                        <span className="font-bold">− ₹{subsidy.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-gradient-to-br from-[#E8590C] to-[#F59E0B] text-white px-5 py-5 flex flex-col justify-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] opacity-90">Net Investment (From the Hand)</span>
                    <span className="text-3xl sm:text-4xl font-black tracking-tight my-1.5">₹{fromHand.toLocaleString("en-IN")}</span>
                    <span className="text-[11px] font-semibold border-t border-white/40 pt-2 leading-snug">
                      Rupees {numberToIndianWords(fromHand)} Only
                    </span>
                  </div>
                </div>
                {subsidy > 0 && (
                  <div className="bg-orange-50 border-t border-orange-200 px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] text-orange-900">
                    Govt. subsidy is credited directly to the customer&apos;s bank account after commissioning &amp; DISCOM inspection.
                  </div>
                )}
              </div>
            );
          })()}

          {/* Terms and Conditions */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C] mb-2">
              Terms & Conditions:
            </h3>
            <ol className="list-decimal list-inside text-[10px] sm:text-[11px] text-slate-600 space-y-1">
              {quotation.terms.map((term, i) => (
                <li key={i}>{/^Payment Mode:/i.test(term) ? `Payment Mode: ${quotation.paymentMode || "Direct"}.` : term}</li>
              ))}
            </ol>
          </div>

          {/* Signatures & Footer */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div>
              <div className="h-10 sm:h-12 border-b border-dashed border-slate-300 w-44" />
              <p className="mt-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase">Customer Acceptance Signature</p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#082B4C] uppercase">For AMARAVATI SOLAR SOLUTIONS</p>
              <div className="h-8 sm:h-10 mt-1" />
              <p className="text-[10px] sm:text-[11px] font-extrabold text-slate-700">Authorized Signatory</p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center text-[10px] text-slate-400 font-medium border-t border-slate-100 pt-3">
            Thank you for choosing AMARAVATI SOLAR SOLUTIONS — Clean • Sustainable • Reliable Energy
          </div>
        </div>
      </div>
    </div>
  );
}
