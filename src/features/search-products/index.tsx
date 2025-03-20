import Bounded from "@/components/base-components/containers/bounded";
import FilterContainer from "./components/filter-side-bar/filter-container.";
import FilterTopContainer from "./components/filter-top/filter-top-container";
import FilterTopMobileContainer from "./components/filter-top/filter-top-mobile-container";
import ProductListContainer from "./components/products-list/products-list-container";

const SearchProductPage = () => {
  return (
    <Bounded className="bg-[#f5f5fa] py-0">
      <div className="flex gap-[24px] md:py-[24px]">
        <FilterContainer className="hidden md:block " />
        <div className="flex flex-col md:gap-[24px] flex-1">
          <FilterTopMobileContainer className="md:hidden" />
          <FilterTopContainer />
          <ProductListContainer />
        </div>
      </div>
    </Bounded>
  );
};

export default SearchProductPage;
