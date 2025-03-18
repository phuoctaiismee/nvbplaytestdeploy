import {
  getPromotions,
  IPromotionDeleteRequest,
  IPromotionRequest,
  removePromotions,
} from "@/services/promotion";
import { Promotion } from "@/services/promotion/type";
import { IResponse } from "@/types/response/response.type";
import { useMutation } from "@tanstack/react-query";

export const usePromotionChecking = () => {
  const handleGetPromotionChecking = useMutation({
    mutationFn: (data: IPromotionRequest) => getPromotions(data),
    onSuccess: (res: IResponse<Promotion[]>) => {
      return res.data.data;
    },
    onError: (err: Error) => {
      return err;
    },
  });

  const handleRemovePromotionMutation = useMutation({
    mutationFn: (data: IPromotionDeleteRequest) => removePromotions(data),
    onSuccess: (res) => {
      return res;
    },
    onError: (err: Error) => {
      return err;
    },
  });
  return {
    getPromotionChecking: handleGetPromotionChecking.mutate,
    data: handleGetPromotionChecking.data?.data.data,
    isLoading: handleGetPromotionChecking.isPending,
    removePromotion: handleRemovePromotionMutation
  };
};
