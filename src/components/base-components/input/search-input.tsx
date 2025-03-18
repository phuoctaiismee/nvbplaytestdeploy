import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types";
import { Icon } from "@iconify/react";
import React, { forwardRef } from "react";

type SearchInputProps = InputProps & {
  containerClassName?: string;
  iconRight?: boolean;
  iconLeft?: boolean;
  clearable?: boolean;
  onChange?: (value: any) => void;
  onClear?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

// Forwarding ref to SearchInput
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      containerClassName,
      iconRight = false,
      iconLeft = false,
      onChange,
      onClear,
      clearable = false,
      value,
      onSubmit,
      ...rest
    },
    ref
  ) => {
    return (
      <form
        onSubmit={onSubmit}
        className={cn(
          "bg-[#F5F5FA] h-10 flex items-center gap-2 rounded-full overflow-hidden px-4",
          containerClassName
        )}
      >
        {(!value || !clearable) && (
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className={cn(
              "p-0 hover:bg-transparent",
              iconRight && "order-last ",
              iconLeft && "order-first"
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75033 15.8327C10.6289 15.8327 12.4306 15.0864 13.759 13.758C15.0874 12.4296 15.8337 10.628 15.8337 8.74935C15.8337 6.87073 15.0874 5.06906 13.759 3.74068C12.4306 2.41229 10.6289 1.66602 8.75033 1.66602C6.87171 1.66602 5.07004 2.41229 3.74165 3.74068C2.41327 5.06906 1.66699 6.87073 1.66699 8.74935C1.66699 10.628 2.41327 12.4296 3.74165 13.758C5.07004 15.0864 6.87171 15.8327 8.75033 15.8327Z"
                stroke="#808089"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.1069 5.97667C10.7978 5.66667 10.4304 5.42081 10.026 5.25321C9.62157 5.0856 9.18801 4.99955 8.75022 5C8.31244 4.99955 7.87887 5.0856 7.47444 5.25321C7.07001 5.42081 6.70268 5.66667 6.39355 5.97667"
                stroke="#808089"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8418 13.8418L17.3785 17.3776"
                stroke="#808089"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        )}
        <Input
          {...rest}
          ref={ref} // Forwarding ref to Input
          value={value}
          onChange={(e) => onChange && onChange(e)}
          className="bg-transparent pl-0 h-full w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
        {value && clearable && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={onClear}
            className="p-1 size-5 aspect-square rounded-full bg-neutral-300 order-last"
          >
            <Icon icon="ph:x" className="size-5 text-white" />
          </Button>
        )}
      </form>
    );
  }
);

SearchInput.displayName = "SearchInput"; // It's a good practice to name the component when using forwardRef

export default SearchInput;
