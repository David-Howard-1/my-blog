import React, { ChangeEvent, FC } from 'react';

type ValidFormFieldNames = 'title' | 'subtitle' | 'category' | 'content';

type FormFieldProps = {
  type?: string;
  name: ValidFormFieldNames;
  value?: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className: string;
  textarea?: boolean;
};

const FormField: FC<FormFieldProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  textarea,
}) => {
  return !textarea ? (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  ) : (
    <textarea name={name} placeholder={placeholder} className={className} />
  );
};

export default FormField;
