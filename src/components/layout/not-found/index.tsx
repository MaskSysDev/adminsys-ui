"use client"

import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Container } from "@/components/layout/container"
import { Typography } from "@/components/layout/typography"
import { Button } from "@/components/ui/button"

type NotFoundProps = {
  title?: string
  description?: string
  labelGoBack?: string
}

export const NotFound = ({
  title = "This page does not exist",
  description = "The page you are looking for could not be found.",
  labelGoBack = "Go Back",
}: NotFoundProps) => {
  const router = useRouter()

  const onClick = () => {
    router.back()
  }

  return (
    <section className="">
      <Container className="flex flex-col items-center justify-center gap-4 py-12 md:min-h-[48vh] md:py-20">
        <div className="font-extrabold text-7xl text-primary">404</div>

        <Typography.H1 className="text-center">{title}</Typography.H1>

        <Typography.Lead className="text-center">{description}</Typography.Lead>

        <Button
          className="cursor-pointer bg-background text-muted-foreground"
          onClick={onClick}
          variant="outline"
        >
          <ArrowLeftIcon size={16} />
          {labelGoBack}
          <span className="sr-only">Go Back</span>
        </Button>
      </Container>
    </section>
  )
}
