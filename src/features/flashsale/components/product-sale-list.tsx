"use client";
import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormatCurrency } from "@/utilities/text";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  setProductAvailability,
  setProductOutofStock,
} from "@/stores/datas/price-list";
import { getAblyChannel } from "@/utilities/ably";
import { OutOfStockEvent } from "@/utilities/ably/type";
import HeartActionWishList from "@/components/base-components/cards/heart-action";

const ProductSaleList = () => {
  const dispatch = useDispatch();
  const { priceList, active, activeCategory, filterKey } = useSelector(
    (state: RootState) => state.price_list
  );

  const products = useMemo(() => {
    const activePriceList = priceList?.find((item) => item.id === active);
    if (!activePriceList || !activePriceList.prices) return [];

    const availableCategories = activePriceList.categories.map((c) => c.handle);

    // Nếu activeCategory không hợp lệ hoặc là "all", hiển thị toàn bộ products
    let filteredProducts =
      !activeCategory ||
      activeCategory === "all" ||
      !availableCategories.includes(activeCategory)
        ? activePriceList.prices
        : activePriceList.prices.filter((price) =>
            price.price_set.variant.product.categories.some(
              (category) => category.handle === activeCategory
            )
          );

    // Áp dụng bộ lọc theo filterKey
    if (filterKey) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        const variantA = a.price_set.variant;
        const variantB = b.price_set.variant;

        switch (filterKey) {
          case "bestSeller": {
            const reservedA = variantA.inventory_items.reduce(
              (sum, item) =>
                sum +
                (item.inventory.location_levels?.[0]?.reserved_quantity || 0),
              0
            );
            const reservedB = variantB.inventory_items.reduce(
              (sum, item) =>
                sum +
                (item.inventory.location_levels?.[0]?.reserved_quantity || 0),
              0
            );
            return reservedB - reservedA; // Sắp xếp giảm dần
          }

          case "newArrival":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            ); // Sản phẩm mới trước

          case "priceAsc":
            return a.amount - b.amount; // Giá thấp trước

          case "priceDesc":
            return b.amount - a.amount; // Giá cao trước

          case "percentDiscount":
            return b.discount_percentage - a.discount_percentage;
          default:
            return 0;
        }
      });
    }

    return filteredProducts;
  }, [priceList, active, activeCategory, filterKey]);

  useEffect(() => {
    const channel = getAblyChannel("product_outofstock:deal");
    channel.subscribe("product:outofstock", (message) => {
      const productOutofStock: OutOfStockEvent = JSON.parse(message.data);
      if (productOutofStock.data.length > 0) {
        productOutofStock.data.forEach((item) => {
          if (item.availability <= 0) {
            dispatch(setProductOutofStock({ variantId: item.id }));
          } else {
            dispatch(
              setProductAvailability({
                variantId: item.id,
                quantity: item.availability,
              })
            );
          }
        });
      }
    });
  }, []);

  return (
    <>
      {products?.map((item, index) => {
        const discountPercent =
          ((item.price_set?.variant.calculated_price?.original_amount -
            item.amount) /
            item.price_set.variant?.calculated_price?.original_amount) *
          100;

        const isOutOfStock =
          item.is_out_of_stock ||
          item.availability <= 0 ||
          item.availability === null ||
          item.price_set.variant.inventory_items[0].inventory.location_levels
            .length <= 0 ||
          item.price_set.variant?.inventory_items?.[0].inventory
            ?.location_levels?.[0]?.stocked_quantity -
            item.price_set.variant?.inventory_items?.[0].inventory
              ?.location_levels?.[0]?.reserved_quantity <=
            0;

        const stockQuantity = item.availability
          ? item.availability
          : (item.price_set.variant?.inventory_items?.[0]?.inventory
              ?.location_levels?.[0]?.stocked_quantity || 0) -
            (item.price_set.variant?.inventory_items?.[0]?.inventory
              ?.location_levels?.[0]?.reserved_quantity || 0);

        return (
          <div
            key={index}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            className={cn("flex flex-col items-center animate-fade-up")}
          >
            <div className="relative">
              <Image
                src={
                  item.price_set.variant?.metadata?.thumbnail ||
                  item.price_set.variant?.product.thumbnail
                }
                className={cn(
                  "aspect-square rounded-lg border-2 border-primary",
                  isOutOfStock && "border-gray-100 filter grayscale"
                )}
              />
              <div className="absolute top-0 inset-x-0 flex pt-3 px-4 items-center justify-between">
                <div className="w-[49px] h-[22px] bg-[#FFE880] p-0.5 rounded flex items-center gap-0">
                  <img
                    src="/icons/flash.svg"
                    className="size-[22px] -ml-2.5"
                    alt=""
                  />
                  <span className="text-sm -ml-2 font-medium text-[#E36301]">
                    -{discountPercent.toFixed(0)}%
                  </span>
                </div>
                <HeartActionWishList id={item.price_set.variant.id || ""} />
              </div>
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center h-full w-full">
                  <div className="bg-white/60 flex items-center justify-center z-10 h-16 w-full">
                    <p className="text-black text-lg font-semibold uppercase">
                      Hết hàng
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 w-full flex flex-col gap-3">
              <Link
                href={`/products/${item.price_set.variant.product.handle}?variantId=${item.price_set.variant.id}`}
                className="text-sm hover:text-primary cursor-pointer line-clamp-2"
              >
                {item.price_set.variant.title}
              </Link>
              <div>
                <p className="text-base text-primary font-semibold">
                  {FormatCurrency(item.amount)}
                </p>
                <p className="text-xs text-muted-foreground line-through">
                  {FormatCurrency(
                    item.price_set.variant.calculated_price.original_amount
                  )}
                </p>
              </div>
              <Badge
                className={cn(
                  "w-full font-normal text-center items-center gap-1 justify-center",
                  isOutOfStock
                    ? "bg-gray-300 hover:bg-gray-300/80 cursor-not-allowed text-gray-100"
                    : "bg-[#D93843] hover:bg-[#D93843]/80 text-white"
                )}
              >
                {isOutOfStock ? (
                  "Hết hàng"
                ) : (
                  <>
                    <img src="/icons/fire.svg" className="size-4" alt="" />
                    Còn {stockQuantity}{" "}
                    <span className="block md:hidden">SP</span>
                    <span className="hidden md:block">Sản phẩm</span>
                  </>
                )}
              </Badge>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductSaleList;
