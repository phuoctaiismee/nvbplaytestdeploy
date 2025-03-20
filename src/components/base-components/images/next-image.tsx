import Image from "next/image";
import nvbplay_placeholder from "@/assets/icons/nvb-logo-black-white.svg";
import { cn } from "@/lib/utils";

interface NextImageProps {
  containerClassName?: string;
  url: string;
}
const NextImage = (props: NextImageProps) => {
  return (
    <div className={cn("relative w-full h-full", props.containerClassName)}>
      <Image
        fill
        src={props.url}
        loading="lazy"
        blurDataURL={nvbplay_placeholder}
        alt="image"
        className={cn({
          "object-cover": props?.url,
          "object-contain p-3": !props?.url,
        })}
        unoptimized={true}
      />
    </div>
  );
};

export default NextImage;
