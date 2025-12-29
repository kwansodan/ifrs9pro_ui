const BILLING_TOKEN_KEY = "billing_token";

export const cacheBillingToken = (token: string) => {
  localStorage.setItem(BILLING_TOKEN_KEY, token);
};

export const getBillingToken = (): string | null => {
  return localStorage.getItem(BILLING_TOKEN_KEY);
};

export const clearBillingToken = () => {
  localStorage.removeItem(BILLING_TOKEN_KEY);
};
