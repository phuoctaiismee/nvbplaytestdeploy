"use client";
import Selection from "@/components/custom/selection";
import { COMMON_DATA } from "@/configs";
import { KeyJSON, translate } from "@/utilities/translator";
import React, { useState } from "react";
import FlashCategoryItem from "../elements/flash-category";
import { Fire } from "@/assets/icons";
import { Icon } from "@/components/common-components";
import RePopover from "@/components/custom/popover";
import { ButtonFilter } from "../elements/button-filter";
import { ArrowDown, ArrowUp, Dot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { setActiveCategory, setFilterKey } from "@/stores/datas/price-list";

const FlashsaleFilter = () => {
  const dispatch = useDispatch();
  const [priceToggle, setPriceToggle] = useState(false);
  const { categories, activeCategory, filterKey } = useSelector(
    (state: RootState) => state.price_list
  );
  return (
    <div className="flex flex-col desktop:flex-row justify-between items-center min-h-[52px] px-4 pt-5 pb-4 gap-4 w-full">
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center w-full desktop:w-fit overflow-x-scroll scrollbar-none">
          <div className="flex items-center gap-2 w-fit">
            <FlashCategoryItem
              onClick={() => dispatch(setActiveCategory("all"))}
              active={"all" === activeCategory}
              key={"all"}
              className="text-nowrap h-[32px] desktop:h-[52px] gap-0"
              icon={<></>}
              title={"Tất cả"}
            />
            {categories?.map((item) => (
              <FlashCategoryItem
                onClick={() => dispatch(setActiveCategory(item.handle))}
                active={item.handle === activeCategory}
                key={item.id}
                className="text-nowrap h-[32px] desktop:h-[52px] gap-0"
                icon={<></>}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex desktop:hidden items-center gap-2">
        <div className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none">
          {COMMON_DATA.flashsale_sort
            .filter(
              (item) => item.value !== "priceDesc" && item.value !== "priceAsc"
            )
            .map((item, index) => (
              <ButtonFilter
                key={index}
                label={translate(item.name as KeyJSON)}
                className="text-sm font-medium text-txtfifth w-full"
                icon={<Dot size={24} className="text-gray-seventh" />}
                active={filterKey === item.value}
                activeClass="text-primary"
                onClick={() => dispatch(setFilterKey(item.value))}
              />
            ))}
          <ButtonFilter
            label={translate("price")}
            className="text-sm font-medium text-txtfifth w-full"
            icon={
              filterKey === "priceAsc" ? (
                <ArrowUp className="size-5" />
              ) : (
                <ArrowDown className="size-5" />
              )
            }
            active={filterKey === "priceAsc" || filterKey === "priceDesc"}
            activeClass="text-primary"
            onClick={() =>
              dispatch(
                setFilterKey(
                  filterKey === "priceAsc" ? "priceDesc" : "priceAsc"
                )
              )
            }
          />
        </div>
      </div>
      <div className="w-[261px] hidden desktop:flex items-center gap-2">
        <span className="text-sm font-medium text-nowrap">
          {translate("sort_by")}:
        </span>
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2 w-full">
          <Selection
            triggerClass="w-full"
            selectValueClass="text-sm"
            items={COMMON_DATA.flashsale_sort.map((item: any) => ({
              ...item,
              name: translate(item.name),
            }))}
            onSelected={(item) => {
              dispatch(setFilterKey(item.value));
            }}
            selectedItem={
              COMMON_DATA.flashsale_sort.find(
                (item) => item.value === filterKey
              ) || COMMON_DATA.flashsale_sort[0]
            }
            show="value"
            defaultValue={{
              ...COMMON_DATA.flashsale_sort[0],
              name:
                COMMON_DATA.flashsale_sort[0]?.name &&
                translate(COMMON_DATA.flashsale_sort[0]?.name as KeyJSON),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlashsaleFilter;
