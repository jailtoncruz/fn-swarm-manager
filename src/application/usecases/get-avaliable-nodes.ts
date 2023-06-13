import { NodeDTO } from '../domain/NodeDTO'

export function getAvaliableNodes(
  nodes: NodeDTO[],
  preserveLeader: boolean = false,
) {
  const leader = nodes.find((node) => node.Spec.Role.includes('manager'))
  let avaliableNodes = nodes.filter((node) => node.Status.State === 'ready')

  if (preserveLeader)
    avaliableNodes = avaliableNodes.filter((node) => node.ID !== leader?.ID)

  return avaliableNodes
}
