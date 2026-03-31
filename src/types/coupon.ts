export type CouponApplyResponse = {
  valid: boolean;
  code?: string;
  discountAmount?: number;
  finalTotal?: number;
  message?: string;
};