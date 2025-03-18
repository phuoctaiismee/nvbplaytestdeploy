"use client";
import BackTo from "@/components/particals/back-to";
import { ENUM } from "@/configs";
import { getOrdersDetailData, getShipmentData } from "@/services/orders";
import { setOrderDetailData } from "@/stores/datas/orders-data-slice";
import { base64UrlDecode, DecryptBasic } from "@/utilities/hash-aes";
import { translate } from "@/utilities/translator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderPaymentMethod from "./components/order-payment-method";
import OrderSupport from "./components/order-support";
import OrderProductsList from "./components/products-list";
import ShippingInfo from "./components/shipping-info";

const OrderManagementFeatures = ({orderId}: {orderId: string}) => {
  const dispatch = useDispatch();
  const [shipment, setShipment] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const fetchData = async () => {
        const res = await getOrdersDetailData(orderId);

        if (res) {
          dispatch(setOrderDetailData(res));
          const shipment = await getShipmentData(orderId);
          setShipment(shipment.data.data[0]);
          return;
        }
      };
      fetchData();
    }
  }, [orderId]);


  return (
    <>
      <div className="hidden desktop:inline-block">
        <BackTo url="/profile/order-management">
          {translate("order_detail")}
        </BackTo>
      </div>

      <div className="flex flex-col w-full gap-3">
        <ShippingInfo shipment={shipment} />
        <OrderProductsList />
        <div className="flex gap-3 flex-col desktop:flex-row ">
          <OrderPaymentMethod />
          <OrderSupport />
        </div>
      </div>
    </>
  );
};

export default OrderManagementFeatures;
