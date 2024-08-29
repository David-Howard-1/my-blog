"use client";

import { FormFieldProps } from "@/zod/types";
import React from "react";

const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  placeholder,
  register,
  valueAsNumber,
  error,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className='border rounded-sm'
      />
      {error && <span className='error-message'>{error.message}</span>}
    </>
  );
};

export default FormField;
