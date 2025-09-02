/** biome-ignore-all lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name. */
"use client"

import { Presence } from "@radix-ui/react-presence"
import { cva } from "class-variance-authority"
import { usePathname } from "fumadocs-core/framework"
import Link, { type LinkProps } from "fumadocs-core/link"
import type { PageTree } from "fumadocs-core/server"
import { useMediaQuery } from "fumadocs-core/utils/use-media-query"
import { useOnChange } from "fumadocs-core/utils/use-on-change"
import { useSidebar } from "fumadocs-ui/contexts/sidebar"
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree"
import { ChevronDown, ExternalLink } from "lucide-react"
import {
  type ComponentProps,
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  ScrollArea,
  ScrollViewport,
} from "@/components/layout/docs-layout/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarGroupLabel } from "@/components/ui/sidebar"

import { isActive } from "@/lib/is-active"
import { cn } from "@/lib/utils"

type CollapsibleContentProps = ComponentProps<typeof CollapsibleContent>

type CollapsibleTriggerProps = ComponentProps<typeof CollapsibleTrigger>

type ScrollAreaProps = ComponentProps<typeof ScrollArea>

// biome-ignore lint/nursery/useConsistentTypeDefinitions: Use of the interface detected.
export interface SidebarProps {
  /**
   * Open folders by default if their level is lower or equal to a specific level
   * (Starting from 1)
   *
   * @defaultValue 0
   */
  defaultOpenLevel?: number

  /**
   * Prefetch links
   *
   * @defaultValue true
   */
  prefetch?: boolean

  /**
   * Children to render
   */
  Content: ReactNode

  /**
   * Alternative children for mobile
   */
  Mobile?: ReactNode
}

// biome-ignore lint/nursery/useConsistentTypeDefinitions: Use of the interface detected.
interface InternalContext {
  defaultOpenLevel: number
  prefetch: boolean
  level: number
}

const itemVariants = cva(
  "relative flex h-9 w-full cursor-pointer flex-row items-center gap-2 overflow-hidden rounded-md p-2 ps-(--sidebar-item-offset) text-left text-start font-medium font-medium text-base text-muted-foreground outline-hidden ring-sidebar-ring transition-[width,height,padding] [overflow-wrap:anywhere] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      active: {
        true: "bg-primary/10 text-primary",
        false:
          "transition-colors hover:bg-accent/50 hover:text-accent-foreground/80 hover:transition-none",
      },
    },
  }
)

const Context = createContext<InternalContext | null>(null)
const FolderContext = createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function Sidebar({
  defaultOpenLevel = 0,
  prefetch = true,
  Mobile,
  Content,
}: SidebarProps) {
  const isMobile = useMediaQuery("(width < 768px)") ?? false
  const context = useMemo<InternalContext>(() => {
    return {
      defaultOpenLevel,
      prefetch,
      level: 1,
    }
  }, [defaultOpenLevel, prefetch])

  return (
    <Context.Provider value={context}>
      {isMobile && Mobile != null ? Mobile : Content}
    </Context.Provider>
  )
}

export function SidebarContent(props: ComponentProps<"aside">) {
  const { collapsed } = useSidebar()
  const [hover, setHover] = useState(false)
  const timerRef = useRef(0)
  const closeTimeRef = useRef(0)

  useOnChange(collapsed, () => {
    setHover(false)
    closeTimeRef.current = Date.now() + 150
  })

  return (
    <aside
      id="nd-sidebar"
      {...props}
      className={cn(
        "fixed start-0 top-(--fd-sidebar-top) bottom-(--fd-sidebar-margin) z-20 flex flex-col items-end border-e bg-card text-sm *:w-(--fd-sidebar-width) max-md:hidden",
        collapsed && [
          "rtl:-translate-x-(--fd-sidebar-offset) translate-x-(--fd-sidebar-offset) rounded-xl border",
          hover ? "z-50 shadow-lg" : "opacity-0",
        ],
        props.className
      )}
      data-collapsed={collapsed}
      onPointerEnter={(e) => {
        if (
          !collapsed ||
          e.pointerType === "touch" ||
          closeTimeRef.current > Date.now()
        ) {
          return
        }
        window.clearTimeout(timerRef.current)
        setHover(true)
      }}
      onPointerLeave={(e) => {
        if (!collapsed || e.pointerType === "touch") {
          return
        }
        window.clearTimeout(timerRef.current)

        timerRef.current = window.setTimeout(
          () => {
            setHover(false)
            closeTimeRef.current = Date.now() + 150
          },
          Math.min(e.clientX, document.body.clientWidth - e.clientX) > 100
            ? 0
            : 500
        )
      }}
      style={
        {
          transition: ["top", "opacity", "translate", "width"]
            .map((v) => `${v} ease 250ms`)
            .join(", "),
          ...props.style,
          "--fd-sidebar-offset": hover
            ? "calc(var(--spacing) * 2)"
            : "calc(16px - 100%)",
          "--fd-sidebar-margin": collapsed ? "0.5rem" : "0px",
          "--fd-sidebar-top":
            "calc(var(--fd-banner-height) + var(--fd-nav-height) + var(--fd-sidebar-margin))",
          width: collapsed ? "var(--fd-sidebar-width)" : "", // "calc(var(--spacing) + var(--fd-sidebar-width) + var(--fd-layout-offset))"
        } as object
      }
    >
      {props.children}
    </aside>
  )
}

export function SidebarContentMobile({
  className,
  children,
  ...props
}: ComponentProps<"aside">) {
  const { open, setOpen } = useSidebar()
  const state = open ? "open" : "closed"

  return (
    <>
      <Presence present={open}>
        {/** biome-ignore lint/a11y/useKeyWithClickEvents: Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.*/}
        {/** biome-ignore lint/a11y/noStaticElementInteractions: Static Elements should not be interactive. */}
        {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: Non-interactive element should not have event handler. */}
        <div
          className="fixed inset-0 z-40 backdrop-blur-xs data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in"
          data-state={state}
          onClick={() => setOpen(false)}
        />
      </Presence>
      <Presence present={open}>
        {({ present }) => (
          <aside
            id="nd-sidebar-mobile"
            {...props}
            className={cn(
              "fixed inset-y-0 end-0 z-40 flex w-[85%] max-w-[22rem] flex-col border-s bg-background text-[15px] shadow-lg data-[state=closed]:animate-fd-sidebar-out data-[state=open]:animate-fd-sidebar-in",
              !present && "invisible",
              className
            )}
            data-state={state}
          >
            {children}
          </aside>
        )}
      </Presence>
    </>
  )
}

export function SidebarHeader(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-col justify-center gap-2 p-4", props.className)}
    >
      {props.children}
    </div>
  )
}

export function SidebarFooter(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-col border-t p-4 pt-2", props.className)}
    >
      {props.children}
    </div>
  )
}

export function SidebarViewport(props: ScrollAreaProps) {
  return (
    <ScrollArea {...props} className={cn("h-full", props.className)}>
      <ScrollViewport
        className="overscroll-contain p-4"
        style={
          {
            "--sidebar-item-offset": "calc(var(--spacing) * 2)",
            maskImage:
              "linear-gradient(to bottom, transparent, white 12px, white calc(100% - 12px), transparent)",
          } as object
        }
      >
        {props.children}
      </ScrollViewport>
    </ScrollArea>
  )
}

export function SidebarSeparator(props: ComponentProps<"p">) {
  return (
    <SidebarGroupLabel
      {...props}
      className={cn("-mb-1 text-muted-foreground/60", props.className)}
    >
      {props.children}
    </SidebarGroupLabel>
  )
}

export function SidebarItem({
  icon,
  ...props
}: LinkProps & {
  icon?: ReactNode
}) {
  const pathname = usePathname()
  const active =
    props.href !== undefined && isActive(props.href, pathname, false)
  const { prefetch } = useInternalContext()

  return (
    <Link
      {...props}
      className={cn(itemVariants({ active }), props.className)}
      data-active={active}
      prefetch={prefetch}
    >
      {icon ?? (props.external ? <ExternalLink /> : null)}
      {props.children}
    </Link>
  )
}

export function SidebarFolder({
  defaultOpen = false,
  ...props
}: ComponentProps<"div"> & {
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  useOnChange(defaultOpen, (v) => {
    if (v) {
      setOpen(v)
    }
  })

  return (
    <Collapsible
      onOpenChange={setOpen}
      open={open}
      {...props}
      className="space-y-1"
    >
      <FolderContext.Provider
        value={useMemo(() => ({ open, setOpen }), [open])}
      >
        {props.children}
      </FolderContext.Provider>
    </Collapsible>
  )
}

export function SidebarFolderTrigger({
  className,
  ...props
}: CollapsibleTriggerProps) {
  const { open } = useFolderContext()

  return (
    <CollapsibleTrigger
      className={cn(itemVariants({ active: false }), "w-full", className)}
      {...props}
    >
      {props.children}
      <ChevronDown
        className={cn("ms-auto transition-transform", !open && "rotate-90")}
        data-icon
      />
    </CollapsibleTrigger>
  )
}

export function SidebarFolderLink(props: LinkProps) {
  const { open, setOpen } = useFolderContext()
  const { prefetch } = useInternalContext()

  const pathname = usePathname()
  const active =
    props.href !== undefined && isActive(props.href, pathname, false)

  return (
    <Link
      {...props}
      className={cn(itemVariants({ active }), "w-full", props.className)}
      data-active={active}
      onClick={(e) => {
        if (
          e.target instanceof Element &&
          e.target.matches("[data-icon], [data-icon] *")
        ) {
          setOpen(!open)
          e.preventDefault()
        } else {
          setOpen(active ? !open : true)
        }
      }}
      prefetch={prefetch}
    >
      {props.children}
      <ChevronDown
        className={cn("ms-auto transition-transform", !open && "rotate-90")}
        data-icon
      />
    </Link>
  )
}

export function SidebarFolderContent(props: CollapsibleContentProps) {
  const { level, ...ctx } = useInternalContext()

  return (
    <CollapsibleContent
      {...props}
      className={cn(
        "relative overflow-hidden",
        level === 1 && [
          "space-y-1 before:absolute before:inset-y-1 before:start-2.5 before:w-px before:bg-border before:content-['']",
          "data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down **:data-[active=true]:before:absolute **:data-[active=true]:before:inset-y-2.5 **:data-[active=true]:before:start-2.5 **:data-[active=true]:before:w-px **:data-[active=true]:before:bg-primary **:data-[active=true]:before:content-['']",
        ],
        props.className
      )}
      style={
        {
          "--sidebar-item-offset": `calc(var(--spacing) * ${(level + 1) * 3})`,
          ...props.style,
        } as object
      }
    >
      <Context.Provider
        value={useMemo(
          () => ({
            ...ctx,
            level: level + 1,
          }),
          // biome-ignore lint/correctness/useExhaustiveDependencies: ctx changes on every re-render and should not be used as a hook dependency.
          [ctx, level]
        )}
      >
        {props.children}
      </Context.Provider>
    </CollapsibleContent>
  )
}

export function SidebarTrigger({
  children,
  ...props
}: ComponentProps<"button">) {
  const { setOpen } = useSidebar()

  return (
    <button
      {...props}
      aria-label="Open Sidebar"
      onClick={() => setOpen((prev) => !prev)}
    >
      {children}
    </button>
  )
}

export function SidebarCollapseTrigger(props: ComponentProps<"button">) {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <button
      aria-label="Collapse Sidebar"
      data-collapsed={collapsed}
      type="button"
      {...props}
      onClick={() => {
        setCollapsed((prev) => !prev)
      }}
    >
      {props.children}
    </button>
  )
}

function useFolderContext() {
  const ctx = useContext(FolderContext)
  if (!ctx) {
    throw new Error("Missing sidebar folder")
  }

  return ctx
}

function useInternalContext() {
  const ctx = useContext(Context)
  if (!ctx) {
    throw new Error("<Sidebar /> component required.")
  }

  return ctx
}

// biome-ignore lint/nursery/useConsistentTypeDefinitions: Use of the interface detected.
export interface SidebarComponents {
  Item: FC<{ item: PageTree.Item }>
  Folder: FC<{ item: PageTree.Folder; level: number; children: ReactNode }>
  Separator: FC<{ item: PageTree.Separator }>
}

/**
 * Render sidebar items from page tree
 */
export function SidebarPageTree(props: {
  components?: Partial<SidebarComponents>
}) {
  const { root } = useTreeContext()

  return useMemo(() => {
    const { Separator, Item, Folder } = props.components ?? {}

    function renderSidebarList(
      items: PageTree.Node[],
      level: number
    ): ReactNode[] {
      // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Excessive complexity of 23 detected (max: 15).
      return items.map((item, i) => {
        if (item.type === "separator") {
          if (Separator) {
            // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
            return <Separator item={item} key={i} />
          }
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
            <SidebarSeparator className={cn(i !== 0 && "mt-6")} key={i}>
              {item.icon}
              {item.name}
            </SidebarSeparator>
          )
        }

        if (item.type === "folder") {
          const children = renderSidebarList(item.children, level + 1)

          if (Folder) {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
              <Folder item={item} key={i} level={level}>
                {children}
              </Folder>
            )
          }
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
            <PageTreeFolder item={item} key={i}>
              {children}
            </PageTreeFolder>
          )
        }

        if (Item) {
          return <Item item={item} key={item.url} />
        }
        return (
          <SidebarItem
            external={item.external}
            href={item.url}
            icon={item.icon}
            key={item.url}
          >
            {item.name}
          </SidebarItem>
        )
      })
    }

    return (
      <div className="flex flex-col gap-1" key={root.$id}>
        {renderSidebarList(root.children, 1)}
      </div>
    )
  }, [props.components, root])
}

function PageTreeFolder({
  item,
  ...props
}: {
  item: PageTree.Folder
  children: ReactNode
}) {
  const { defaultOpenLevel, level } = useInternalContext()
  const path = useTreePath()

  return (
    <SidebarFolder
      defaultOpen={
        (item.defaultOpen ?? defaultOpenLevel >= level) || path.includes(item)
      }
    >
      {item.index ? (
        <SidebarFolderLink
          external={item.index.external}
          href={item.index.url}
          {...props}
        >
          {item.icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger {...props}>
          {item.icon}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent>{props.children}</SidebarFolderContent>
    </SidebarFolder>
  )
}
