import { Axios } from 'axios'
import { ServiceDTO } from '../../domain/ServiceDTO'

export async function listServices(api: Axios) {
  const { data } = await api.get<ServiceDTO[]>(`/services`)
  return data
}
