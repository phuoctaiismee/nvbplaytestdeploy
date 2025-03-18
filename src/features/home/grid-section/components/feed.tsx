import { getPostData } from "@/actions/posts";
import { cn } from "@/lib/utils";
import { M_PLUS_1 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Feed = async () => {
  const res = await getPostData({
    page: 1,
    limit: 3,
  });
  const mainPost = res?.result[0];
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4")}>
      <Link href={`/blogs/${mainPost?.slug}`} className="relative w-full h-[345px] lg:h-full rounded-lg overflow-hidden">
        <Image
          src={mainPost?.feature_image ?? ""}
          className="w-full h-full object-cover"
          alt=""
          fill
        />
      </Link>

      <div className="flex flex-col gap-4">
        {res?.result.slice(1, 3).map((post, index) => (
          <Link
            href={`/blogs/${post?.slug}`}
            key={index}
            className="relative aspect-[2] rounded-lg overflow-hidden"
          >
            <Image
              src={post?.feature_image ?? ""}
              className="w-full h-full object-cover"
              alt=""
              fill
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;
