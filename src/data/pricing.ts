export type PricingTier = {
  grade: string
  price: string
  fit: string
  time: string
  warranty: string
  modules: string
  screens: string
  roles: string
  integrations: string
  environment: string
  features: string[]
}

export type PricingService = { id: string; name: string; tiers: Record<'lite' | 'standard' | 'pro', PricingTier> }

export const pricingServices: PricingService[] = [
  {
    "id": "01",
    "name": "COMPANY PROFILE",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "5 halaman",
          "desain responsif",
          "formulir kontak",
          "WhatsApp",
          "SEO dasar"
        ],
        "price": "Rp5.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "3-4 minggu",
        "warranty": "30 hari",
        "modules": "1-3",
        "screens": "5-8",
        "roles": "1 admin",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Hingga 10 halaman",
          "CMS artikel",
          "portofolio",
          "analytics",
          "SEO on-page"
        ],
        "price": "Rp8.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "4-6 minggu",
        "warranty": "60 hari",
        "modules": "3-5",
        "screens": "10-15",
        "roles": "2-3 admin",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Hingga 20 halaman",
          "bilingual",
          "custom animation",
          "lead management",
          "optimasi performa"
        ],
        "price": "Rp12.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "6-8 minggu",
        "warranty": "90 hari",
        "modules": "5-8",
        "screens": "20-30",
        "roles": "hingga 5 admin",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "02",
    "name": "POS (POINT OF SALE)",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Kasir",
          "produk",
          "transaksi",
          "struk",
          "laporan harian"
        ],
        "price": "Rp20.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Multi-outlet",
          "stok",
          "diskon",
          "shift kasir",
          "laporan penjualan"
        ],
        "price": "Rp35.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-gudang",
          "purchasing",
          "loyalty",
          "approval",
          "dashboard lanjutan"
        ],
        "price": "Rp50.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "03",
    "name": "E-COMMERCE",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Katalog",
          "keranjang",
          "checkout",
          "transfer manual",
          "admin pesanan"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payment gateway",
          "ongkir",
          "voucher",
          "stok",
          "notifikasi pelanggan"
        ],
        "price": "Rp45.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-gudang",
          "loyalty",
          "retur",
          "promo lanjutan",
          "integrasi ERP"
        ],
        "price": "Rp70.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "04",
    "name": "EKSPEDISI/LOGISTIK",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Order pengiriman",
          "status",
          "resi",
          "dashboard admin"
        ],
        "price": "Rp45.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Kurir",
          "tracking",
          "tarif zona",
          "manifest",
          "notifikasi"
        ],
        "price": "Rp75.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-hub",
          "optimasi rute",
          "SLA",
          "settlement",
          "analytics operasional"
        ],
        "price": "Rp110.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "05",
    "name": "ERP",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Modul inventory dan purchasing",
          "role dasar",
          "laporan"
        ],
        "price": "Rp75.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Inventory",
          "purchasing",
          "sales",
          "finance dasar",
          "approval workflow"
        ],
        "price": "Rp120.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-company",
          "accounting lengkap",
          "HR",
          "audit log",
          "BI dashboard"
        ],
        "price": "Rp180.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "06",
    "name": "CRM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Kontak",
          "lead",
          "pipeline",
          "aktivitas",
          "dashboard dasar"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Sales team",
          "target",
          "quotation",
          "reminder",
          "WhatsApp/email"
        ],
        "price": "Rp45.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Workflow automation",
          "scoring",
          "forecasting",
          "custom report",
          "API"
        ],
        "price": "Rp70.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "07",
    "name": "HRIS/HRM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Data karyawan",
          "absensi",
          "cuti",
          "dokumen"
        ],
        "price": "Rp30.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payroll dasar",
          "approval",
          "kontrak",
          "reimbursement",
          "laporan"
        ],
        "price": "Rp50.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Performance",
          "recruitment",
          "shift kompleks",
          "payroll lanjutan",
          "ESS"
        ],
        "price": "Rp80.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "08",
    "name": "LMS (LEARNING MANAGEMENT SYSTEM)",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Kursus",
          "materi",
          "peserta",
          "progress",
          "kuis"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Sertifikat",
          "assignment",
          "instructor",
          "pembayaran",
          "laporan"
        ],
        "price": "Rp45.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Learning path",
          "live class",
          "proctoring dasar",
          "gamification",
          "analytics"
        ],
        "price": "Rp70.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "09",
    "name": "MARKETPLACE MULTI-VENDOR",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Vendor",
          "katalog",
          "pesanan",
          "komisi manual",
          "admin"
        ],
        "price": "Rp60.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payment split",
          "shipping",
          "promo",
          "settlement",
          "dashboard vendor"
        ],
        "price": "Rp100.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Dispute",
          "wallet",
          "tier vendor",
          "rekomendasi",
          "analytics dan audit"
        ],
        "price": "Rp160.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "10",
    "name": "BOOKING/RESERVATION SYSTEM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Jadwal",
          "slot",
          "booking",
          "admin",
          "konfirmasi"
        ],
        "price": "Rp18.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "5-7 minggu",
        "warranty": "30 hari",
        "modules": "3-5",
        "screens": "8-12",
        "roles": "hingga 5 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Pembayaran",
          "reschedule",
          "reminder",
          "multi-staff",
          "laporan"
        ],
        "price": "Rp30.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "7-10 minggu",
        "warranty": "60 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 15 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-cabang",
          "dynamic pricing",
          "membership",
          "waitlist",
          "analytics"
        ],
        "price": "Rp45.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "10-14 minggu",
        "warranty": "90 hari",
        "modules": "8-12",
        "screens": "30-45",
        "roles": "hingga 30 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "11",
    "name": "CHATBOT/CUSTOMER SERVICE",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "FAQ bot",
          "knowledge base",
          "web chat",
          "handoff admin"
        ],
        "price": "Rp15.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "5-7 minggu",
        "warranty": "30 hari",
        "modules": "3-5",
        "screens": "8-12",
        "roles": "hingga 5 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "AI assistant",
          "WhatsApp",
          "riwayat",
          "tagging",
          "dashboard"
        ],
        "price": "Rp25.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "7-10 minggu",
        "warranty": "60 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 15 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-channel",
          "routing agent",
          "sentiment",
          "SLA",
          "analytics percakapan"
        ],
        "price": "Rp40.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "10-14 minggu",
        "warranty": "90 hari",
        "modules": "8-12",
        "screens": "30-45",
        "roles": "hingga 30 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "12",
    "name": "CMS CUSTOM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Halaman",
          "artikel",
          "kategori",
          "media",
          "admin"
        ],
        "price": "Rp8.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "3-4 minggu",
        "warranty": "30 hari",
        "modules": "1-3",
        "screens": "5-8",
        "roles": "1 admin",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Multi-author",
          "workflow draft",
          "SEO",
          "form",
          "analytics"
        ],
        "price": "Rp12.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "4-6 minggu",
        "warranty": "60 hari",
        "modules": "3-5",
        "screens": "10-15",
        "roles": "2-3 admin",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-site",
          "multilingual",
          "approval",
          "content API",
          "audit log"
        ],
        "price": "Rp20.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "6-8 minggu",
        "warranty": "90 hari",
        "modules": "5-8",
        "screens": "20-30",
        "roles": "hingga 5 admin",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "13",
    "name": "FORUM/COMMUNITY PLATFORM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Akun",
          "kategori",
          "post",
          "komentar",
          "moderasi dasar"
        ],
        "price": "Rp20.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "5-7 minggu",
        "warranty": "30 hari",
        "modules": "3-5",
        "screens": "8-12",
        "roles": "hingga 5 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Follow",
          "notifikasi",
          "reputasi",
          "pencarian",
          "report abuse"
        ],
        "price": "Rp35.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "7-10 minggu",
        "warranty": "60 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 15 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Group",
          "badge",
          "subscription",
          "rekomendasi",
          "moderation dashboard"
        ],
        "price": "Rp50.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "10-14 minggu",
        "warranty": "90 hari",
        "modules": "8-12",
        "screens": "30-45",
        "roles": "hingga 30 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "14",
    "name": "SOCIAL MEDIA PLATFORM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Akun",
          "profil",
          "feed",
          "post",
          "like"
        ],
        "price": "Rp70.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Follow",
          "chat",
          "notifikasi",
          "media",
          "moderasi"
        ],
        "price": "Rp120.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Rekomendasi feed",
          "live content",
          "creator tools",
          "ads dasar",
          "analytics"
        ],
        "price": "Rp180.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "15",
    "name": "JOB PORTAL",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Lowongan",
          "perusahaan",
          "kandidat",
          "lamaran",
          "admin"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "CV builder",
          "filter",
          "notifikasi",
          "employer dashboard",
          "pembayaran"
        ],
        "price": "Rp45.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Matching kandidat",
          "assessment",
          "subscription",
          "talent pool",
          "analytics"
        ],
        "price": "Rp70.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "16",
    "name": "REAL ESTATE PLATFORM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Listing",
          "foto",
          "filter",
          "agen",
          "inquiry"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Peta",
          "favorit",
          "appointment",
          "paket agen",
          "verifikasi listing"
        ],
        "price": "Rp40.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Virtual tour",
          "lead routing",
          "mortgage calculator",
          "subscription",
          "analytics"
        ],
        "price": "Rp60.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "17",
    "name": "FOOD DELIVERY",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Restoran",
          "menu",
          "order",
          "driver assignment manual",
          "admin"
        ],
        "price": "Rp70.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Live tracking",
          "payment",
          "promo",
          "driver app web",
          "settlement"
        ],
        "price": "Rp110.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-zone",
          "dispatch otomatis",
          "wallet",
          "loyalty",
          "operations analytics"
        ],
        "price": "Rp170.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "18",
    "name": "RIDE-HAILING",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Booking",
          "estimasi tarif",
          "driver",
          "trip",
          "dispatch dasar"
        ],
        "price": "Rp100.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Live tracking",
          "payment",
          "wallet",
          "promo",
          "rating"
        ],
        "price": "Rp175.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Dynamic pricing",
          "dispatch pintar",
          "safety tools",
          "multi-service",
          "fraud monitoring"
        ],
        "price": "Rp275.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "19",
    "name": "PROJECT MANAGEMENT TOOL",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Workspace",
          "project",
          "task",
          "kanban",
          "komentar"
        ],
        "price": "Rp30.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Timeline",
          "workload",
          "file",
          "automasi",
          "laporan"
        ],
        "price": "Rp50.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Portfolio",
          "dependency",
          "time tracking",
          "approval",
          "advanced analytics"
        ],
        "price": "Rp80.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "20",
    "name": "INVENTORY/WAREHOUSE MANAGEMENT",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Produk",
          "stok masuk-keluar",
          "supplier",
          "laporan"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Multi-gudang",
          "transfer",
          "purchase order",
          "barcode",
          "stock opname"
        ],
        "price": "Rp40.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Batch dan serial",
          "reorder",
          "costing",
          "approval",
          "warehouse analytics"
        ],
        "price": "Rp60.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "21",
    "name": "ACCOUNTING/FINANCE APP",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Invoice",
          "expense",
          "cashbook",
          "laporan dasar"
        ],
        "price": "Rp30.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Chart of accounts",
          "jurnal",
          "bank reconciliation",
          "pajak dasar",
          "approval"
        ],
        "price": "Rp50.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-company",
          "budgeting",
          "fixed asset",
          "audit trail",
          "laporan lengkap"
        ],
        "price": "Rp80.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "22",
    "name": "HEALTHCARE/TELEMEDICINE",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Profil dokter",
          "jadwal",
          "konsultasi",
          "rekam kunjungan",
          "admin"
        ],
        "price": "Rp75.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Video consult",
          "payment",
          "resep",
          "reminder",
          "patient portal"
        ],
        "price": "Rp125.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "EMR terstruktur",
          "multi-klinik",
          "lab integration",
          "audit",
          "security hardening"
        ],
        "price": "Rp200.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "23",
    "name": "EVENT MANAGEMENT",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Event",
          "registrasi",
          "peserta",
          "tiket",
          "check-in manual"
        ],
        "price": "Rp18.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "5-7 minggu",
        "warranty": "30 hari",
        "modules": "3-5",
        "screens": "8-12",
        "roles": "hingga 5 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payment",
          "QR check-in",
          "voucher",
          "email",
          "dashboard"
        ],
        "price": "Rp30.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "7-10 minggu",
        "warranty": "60 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 15 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-session",
          "seat map",
          "exhibitor",
          "badge",
          "analytics realtime"
        ],
        "price": "Rp45.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "10-14 minggu",
        "warranty": "90 hari",
        "modules": "8-12",
        "screens": "30-45",
        "roles": "hingga 30 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "24",
    "name": "SURVEY/FORM BUILDER",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Form",
          "tipe pertanyaan dasar",
          "respons",
          "export"
        ],
        "price": "Rp10.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "3-4 minggu",
        "warranty": "30 hari",
        "modules": "1-3",
        "screens": "5-8",
        "roles": "1 admin",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Conditional logic",
          "template",
          "branding",
          "notification",
          "dashboard"
        ],
        "price": "Rp15.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "4-6 minggu",
        "warranty": "60 hari",
        "modules": "3-5",
        "screens": "10-15",
        "roles": "2-3 admin",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Scoring",
          "workflow approval",
          "collaboration",
          "API",
          "advanced analytics"
        ],
        "price": "Rp25.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "6-8 minggu",
        "warranty": "90 hari",
        "modules": "5-8",
        "screens": "20-30",
        "roles": "hingga 5 admin",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "25",
    "name": "ANALYTICS DASHBOARD",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Satu sumber data",
          "KPI",
          "chart",
          "filter",
          "export"
        ],
        "price": "Rp20.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "5-7 minggu",
        "warranty": "30 hari",
        "modules": "3-5",
        "screens": "8-12",
        "roles": "hingga 5 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Tiga sumber data",
          "role access",
          "scheduled report",
          "drill-down",
          "alert"
        ],
        "price": "Rp35.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "7-10 minggu",
        "warranty": "60 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 15 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Data warehouse ringan",
          "custom metric",
          "forecasting",
          "embedded dashboard",
          "audit"
        ],
        "price": "Rp55.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "10-14 minggu",
        "warranty": "90 hari",
        "modules": "8-12",
        "screens": "30-45",
        "roles": "hingga 30 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "26",
    "name": "PAYMENT GATEWAY/WALLET",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Ledger",
          "top-up sandbox",
          "transaksi",
          "admin",
          "reconciliation dasar"
        ],
        "price": "Rp120.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Multi-channel payment",
          "payout",
          "KYC workflow",
          "settlement",
          "fraud rules"
        ],
        "price": "Rp200.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Double-entry ledger",
          "limit engine",
          "dispute",
          "compliance tooling",
          "high availability"
        ],
        "price": "Rp325.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "27",
    "name": "RENTAL/SEWA PLATFORM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Katalog",
          "availability",
          "booking",
          "deposit manual",
          "admin"
        ],
        "price": "Rp25.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payment",
          "calendar",
          "late fee",
          "inspection",
          "customer portal"
        ],
        "price": "Rp45.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-branch",
          "dynamic price",
          "maintenance asset",
          "subscription",
          "analytics"
        ],
        "price": "Rp70.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "28",
    "name": "AUCTION PLATFORM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Listing",
          "jadwal lelang",
          "bid",
          "pemenang",
          "admin"
        ],
        "price": "Rp30.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Deposit",
          "auto-bid",
          "realtime update",
          "payment",
          "notifikasi"
        ],
        "price": "Rp50.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-auction",
          "bidder verification",
          "anti-sniping",
          "dispute",
          "audit analytics"
        ],
        "price": "Rp80.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "29",
    "name": "CROWDFUNDING PLATFORM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Campaign",
          "donasi",
          "update",
          "admin",
          "pencairan manual"
        ],
        "price": "Rp35.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payment gateway",
          "target",
          "recurring donation",
          "verification",
          "report"
        ],
        "price": "Rp60.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Escrow workflow",
          "milestone",
          "fundraiser dashboard",
          "fraud rules",
          "audit trail"
        ],
        "price": "Rp90.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "30",
    "name": "NEWS/MEDIA PORTAL",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Artikel",
          "kategori",
          "penulis",
          "media",
          "SEO dasar"
        ],
        "price": "Rp10.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "3-4 minggu",
        "warranty": "30 hari",
        "modules": "1-3",
        "screens": "5-8",
        "roles": "1 admin",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Multi-author",
          "editorial workflow",
          "ads placement",
          "newsletter",
          "analytics"
        ],
        "price": "Rp18.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "4-6 minggu",
        "warranty": "60 hari",
        "modules": "3-5",
        "screens": "10-15",
        "roles": "2-3 admin",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Paywall",
          "membership",
          "personalization",
          "multilingual",
          "performance optimization"
        ],
        "price": "Rp28.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "6-8 minggu",
        "warranty": "90 hari",
        "modules": "5-8",
        "screens": "20-30",
        "roles": "hingga 5 admin",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "31",
    "name": "TICKETING/HELPDESK SYSTEM",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Ticket",
          "kategori",
          "agent",
          "status",
          "email notification"
        ],
        "price": "Rp18.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "5-7 minggu",
        "warranty": "30 hari",
        "modules": "3-5",
        "screens": "8-12",
        "roles": "hingga 5 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "SLA",
          "assignment",
          "knowledge base",
          "canned response",
          "dashboard"
        ],
        "price": "Rp30.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "7-10 minggu",
        "warranty": "60 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 15 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Omnichannel",
          "automation",
          "escalation",
          "CSAT",
          "workforce analytics"
        ],
        "price": "Rp45.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "10-14 minggu",
        "warranty": "90 hari",
        "modules": "8-12",
        "screens": "30-45",
        "roles": "hingga 30 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "32",
    "name": "FLEET MANAGEMENT",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Kendaraan",
          "pengemudi",
          "jadwal",
          "biaya",
          "maintenance"
        ],
        "price": "Rp35.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "GPS integration",
          "trip",
          "fuel",
          "geofence",
          "alert"
        ],
        "price": "Rp60.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Route optimization",
          "utilization",
          "driver score",
          "compliance",
          "analytics"
        ],
        "price": "Rp90.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "33",
    "name": "SCHOOL/CAMPUS MANAGEMENT",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Siswa",
          "kelas",
          "jadwal",
          "absensi",
          "nilai"
        ],
        "price": "Rp35.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Guru dan wali",
          "pembayaran",
          "rapor",
          "pengumuman",
          "portal siswa"
        ],
        "price": "Rp60.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-campus",
          "admission",
          "LMS link",
          "finance",
          "executive dashboard"
        ],
        "price": "Rp90.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "34",
    "name": "POS + INVENTORY HYBRID",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Kasir",
          "produk",
          "stok",
          "struk",
          "laporan"
        ],
        "price": "Rp30.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "8-12 minggu",
        "warranty": "30 hari",
        "modules": "4-7",
        "screens": "12-20",
        "roles": "hingga 10 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Multi-outlet",
          "purchase order",
          "transfer stok",
          "shift",
          "barcode"
        ],
        "price": "Rp50.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "12-18 minggu",
        "warranty": "60 hari",
        "modules": "8-12",
        "screens": "25-40",
        "roles": "hingga 30 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "Multi-gudang",
          "loyalty",
          "forecasting",
          "accounting link",
          "analytics"
        ],
        "price": "Rp80.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "18-24 minggu",
        "warranty": "90 hari",
        "modules": "13-18",
        "screens": "45-70",
        "roles": "hingga 75 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  },
  {
    "id": "35",
    "name": "MULTI-TENANT SAAS",
    "tiers": {
      "lite": {
        "grade": "C",
        "features": [
          "Tenant",
          "user",
          "subscription manual",
          "isolasi data",
          "super admin"
        ],
        "price": "Rp80.000.000",
        "fit": "Validasi ide atau operasional awal",
        "time": "12-18 minggu",
        "warranty": "30 hari",
        "modules": "5-8",
        "screens": "15-25",
        "roles": "hingga 20 user internal",
        "integrations": "0-1",
        "environment": "1 production"
      },
      "standard": {
        "grade": "B",
        "features": [
          "Payment subscription",
          "plan limit",
          "onboarding",
          "usage tracking",
          "tenant dashboard"
        ],
        "price": "Rp140.000.000",
        "fit": "Startup bertumbuh dan operasional aktif",
        "time": "18-28 minggu",
        "warranty": "60 hari",
        "modules": "9-15",
        "screens": "30-55",
        "roles": "hingga 75 user internal",
        "integrations": "1-3",
        "environment": "staging + production"
      },
      "pro": {
        "grade": "A",
        "features": [
          "White-label",
          "automated billing",
          "SSO",
          "audit log",
          "scalable architecture"
        ],
        "price": "Rp220.000.000",
        "fit": "Scale-up dengan kebutuhan kontrol dan skalabilitas",
        "time": "28-40 minggu",
        "warranty": "90 hari",
        "modules": "16-25",
        "screens": "60-100",
        "roles": "hingga 200 user internal",
        "integrations": "3-5",
        "environment": "development + staging + production"
      }
    }
  }
]
