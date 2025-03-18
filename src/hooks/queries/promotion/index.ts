import {applyPromotion} from "@/services/cart";
import {getPromotionDatas} from "@/services/promotion";
import {useMutation, useQuery} from "@tanstack/react-query";
export const usePromotion = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotionDatas,
  });

  const applyPromotionMutation = useMutation({
    mutationFn: ({
        cart_id,
        promo_codes,
    }: {
      cart_id: string;
      promo_codes: string[];
    }) => applyPromotion(cart_id, promo_codes),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    data: data?.data?.promotions,
    isLoading,
    error,
    applyPromotion: {
      applyPromotion: applyPromotionMutation.mutate,
      applyPromotionAsync: applyPromotionMutation.mutateAsync,
      isLoading: applyPromotionMutation.isPending,
      error: applyPromotionMutation.error,
    },
  };
};
