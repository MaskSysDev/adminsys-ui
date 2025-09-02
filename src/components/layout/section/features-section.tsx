import type { HTMLAttributes, JSX } from "react"

import { Container } from "@/components/layout/container"
import { Typography } from "@/components/layout/typography"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type FeaturesSectionProps = {
  title?: string
  description?: string
  features: {
    icon: (props: HTMLAttributes<SVGElement>) => JSX.Element
    title: string
    description: string
  }[]
}

export function FeaturesSection({
  title,
  description,
  features,
}: FeaturesSectionProps) {
  return (
    <section className="bg-accent/20 py-20 md:py-32" id="features">
      <Container>
        {title || description ? (
          <div className="mx-auto mb-16 max-w-2xl text-center">
            {title && (
              <Typography.H2 className="border-0 font-bold sm:text-4xl">
                {title}
              </Typography.H2>
            )}

            {description && (
              <Typography.Large className="text-muted-foreground">
                {description}
              </Typography.Large>
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              className="border-0 shadow-sm transition-shadow hover:shadow-md"
              key={feature.title}
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
