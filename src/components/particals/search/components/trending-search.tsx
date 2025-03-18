import { TrendingSearch } from "@/assets/icons";
import { Icon } from "@/components/common-components";
import { COMMON_DATA } from "@/configs";
import useSearchFilter from "@/hooks/useSearchFilter";
import { setSearchKeyword, setShowSearch } from "@/stores/search-slice";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { HistorySearchType } from "@/components/common-components/header/widgets/search/history";

const TrendingsSearch = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <div className="text-primary font-semibold flex gap-2 h-6">
          <img
            src={TrendingSearch.src}
            alt="trending-search-ico"
            className="h-6 w-6 aspect-square rounded-md"
          />
          Xu hướng tìm kiếm
        </div>
      </div>
      <div className="flex flex-wrap gap-3 overflow-hidden max-h-24">
        {COMMON_DATA.header.trend_search.map((trend, index) => (
          <TrendingItem key={index} name={trend.name} />
        ))}
      </div>
    </div>
  );
};

export default TrendingsSearch;
type TrendingItemProps = {
  name: string;
};
const TrendingItem: FC<TrendingItemProps> = ({ name }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // Hooks
  const [historySearch, setHistorySearch] = useLocalStorage<
    HistorySearchType[]
  >("historySearch", [
    {
      type: "product",
      keyword: "",
    },
  ]);
  const handleStoreSearchKeyword = (keyword: string) => {
    if (!keyword || keyword === "") return;

    const isDuplicate = historySearch?.some(
      (history) => history.keyword === keyword
    );

    if (isDuplicate) return;

    const newHistorySearch = [
      ...historySearch,
      {
        type: "keyword",
        keyword,
      },
    ];
    setHistorySearch(newHistorySearch as HistorySearchType[]);
  };
  const onSubmit = (keyword: string) => {
    dispatch(setSearchKeyword(keyword));
    dispatch(setShowSearch(false));
    handleStoreSearchKeyword(keyword);
    Cookies.set("searchProduct", keyword, { expires: 365 });
    router.push(`/products`);
  };
  return (
    <span
      onClick={() => onSubmit(name)}
      className="py-1 px-4 rounded-full bg-gray-primary h-10 flex items-center justify-center cursor-pointer w-fit text-sm font-medium"
    >
      {name}
    </span>
  );
};
