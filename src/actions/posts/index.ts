"use server";

import { Post } from "@/hooks/queries/ghost/type";
import { IResponse } from "@/types/response/response.type";

export const getPostData = async (params: Record<string, any>) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/ghost${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 5 },
    method: "GET",
  });

  const post: IResponse<{
      result: Post[];
      limit: number;
      total_pages: number;
      next_page: number;
      previous_page: number;
      current_page: number;
    }> = await res.json();

  return post.data.data;
};
