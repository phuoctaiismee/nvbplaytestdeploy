import { NVBPlay_Bill } from "@/assets/images";
import DialogResponsive from "@/components/base-components/dialog/dialog-responsive";
import Image from "@/components/base-components/images/image";
import Tag from "@/components/base-components/tag/coupon";
import { toastNVB } from "@/components/base-components/toast";
import IconCustom from "@/components/common-components/icon-custom";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePromotion } from "@/hooks/queries/promotion";
import { usePromotionChecking } from "@/hooks/queries/promotion/promotion";
import { cn } from "@/lib/utils";
import { applyPromotion } from "@/services/cart";
import { Cart } from "@/services/cart/type";
import { getPromotionDatas } from "@/services/promotion";
import { RootState } from "@/stores";
import { setCartData, setPromotions } from "@/stores/datas/cart-slice";
import { FormatCurrency, FormatToThousands } from "@/utilities/text";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { formatDate, isAfter } from "date-fns";
import { Check, ChevronRight, Loader, Minus, Plus, Ticket } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PromotionDialog2 = ({ data }: { data: Cart }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const user = useSelector((state: RootState) => state.users_data.user);
  const saleChannel = useSelector(
    (state: RootState) => state.sale_channel.activeSaleChannel
  );



  const {
    data: promotionData,
    isLoading,
    getPromotionChecking,
    removePromotion,
  } = usePromotionChecking();
  const { applyPromotion } = usePromotion();

  const promotions = useSelector(
    (state: RootState) => state.cart_slice.promotions
  );

  const promotionSorted = useMemo(() => {
    return promotionData?.sort(
      (a, b) => (b.campaign ? 1 : 0) - (a.campaign ? 1 : 0)
    );
  }, [promotionData]);

  useEffect(() => {
    getPromotionChecking({
      customer_id: user?.id || "",
      sales_channel_id: saleChannel?.id || "",
      total_amount: data?.total || 0,
      items:
        data?.items.map((item) => ({
          product_id: item.product_id || "",
          variant_id: item.variant_id || "",
          quantity: item.quantity || 0,
          price: item.unit_price || 0,
        })) || [],
    });
  }, [data,open]);

  const totalPricePromotion = useMemo(() => {
    if (!promotionData || !promotions) return FormatCurrency(0);
  
    // Lọc danh sách promotion đang áp dụng
    const appliedPromotions = promotionData.filter((item) =>
      promotions.includes(item.code)
    );
    // Tính tổng giảm giá
    const totalDiscount = appliedPromotions.reduce(
      (acc, item) => acc + (item?.application_method?.value || 0),
      0
    );
  
    return FormatCurrency(totalDiscount);
  }, [promotions, promotionData]);
  

  // Handle
  const handleSelectPromotion = (item: string) => {
    const newPromotions = promotions?.includes(item)
      ? promotions.filter((promo) => promo !== item) // Xóa nếu đã tồn tại
      : [...(promotions || []), item]; // Thêm nếu chưa có

    dispatch(setPromotions(newPromotions));
  };

  const handleApplyPromotion = async () => {
    try {
      const promoCodes = promotions?.map((item: any) => item) || [];
      const response: any = await applyPromotion.applyPromotionAsync({
        cart_id: data?.id,
        promo_codes: promoCodes,
      });
      if (response) {
        // toast
        toastNVB({
          type: "success",
          msg: "Áp dụng mã giảm giá thành công",
        });

        setOpen(false);
        dispatch(setCartData(response.data.data));
        dispatch(
          setPromotions(
            response?.data?.data?.promotions?.map((item: any) => item.code) || []

          )
        );
      }
    } catch (error) {
      console.error("Error applying promotion:", error);
    }
  };

  const handleApplyClick = async () => {
    try {
      if (code.length === 0) return;

      // Thêm mã khuyến mãi mới vào danh sách
      dispatch(setPromotions([...(promotions || []), code]));
      
      // Xóa input sau khi xử lý xong
      setCode("");

      // Gọi hàm xử lý tiếp theo
      await handleApplyPromotion();
    } catch (error) {
      console.error("Error applying promotion:", error);
      // Bạn có thể thêm logic thông báo lỗi cho người dùng ở đây
    }
  };

  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      trigger={
        <>
          <div className="w-full hidden desktop:inline-block">
            <Button
              className="w-full justify-between bg-gray-100 text-muted-foreground rounded-lg"
              variant="ghost"
            >
              <div className="flex items-center gap-2">
                <IconCustom
                  icon="mdi:voucher"
                  className="size-5 text-[#0d5bb5]"
                />
                <span>Chọn hoặc nhập mã</span>
              </div>
              <IconCustom icon="lucide:chevron-right" className="size-4" />
            </Button>
          </div>
          <div className="w-full desktop:hidden">
            <div className="py-2.5 px-4 flex justify-between">
              <div className="flex items-center gap-[.3125rem]">
                <Ticket className="size-6 text-blue-500" />
                <span className="text-sm">Mã giảm giá</span>
              </div>
              <div className="flex items-center gap-[.3125rem]">
                {data?.discount_total > 0 ? (
                  <Tag text={`-${FormatCurrency(data?.discount_total)}`} />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Chọn ưu đãi
                  </span>
                )}
                <ChevronRight className="size-5 text-gray-500" />
              </div>
            </div>
          </div>
        </>
      }
    >
      <div className="flex flex-col h-full">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle className="text-center">Mã giảm giá</DialogTitle>

          <div className="pt-5 flex items-center gap-2">
            <Input
              placeholder="Nhập mã giảm giá"
              className="bg-gray-100"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              disabled={code.length === 0}
              className="disabled:bg-gray-200 disabled:text-muted-foreground"
              onClick={handleApplyClick}
            >
              Áp dụng
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto scrollbar-none">
          {isLoading ? (
            <div className="flex flex-col gap-3 px-4 py-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-16" />
              ))}
            </div>
          ) : (
            <>
              {promotionSorted && promotionSorted.length > 0 ? (
                <div className="flex flex-col gap-3 px-4 py-3">
                  <h2 className="font-medium leading-6">Mã giảm giá</h2>
                  <div className="flex flex-col gap-2">
                    {promotionData?.map((item: any, index: number) => (
                      <div className="flex flex-col" key={index}>
                        <div
                          className={cn(
                            "relative flex items-center p-3 gap-3 border rounded-lg cursor-pointer bg-white"
                          )}
                        >
                          <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-start gap-2">
                              <div className="aspect-square size-12">
                                <Image
                                  src={"/images/promotion_image2.png"}
                                  alt="promotion"
                                  className="rounded-lg"
                                  classNameImage={cn({
                                    "filter grayscale":
                                      item?.application_method?.max_quantity ===
                                        0 ||
                                      isAfter(
                                        new Date(),
                                        item?.campaign?.ends_at
                                      ),
                                    //   !item.campaign,
                                  })}
                                />
                              </div>
                              <div className="flex w-full flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                  <h2 className="text-base font-semibold leading-5">
                                    {item?.code}
                                    {item?.campaign?.discount_amount &&
                                      `- Giảm ${FormatCurrency(
                                        item?.campaign?.discount_amount
                                      )}`}
                                  </h2>
                                  <p className="text-xs leading-4 text-muted-foreground">
                                    Đơn tối thiểu
                                  </p>
                                </div>
                                <div className="flex flex-1 items-center pt-2 gap-2">
                                  <div className="flex items-center gap-1">
                                    {item?.campaign?.ends_at && (
                                      <p className="text-xs">
                                        HSD:{" "}
                                        {formatDate(
                                          item?.campaign?.ends_at || new Date(),
                                          "dd/MM/yyyy"
                                        )}
                                      </p>
                                    )}

                                    <p className="text-xs font-semibold">
                                      Điều kiện
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleSelectPromotion(item.code)}
                              disabled={
                                isAfter(new Date(), item?.campaign?.ends_at) ||
                                item?.application_method?.max_quantity === 0
                                // ||
                                // !item.campaign
                              }
                              className={cn(
                                "size-8 rounded-lg disabled:bg-gray-200 disabled:text-muted-foreground",
                                promotions?.includes(item.code) &&
                                  "bg-primary text-white",
                                !promotions?.includes(item.code) &&
                                  "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary/50"
                              )}
                              size={"icon"}
                            >
                              {promotions?.includes(item.code) ? (
                                <Check className="size-5" />
                              ) : (
                                <Plus className="size-5" />
                              )}
                            </Button>
                          </div>
                          {item?.application_method?.max_quantity &&
                            item?.application_method?.max_quantity !== null &&
                            item?.application_method?.max_quantity > 0 && (
                              <div className="absolute top-2 right-0 bg-primary/20 h-fit text-primary px-1.5 py-0.5 rounded-l-full rounded-r-none flex items-center justify-center">
                                <span className="text-[.625rem] font-semibold">
                                  x{item?.application_method?.max_quantity}
                                </span>
                              </div>
                            )}
                        </div>
                        {isAfter(new Date(), item?.campaign?.ends_at) && (
                          <p className="py-2 pt-4 px-4 -mt-2 text-xs text-red-500 bg-[#FFF0F1] rounded-b-lg">
                            Voucher đã hết hạn
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <Image
                      src={NVBPlay_Bill.src}
                      alt="no-record"
                      className="size-72"
                    />
                    <p className="text-sm text-muted-foreground">
                      Chưa có mã giảm giá nào
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="px-4 py-3 border-t">
          <div className="flex items-center justify-between w-full">
            {promotions && promotions.length > 0 ? (
              <div className="flex flex-col">
                <p>Đã chọn {promotions.length} ưu đãi</p>
                <p className="text-sm">
                  Tiết kiệm:{" "}
                  <span className="text-base font-semibold  text-green-600">
                    {totalPricePromotion}
                  </span>
                </p>
              </div>
            ) : (
              <p>Chọn thêm mã giảm giá</p>
            )}
            <div className="flex items-center gap-2">
              <Button
                // disabled={!promotions || promotions.length === 0 || isLoading}
                onClick={handleApplyPromotion}
              >
                {applyPromotion.isLoading ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span>Đang áp dụng...</span>
                  </>
                ) : (
                  "Áp dụng"
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </div>
    </DialogResponsive>
  );
};

export default PromotionDialog2;
