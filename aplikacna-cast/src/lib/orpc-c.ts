import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { routerType } from './orpc'

const link = new RPCLink({
  url: new URL("/rpc", window.location.origin),
})

export const orpc: RouterClient<routerType> = createORPCClient(link)