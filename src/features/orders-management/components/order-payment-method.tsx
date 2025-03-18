import Image from "@/components/base-components/images/image";
import { RootState } from "@/stores";
import { formatDate } from "date-fns";
import { useSelector } from "react-redux";
import nvblogo from "@/assets/images/logo.svg";

type OrderPaymentMethodProps = {
  showTimeline?: boolean;
};

const OrderPaymentMethod = ({
  showTimeline = true,
}: OrderPaymentMethodProps) => {
  const { orderDetail } = useSelector(
    (state: RootState) => state.order_data_slice
  );

  return (
    <div className="flex flex-col gap-4 bg-white p-4 w-full overflow-hidden rounded-lg">
      <span className="font-semibold">Phương thức thanh toán</span>
      <div className="w-full border border-gray-border rounded-lg p-4 flex items-center gap-3">
        <Image
          src={
            orderDetail?.metadata?.order_method === "shipping"
              ? orderDetail?.payment_transaction?.method?.icon
              : nvblogo
          }
          alt="payment"
          className="h-12 w-12 border border-gray-border rounded-lg flex items-center justify-center"
          classNameImage="h-8 w-8 aspect-square"
        />
        <div className="text-sm flex flex-col w-full">
          <span className="font-semibold">
            {orderDetail?.metadata?.order_method === "shipping"
              ? orderDetail?.payment_transaction?.method?.label
              : "Nhận tại cửa hàng"}
          </span>
          <span>{orderDetail?.metadata?.order_method === "shipping"
              ? orderDetail?.payment_transaction?.method?.description: "Thanh toán và nhận hàng tại cửa hàngÏ"}</span>
        </div>
      </div>
      {showTimeline && (
        <div className="flex flex-col">
          <div className="flex text-sm font-medium justify-between items-center">
            <span>Thời gian thanh toán</span>
            <span>
              {formatDate(
                orderDetail?.payment_transaction?.date_created || new Date(),
                "dd/MM/yyyy HH:mm"
              )}
            </span>
          </div>
          <div className="flex text-sm text-gray-fifth font-medium justify-between items-center">
            <span>Thời gian đặt hàng</span>
            <span>
              {formatDate(
                orderDetail?.created_at || new Date(),
                "dd/MM/yyyy HH:mm"
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPaymentMethod;
