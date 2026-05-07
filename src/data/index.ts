import { ApexOptions } from "apexcharts";
import {
  DashboardNavItem,
  FileMappingEntry,
  Option,
  Slot,
} from "../core/interfaces";
import { UserRole } from "../core/enums";

export const dashboardNavItems: DashboardNavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Portfolio", href: "/dashboard/portfolio" },

  {
    name: "Teams",
    href: "/dashboard/teams",
    allowedRoles: [UserRole.ADMIN],
  },

  { name: "Feedback", href: "/dashboard/feedback" },

  {
    name: "Access requests",
    href: "/dashboard/admin-access",
    allowedRoles: [UserRole.ADMIN],
  },

  { name: "Billing", href: "/dashboard/billing" },
];

export const portfolioOverview = [
  { name: "Total loans", fig: 0 },
  { name: "ECL amount", fig: 0 },
  { name: "Rish reserve", fig: 0 },
];

export const customerOverview = [
  { name: "Total customers", fig: 0 },
  { name: "Institutional", fig: 0 },
  { name: "Individual", fig: 0 },
  { name: "Mixed", fig: 0 },
];

// export const portfolioMainOverview = [
//   { name: "Total loans", fig: addCommasToNumber(2543) },
//   { name: "ECL amount", fig: "$1.25M" },
//   { name: "Rish reserve", fig: "$500" },
// ];

export const customerMainOverview = [
  { name: "Total customers", fig: 1500 },
  { name: "Institutional", fig: 600 },
  { name: "Individual", fig: 800 },
  { name: "Mixed", fig: 100 },
];

export const assetsOptions = [
  { value: "equity", label: "Equity" },
  { value: "debt", label: "Debt" },
];

export const reportTypeOptions = [
  { value: "ecl_detailed_report", label: "ECL detailed report" },
  {
    value: "ecl_report_summarised_by_stages",
    label: "ECL report summarised by stages",
  },
  {
    value: "BOG_impairment_detailed_report",
    label: "BOG impairment detailed report",
  },
  {
    value: "BOG_impairmnt_summary_by_stages",
    label: "BOG impairment summary by stages",
  },
  {
    value: "journals_report",
    label: "Journals report",
  },
];

export const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "analyst", label: "Analyst" },
  { value: "reviewer", label: "Reviewer" },
];

export const feedbackStatuses = [
  { value: "Submitted", label: "Submitted" },
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "In development", label: "In development" },
  { value: "Completed", label: "Completed" },
  { value: "Returned", label: "Returned" },
];

export const status = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "denied", label: "Denied" },
  { value: "flagged", label: "Flagged" },
];

export const customerTypeOptions = [
  { value: "individuals", label: "Individuals" },
  { value: "institution", label: "Institution" },
  { value: "mixed", label: "Mixed" },
];

export const fundingSourceOptions = [
  { value: "private investors", label: "Private investors" },
  { value: "pension fund", label: "Pension fund" },
  { value: "mutual fund", label: "Mutual fund" },
  { value: "other funds", label: "Other funds" },
];

export const dataSourceOptions = [
  {
    value: "connect to external application",
    label: "Connect to external application",
    isDisabled: true,
  },
  { value: "upload data", label: "Upload data" },
];

export const options: ApexOptions = {
  chart: { type: "scatter" }, // Change type to scatter
  dataLabels: { enabled: false },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    title: { text: "Month" },
  },
  yaxis: { title: { text: "Values" } },
  title: {
    text: "Monthly Performance Scatter Plot",
    align: "center",
    style: { fontSize: "18px" },
  },
  markers: {
    size: 6, // Adjust marker size
  },
};

export const series = [
  {
    name: "Product A",
    data: [
      [0, 10],
      [1, 20],
      [2, 15],
      [3, 25],
      [4, 30],
      [5, 40],
      [6, 35],
      [7, 50],
      [8, 45],
      [9, 55],
      [10, 60],
      [11, 65],
    ],
  },
  {
    name: "Product B",
    data: [
      [0, 5],
      [1, 15],
      [2, 10],
      [3, 20],
      [4, 25],
      [5, 35],
      [6, 30],
      [7, 45],
      [8, 40],
      [9, 50],
      [10, 55],
      [11, 60],
    ],
  },
  {
    name: "Product C",
    data: [
      [0, 8],
      [1, 18],
      [2, 13],
      [3, 23],
      [4, 28],
      [5, 38],
      [6, 33],
      [7, 48],
      [8, 43],
      [9, 53],
      [10, 58],
      [11, 63],
    ],
  },
];

export const normalize = (str: string) =>
  str
    .toLowerCase()
    .replace(/[\s_\-.]/g, "")
    .replace(/[^a-z0-9]/g, "");

export function inferType(label: string): "id" | "date" | "number" | "string" {
  const l = label.toLowerCase();

  if (l.includes("date") || l.includes("period") || l.includes("dob")) {
    return "date";
  }

  if (
    l.includes("amount") ||
    l.includes("total") ||
    l.includes("balance") ||
    l.includes("rate") ||
    l.includes("fee") ||
    l.includes("value") ||
    l.includes("term")
  ) {
    return "number";
  }

  if (l.includes("id") || l.includes("no") || l.includes("code")) {
    return "id";
  }

  return "string";
}

export const INDUSTRY_OPTIONS: Option[] = [
  { label: "Banks", value: "BANKS" },
  { label: "Savings and Loans", value: "SAVINGS_AND_LOANS" },
  { label: "Finance Houses", value: "FINANCE_HOUSES" },
  { label: "Leasing Companies", value: "LEASING_COMPANIES" },
  { label: "Other Banks", value: "OTHER_BANKS" },
  {
    label: "Representative Offices in Ghana",
    value: "REPRESENTATIVE_OFFICES_IN_GHANA",
  },
  {
    label: "Finance and Leasing Companies",
    value: "FINANCE_AND_LEASING_COMPANIES",
  },
  { label: "Mortgage Finance", value: "MORTGAGE_FINANCE" },
  { label: "Remittance Companies", value: "REMITTANCE_COMPANIES" },
];

export const COUNTRY_CURRENCY_OPTIONS: Option[] = [
  { label: "Algeria / Algerian Dinar (DZD)", value: "DZ" },
  { label: "Angola / Angolan Kwanza (AOA)", value: "AO" },
  { label: "Benin / West African CFA Franc (XOF)", value: "BJ" },
  { label: "Botswana / Botswana Pula (BWP)", value: "BW" },
  { label: "Burkina Faso / West African CFA Franc (XOF)", value: "BF" },
  { label: "Burundi / Burundian Franc (BIF)", value: "BI" },
  { label: "Cabo Verde / Cape Verdean Escudo (CVE)", value: "CV" },
  { label: "Cameroon / Central African CFA Franc (XAF)", value: "CM" },
  {
    label: "Central African Republic / Central African CFA Franc (XAF)",
    value: "CF",
  },
  { label: "Chad / Central African CFA Franc (XAF)", value: "TD" },
  { label: "Comoros / Comorian Franc (KMF)", value: "KM" },
  { label: "Congo / Central African CFA Franc (XAF)", value: "CG" },
  { label: "Côte d'Ivoire / West African CFA Franc (XOF)", value: "CI" },
  {
    label: "Democratic Republic of the Congo / Congolese Franc (CDF)",
    value: "CD",
  },
  { label: "Djibouti / Djiboutian Franc (DJF)", value: "DJ" },
  { label: "Egypt / Egyptian Pound (EGP)", value: "EG" },
  { label: "Equatorial Guinea / Central African CFA Franc (XAF)", value: "GQ" },
  { label: "Eritrea / Eritrean Nakfa (ERN)", value: "ER" },
  { label: "Eswatini / Swazi Lilangeni (SZL)", value: "SZ" },
  { label: "Ethiopia / Ethiopian Birr (ETB)", value: "ET" },
  { label: "Gabon / Central African CFA Franc (XAF)", value: "GA" },
  { label: "Gambia / Gambian Dalasi (GMD)", value: "GM" },
  { label: "Ghana / Ghanaian Cedi (GHS)", value: "GH" },
  { label: "Guinea / Guinean Franc (GNF)", value: "GN" },
  { label: "Guinea-Bissau / West African CFA Franc (XOF)", value: "GW" },
  { label: "Kenya / Kenyan Shilling (KES)", value: "KE" },
  { label: "Lesotho / Lesotho Loti (LSL)", value: "LS" },
  { label: "Liberia / Liberian Dollar (LRD)", value: "LR" },
  { label: "Libya / Libyan Dinar (LYD)", value: "LY" },
  { label: "Madagascar / Malagasy Ariary (MGA)", value: "MG" },
  { label: "Malawi / Malawian Kwacha (MWK)", value: "MW" },
  { label: "Mali / West African CFA Franc (XOF)", value: "ML" },
  { label: "Mauritania / Mauritanian Ouguiya (MRU)", value: "MR" },
  { label: "Mauritius / Mauritian Rupee (MUR)", value: "MU" },
  { label: "Morocco / Moroccan Dirham (MAD)", value: "MA" },
  { label: "Mozambique / Mozambican Metical (MZN)", value: "MZ" },
  { label: "Namibia / Namibian Dollar (NAD)", value: "NA" },
  { label: "Niger / West African CFA Franc (XOF)", value: "NE" },
  { label: "Nigeria / Nigerian Naira (NGN)", value: "NG" },
  { label: "Rwanda / Rwandan Franc (RWF)", value: "RW" },
  {
    label: "São Tomé and Príncipe / São Tomé and Príncipe Dobra (STN)",
    value: "ST",
  },
  { label: "Senegal / West African CFA Franc (XOF)", value: "SN" },
  { label: "Seychelles / Seychellois Rupee (SCR)", value: "SC" },
  { label: "Sierra Leone / Sierra Leonean Leone (SLE)", value: "SL" },
  { label: "Somalia / Somali Shilling (SOS)", value: "SO" },
  { label: "South Africa / South African Rand (ZAR)", value: "ZA" },
  { label: "South Sudan / South Sudanese Pound (SSP)", value: "SS" },
  { label: "Sudan / Sudanese Pound (SDG)", value: "SD" },
  { label: "Tanzania / Tanzanian Shilling (TZS)", value: "TZ" },
  { label: "Togo / West African CFA Franc (XOF)", value: "TG" },
  { label: "Tunisia / Tunisian Dinar (TND)", value: "TN" },
  { label: "Uganda / Ugandan Shilling (UGX)", value: "UG" },
  { label: "Zambia / Zambian Kwacha (ZMW)", value: "ZM" },
  { label: "Zimbabwe / Zimbabwe Gold (ZWG)", value: "ZW" },
];

export const ACCOUNTING_STANDARD_OPTIONS: Option[] = [
  { label: "IFRS + BOG Guide", value: "IFRS_BOG_GUIDE" },
  {
    label: "IFRS + CBN Prudential Guidelines",
    value: "IFRS_CBN_PRUDENTIAL_GUIDELINES",
  },
  { label: "IFRS + SARB (Regulation 24)", value: "IFRS_SARB_REGULATION_24" },
  {
    label: "IFRS + CBK Prudential Guidelines",
    value: "IFRS_CBK_PRUDENTIAL_GUIDELINES",
  },
  {
    label: "EAS (Egyptian Accounting Stds) + CBE Regulations",
    value: "EAS_CBE_REGULATIONS",
  },
  { label: "SYSCOHADA + COBAC / WAMU", value: "SYSCOHADA_COBAC_WAMU" },
  { label: "IFRS9 Only", value: "IFRS9_ONLY" },
  { label: "EAS Only", value: "EAS_ONLY" },
  { label: "SYSCOHADA", value: "SYSCOHADA" },
];

export const REQUIRED_MAPPINGS: Record<string, string[]> = {
  loan_details_complete: [
    "Loan no",
    "Loan issue date",
    "deduction start period",
    "submission period",
    "loan amount",
    "loan term",
    "administrative fees",
    "total interest",
    "Monthly installment",
    "outstanding loan balance",
    "accumulated arrears",
    "NDIA",
  ],
  customer_data: [
    "id",
    "marital status",
    "gender",
    "date of birth",
    "employment date",
  ],
};

export const REQUIRED_FIELDS = {
  loan_details: [
    "loan_no",
    "loan_issue_date",
    "deduction_start_period",
    "submission_period",
    "loan_amount",
    "loan_term",
    "administrative_fees",
    "total_interest",
    "monthly_installment",
    "outstanding_loan_balance",
    "accumulated_arrears",
    "ndia",
  ],
  customer_data: [
    "employee_id",
    "marital_status",
    "gender",
    "date_of_birth",
    "employment_date",
  ],
};

export const FILE_RULES: Record<string, { label: string; required: string[] }> =
  {
    loan_details: {
      label: "Loan details",
      required: REQUIRED_FIELDS.loan_details,
    },
    client_data: {
      label: "Customer data",
      required: REQUIRED_FIELDS.customer_data,
    },
  };

export const REQUIRED_MAPPINGS_BY_FILE: {
  match: (filename: string) => boolean;
  label: string;
  requiredFields: string[];
}[] = [
  {
    label: "Loan details",
    match: (name) => name.toLowerCase().includes("loan_details"),
    requiredFields: [
      "Loan no",
      "Loan issue date",
      "deduction start period",
      "submission period",
      "loan amount",
      "loan term",
      "administrative fees",
      "total interest",
      "Monthly installment",
      "outstanding loan balance",
      "accumulated arrears",
      "NDIA",
    ],
  },
  {
    label: "Customer data",
    match: (name) => name.toLowerCase().includes("customer"),
    requiredFields: [
      "id",
      "marital status",
      "gender",
      "date of birth",
      "employment date",
    ],
  },
];

export function normalizeExport(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

export function validateRequiredMappings(
  perFileState: Record<string, { slots: Slot[] }>,
  ingestionFiles: Record<string, any>,
) {
  const errors: string[] = [];

  Object.entries(perFileState).forEach(([fileKey, state]) => {
    const rule = FILE_RULES[fileKey];
    if (!rule) return;

    const fileMeta = ingestionFiles[fileKey];
    if (!fileMeta) return;

    const mappedFields = new Set(
      state.slots.filter((s) => s.mapped).map((s) => s.mapped),
    );

    const missing = rule.required.filter((key) => !mappedFields.has(key));

    if (missing.length > 0) {
      errors.push(
        `${rule.label} file is missing required mappings: ${missing.join(", ")}`,
      );
    }
  });

  return errors;
}

export function buildFileMappings(
  perFileState: Record<string, { slots: Slot[] }>,
  ingestionFiles: Record<string, any>,
): FileMappingEntry[] {
  return Object.entries(perFileState)
    .map(([fileKey, state]) => {
      const fileMeta = ingestionFiles[fileKey];
      if (!fileMeta) return null;

      const mapping: Record<string, string> = {};

      state.slots.forEach((slot) => {
        if (slot.mapped) {
          mapping[slot.fieldKey] = slot.mapped;
        }
      });

      return {
        type: fileKey,
        object_name: fileMeta.object_name,
        mapping,
      };
    })
    .filter(isFileMappingEntry);
}

export function validateRequiredMappingsFromPayload(
  fileEntries: {
    type: string;
    mapping: Record<string, string>;
  }[],
) {
  const errors: string[] = [];

  fileEntries.forEach(({ type, mapping }) => {
    const rule = FILE_RULES[type];
    if (!rule) return;

    const mappedFields = new Set(Object.keys(mapping));

    const missing = rule.required.filter((key) => !mappedFields.has(key));

    if (missing.length > 0) {
      errors.push(
        `${rule.label} file is missing required mappings: ${missing.join(", ")}`,
      );
    }
  });

  return errors;
}

export function isFileMappingEntry(
  entry: FileMappingEntry | null,
): entry is FileMappingEntry {
  return entry !== null;
}
