import { getPostData } from "@/actions/posts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewSection = async () => {
  const res = await getPostData({
    page: 2,
    limit: 3,
  });
  const mainPost = res?.result[0];
  const subPosts = res?.result?.slice(1, 3);
  return (
    <div className="flex w-full flex-col desktop:flex-row items-center gap-3">
      <Link href={`/blogs/${mainPost?.slug}`} className="flex-grow w-full max-w-[50rem]">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={mainPost?.feature_image ?? ""}
            className="w-full h-full object-cover"
            fill 
            alt={mainPost?.title}
          />
        </div>
      </Link>
      <div className="flex-shrink w-full lg:max-w-sm h-full">
        <div className="grid grid-cols-2 desktop:grid-cols-1 gap-3 h-[200px] lg:h-[400px]">
          {subPosts?.map((post, index) => (
            <Link
              href={`/blogs/${post?.slug}`}
              key={index}
              className="relative rounded-lg overflow-hidden"
            >
              <Image
                src={post?.feature_image ?? ""}
                className="w-full h-full object-cover"
                fill
                alt={post?.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewSection;
