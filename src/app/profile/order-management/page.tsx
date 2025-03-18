"use client";
import { OrderEmpty } from "@/assets/images";
import EmptyItem from "@/components/base-components/cta/empty-item";
import TextInput from "@/components/base-components/input/text-input";
import MyOrdersSkeleton from "@/components/base-components/skeletons/my-order-skeleton";
import { Icon } from "@/components/common-components";
import FlyingAction from "@/components/particals/fly-element";
import TimeoutAction from "@/components/particals/timeout";
import { Button } from "@/components/ui/button";
import { COMMON_DATA } from "@/configs";
import OrderItem from "@/features/profile/elements/order-item";
import { cn } from "@/lib/utils";
import { getOrdersData } from "@/services/orders";
import { RootState } from "@/stores";
import { setOrderData } from "@/stores/datas/orders-data-slice";
import { setStatusOrderSelected } from "@/stores/profile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const filterOrders = (orders: any[], searchTerm: string): any[] => {
  if (!searchTerm.trim()) return orders; // Return all orders if search term is empty

  // Normalize the search term (remove accents and convert to lowercase)
  const lowerCaseSearchTerm = normalizeString(searchTerm.trim().toLowerCase());

  return orders.filter((order) => {
    // Ensure order.id is a valid string before applying unaccent and toLowerCase
    const orderId = order.id ? normalizeString(order.id.toLowerCase()) : "";

    const orderMatches = orderId.includes(lowerCaseSearchTerm); // Check if order ID matches

    // Check if any product in the order matches the search term
    const productMatches = order.items.some((product: any) => {
      const productTitle = product.title
        ? normalizeString(product.title.toLowerCase())
        : "";

      return productTitle.includes(lowerCaseSearchTerm);
    });

    // Return true if any match is found
    return orderMatches || productMatches;
  });
};

const normalizeString = (str: string) => {
  return str
    .normalize("NFD") // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toLowerCase(); // Convert to lowercase
};

const OrderManagement = () => {
  const { statusOrderSelected } = useSelector(
    (state: RootState) => state.profile
  );
  const { orderList } = useSelector(
    (state: RootState) => state.order_data_slice
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filterData, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await getOrdersData();
      dispatch(setOrderData(res));
      setFiltered(res);
    };
    fetchData();
    setLoading(false);
  }, []);

  const handleSearchFilterOrders = (keySearch: string): void => {
    let filteredOrders = filterOrders(orderList, keySearch);

    // Nếu có trạng thái được chọn, lọc tiếp theo trạng thái
    if (statusOrderSelected) {
      if (statusOrderSelected === "all") {
        filteredOrders = orderList;
      } else {
        filteredOrders = filteredOrders?.filter(
          (order) => order.status === statusOrderSelected
        );
      }
    }

    setFiltered(filteredOrders);
  };

  useEffect(() => {
    handleSearchFilterOrders(""); // Khi đổi trạng thái, reset lại danh sách
  }, [statusOrderSelected]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-col gap-2 justify-end bg-white rounded-t-lg">
        <div className="flex items-start desktop:items-center flex-col desktop:flex-row justify-between px-5">
          <span
            id="target-id"
            className="font-semibold text-lg text-txtprimary flex items-center justify-start h-14 w-full"
          >
            Quản lý đơn hàng
          </span>
          <TextInput
            inputClassName="!rounded-full px-4"
            className="w-full desktop:!w-fit min-w-[320px] !rounded-full h-10"
            placeholder="Tìm theo mã đơn, tên sản phẩm"
            rightIcon={<Icon icon="ph:magnifying-glass" fontSize={24} />}
            onChange={(e) => handleSearchFilterOrders(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-scroll scrollbar-none overflow-y-hidden">
          <div className="h-12 w-fit flex">
            {COMMON_DATA.header.order_status_list.map((status, index) => (
              <div
                key={index}
                onClick={() => dispatch(setStatusOrderSelected(status.value))}
                className={cn(
                  "h-12 min-w-[100px] select-none cursor-pointer flex items-center justify-center text-sm font-semibold border-b-2 border-white text-txtprimary",
                  statusOrderSelected === status.value &&
                    " border-txtthird text-txtthird"
                )}
              >
                {status.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <TimeoutAction
            tick={5000}
            loading={loading}
            onTickComponent={Array.from({ length: 3 }).map(
              (_, index: number) => (
                <MyOrdersSkeleton key={index} />
              )
            )}
            onEndComponent={
              <EmptyItem
                image={OrderEmpty.src}
                title="Chưa có đơn hàng nào."
                subTitle="Hãy tiếp tục mua sắm nhé!"
                isNavigable
                buttonTitle="Khám phá thêm"
              />
            }
          />
        ) : filterData?.length > 0 ? (
          filterData?.map((order: any, index: number) => (
            <OrderItem
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              key={index}
              status={order.status}
              data={order}
            />
          ))
        ) : (
          <EmptyItem
            image={OrderEmpty.src}
            title="Chưa có đơn hàng nào."
            subTitle="Hãy tiếp tục mua sắm nhé!"
            isNavigable
            buttonTitle="Khám phá thêm"
          />
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
