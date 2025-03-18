import { axios_instance } from "@/apis";
import { IResponse } from "@/types/response/response.type";
import { Promotion } from "./type";

export const getPromotionDatas = async () => {
  return (await axios_instance.get(`/store/promotions`)).data;
};

interface Item {
  product_id: string;
  variant_id: string;
  quantity: number;
  price: number;
}

export interface IPromotionRequest {
  items: Item[];
  total_amount: number;
  sales_channel_id: string;
  customer_id: string;
}

export const getPromotions = async (data: IPromotionRequest) => {
  return (await axios_instance.post(`/admin/voucher-coupon`, data)).data;
};

export interface IPromotionDeleteRequest {
  cart_id: string;
  promo_codes: string[];
}

export const removePromotions = async (data:IPromotionDeleteRequest) => {
  return (
    await axios_instance.post(`/admin/voucher-coupon/remove`, data)
  ).data;
};
