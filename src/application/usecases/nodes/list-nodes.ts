import { Axios } from 'axios'
import { NodeDTO } from '../../domain/NodeDTO'

export async function listNodes(api: Axios) {
  const { data } = await api.get<NodeDTO[]>('/nodes')
  return data
}
