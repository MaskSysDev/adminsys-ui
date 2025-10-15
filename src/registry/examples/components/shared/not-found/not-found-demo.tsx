import { NotFound } from "@/registry/components/shared/not-found"

export default function NotFoundDemo() {
  return (
    <NotFound
      description="The page you are looking for could not be found."
      labelGoBack="Back"
      title="This page does not exist"
    />
  )
}
