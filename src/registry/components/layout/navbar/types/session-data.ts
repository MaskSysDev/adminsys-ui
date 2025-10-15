export type SessionData = {
  session: {
    expiresAt: Date
    token: string
    userAgent: string | null | undefined
  }
  user: {
    id: string
    name: string
    email: string
    image: string | null
    lastName: string
    role: "user" | "admin"
  }
} | null
