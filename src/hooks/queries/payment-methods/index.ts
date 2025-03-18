import { getPaymentMethods } from "@/services/orders";
import { PaymentMethod } from "@/types/payments";
import { IResponse } from "@/types/response/response.type";
import { useQuery } from "@tanstack/react-query";

export const usePaymentMethods = () => {
  const { data, isLoading, error, isSuccess, ...rest } = useQuery<
    IResponse<PaymentMethod[]>
  >({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
  });

  return { data: data?.data.data, isLoading, error, isSuccess, ...rest };
};
