import Image from "next/image";
import RadioCard from "@/components/base-components/radios";
import { Skeleton } from "@/components/ui/skeleton";
import { COMMON_DATA } from "@/configs";
import { usePaymentMethods } from "@/hooks/queries/payment-methods";
import { PaymentMethod as PaymentMethodType } from "@/types/payments";
import React, { FC, useEffect } from "react";
import logo from "@/assets/icons/logo-badge.svg";

const PaymentMethod = ({
  order,
  paymentGateway,
  setPaymentGateway,
}: {
  order: any;
  paymentGateway: any;
  setPaymentGateway: any;
}) => {
  const { data, isLoading } = usePaymentMethods();

  useEffect(() => {
    if (data && data.length > 0) {
      setPaymentGateway(data[0].id.toString());
    }
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 w-full">
        <span className="flex items-center gap-2 text-lg font-semibold">
          Cổng thanh toán
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </>
        ) : (
          <>
            {data && data.length > 0 ? (
              data.map((payment: PaymentMethodType) => (
                <RadioCard
                  key={payment.id}
                  id={payment.id}
                  name="payment-method"
                  className="!items-center"
                  isChecked={payment.id.toString() === paymentGateway}
                  onChange={() => setPaymentGateway(payment.id.toString())}
                >
                  <PaymentItem
                    description={payment.description}
                    icon={payment.icon ?? ""}
                    name={payment.label}
                  />
                </RadioCard>
              ))
            ) : (
              <div className="flex items-center justify-center">
                Không tìm thấy cổng thanh toán nào
              </div>
            )}
          </>
        )}
        {/* {COMMON_DATA.payment_method.map((payment, index) => (
          <RadioCard
            key={index}
            id={payment.name}
            name="payment-method"
            className="!items-center"
            isChecked={payment.id.toString() === paymentGateway}
            onChange={() => setPaymentGateway(payment.id.toString())}
          >
            <PaymentItem
              description={payment.description}
              icon={payment.icon}
              name={payment.name}
            />
          </RadioCard>
        ))} */}
      </div>
    </div>
  );
};

export default PaymentMethod;

type PaymentItemProps = {
  name: string;
  icon: string;
  description: string;
};

const PaymentItem: FC<PaymentItemProps> = ({ description, icon, name }) => {
  return (
    <div className="flex gap-3">
      <img
        src={icon ?? logo}
        className="rounded-lg bg-white !size-8 aspect-square overflow-hidden object-contain"
        width={32}
        height={32}
        alt={name}
      />

      <div className="flex flex-col">
        <span className="text-sm text-txtprimary font-semibold">{name}</span>
        <span className="text-sm text-txtsecondary font-medium line-clamp-1">
          {description}
        </span>
      </div>
    </div>
  );
};
