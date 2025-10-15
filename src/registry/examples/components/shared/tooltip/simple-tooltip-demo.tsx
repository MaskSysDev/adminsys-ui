import { Button } from "@/components/ui/button"

import { SimpleTooltip } from "@/registry/components/shared/tooltip/simple-tooltip"

export default function SimpleTooltipDemo() {
  return (
    <SimpleTooltip content="Button Tooltip">
      <Button className="cursor-pointer" variant="secondary">
        Hover
      </Button>
    </SimpleTooltip>
  )
}
