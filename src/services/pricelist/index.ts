import { axios_instance } from "@/apis";
import { PriceListData } from "@/types/price-list";
import { IResponse } from "@/types/response/response.type";

export const getPricelist = async (
  params?: Record<string, string>
): Promise<IResponse<PriceListData>> => {
  return (await axios_instance.get(`/store/price-lists`, { params })).data;
};
