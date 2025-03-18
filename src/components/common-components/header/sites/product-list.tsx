"use client";

import SearchInput from "@/components/base-components/input/search-input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { setSearchKeyword, setShowSearch } from "@/stores/search-slice";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../widgets/banner";
import { DesktopHeader } from "../widgets/desktop-header";
import { MobileCart } from "../widgets/mobile-cart";
import { RootState } from "@/stores";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

export const ProductListHeader = () => {
  // Redux state
  const { searchKeyword } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  // State local cho input
  const [searchValue, setSearchValue] = useState(searchKeyword);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Hook kiểm tra mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Đồng bộ state khi Redux searchKeyword thay đổi
  useEffect(() => {
    setSearchValue(searchKeyword);
  }, [searchKeyword]);

  // Xử lý tìm kiếm khi nhấn Submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    dispatch(setSearchKeyword(searchValue));
    dispatch(setShowSearch(false));

    Cookies.set("searchProduct", searchValue, { expires: 365 });

    // Ẩn bàn phím trên mobile
    if (isMobile) {
      setTimeout(() => {
        inputRef.current?.blur(); // Mất focus input
        (document.activeElement as HTMLElement | null)?.blur(); // Ép kiểu để tránh lỗi
      }, 100);
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <Banner />
        <div className="flex justify-between items-center px-5 py-2">
          <Link href="/">
            <ChevronLeft className="size-5 text-neutral-800 -ml-1" />
          </Link>
          <div
            className={cn(
              "px-2 py-2 lg:hidden w-full transition-all animate-fade-down duration-500 ease-in-out"
            )}
          >
            <SearchInput
              //@ts-ignore
              onSubmit={onSubmit}
              iconLeft
              value={searchValue}
              defaultValue={searchValue}
              placeholder="Tìm kiếm theo tên, hãng"
              onChange={(e) => setSearchValue(e.target.value)}
              containerClassName="!h-10 lg:!h-12 !w-full"
              className="!w-full"
              inputRef={inputRef} // Truyền ref vào input
            />
          </div>
          <MobileCart />
        </div>
      </div>
    );
  }

  return <DesktopHeader />;
};
