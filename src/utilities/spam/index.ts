"use client";
import {toastNVB} from "@/components/base-components/toast";
import {useState, useEffect} from "react";
import {translate} from "../translator";

export function useSpamGuard(limit: number = 1, timeFrame: number = 2000) {
  const [actions, setActions] = useState<number[]>([]);

  const checkSpam = () => {
    const now = Date.now();
    const updatedActions = actions.filter((t) => now - t < timeFrame);

    if (updatedActions.length >= limit) {
      toastNVB({
        msg: translate("too_fast_please_slow_down"),
        type: "warning",
      });
      return false;
    }

    setActions([...updatedActions, now]);
    return true;
  };

  return checkSpam;
}
