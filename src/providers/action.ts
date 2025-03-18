"use server";

import { ISetting } from "@/types/settings";

export const getSettings = async (): Promise<ISetting> => {
  const settings = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/store/settings/group?type=cms`,
    {
      next: {
        revalidate: 60 * 60 * 5,
      },
    }
  );
  const data = await settings.json();
  return data;
};
