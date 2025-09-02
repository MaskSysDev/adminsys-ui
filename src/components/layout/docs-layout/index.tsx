import { HideIfEmpty } from "fumadocs-core/hide-if-empty"
import Link from "fumadocs-core/link"
import type { PageTree } from "fumadocs-core/server"
import { NavProvider } from "fumadocs-ui/contexts/layout"
import { TreeContextProvider } from "fumadocs-ui/contexts/tree"
import {
  type GetSidebarTabsOptions,
  getSidebarTabs,
} from "fumadocs-ui/utils/get-sidebar-tabs"
import { Languages, Sidebar as SidebarIcon } from "lucide-react"
import {
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
  useMemo,
} from "react"

import {
  CollapsibleControl,
  LayoutBody,
  Navbar,
} from "@/components/layout/docs-layout/client"
import {
  type BaseLayoutProps,
  BaseLinkItem,
  getLinks,
  type IconItemType,
  type LinkItemType,
} from "@/components/layout/docs-layout/shared"
import {
  Sidebar,
  SidebarCollapseTrigger,
  type SidebarComponents,
  SidebarContent,
  SidebarContentMobile,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarPageTree,
  type SidebarProps,
  SidebarTrigger,
  SidebarViewport,
} from "@/components/layout/docs-layout/sidebar"
import {
  LanguageToggle,
  LanguageToggleText,
} from "@/components/layout/docs-layout/toggle/language-toggle"
import {
  type Option,
  RootToggle,
} from "@/components/layout/docs-layout/toggle/root-toggle"
import {
  LargeSearchToggle,
  SearchToggle,
} from "@/components/layout/docs-layout/toggle/search-toggle"
import { ThemeToggle } from "@/components/layout/toggle/theme-toggle"
import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root

  sidebar?: SidebarOptions

  /**
   * Props for the `div` container
   */
  containerProps?: HTMLAttributes<HTMLDivElement>
}

interface SidebarOptions
  extends ComponentProps<"aside">,
    Pick<SidebarProps, "defaultOpenLevel" | "prefetch"> {
  enabled?: boolean
  component?: ReactNode
  components?: Partial<SidebarComponents>

  /**
   * Root Toggle options
   */
  tabs?: Option[] | GetSidebarTabsOptions | false

  banner?: ReactNode
  footer?: ReactNode

  /**
   * Support collapsing the sidebar on desktop mode
   *
   * @defaultValue true
   */
  collapsible?: boolean
}

export function DocsLayout({
  nav: { transparentMode, ...nav } = {},
  sidebar: {
    tabs: sidebarTabs,
    enabled: sidebarEnabled = true,
    ...sidebarProps
  } = {},
  searchToggle = {},
  disableThemeSwitch = false,
  themeSwitch = { enabled: !disableThemeSwitch },
  i18n = false,
  children,
  ...props
}: DocsLayoutProps) {
  const tabs = useMemo(() => {
    if (Array.isArray(sidebarTabs)) {
      return sidebarTabs
    }
    if (typeof sidebarTabs === "object") {
      return getSidebarTabs(props.tree, sidebarTabs)
    }
    if (sidebarTabs !== false) {
      return getSidebarTabs(props.tree)
    }
    return []
  }, [sidebarTabs, props.tree])
  const links = getLinks(props.links ?? [], props.githubUrl)
  const sidebarVariables = cn(
    "md:[--fd-sidebar-width:18rem] lg:[--fd-sidebar-width:18rem]"
  )

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Excessive complexity of 17 detected (max: 15).
  function sidebar() {
    const {
      footer,
      banner,
      collapsible = true,
      component,
      components,
      defaultOpenLevel,
      prefetch,
      ...rest
    } = sidebarProps
    if (component) {
      return component
    }

    const iconLinks = links.filter(
      (item): item is IconItemType => item.type === "icon"
    )

    const viewport = (
      <SidebarViewport>
        {links
          .filter((v) => v.type !== "icon")
          .map((item, i, list) => (
            <SidebarLinkItem
              className={cn(i === list.length - 1 && "mb-4")}
              item={item}
              // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
              key={i}
            />
          ))}
        <SidebarPageTree components={components} />
      </SidebarViewport>
    )

    const mobile = (
      <SidebarContentMobile {...rest} className="border-none bg-sidebar">
        <SidebarHeader>
          <div className="flex items-center gap-1.5 text-fd-muted-foreground">
            <div className="flex flex-1">
              {iconLinks.map((item, i) => (
                <BaseLinkItem
                  aria-label={item.label}
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className: "cursor-pointer p-2",
                    })
                  )}
                  item={item}
                  // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
                  key={i}
                >
                  {item.icon}
                </BaseLinkItem>
              ))}
            </div>
            {i18n ? (
              <LanguageToggle>
                <Languages className="size-4.5" />
                <LanguageToggleText />
              </LanguageToggle>
            ) : null}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle className="p-0" mode={themeSwitch.mode} />
              ))}
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "size-8 cursor-pointer p-2",
                })
              )}
            >
              <SidebarIcon />
            </SidebarTrigger>
          </div>
          {tabs.length > 0 && <RootToggle options={tabs} />}
          {banner}
        </SidebarHeader>
        {viewport}
        <SidebarFooter className="border-none empty:hidden">
          {footer}
        </SidebarFooter>
      </SidebarContentMobile>
    )

    const content = (
      <SidebarContent {...rest} className="overflow-hidden border-0">
        <SidebarHeader className="h-16 pb-4">
          <div className="flex h-full items-center">
            <Link
              className="me-auto inline-flex items-center gap-2.5 font-semibold"
              href={nav.url ?? "/"}
            >
              {nav.title}
            </Link>
            {nav.children}
            {collapsible && (
              <SidebarCollapseTrigger
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className:
                      "-mr-2 size-8 cursor-pointer p-2 text-muted-foreground",
                  })
                )}
              >
                <SidebarIcon />
              </SidebarCollapseTrigger>
            )}
          </div>
        </SidebarHeader>
        {banner}
        <div className="px-4">
          {searchToggle.enabled !== false &&
            (searchToggle.components?.lg ?? (
              <LargeSearchToggle className="my-2" hideIfDisabled />
            ))}
          {tabs.length > 0 && <RootToggle className="my-2" options={tabs} />}
        </div>
        {viewport}
        <HideIfEmpty as={SidebarFooter} className="border-none">
          <div className="flex items-center text-muted-foreground empty:hidden">
            {i18n ? (
              <LanguageToggle>
                <Languages className="size-4.5" />
              </LanguageToggle>
            ) : null}
            {iconLinks.map((item, i) => (
              <BaseLinkItem
                aria-label={item.label}
                className={cn(
                  buttonVariants({ size: "icon", variant: "ghost" })
                )}
                item={item}
                // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
                key={i}
              >
                {item.icon}
              </BaseLinkItem>
            ))}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle className="ms-auto p-0" mode={themeSwitch.mode} />
              ))}
          </div>
          {footer}
        </HideIfEmpty>
      </SidebarContent>
    )

    return (
      <Sidebar
        Content={
          <>
            {collapsible && <CollapsibleControl />}
            {content}
          </>
        }
        defaultOpenLevel={defaultOpenLevel}
        Mobile={mobile}
        prefetch={prefetch}
      />
    )
  }

  return (
    <TreeContextProvider tree={props.tree}>
      <NavProvider transparentMode={transparentMode}>
        {nav.enabled !== false &&
          (nav.component ?? (
            <Navbar className="h-14 md:hidden">
              <Link
                className="inline-flex items-center gap-2.5 font-semibold"
                href={nav.url ?? "/"}
              >
                {nav.title}
              </Link>
              <div className="flex-1">{nav.children}</div>
              {searchToggle.enabled !== false &&
                (searchToggle.components?.sm ?? (
                  <SearchToggle
                    className="size-8 cursor-pointer p-2 text-muted-foreground"
                    hideIfDisabled
                  />
                ))}
              {sidebarEnabled && (
                <SidebarTrigger
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "icon",
                      className:
                        "size-8 cursor-pointer p-2 text-muted-foreground",
                    })
                  )}
                >
                  <SidebarIcon />
                </SidebarTrigger>
              )}
            </Navbar>
          ))}
        <LayoutBody
          {...props.containerProps}
          className={cn(
            "xl:[--fd-toc-width:18rem] md:[&_#nd-page_article]:pt-12 xl:[&_#nd-page_article]:px-8",
            sidebarEnabled && sidebarVariables,
            !nav.component &&
              nav.enabled !== false &&
              "[--fd-nav-height:56px] md:[--fd-nav-height:0px]",
            props.containerProps?.className
          )}
        >
          {sidebarEnabled && sidebar()}
          {children}
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  )
}

function SidebarLinkItem({
  item,
  ...props
}: {
  item: Exclude<LinkItemType, { type: "icon" }>
  className?: string
}) {
  if (item.type === "menu") {
    return (
      <SidebarFolder {...props}>
        {item.url ? (
          <SidebarFolderLink href={item.url}>
            {item.icon}
            {item.text}
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            {item.icon}
            {item.text}
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>
          {item.items.map((child, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
            <SidebarLinkItem item={child} key={i} />
          ))}
        </SidebarFolderContent>
      </SidebarFolder>
    )
  }

  if (item.type === "custom") {
    return <div {...props}>{item.children}</div>
  }

  return (
    <SidebarItem
      external={item.external}
      href={item.url}
      icon={item.icon}
      {...props}
    >
      {item.text}
    </SidebarItem>
  )
}
