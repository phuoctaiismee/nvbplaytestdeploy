"use client";
import React, { useRef } from "react";
import { Suggestion } from "@/assets/images";
import { ButtonCategoryListItem } from "@/components/base-components/buttons";
import ProductCard from "@/components/base-components/cards/product-card";
import { Icon } from "@/components/common-components";
import { Button } from "@/components/ui/button";
import { COMMON_DATA } from "@/configs";
import { setCurrentCategory } from "@/stores/suggestion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useWindowSize } from "@/hooks";
import { RootState } from "@/stores";
import { useSelector, useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import useGetAllProductsQuery from "@/hooks/queries/products/useGetAllProductsQuery";
import LoadingDots from "@/components/base-components/loading/LoadingDots";
import ProductCardSkeleton from "../deals/components/skeletons/product-carousel-item";
import useGetCategoriesQuery from "@/hooks/queries/categories/useGetCategoriesQuery";
import useSearchFilter from "@/hooks/useSearchFilter";
import { FilterOption } from "@/stores/search-slice";
import { useRouter } from "next/navigation";
const SuggestionFeature = () => {
  const [width, height] = useWindowSize();
  const router = useRouter();
  const { currentCategory } = useSelector(
    (state: RootState) => state.suggestion
  );
  const { productsList, isLoading, handleNext, isLastPage, isFetching } =
    useGetAllProductsQuery();
  const { data, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const { dispatchItem, handleSelect, selectedItems } =
    useSearchFilter("selectedCategories");

  const onChange = (item: FilterOption) => {
    handleSelect(item);
    dispatchItem(item);
    router.push(`/products`);
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  return (
    <>
      <FadeUpMotionLayout>
        <div
          className={cn(
            "flex flex-col gap-2 bg-white max-h-[19.75rem] h-full overflow-hidden rounded-lg"
          )}
        >
          <div className="flex items-start justify-between h-fit flex-col desktop:items-center desktop:flex-row desktop:h-[70px] w-full px-5">
            <span className="h-full py-5 font-semibold text-xl">
              Đề xuất hôm nay
            </span>
            <div className="flex items-center overflow-x-scroll scrollbar-none w-full desktop:w-fit">
              <div className="flex items-center gap-2">
                <ButtonCategoryListItem
                  active={currentCategory === "tatca"}
                  onClick={() => dispatch(setCurrentCategory("tatca"))}
                >
                  Tất cả
                </ButtonCategoryListItem>
                {data.map((category, index) => {
                  if (index <= 2 && width >= 1200) {
                    return (
                      <ButtonCategoryListItem
                        active={currentCategory === category.id}
                        key={index}
                        onClick={() => {
                          dispatch(setCurrentCategory(category.id));
                          onChange({
                            label: category.name,
                            value: category.handle,
                          });
                        }}
                      >
                        {category.name}
                      </ButtonCategoryListItem>
                    );
                  }
                  if (width < 1200) {
                    return (
                      <ButtonCategoryListItem
                        active={currentCategory === category.id}
                        key={index}
                        onClick={() => {
                          dispatch(setCurrentCategory(category.id));
                          onChange({
                            label: category.name,
                            value: category.handle,
                          });
                        }}
                      >
                        {category.name}
                      </ButtonCategoryListItem>
                    );
                  }
                })}
                {width >= 1200 && (
                  <Popover>
                    <PopoverTrigger className="rounded-full bg-gray-primary text-gray-icon aspect-square h-10 w-10 flex items-center justify-center">
                      <Icon icon="ph:dots-three" fontSize={20} />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2 bg-white shadow-lg p-4 rounded-xl z-50 max-h-60 overflow-y-auto scrollbar-none">
                      {data.map((category, index) => {
                        if (index > 2) {
                          return (
                            <ButtonCategoryListItem
                              active={currentCategory === category.id}
                              className="!w-full bg-white hover:bg-white"
                              key={index}
                              onClick={() => {
                                dispatch(setCurrentCategory(category.id));
                                onChange({
                                  label: category.name,
                                  value: category.handle,
                                });
                              }}
                            >
                              {category.name}
                            </ButtonCategoryListItem>
                          );
                        }
                      })}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-full overflow-hidden">
            <img
              src={Suggestion.src}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </FadeUpMotionLayout>
      <FadeUpMotionLayout>
        <div
          className={cn(
            "grid grid-cols-2 sm:grid-cols-3 desktop:grid-cols-5 gap-[12.5px]"
          )}
        >
          {productsList
            ?.slice(0, productsList?.length)
            .map((item, index) => <ProductCard key={index} {...item} />)}
        </div>
      </FadeUpMotionLayout>
      {isFetching && (
        <div className="w-full flex justify-center">
          <LoadingDots color="text-red-600" />
        </div>
      )}
      {!isLastPage && !isFetching && (
        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            className=" text-14-21-600 text-red-primary  border-red-primary hover:text-red-primary"
            variant={"outline"}
          >
            Xem thêm
          </Button>
        </div>
      )}
    </>
  );
};

export default SuggestionFeature;
