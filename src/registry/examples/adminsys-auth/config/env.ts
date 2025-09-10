import { envSchema } from "@/config/validation/env.schema"

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})
