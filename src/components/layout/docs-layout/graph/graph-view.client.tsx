"use client"

import {
  lazy,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import type {
  ForceGraphMethods,
  ForceGraphProps,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d"

export type Node = NodeObject<NodeType>
export type Link = LinkObject<NodeType, LinkType>

export type NodeType = {
  text: string
  description?: string
  neighbors?: string[]
}
export type LinkType = Record<string, unknown>

export type GraphViewProps = {
  nodes: Node[]
  links: Link[]
}

const GraphViewLazy = lazy(async () => {
  const { default: ForceGraph2D } = await import("react-force-graph-2d")
  const { forceCollide } = await import("d3-force")

  function Component({
    containerRef,
    nodes,
    links,
  }: GraphViewProps & { containerRef: RefObject<HTMLDivElement | null> }) {
    const fgRef = useRef<ForceGraphMethods<Node, Link> | undefined>(undefined)
    const hoveredRef = useRef<Node | null>(null)
    const readyRef = useRef(false)
    const [tooltip, setTooltip] = useState<{
      x: number
      y: number
      content: string
    } | null>(null)

    useEffect(() => {
      const fg = fgRef.current
      if (!fg) {
        return
      }

      if (readyRef.current) {
        return
      }
      readyRef.current = true

      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      fg.d3Force("collision", forceCollide(80))
    })

    const handleNodeHover = useCallback((node: Node | null) => {
      const graph = fgRef.current
      if (!graph) {
        return
      }
      hoveredRef.current = node

      if (node) {
        // biome-ignore lint/style/noNonNullAssertion: Forbidden non-null assertion.
        const coords = graph.graph2ScreenCoords(node.x!, node.y!)
        setTooltip({
          // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
          x: coords.x + 4,
          // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
          y: coords.y + 4,
          content: node.description ?? "No description",
        })
      } else {
        setTooltip(null)
      }
    }, [])

    // Custom node rendering: circle with text label below
    const nodeCanvasObject: ForceGraphProps["nodeCanvasObject"] = (
      node,
      ctx
    ) => {
      const container = containerRef.current
      if (!container) {
        return
      }
      const style = getComputedStyle(container)
      const fontSize = 14
      const radius = 5

      // Draw circle
      ctx.beginPath()
      // biome-ignore lint/style/noNonNullAssertion: Forbidden non-null assertion.
      ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false)

      const hoverNode = hoveredRef.current
      const isActive =
        hoverNode?.id === node.id ||
        hoverNode?.neighbors?.includes(node.id as string)

      ctx.fillStyle = isActive
        ? style.getPropertyValue("--color-primary")
        : style.getPropertyValue("--color-purple-300")
      ctx.fill()

      // Draw text below the node
      ctx.font = `${fontSize}px Sans-Serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = getComputedStyle(container).getPropertyValue("color")
      // biome-ignore lint/style/noNonNullAssertion: Forbidden non-null assertion.
      ctx.fillText(node.text, node.x!, node.y! + radius + fontSize)
    }

    const linkColor = useCallback(
      (link: Link) => {
        const container = containerRef.current
        if (!container) {
          return "#999"
        }
        const style = getComputedStyle(container)
        const hoverNode = hoveredRef.current

        if (
          hoverNode &&
          typeof link.source === "object" &&
          typeof link.target === "object" &&
          (hoverNode.id === link.source.id || hoverNode.id === link.target.id)
        ) {
          return style.getPropertyValue("--color-primary")
        }

        return `color-mix(in oklab, ${style.getPropertyValue("--color-foreground")} 40%, transparent)`
      },
      [containerRef]
    )

    // Enrich nodes with neighbors for hover effects
    const enrichedNodes = useMemo(() => {
      // biome-ignore lint/nursery/noShadow: This variable shadows another variable with the same name in the outer scope.
      const enrichedNodes = nodes.map((node) => ({
        ...node,
        neighbors: links.flatMap((link) => {
          if (link.source === node.id) {
            return link.target
          }
          if (link.target === node.id) {
            return link.source
          }
          return []
        }),
      }))

      return { nodes: enrichedNodes as NodeType[], links }
    }, [nodes, links])

    return (
      <>
        <ForceGraph2D<NodeType, LinkType>
          enableNodeDrag
          enableZoomInteraction
          graphData={enrichedNodes}
          linkColor={linkColor}
          linkWidth={2}
          nodeCanvasObject={nodeCanvasObject}
          onNodeHover={handleNodeHover}
          ref={fgRef}
        />
        {tooltip && (
          <div
            className="absolute size-fit max-w-xs rounded-xl border bg-popover p-2 text-popover-foreground text-sm shadow-lg"
            style={{ top: tooltip.y, left: tooltip.x }}
          >
            {tooltip.content}
          </div>
        )}
      </>
    )
  }

  return {
    default: Component,
  }
})

export function GraphViewClient(props: GraphViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])

  return (
    <div
      className="relative h-[600px] overflow-hidden rounded-xl border [&_canvas]:size-full"
      ref={ref}
    >
      {mount && <GraphViewLazy {...props} containerRef={ref} />}
    </div>
  )
}
