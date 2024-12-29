import { z } from "zod";

export interface IForm {
  login: string;
  password: string;
  rememberMe: boolean;
}

export const FormSchema = z.object({
  login: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .max(50, { message: "Длина не более 50 символов" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
  rememberMe: z.boolean().default(false)
});
