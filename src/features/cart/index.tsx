"use client";

import Bounded from "@/components/base-components/containers/bounded";
import Heading from "@/components/base-components/typography/heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import ProductCartListing from "./components/product";
import NoRecord from "./components/no-record";
import OrderInfomation from "./components/order-infomation";
import PromotionOrder from "./components/promotion";
import DetailOrderMobile from "./components/detail-mobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useCarts } from "@/hooks/queries/cart";
import { useProducts } from "@/hooks/queries/products";
import ProductCard from "@/components/base-components/cards/product-card";
import {
  removeItemsActive,
  setCartData,
  setItemsActive,
  setPromotions,
} from "@/stores/datas/cart-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { GetACookie } from "@/utilities/cookies";
import { useRouter } from "next/navigation";

const CartFeatures = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart: cartData, itemsActive } = useSelector(
    (state: RootState) => state.cart_slice
  );


  const { cart, isLoading, isSuccess } = useCarts();
  const { products: productData } = useProducts();

  const [cartStorage, setCartStorage] = useState<any>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart_items");
    if (storedCart) {
      setCartStorage(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (isSuccess && cart?.cart) {
      // Ưu tiên lấy từ localStorage nếu id khớp, nếu không thì lấy từ API
      const finalCart =
        cartStorage && cart.cart.id === cartStorage.id
          ? cartStorage
          : cart.cart;
      if (finalCart) {
        dispatch(setCartData(finalCart));
        dispatch(
          setPromotions(
            finalCart.promotions.map((item: any) => item?.code) || []
          )
        );

        handleSelectAll(true);
      }
    }
  }, [cartStorage, cart]);

  useEffect(() => {
    if (cartData) {
      localStorage.setItem("cart_items", JSON.stringify(cartData));
    }
  }, [cartData]);

  const totalPrices = useMemo(() => {
    if (!cartData?.items) return { total_item: 0 };
    return {
      total_item: itemsActive?.reduce((acc, itemId) => {
        const item = cartData.items.find((item: any) => item.id === itemId);
        return acc + (item ? item.unit_price * item.quantity : 0);
      }, 0),
    };
  }, [itemsActive, cartData?.items]);

  const handleSelectAll = (checked: boolean) => {
    if (!cartData?.items?.length) return;
    dispatch(removeItemsActive());
    if (checked) {
      dispatch(
        setItemsActive(
          cartData.items
            .filter((item: any) => !item?.disable)
            .map((item: any) => item?.id)
        )
      );
    }
  };

  useEffect(() => {
    const token = GetACookie("token");
    if (!token) {
      router.replace("/auth?redirect=/cart");
    }
  }, [router]);

  if (isLoading) {
    return <Skeleton className="w-full h-[48px] rounded-lg" />;
  }

  return (
    <Bounded className="py-6 flex gap-3 relative w-full">
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-[48px] rounded-lg px-4 py-3 bg-white hidden desktop:flex items-center">
          <div className="flex w-full items-center gap-3">
            <Checkbox
              onCheckedChange={handleSelectAll}
              checked={
                cartData?.items &&
                itemsActive?.length ===
                  (cartData.items?.filter((item: any) => !item?.disable)
                    .length ?? 0)
              }
              className="size-5 rounded border-gray-200 bg-gray-100 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800"
            />
            <div className="flex w-full items-center gap-4">
              <div className="flex items-center w-full">
                <p className="w-[304px] text-sm flex flex-1 items-center gap-0.5">
                  <span>Tất cả</span>{" "}
                  <span>({cartData?.items?.length ?? 0} sản phẩm)</span>
                </p>
                <div className="flex flex-1 items-center text-sm">
                  <p className="w-[142px] text-center">Đơn giá</p>
                  <p className="w-[142px] text-center">Số lượng</p>
                  <p className="w-[142px] text-right">Thành tiền</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0">
                <Trash2Icon className="size-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2Icon className="size-5 text-gray-500 animate-spin" />
          </div>
        ) : (cartData?.items?.length ?? 0) > 0 ? (
          <ProductCartListing />
        ) : (
          <NoRecord />
        )}

        <div
          className={cn("flex flex-col w-full gap-4 bg-white rounded-lg p-4")}
        >
          <div className="flex items-center justify-between">
            <Heading>Có thể bạn sẽ thích</Heading>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-4 gap-[12.5px]">
            {productData
              ?.slice(0, 4)
              .map((item: any, index: number) => (
                <ProductCard withBoder {...item} key={index} />
              ))}
          </div>
        </div>
      </div>

      <div className="hidden desktop:inline-block w-[360px]">
        <div className="sticky top-[10rem] flex flex-col gap-3">
          <PromotionOrder data={cartData} />
          <OrderInfomation
            data={cartData}
            totalPrices={totalPrices}
            activeItems={itemsActive || []}
          />
        </div>
      </div>

      {(cartData?.items?.length ?? 0) > 0 && (
        <DetailOrderMobile
          data={cartData}
          totalPrices={totalPrices}
          activeItems={itemsActive || []}
        />
      )}
    </Bounded>
  );
};

export default CartFeatures;
