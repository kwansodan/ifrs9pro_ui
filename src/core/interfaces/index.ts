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
}
export interface FilterTrayProps {
  closeFilter?: () => void;
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
