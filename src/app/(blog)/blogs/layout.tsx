import { NavigationBar } from "@/components/base-components";
import { GlobalLayoutProps } from "@/types";

const BlogLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <>
      {children}
      <NavigationBar />
    </>
  );
};

export default BlogLayout;
