import { apiRequest } from "@/app/helper/apiHelper";

export async function getPromoCodeList() {
  return apiRequest("GET", "/admin/promocode");
}

export async function getPromoCodeDetails(promoCodeId: number) {
  return apiRequest("GET", `/admin/promocode/${promoCodeId}`);
}

export async function createPromoCode(data: {
  code: string;
  discount: number;
  usageLimit: number;
  isCustomCode: boolean;
}) {
  return apiRequest("POST", "/admin/promocode", data);
}

export async function updatePromoCode(promoCodeId: number, data: {
  code: string;
  discount: number;
  usageLimit: number;
  isCustomCode: boolean;
}) {
  return apiRequest("PUT", `/admin/promocode/${promoCodeId}`, data);
}

export async function deletePromoCode(promoCodeId: number) {
  return apiRequest("DELETE", `/admin/promocode/${promoCodeId}`);
}

export async function assignPromoCode(data: {
  promoCodeId: number;
  userIds: number[];
}) {
  return apiRequest("POST", "/admin/promocode/assign", data);
}