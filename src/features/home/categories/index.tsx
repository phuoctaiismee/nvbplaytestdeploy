import { Content } from "@prismicio/client";
import dynamic from "next/dynamic";
import SearchSection from "./components/search";
import Heading from "@/components/base-components/typography/heading";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Bounded from "@/components/base-components/containers/bounded";
const CategoriesCarousel = dynamic(() => import("./components/carousel"));
interface CategoriesFeatureType {
  slice: Content.CategoriesSliceDefault;
}
const CategoriesFeature = ({ slice }: CategoriesFeatureType) => {
  return (
    <Bounded className={cn("flex flex-col gap-8 py-4")}>
      <SearchSection />

      <div className={cn("flex flex-col gap-4")}>
        <Heading>{slice.primary.title}</Heading>
        <CategoriesCarousel />
      </div>
    </Bounded>
  );
};

export default CategoriesFeature;
