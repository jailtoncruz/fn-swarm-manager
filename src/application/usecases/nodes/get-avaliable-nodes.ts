import { Axios } from 'axios'
import { listNodes } from './list-nodes'

export async function getAvaliableNodes(
  api: Axios,
  preserveLeader: boolean = false,
) {
  const nodes = await listNodes(api)
  const leader = nodes.find((node) => node.Spec.Role.includes('manager'))
  let avaliableNodes = nodes.filter((node) => node.Status.State === 'ready')

  if (preserveLeader)
    avaliableNodes = avaliableNodes.filter((node) => node.ID !== leader?.ID)

  return avaliableNodes
}
