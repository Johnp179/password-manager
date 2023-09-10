import { z } from "zod";

export const AccountValidator = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});
export type NewAccount = z.infer<typeof AccountValidator>;

export const RegisterValidator = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});
export type NewUser = z.infer<typeof RegisterValidator>;
