import { NavigationBar } from "@/components/base-components";
import {UserDetail, UserHeader} from "@/features/user";
import React from "react";

const User = () => {
  return (
    <div className="flex flex-col w-full desktop:hidden desktop:invisible desktop:pointer-events-none desktop:select-none desktop:opacity-0">
      <UserHeader />
      <UserDetail />
      <NavigationBar/>
    </div>
  );
};

export default User;
