"use client";

import NumberFlow from "@number-flow/react";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  inputClassName?: string;
  wrapperClassName?: string;
  decrClassName?: string;
  incrClassName?: string;
  disabled?: boolean;
};

export function AmountAction({
  value = 0,
  min = -Infinity,
  max = Infinity,
  onChange,
  inputClassName,
  wrapperClassName,
  decrClassName,
  incrClassName,
  disabled,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [animated, setAnimated] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value.toString());

  React.useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString());
    }
  }, [value, isEditing]);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: element,
  }) => {
    setAnimated(false);
  
    // Chỉ giữ lại số và loại bỏ các ký tự không hợp lệ
    let filteredValue = element.value.replace(/[^0-9]/g, "");
  
    // Chuyển về số nguyên
    let numberValue = Number(filteredValue);
  
    // Giới hạn giá trị trong khoảng 1 - max
    if (numberValue < 1) numberValue = 1;
    if (numberValue > max) numberValue = max;
  
    setInputValue(numberValue.toString());
  };
  

  const handleBlur = () => {
    setIsEditing(false);
    let number_ = Number.parseInt(inputValue);
    if (isNaN(number_)) {
      number_ = min;
    } else {
      number_ = Math.max(min, Math.min(max, number_));
    }
    setInputValue(number_.toString());
    onChange?.(number_);
  
    // Delay để tránh việc mất focus quá nhanh
    setTimeout(() => {
      inputRef.current?.blur();
    }, 0);
  };
  

  const handleFocus = () => {
    setIsEditing(true);
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleBlur();
    }
  };
  

  const handlePointerDown =
    (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
      setAnimated(true);
      event.preventDefault(); // Vẫn giữ preventDefault để tránh mất tập trung
      const newValue = Math.min(Math.max(value + diff, min), max);
      onChange?.(newValue);
    };

  return (
    <div
      className={cn(
        "group mx-auto flex w-fit items-center rounded-md border py-0 text-sm font-semibold",
        wrapperClassName
      )}
    >
      <Button
        size={"icon"}
        variant={"ghost"}
        aria-hidden
        tabIndex={-1}
        className={cn("size-[28px] border-none border-r", decrClassName)}
        disabled={disabled || (min != undefined && value <= min)}
        onPointerDown={handlePointerDown(-1)}
      >
        <Minus className="size-5" absoluteStrokeWidth strokeWidth={2} />
      </Button>
      <div className="relative w-[50px] h-[28px] grid items-center justify-items-center text-center border-x">
        {/* Input hiển thị khi người dùng focus */}
        <input
          ref={inputRef}
          className={cn(
            "spin-hide w-full h-full outline-none !appearance-none bg-transparent text-center font-[inherit]",
            isEditing ? "opacity-100" : "opacity-0 absolute"
          )}
          type="number"
          min={min}
          step={1}
          autoComplete="off"
          inputMode="numeric"
          max={max}
          value={inputValue}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown} 
        />

        {/* NumberFlow chỉ hiển thị khi không nhập liệu */}
        {!isEditing && (
          <NumberFlow
            value={value}
            format={{ useGrouping: false }}
            aria-hidden
            animated={animated}
            className={cn(
              "pointer-events-none appearance-none",
              inputClassName
            )}
            willChange
          />
        )}
      </div>
      <Button
        size={"icon"}
        variant={"ghost"}
        aria-hidden
        tabIndex={-1}
        className={cn("size-[28px] border-none border-l", incrClassName)}
        disabled={disabled || (max != undefined && value >= max)}
        onPointerDown={handlePointerDown(1)}
      >
        <Plus className="size-5" absoluteStrokeWidth strokeWidth={2} />
      </Button>
    </div>
  );
}
