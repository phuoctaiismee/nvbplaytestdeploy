"use client";

import { useCopyToClipboard } from "@/hooks";
import React from "react";

export const ShareBlog = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(window.location.href);
  };

  return (
    <>
      {isCopied ? (
        <span className="bg-[#ff3f1a] text-orange-100 rounded-full px-2 py-1 text-xs font-semibold ">
          Copies
        </span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          onClick={handleCopy}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M14.276 2.286a.75.75 0 0 1 .817.162l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 0 1-1.28-.53V13.18c-4.822.333-8.77 3.845-9.76 8.456a.75.75 0 0 1-1.467 0a12.3 12.3 0 0 1-.273-2.584c0-6.513 5.083-11.84 11.5-12.227V2.979a.75.75 0 0 1 .462-.693m1.037 2.503v2.763a.75.75 0 0 1-.75.75c-5.555 0-10.126 4.214-10.692 9.619a12.25 12.25 0 0 1 10.692-6.266a.75.75 0 0 1 .75.75v2.763l5.189-5.19z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  );
};
