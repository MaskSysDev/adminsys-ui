"use client"

import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { Container } from "@/registry/components/shared/container"
import { Typography } from "@/registry/components/shared/typography"

export type NotFoundProps = {
  /**
   * @default "This page does not exist"
   */
  title?: string
  /**
   * @default "The page you are looking for could not be found."
   */
  description?: string
  /**
   * @default "Go Back"
   */
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
  )
}
