import TextInput from "@/components/base-components/input/text-input";
import React from "react";

const ConsultantCode = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="font-medium leading-6">Mã nhân viên tư vấn</h2>
      <TextInput
        placeholder="Nhập mã nhân viên tư vấn"
        className="bg-gray-primary !border-none"
      />
    </div>
  );
};

export default ConsultantCode;
