import Image from "@/components/base-components/images/image";
import Heading from "@/components/base-components/typography/heading";
// import { FadeUpMotionLayout } from "@/layouts/component-layouts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NewSection from "./components/new";

const NewFeatures = () => {
  return (
    // <FadeUpMotionLayout>
    <div className={cn("flex flex-col gap-4")}>
      <div className="flex items-center justify-between">
        <Heading>Tin thể thao</Heading>
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Xem tất cả
        </Link>
      </div>
      <NewSection />
    </div>
    // </FadeUpMotionLayout>
  );
};

export default NewFeatures;
