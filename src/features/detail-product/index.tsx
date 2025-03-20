import Bounded from "@/components/base-components/containers/bounded";
import BannerContainer from "./components/banner-container";
import DescriptionContainer from "./components/description/description-container";
import MainContainer from "./components/main-container";
// import RecommendProducts from "./components/recommend-products";
// import ReviewsContainer from "./components/reviews/reviews-container";

const DetailProduct = () => {
  return (
    <main className="overflow-hidden">
      <Bounded className="md:py-6 py-4">
        <div className="rounded-lg px-4 py-3 bg-white">
          <MainContainer />
        </div>
        <div className="my-4">
          <DescriptionContainer />
        </div>
        {/* <div className="rounded-lg px-4 py-3 bg-white">
          <ReviewsContainer />
        </div>
        <div className="rounded-lg px-4 py-3 bg-white my-4">
          <RecommendProducts />
        </div> */}
        <BannerContainer />
      </Bounded>
    </main>
  );
};

export default DetailProduct;
