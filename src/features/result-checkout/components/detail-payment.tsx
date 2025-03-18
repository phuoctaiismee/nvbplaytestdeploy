import Image from "@/components/base-components/images/image";
import { Order } from "@/types/order/index";
import { useMemo } from "react";
import nvblogo from "@/assets/images/logo.svg";

const DetailPayment = ({ order }: { order?: Order }) => {
  const payment = useMemo(() => {
    return order?.payment_transaction;
  }, [order]);
  const orderReceive = useMemo(() => {
    return order?.metadata?.order_method === "shipping";
  }, [order]);

  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium leading-6">Phương thức thanh toán</h2>
        <div className="border p-4 rounded-lg gap-3 flex items-center">
          <Image
            src={orderReceive ? payment?.method?.icon : nvblogo}
            alt="payment"
            className="size-8"
            classNameImage="object-contain"
          />
          <p className="flex flex-col">
            <span className="text-sm font-semibold leading-5">
              {orderReceive ? payment?.method?.label : "Nhận tại cửa hàng"}
            </span>
            <span className="text-sm leading-5">
              {orderReceive
                ? payment?.method?.description
                : "Thanh toán và nhận hàng tại cửa hàng"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPayment;
