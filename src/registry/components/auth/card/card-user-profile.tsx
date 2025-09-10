import { User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type CardUserProfileProps = {
  name: string
  email: string
  image: string
}

export function CardUserProfile({ name, email, image }: CardUserProfileProps) {
  return (
    <Card className="w-full rounded-lg border-0 bg-muted/20">
      <CardHeader className="p-0">
        <div className="h-32 rounded-t-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-primary/0 to-background" />
      </CardHeader>
      <CardContent className="relative px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <Avatar className="-top-16 -translate-x-1/2 absolute left-1/2 size-32 shadow-md">
          {image && <AvatarImage alt="User profile picture" src={image} />}
          <AvatarFallback>
            <User className="size-20" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="font-bold text-2xl">{name}</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </CardContent>
    </Card>
  )
}
