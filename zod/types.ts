import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type PostFormData = {
  title: string;
  subtitle: string;
  category: string;
  content: string;
  // isDraft: number | null;
};

// Used in @/components/form/FormField.tsx
export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<PostFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
};

export type ValidFieldNames = "title" | "subtitle" | "category" | "content";

export const PostSchema: ZodType<PostFormData> = z.object({
  title: z
    .string()
    .min(1, { message: "Required" })
    .max(60, { message: "Must be 50 characters or less" }),
  subtitle: z
    .string()
    .min(1, { message: "Required" })
    .max(120, { message: "Must be 120 characters or less" }),
  category: z
    .string()
    .min(1, { message: "Required" })
    .max(20, { message: "Must be 20 characters or less" }),
  content: z.string().min(1, { message: "Required" }),
  // isDraft: z.number().int().nullable(),
});
