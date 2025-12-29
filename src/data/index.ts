import { ApexOptions } from "apexcharts";
import { addCommasToNumber } from "../core/utility";
import { Option } from "../core/interfaces";

export const dashboardNavItems = [
  { name: "Dashboard", href: "/dashboard", active: true },
  { name: "Portfolio", href: "/dashboard/portfolio" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Feedback", href: "/dashboard/feedback" },
  { name: "Access requests", href: "/dashboard/admin-access" },
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

export const portfolioMainOverview = [
  { name: "Total loans", fig: addCommasToNumber(2543) },
  { name: "ECL amount", fig: "$1.25M" },
  { name: "Rish reserve", fig: "$500" },
];

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
    value: "BOG_IMPAIRMENT_REPORT_SUMMARISED",
    label: "BOG impairment summary by stages",
  },
  {
    value: "JOURNALS_REPORT",
    label: "Journals report",
  },
  // {
  //   value: "local_impairment_detailed_report",
  //   label: "Local impairment detailed report",
  // },
  // {
  //   value: "local_impairment_report_summarised_by_stages",
  //   label: "Local impairment report summarised by stages",
  // },
  // { value: "journals_report", label: "Journals report" },
  // {
  //   value: "amortised_loan_balances",
  //   label:
  //     "Amortised loan balances report (caveat that the BOG non-accrual rule has not been considered)",
  // },
  // {
  //   value: "probability_default",
  //   label: "Probability of default report",
  // },
  // { value: "exposure_default", label: "Exposure at default report" },
  // { value: "loss_given_default", label: "Loss given default report" },
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
  { label: "Bank", value: "BANK" },
  { label: "Microfinance", value: "MICROFINANCE" },
  { label: "SACCO", value: "SACCO" },
  { label: "Credit Union", value: "CREDIT_UNION" },
];

export const COUNTRY_CURRENCY_OPTIONS: Option[] = [
  { label: "Ghana / Cedis (GHS)", value: "GH" },
  { label: "United States / Dollar (USD)", value: "US" },
];

export const ACCOUNTING_STANDARD_OPTIONS: Option[] = [
  { label: "IFRS 9", value: "IFRS9" },
  { label: "IFRS 9 + BoG Model", value: "IFRS9_BOG" },
];
