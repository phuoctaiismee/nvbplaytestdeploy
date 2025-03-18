"use client";
import ProductCard from "@/components/base-components/cards/product-card";
import ProductCardSkeleton from "@/components/base-components/skeletons/product-card-skeleton";
import { toastNVB } from "@/components/base-components/toast";
import Heading from "@/components/base-components/typography/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarts } from "@/hooks/queries/cart";
import { useCollections } from "@/hooks/queries/collections";
import useMediaQueryScreen from "@/hooks/useMediaQueryScreen";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores";
import { setCartData } from "@/stores/datas/cart-slice";
import { setCollections } from "@/stores/datas/collections";
import { FilterOption } from "@/stores/search-slice";
import { Content, Slice } from "@prismicio/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface ProductFeatureType {
  slice: Content.ProductsSlice;
}

const ProductFeature = ({ slice }: ProductFeatureType) => {
  const dispatch = useDispatch();
  const collectionsData = useSelector(
    (state: RootState) => state.collections.collections
  );

  const { dispatchItem, handleSelect, selectedItems } = useSearchFilter(
    "selectedCollections"
  );
  const { isMobile } = useMediaQueryScreen();
  const { data: collections, isLoading, isFetching } = useCollections();

  useEffect(() => {
    dispatch(setCollections(collections));
  }, [collections]);

  const newCollection = useMemo(() => {
    if (collectionsData && collectionsData.length > 0) {
      return collectionsData?.find(
        (item: any) => item.collection_handle === "new-product"
      );
    }
  }, [collectionsData]);
  const bestSellerCollection = useMemo(() => {
    if (collectionsData && collectionsData.length > 0) {
      return collectionsData?.find(
        (item: any) => item.collection_handle === "best-seller"
      );
    }
  }, [collectionsData]);

  const onClick = (item: FilterOption) => {
    handleSelect(item);
    if (!isMobile) dispatchItem(item);
  };

  if (isLoading || isFetching) {
    return <ProductFeatureSkeleton slice={slice} />;
  }

  return (
    <>
      {slice.variation === "default" &&
        newCollection?.products &&
        newCollection?.products?.length > 0 && (
          <div className={cn("flex flex-col gap-4")}>
            <div className="flex items-center justify-between">
              <Heading>{newCollection?.collection_name}</Heading>
              <Link
                onClick={() =>
                  onClick({
                    label: newCollection?.collection_name || "",
                    value: newCollection?.collection_handle || "",
                  })
                }
                href={`/products`}
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Xem tất cả
              </Link>
            </div>
            <Carousel opts={{ align: "start", dragFree: true, loop: true }}>
              <CarouselContent>
                {newCollection?.products.map((item: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                  >
                    <ProductCard {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden desktop:inline-flex absolute -left-5 text-primary" />
              <CarouselNext className="hidden desktop:inline-flex absolute -right-5 text-primary" />
            </Carousel>
          </div>
        )}
      {slice.variation === "bestSellerProducts" &&
        bestSellerCollection?.products &&
        bestSellerCollection?.products?.length > 0 && (
          <div className={cn("flex flex-col gap-4")}>
            <div className="flex items-center justify-between">
              <Heading>{bestSellerCollection?.collection_name}</Heading>
              <Link
                href={`/products`}
                className="text-sm font-medium text-primary hover:text-primary/80"
                onClick={() =>
                  onClick({
                    label: bestSellerCollection?.collection_name || "",
                    value: bestSellerCollection?.collection_handle || "",
                  })
                }
              >
                Xem tất cả
              </Link>
            </div>
            <Carousel opts={{ align: "start", dragFree: true, loop: true }}>
              <CarouselContent>
                {bestSellerCollection?.products.map(
                  (item: any, index: number) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                    >
                      <ProductCard {...item} />
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden desktop:inline-flex absolute -left-5 text-primary" />
              <CarouselNext className="hidden desktop:inline-flex absolute -right-5 text-primary" />
            </Carousel>
          </div>
        )}
    </>
  );
};

export default ProductFeature;

export const ProductFeatureSkeleton = ({
  slice,
}: {
  slice: Content.ProductsSlice;
}) => {
  return (
    <>
      {slice.variation === "default" && (
        <div className={cn("flex flex-col gap-4")}>
          <div className="flex items-center justify-between">
            <Heading>Hàng mới đổ bộ</Heading>
            <span className="text-sm font-medium text-primary hover:text-primary/80">
              Xem tất cả
            </span>
          </div>
          <div className="grid grid-cols-2 row-auto sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
      {slice.variation === "bestSellerProducts" && (
        <div className={cn("flex flex-col gap-4")}>
          <div className="flex items-center justify-between">
            <Heading>Sản phẩm bán chạy</Heading>
            <span className="text-sm font-medium text-primary hover:text-primary/80">
              Xem tất cả
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} withButton={true} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
