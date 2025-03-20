import { cn } from "@/lib/utils";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const Bounded = ({
  as: Component = "section",
  className,
  children,
  ...restProps
}: BoundedProps) => {
  return (
    <Component
      {...restProps}
      className={cn(
        "w-full max-w-screen-desktop mx-auto container desktop:px-0",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Bounded;
