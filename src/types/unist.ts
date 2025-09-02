// Define a base Node type that matches what unist-util-visit expects
type BaseNode = {
  type: string
  [key: string]: unknown
}

export interface UnistNode extends BaseNode {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: {
    __rawString__?: string
    [key: string]: unknown
  }
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
  children?: UnistNode[]
}

export interface UnistTree extends BaseNode {
  type: string
  children: UnistNode[]
}
