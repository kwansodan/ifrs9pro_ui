export interface ButtonProps {
  text: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "button";
  className?: string;
  btnId?: string;
}

export interface CardProps {
  title: string;
  value: number | string;
  valueClassName?: string;
  parentClassName?: string;
  textColor?: string;
}
export interface ModalProps {
  open?: boolean;
  closeOnOverlay?: boolean;
  close?: any;
  children?: React.ReactNode;
  modalHeader?: string;
  showClose?: boolean;
}
export interface FilterTrayProps {
  closeFilter?: () => void;
  onApply?: any;
  initialFilters?: any;
  clearFilters?: () => void;
}

export interface UploadProps {
  UploadTitle?: string;
  setFile?: any;
  templateLink?: string;
}
export interface UploadDataProps {
  close?: () => void;
  rowId?: string | number;
  actionToBeTaken?: string;
  requestId?: number;
  isOperationDone?: boolean;
  setStep?: any;
  userName?: string;
}

export interface CategoryProps {
  category: string;
  range?: string;
  rate?: string;
}

type AssetType = "Debt" | "Equity";
type FundingSource =
  | "Private investors"
  | "Pension fund"
  | "Mutual fund"
  | "Other funds";

export interface FilterValues {
  asset_type: AssetType[];
  funding_source: FundingSource[];
}

export type IFrontentConfig = {
  appName: string;
  countryCode?: string;
};

export interface IConfig {
  appName?: string;
  apiBaseUrl?: string;
}
export type IAppState = {
  config?: IFrontentConfig;
  loading: boolean;
  error: boolean;
};
export type IUserAdditionalInfo = {
  displayName?: string;
  distributorInfo: IDistributorInfo;
  rechargeTypes: IRechargeType[];
};
export type IDistributorInfo = {
  id?: string;
  dealerId?: number;
  distributorName?: string;
};
export type IRechargeType = {
  id?: string;
  name?: string;
};
export type IUser = {
  roles?: string[];
  username?: string;
  additionalInfo?: IUserAdditionalInfo;
};
export type IUserState = {
  user?: IUser;
};

export type TabsProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export interface IngestionFile {
  type: string;
  object_name: string;
  excel_columns: string[];
  model_columns: string[];
}

export interface IngestionState {
  portfolioId: number | null;
  files: Record<string, IngestionFile>;
}

export interface Option {
  label: string;
  value: string;
}

export interface BillingOverviewData {
  active_subscriptions: number;
  expired_subscriptions: number;
  current_plan: string | null;
  billing_cycle: string | null;
  billing_email: string | null;
}

export interface BillingOverviewState {
  active_subscriptions: number;
  expired_subscriptions: number;
  current_plan: CurrentPlan;
  billing_cycle: string | null;
  billing_email: string | null;
}

export interface InitializeTransactionPayload {
  amount: number;
  reference: string;
  callback_url: string;
  plan: string;
  metadata?: Record<string, any>;
}

interface CurrentPlan {
  name: string;
  plan_code: string;
  amount: number;
  currency: string;
}

export interface BillingPlan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  code: string;
  status: "active" | "inactive";
}

export interface PricingRow {
  id: string;
  tier: string;
  volume: string;
  annual_fee: string;
  planCode: string;
  active: boolean;
}

export interface BillingPlan {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export interface HistoryRow {
  id: number;
  plan_title: string;
  plan_amount: string;
  date: string;
  status: "Current" | "Expired";
}
