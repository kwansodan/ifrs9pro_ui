import { ApexOptions } from "apexcharts";
import { addCommasToNumber } from "../core/utility";

export const dashboardNavItems = [
  { name: "Dashboard", href: "/dashboard", active: true },
  { name: "Portfolio", href: "/dashboard/portfolio" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Feedback", href: "/dashboard/feedback" },
  { name: "Access requests", href: "/dashboard/admin-access" },
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
  { value: "equity", label: "Summary of Collateral data " },
  { value: "debt", label: "Summary of Guarantee data " },
  { value: "debt", label: "Summary of Interest rates " },
  { value: "debt", label: "Summary of repayments " },
  { value: "debt", label: "Summary of assumptions " },
  {
    value: "debt",
    label:
      "Amortised loan balances report (caveat that the BOG non-accrual rule has not been considered) ",
  },
  { value: "debt", label: "Probability of default report" },
  { value: "debt", label: "Exposure at default report " },
  { value: "debt", label: "Loss given default report  " },
];

export const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

export const customerTypeOptions = [
  { value: "individuals", label: "Individuals" },
  { value: "institution", label: "Institution" },
  { value: "mixed", label: "Mixed" },
];

export const fundingSourceOptions = [
  { value: "individuals", label: "Individuals" },
  { value: "institution", label: "Institution" },
  { value: "mixed", label: "Mixed" },
];

export const dataSourceOptions = [
  { value: "individuals", label: "Individuals" },
  { value: "institution", label: "Institution" },
  { value: "mixed", label: "Mixed" },
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
