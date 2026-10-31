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
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import logo from "@/assets/logo.png";
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
  const [quotationSearch, setQuotationSearch] = useState<string>("");
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
    try {
      const [enqRes, bookRes] = await Promise.all([
        fetch("/api/enquiries").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch("/api/bookings").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);

      const liveItems: AdminInquiry[] = [];

      if (enqRes?.success && Array.isArray(enqRes.data)) {
        enqRes.data.forEach((r: any) => {
          liveItems.push({
            id: String(r.id),
            name: r.full_name || "Customer",
            phone: r.phone || "",
            email: r.email || "",
            service: r.service || "Solar Enquiry",
            location: r.city || "Amaravati",
            date: r.created_at ? new Date(r.created_at).toLocaleDateString() + ", " + new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent",
            status: (r.status as any) || "New",
            notes: r.message || "",
          });
        });
      }

      if (bookRes?.success && Array.isArray(bookRes.data)) {
        bookRes.data.forEach((r: any) => {
          liveItems.push({
            id: "b-" + (r.reference || r.id),
            name: r.full_name || "Customer",
            phone: r.phone || "",
            email: r.email || "",
            service: "Demo: " + (r.solution || "Rooftop Solar") + " (" + (r.property_type || "House") + ")",
            location: (r.city || "Amaravati") + (r.preferred_date ? " [" + r.preferred_date + "]" : ""),
            date: r.created_at ? new Date(r.created_at).toLocaleDateString() + ", " + new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent",
            status: r.status === "completed" ? "Completed" : r.status === "contacted" ? "Contacted" : "New",
            notes: "Ref: " + (r.reference || "") + (r.requirements ? " | " + r.requirements : ""),
          });
        });
      }

      if (liveItems.length > 0) {
        setInquiries(liveItems);
        try { localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(liveItems)); } catch {}
      }
    } catch (e) {
      console.warn("Could not fetch live enquiries:", e);
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

    // Save to MySQL
    try {
      await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuot),
      });
      fetchLiveQuotations();
    } catch (err) {
      console.warn("Failed to persist quotation to MySQL:", err);
    }
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
    localStorage.setItem("amaravati_admin_inquiries", JSON.stringify(updated));
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
      fetch("/api/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), status }),
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
      if (!id.startsWith("b-")) {
        fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
      } else {
        const ref = id.replace(/^b-/, "");
        fetch(`/api/bookings?reference=${encodeURIComponent(ref)}`, { method: "DELETE" }).catch(() => {});
      }
    }
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

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      inq.service.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.location.toLowerCase().includes(inquirySearch.toLowerCase())
  );

  const filteredQuotations = quotations.filter(
    (q) =>
      q.quotationNo.toLowerCase().includes(quotationSearch.toLowerCase()) ||
      q.customerName.toLowerCase().includes(quotationSearch.toLowerCase()) ||
      q.customerPhone.includes(quotationSearch) ||
      q.systemCapacity.toLowerCase().includes(quotationSearch.toLowerCase()) ||
      (q.housingType && q.housingType.toLowerCase().includes(quotationSearch.toLowerCase())) ||
      (q.discom && q.discom.toLowerCase().includes(quotationSearch.toLowerCase())) ||
      (q.cluster && q.cluster.toLowerCase().includes(quotationSearch.toLowerCase())) ||
      (q.roofType && q.roofType.toLowerCase().includes(quotationSearch.toLowerCase()))
  );

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#344054] flex flex-col antialiased">
      {/* 1. TOP GLOBAL HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Left: Mobile hamburger + Admin Portal branding */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="size-5" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <div className="grid size-8 sm:size-9 place-items-center rounded-lg bg-slate-50 border border-slate-200 p-1 shrink-0">
                <img src={logo} alt="Amaravati Solar" className="h-5 sm:h-6 w-auto object-contain" />
              </div>
              <span className="text-xs sm:text-lg font-black tracking-tight text-[#082B4C] uppercase truncate">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Right: Logged In User, Live Site Button, Sign Out Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
            <div className="hidden md:flex flex-col text-right leading-tight">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                LOGGED IN
              </span>
              <span className="font-extrabold text-[#082B4C] max-w-[200px] truncate">
                {adminEmail}
              </span>
            </div>

            <Link
              to="/"
              target="_blank"
              title="View Live Site"
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 p-2 sm:px-3.5 sm:py-2 rounded-full border border-slate-200 bg-white text-[11px] sm:text-xs font-bold text-[#082B4C] hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all active:scale-95 shrink-0"
            >
              <Eye className="size-3.5 text-slate-600 shrink-0" />
              <span className="hidden sm:inline">LIVE SITE</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-red-200 bg-red-50 text-[11px] sm:text-xs font-bold text-red-600 hover:bg-red-100 hover:border-red-300 transition-all active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <LogOut className="size-3.5 text-red-600 shrink-0" />
              <span>LOGOUT</span>
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

      {/* 2. MAIN LAYOUT (Sidebar + Content Panel) */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#082B4C] text-white shrink-0 p-4 border-r border-[#082B4C]">
          {/* Amaravati Panel White Card */}
          <div className="rounded-2xl bg-white p-3.5 flex items-center gap-3 shadow-sm border border-slate-100 text-[#082B4C]">
            <div className="grid size-10 place-items-center rounded-xl bg-slate-50 border border-slate-200 p-1">
              <img src={logo} alt="Logo" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <div className="text-sm font-extrabold uppercase tracking-tight text-[#082B4C]">
                AMARAVATI PANEL
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Server</span>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="mt-8 mb-2 px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            CONTENT MANAGEMENT
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer select-none text-left ${
                activeTab === "services"
                  ? "bg-[#F5A623] text-[#082B4C] shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Wrench className="size-5 shrink-0" />
              <span>SERVICES</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer select-none text-left ${
                activeTab === "projects"
                  ? "bg-[#F5A623] text-[#082B4C] shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <FolderGit2 className="size-5 shrink-0" />
              <span>PROJECTS</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("quotation")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer select-none text-left ${
                activeTab === "quotation"
                  ? "bg-[#F5A623] text-[#082B4C] shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <FileText className="size-5 shrink-0" />
              <span>QUOTATION</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer select-none text-left ${
                activeTab === "inquiries"
                  ? "bg-[#F5A623] text-[#082B4C] shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="size-5 shrink-0" />
                <span>INQUIRIES</span>
              </div>
              {newInquiriesCount > 0 && (
                <span className="grid place-items-center rounded-full bg-emerald-500 text-white font-extrabold text-[11px] px-2 py-0.5">
                  {newInquiriesCount}
                </span>
              )}
            </button>
          </nav>
        </aside>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[85vw] h-full bg-[#082B4C] text-white p-5 flex flex-col justify-between z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-6 w-auto" />
                    <span className="font-extrabold text-sm uppercase">AMARAVATI PANEL</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-300 hover:text-white cursor-pointer"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="mt-6 mb-2 px-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  CONTENT MANAGEMENT
                </div>

                <nav className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("services");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                      activeTab === "services"
                        ? "bg-[#F5A623] text-[#082B4C] font-extrabold shadow-sm"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <Wrench className="size-5" />
                    <span>SERVICES</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("projects");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                      activeTab === "projects"
                        ? "bg-[#F5A623] text-[#082B4C] font-extrabold shadow-sm"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <FolderGit2 className="size-5" />
                    <span>PROJECTS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("quotation");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                      activeTab === "quotation"
                        ? "bg-[#F5A623] text-[#082B4C] font-extrabold shadow-sm"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <FileText className="size-5" />
                    <span>QUOTATION</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("inquiries");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                      activeTab === "inquiries"
                        ? "bg-[#F5A623] text-[#082B4C] font-extrabold shadow-sm"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="size-5" />
                      <span>INQUIRIES</span>
                    </div>
                    {newInquiriesCount > 0 && (
                      <span className="rounded-full bg-emerald-500 text-white font-extrabold text-[11px] px-2 py-0.5">
                        {newInquiriesCount}
                      </span>
                    )}
                  </button>
                </nav>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] text-slate-400">
                  <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Logged in as</div>
                  <div className="truncate font-bold text-slate-200 mt-0.5">{adminEmail}</div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/"
                    target="_blank"
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="size-3.5" />
                    <span>Live Site</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="size-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT PANEL */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: SERVICES PORTFOLIO (Exact Match to User's Example Reference) */}
          {activeTab === "services" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-2.5">
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
                  className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#082B4C] shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer active:scale-95"
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>ADD SERVICE</span>
                </button>
              </div>

              {/* Category Filter Pills (Exact match to reference image) */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setServiceCategory("ALL")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    serviceCategory === "ALL"
                      ? "bg-[#082B4C] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  ALL ({services.length})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("SOLAR")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    serviceCategory === "SOLAR"
                      ? "bg-[#082B4C] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  SOLAR ({solarCount})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("ELECTRICAL")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    serviceCategory === "ELECTRICAL"
                      ? "bg-[#082B4C] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  ELECTRICAL ({electricalCount})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("EV CHARGING")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    serviceCategory === "EV CHARGING"
                      ? "bg-[#082B4C] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  EV CHARGING ({evCount})
                </button>

                <button
                  type="button"
                  onClick={() => setServiceCategory("MAINTENANCE / AMC")}
                  className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    serviceCategory === "MAINTENANCE / AMC"
                      ? "bg-[#082B4C] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-2.5">
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
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-2xs">
                {["ALL", "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProjectCategory(cat)}
                    className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                      projectCategory === cat
                        ? "bg-[#082B4C] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-900">
                      QUOTATION PORTFOLIO
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                      Official Quotations
                    </h1>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                    Generate, customize, and print official rooftop solar estimates (White + Navy + Orange format).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search quotations…"
                      value={quotationSearch}
                      onChange={(e) => setQuotationSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 shadow-2xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsQuotationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B83A16] hover:bg-[#9a3012] text-white px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
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

              {/* Quotations Desktop Table (Hidden on small mobile) */}
              <div className="hidden md:block rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-5 py-3.5">Quotation No</th>
                        <th className="px-5 py-3.5">Customer Details</th>
                        <th className="px-5 py-3.5">Site & Structure</th>
                        <th className="px-5 py-3.5">Payment Summary</th>
                        <th className="px-5 py-3.5">Valid Upto</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredQuotations.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                            No quotations found matching your query.
                          </td>
                        </tr>
                      ) : (
                        filteredQuotations.map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="font-extrabold text-[#082B4C] bg-slate-100 px-2.5 py-1 rounded-md text-[11px] tracking-wide border border-slate-200">
                                {q.quotationNo}
                              </span>
                              <div className="text-[10px] text-slate-400 mt-1 font-medium">{q.date}</div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-extrabold text-slate-800 text-sm">{q.customerName}</div>
                              <div className="text-slate-500 text-[11px] mt-0.5">{q.customerPhone}</div>
                              <div className="text-slate-400 text-[10px] truncate max-w-xs">{q.customerAddress}</div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                  {q.systemCapacity}
                                </span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                                  {q.housingType || "Independent"} • {q.noOfFloors || "G+1"}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 mt-1">
                                {q.roofType || "RCC"} • {q.structureType || "Pre fab"} {q.discom ? `• ${q.discom}` : ""}
                              </div>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="font-black text-[#082B4C] text-sm">
                                Final: ₹{(q.finalPrice || q.totalAmount || 0).toLocaleString("en-IN")}
                              </div>
                              <div className="text-[10px] text-emerald-700 font-semibold">
                                Subsidy: ₹{(q.subsidyAmount || 0).toLocaleString("en-IN")}
                              </div>
                              <div className="text-[10px] text-slate-600 font-bold">
                                Hand: ₹{(q.fromHand || 0).toLocaleString("en-IN")} <span className="text-[9px] font-normal text-slate-400">({q.paymentMode || "Direct"})</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap text-slate-600 font-semibold text-[11px]">
                              {q.validUpto}
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
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
                            </td>
                            <td className="px-5 py-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setViewingQuotation(q)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#082B4C] bg-white text-[#082B4C] hover:bg-slate-50 transition-all font-bold text-[11px] cursor-pointer shadow-2xs"
                                  title="View and Print Quotation"
                                >
                                  <Printer className="size-3.5 text-[#B83A16]" />
                                  <span>View / Print</span>
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
              </div>

              {/* Quotations Mobile Cards View (Phones: below md) */}
              <div className="md:hidden space-y-3">
                {filteredQuotations.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center text-slate-400 text-xs">
                    No quotations found matching your query.
                  </div>
                ) : (
                  filteredQuotations.map((q) => (
                    <div key={q.id} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-3">
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

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setViewingQuotation(q)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#082B4C] bg-[#082B4C] text-white hover:bg-[#062038] font-bold text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                        >
                          <Printer className="size-3.5 text-[#F5A623]" />
                          <span>View & Print</span>
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
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES & LEADS */}
          {activeTab === "inquiries" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center rounded-md bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-sky-800">
                      LEADS & INQUIRIES
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B4C] tracking-tight">
                      Customer Inquiries
                    </h1>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                    View and manage consultation inquiries and demonstration requests submitted by customers.
                  </p>
                </div>

                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search inquiries…"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Inquiries Desktop Table (Hidden on small mobile) */}
              <div className="hidden md:block rounded-2xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="px-5 py-3.5">Customer Name</th>
                        <th className="px-5 py-3.5">Contact Details</th>
                        <th className="px-5 py-3.5">Service Requested</th>
                        <th className="px-5 py-3.5">Location</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                            No inquiries found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-4 font-bold text-[#082B4C] whitespace-nowrap">
                              <div>{inq.name}</div>
                              <div className="text-[10px] font-normal text-slate-400">{inq.date}</div>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                <Phone className="size-3 text-slate-400" />
                                <a href={`tel:${inq.phone}`} className="hover:text-primary">
                                  {inq.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                <Mail className="size-3 text-slate-400" />
                                <a href={`mailto:${inq.email}`} className="hover:text-primary">
                                  {inq.email}
                                </a>
                              </div>
                            </td>
                            <td className="px-5 py-4 font-semibold text-slate-700 max-w-[220px]">
                              {inq.service}
                            </td>
                            <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                              {inq.location}
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
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
                            <td className="px-5 py-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`tel:${inq.phone}`}
                                  className="p-1.5 rounded-lg border border-slate-200 text-emerald-600 hover:bg-emerald-50 transition-all"
                                  title="Call customer"
                                >
                                  <Phone className="size-3.5" />
                                </a>
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiries Mobile Cards View (Phones: below md) */}
              <div className="md:hidden space-y-3">
                {filteredInquiries.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center text-slate-400 text-xs">
                    No inquiries found matching your search.
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div key={inq.id} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-[#082B4C] text-sm">{inq.name}</div>
                          <div className="text-[10px] text-slate-400">{inq.date} • {inq.location}</div>
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
                          Requested System
                        </span>
                        {inq.service}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${inq.phone}`}
                            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-all"
                          >
                            <Phone className="size-3" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`mailto:${inq.email}`}
                            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all"
                          >
                            <Mail className="size-3" />
                            <span>Email</span>
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
        />
      )}

      {/* 6. VIEW & PRINT QUOTATION MODAL */}
      {viewingQuotation && (
        <QuotationViewModal
          quotation={viewingQuotation}
          onClose={() => setViewingQuotation(null)}
        />
      )}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-extrabold text-[#082B4C]">
            {service ? "Edit Service" : "Add New Service"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
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

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white font-bold transition-all shadow-sm"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-extrabold text-[#082B4C]">
            {project ? "Edit Project" : "Add New Project"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
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

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#082B4C] hover:bg-[#062038] text-white font-bold transition-all shadow-sm"
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
}: {
  onClose: () => void;
  onSave: (data: Omit<AdminQuotation, "id"> & { id?: string | undefined }) => void;
}) {
  const [quotationNo, setQuotationNo] = useState(
    () => `ASS/${new Date().getFullYear()}/${String(Math.floor(100 + Math.random() * 900))}`
  );
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+91 ");
  const [customerAddress, setCustomerAddress] = useState("");
  const [systemCapacity, setSystemCapacity] = useState("3.66 kW On-Grid Rooftop");

  // Format today's date & valid upto (15 days from now)
  const todayStr = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 15);
  const validUptoStr = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(futureDate);

  const [date] = useState(todayStr);
  const [validUpto, setValidUpto] = useState(validUptoStr);

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

  // 3. Bill Corrections
  const [loadChange, setLoadChange] = useState<"Yes" | "No">("No");
  const [phaseChange, setPhaseChange] = useState<"Yes" | "No">("No");
  const [nameChange, setNameChange] = useState<"Yes" | "No">("No");

  // 4. Payment Summary
  const [paymentMode, setPaymentMode] = useState<"Direct" | "EMI">("Direct");
  const [totalPrice, setTotalPrice] = useState<number>(217740);
  const [discount, setDiscount] = useState<number>(7740);
  const [subsidyAmount, setSubsidyAmount] = useState<number>(78000);

  // Auto-calculated fields
  const finalPrice = Math.max(0, (Number(totalPrice) || 0) - (Number(discount) || 0));
  const fromHand = Math.max(0, finalPrice - (Number(subsidyAmount) || 0));

  // Toggle for equipment line items breakdown
  const [showLineItems, setShowLineItems] = useState(false);
  const [items, setItems] = useState<AdminQuotationItem[]>([
    { id: "1", description: "Solar Panel (Topcon Mono PERC)", specification: "550W / 610W High Efficiency", qty: 6, unitPrice: 18500, amount: 111000 },
    { id: "2", description: "Solar Inverter", specification: "Single Phase On-Grid with WiFi Monitoring", qty: 1, unitPrice: 38000, amount: 38000 },
    { id: "3", description: "Mounting Structure", specification: "Galvanized Iron (GI Elevated Rooftop)", qty: 1, unitPrice: 16000, amount: 16000 },
    { id: "4", description: "AC/DC Distribution Box & Cabling", specification: "SPD, MCBs, Earthing Kit & Accessories", qty: 1, unitPrice: 14000, amount: 14000 },
    { id: "5", description: "Installation, Liaison & Commissioning", specification: "Testing, DISCOM Net-metering setup", qty: 1, unitPrice: 12000, amount: 12000 },
  ]);

  const itemsSubtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const gstAmount = Math.round(itemsSubtotal * 0.14);
  const itemsTotal = itemsSubtotal + gstAmount;

  const handleSubsidyTypeSelect = (type: "Non- Subsidy" | "Subsidy National DBT") => {
    setSubsidyType(type);
    if (type === "Non- Subsidy") {
      setSubsidyAmount(0);
    } else {
      setSubsidyAmount(78000);
    }
  };

  const handleUpdateItem = (
    id: string,
    field: "description" | "specification" | "qty" | "unitPrice",
    val: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };
        if (field === "qty" || field === "unitPrice") {
          const qty = field === "qty" ? Number(val) || 0 : item.qty;
          const unitPrice = field === "unitPrice" ? Number(val) || 0 : item.unitPrice;
          updated.amount = qty * unitPrice;
        }
        return updated;
      })
    );
  };

  const handleAddItem = () => {
    const newItem: AdminQuotationItem = {
      id: String(Date.now()),
      description: "Additional Solar Component / Accessory",
      specification: "Standard Approved Specification",
      qty: 1,
      unitPrice: 5000,
      amount: 5000,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSyncItemsToTotal = () => {
    setTotalPrice(itemsTotal);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

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
      subtotal: itemsSubtotal,
      gstAmount,
      totalAmount: finalPrice || itemsTotal,
      terms: [
        "Price valid for 15 days from issuance date.",
        "Includes complete system supply, structure fabrication, installation, and commissioning.",
        `Comprehensive AMC: ${amc === "Included" ? "5 years included" : "Available on request"}.`,
        "Complete assistance with DISCOM net-metering approvals and National DBT subsidy portal.",
        `Payment Mode: ${paymentMode}. Standard Terms: 50% advance, balance after installation.`,
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
      overhangPossibility,
      overhangSide: overhangPossibility === "Yes" ? overhangSide : "",
      amc,

      // Bill Corrections
      loadChange,
      phaseChange,
      nameChange,

      // Payment Summary
      paymentMode,
      totalPrice: Number(totalPrice) || itemsTotal,
      discount: Number(discount) || 0,
      finalPrice: finalPrice || itemsTotal,
      subsidyAmount: Number(subsidyAmount) || 0,
      fromHand: fromHand,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-5 sm:p-7 shadow-2xl my-6 max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-[#082B4C] text-[#F5A623] shadow-xs">
              <FileText className="size-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#082B4C] uppercase tracking-tight">Create Quotation</h2>
              <p className="text-xs text-slate-500">Enter site survey details, structure specifications, bill corrections, and payment summary</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
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
                required
                value={quotationNo}
                onChange={(e) => setQuotationNo(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-slate-800 bg-white font-mono font-bold"
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
                type="text"
                required
                value={validUpto}
                onChange={(e) => setValidUpto(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-slate-800 bg-white"
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
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. K. Satyanarayana"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Contact Phone Number *</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 98480 33445"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">Proposed System Capacity & Type</label>
                <input
                  type="text"
                  required
                  value={systemCapacity}
                  onChange={(e) => setSystemCapacity(e.target.value)}
                  placeholder="e.g. 3.66 kW On-Grid Rooftop"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Housing Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Housing Type</label>
                <div className="grid grid-cols-3 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Roof Type */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">Roof Type</label>
                <div className="grid grid-cols-3 gap-2">
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
                <div className="grid grid-cols-3 gap-2">
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
              {/* No of Modules */}
              <div>
                <label className="block text-slate-700 mb-1.5 font-bold">No of Modules</label>
                <input
                  type="number"
                  min={1}
                  value={noOfModules}
                  onChange={(e) => setNoOfModules(e.target.value)}
                  placeholder="e.g. 6 / 8 / 10"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-bold">Total Price (₹)</label>
                  <button
                    type="button"
                    onClick={handleSyncItemsToTotal}
                    className="text-[10px] text-[#B83A16] hover:underline font-bold cursor-pointer"
                    title="Auto-fill sum from items table"
                  >
                    Auto-fill items (₹{itemsTotal.toLocaleString("en-IN")})
                  </button>
                </div>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">Discount (₹)</label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Final Price (Total - Discount)</span>
                <span className="text-lg font-black text-[#082B4C]">₹{finalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-bold">Subsidy Amount (₹)</label>
                  {subsidyType === "Subsidy National DBT" && (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      National DBT: ₹78,000
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={subsidyAmount}
                  onChange={(e) => setSubsidyAmount(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-emerald-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#082B4C]/20"
                />
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

          {/* 5. LINE ITEMS (COLLAPSIBLE BUILDER) */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowLineItems(!showLineItems)}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-extrabold uppercase tracking-wider text-[#082B4C] text-xs">
                  Equipment Line Items & Specifications
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                  {items.length} items • ₹{itemsTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <span className="text-xs font-bold text-[#B83A16] hover:underline">
                {showLineItems ? "Hide Line Items ▲" : "View / Customize Line Items ▼"}
              </span>
            </button>

            {showLineItems && (
              <div className="p-4 space-y-3 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-slate-500">Configure itemized equipment for the printable quotation</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B83A16] hover:underline cursor-pointer"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-slate-50/70 p-3 rounded-xl border border-slate-200 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center"
                    >
                      <div className="flex items-center justify-between sm:justify-center sm:col-span-1">
                        <span className="text-[11px] font-bold text-slate-500">#{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={items.length <= 1}
                          className="sm:hidden text-slate-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                        >
                          <Trash2 className="size-4 text-red-500" />
                        </button>
                      </div>

                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          placeholder="Specification"
                          value={item.specification}
                          onChange={(e) => handleUpdateItem(item.id, "specification", e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-600 bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:contents">
                        <div className="sm:col-span-1">
                          <input
                            type="number"
                            min={1}
                            value={item.qty}
                            onChange={(e) => handleUpdateItem(item.id, "qty", e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs text-center font-bold bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="number"
                            min={0}
                            step={100}
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItem(item.id, "unitPrice", e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-right bg-white"
                          />
                        </div>
                      </div>

                      <div className="hidden sm:block sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={items.length <= 1}
                          className="text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer p-1"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-right text-xs space-y-1">
                  <div>Subtotal: ₹{itemsSubtotal.toLocaleString("en-IN")}</div>
                  <div>GST (14% EPC): ₹{gstAmount.toLocaleString("en-IN")}</div>
                  <div className="font-extrabold text-[#082B4C]">Calculated Items Total: ₹{itemsTotal.toLocaleString("en-IN")}</div>
                </div>
              </div>
            )}
          </div>

          {/* Form Submit Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B83A16] hover:bg-[#9a3012] text-white font-extrabold transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
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

// Modal Component for Viewing and Printing Official Quotation (Panel 3 Match + Full Survey Data)
function QuotationViewModal({
  quotation,
  onClose,
}: {
  quotation: AdminQuotation;
  onClose: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

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
              <img src={logo} alt="Amaravati Solar Solutions" className="h-12 sm:h-16 w-auto object-contain shrink-0 mt-1 sm:mt-0" />
              <div>
                <h1 className="text-lg sm:text-2xl font-black text-[#082B4C] tracking-tight leading-none uppercase">
                  Amaravati Solar Solutions
                </h1>
                <p className="text-[11px] sm:text-xs font-bold text-[#B83A16] tracking-wide mt-1">
                  Roof Top Solar EPC • On-Grid • Off-Grid • Hybrid
                </p>
                <div className="text-[10px] sm:text-[11px] text-slate-600 mt-1.5 space-y-0.5 leading-tight">
                  <p>74-12/1-12/5, 2nd Floor, Electricity Colony, 9th Line, Vijayawada – 520010</p>
                  <p>Contact / WhatsApp: +91 79896 41899 | Mon - Sat: 10:00AM - 7:00PM</p>
                  <p>Email: amaravatisolarsolutions@gmail.com</p>
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
              <div><span className="text-slate-500">No of Modules:</span> <strong className="text-slate-800">{quotation.noOfModules || 6} Panels</strong></div>
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

          {/* Itemized Cost Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 my-4">
            <table className="w-full min-w-[520px] text-left text-xs">
              <thead className="bg-[#082B4C] text-white font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-center w-12">S.No</th>
                  <th className="px-3 sm:px-4 py-3">Description</th>
                  <th className="px-3 sm:px-4 py-3">Specification</th>
                  <th className="px-3 sm:px-4 py-3 text-center w-14">Qty</th>
                  <th className="px-3 sm:px-4 py-3 text-right">Unit Price</th>
                  <th className="px-3 sm:px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {quotation.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 1 ? "bg-slate-50/70" : "bg-white"}>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-bold text-slate-400">{index + 1}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-extrabold text-slate-800">{item.description}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-slate-600 text-[11px]">{item.specification}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-center font-bold text-slate-700">{item.qty}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-right font-semibold text-slate-700">
                      ₹{item.unitPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-right font-extrabold text-[#082B4C]">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment & Subsidy Summary Card */}
          <div className="flex justify-end mt-4">
            <div className="w-full sm:w-80 bg-slate-50 border-2 border-[#082B4C] rounded-2xl p-4 space-y-2 text-xs shadow-xs">
              <div className="flex justify-between items-center text-slate-600 font-semibold">
                <span>Mode of Payment:</span>
                <span className="font-extrabold text-[#082B4C] uppercase bg-white px-2 py-0.5 rounded border border-slate-200">{quotation.paymentMode || "Direct"}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-semibold">
                <span>Total System Price:</span>
                <span className="text-slate-900 font-bold">₹{(quotation.totalPrice || quotation.totalAmount).toLocaleString("en-IN")}</span>
              </div>
              {(quotation.discount || 0) > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Discount:</span>
                  <span className="font-bold">-₹{(quotation.discount || 0).toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-slate-900 pt-1 border-t border-slate-200">
                <span>Final Price:</span>
                <span>₹{(quotation.finalPrice || quotation.totalAmount).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Govt. DBT Subsidy:</span>
                <span>-₹{(quotation.subsidyAmount || 0).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-[#082B4C] pt-2 border-t-2 border-[#082B4C]">
                <span>From the Hand:</span>
                <span className="text-[#B83A16] text-base">₹{(quotation.fromHand || (quotation.finalPrice || quotation.totalAmount) - (quotation.subsidyAmount || 0)).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#082B4C] mb-2">
              Terms & Conditions:
            </h3>
            <ol className="list-decimal list-inside text-[10px] sm:text-[11px] text-slate-600 space-y-1">
              {quotation.terms.map((term, i) => (
                <li key={i}>{term}</li>
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
