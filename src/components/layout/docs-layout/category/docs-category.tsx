import { getPageTreePeers } from "fumadocs-core/server"
import { Card, Cards } from "fumadocs-ui/components/card"

import { source } from "@/lib/source"

export function DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {getPageTreePeers(source.pageTree, url).map((peer) => (
        <Card href={peer.url} key={peer.url} title={peer.name}>
          {peer.description}
        </Card>
      ))}
    </Cards>
  )
}
