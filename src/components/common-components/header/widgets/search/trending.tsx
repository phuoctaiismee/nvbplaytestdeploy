import { Button } from "@/components/ui/button";
import { setSearchKeyword, setShowSearchSite } from "@/stores/search-slice";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import { HistorySearchType } from "./history";
import Cookies from "js-cookie";

const searchTrending = [
  "Pickleball",
  "Áo cầu lông",
  "Vợt yonex",
  "Phụ kiện cầu lông",
  "Cước cầu lông",
  "Quấn vợt",
  "Cầu lông",
  "Túi cầu lông",
  "Bao cầu lông",
];

const TrendingSearch = () => {
    const router = useRouter();
    const dispatch = useDispatch();
      const [historySearch, setHistorySearch] = useLocalStorage<
        HistorySearchType[]
      >("historySearch", []);
    
      const handleStoreSearchKeyword = (keyword: string) => {
          if (keyword == "") return;
      
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
    const handleSearchTrending = (searchKeyword: string) =>{  
        dispatch(setSearchKeyword(searchKeyword));
        handleStoreSearchKeyword(searchKeyword);
        dispatch(setShowSearchSite(false));
        Cookies.set("searchProduct", searchKeyword, { expires: 365 });
        router.push(`/products`);
    }
  return (
    <div className="flex flex-col gap-2 py-1.5 px-4">
      <div className="flex items-center justify-between py-1.5">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="p-1 bg-gradient-to-b from-primary to-primary/50 size-5 rounded-md"
          >
            <TrendingUp className="size-4 text-white" />
          </Button>
          <h3 className="text-base font-semibold">Xu hướng tìm kiếm</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchTrending.map((item, index) => (
          <Button
            onClick={() => handleSearchTrending(item)}
            key={index}
            variant="secondary"
            className="text-muted-foreground rounded-full"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearch;
