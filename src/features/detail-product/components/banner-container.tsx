import banner1 from "@/assets/images/banner-1.jpg";
import banner2 from "@/assets/images/banner-2.jpg";
import Bounded from "@/components/base-components/containers/bounded";
import Image from "next/image";

const BannerContainer = () => {
  return (
    <Bounded className="grid md:grid-cols-2 grid-col-1 gap-[16px]">
      <div className="w-full aspect-[2] relative">
        <Image src={banner1} alt="banner" fill className="object-cover" />
      </div>
      <div className="w-full aspect-[2] relative">
        <Image src={banner2} alt="banner" fill className="object-cover" />
      </div>
    </Bounded>
  );
};

export default BannerContainer;
