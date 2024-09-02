import { FormFieldProps } from "@/zod/types";
import React from "react";

type TProps = FormFieldProps & {
  className?: string;
  textarea?: boolean;
  noStyle?: boolean;
};

const FormField: React.FC<TProps> = ({
  type,
  name,
  placeholder,
  register,
  valueAsNumber,
  error,
  className,
  noStyle,
  textarea,
}) => {
  return (
    <div className='flex flex-col'>
      {!textarea ? (
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
          className={`${className} ${
            noStyle ? "" : "rounded-md border p-1 px-2"
          }`}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
          className={`${className} ${
            noStyle ? "" : "rounded-md border p-1 px-2 resize-none min-h-96"
          }`}
        />
      )}

      {error ? (
        <span className='text-xs text-red-500 px-2 mt-1'>{error.message}</span>
      ) : (
        <hr className='h-5 border-none' />
      )}
    </div>
  );
};

export default FormField;
