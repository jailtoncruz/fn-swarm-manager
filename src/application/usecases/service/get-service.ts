import { Axios } from 'axios'
import { ServiceDTO } from '../../domain/ServiceDTO'

export async function getService(api: Axios, serviceName: string) {
  try {
    const { data } = await api.get<ServiceDTO>(`/services/${serviceName}`)
    return data
  } catch {
    return undefined
  }
}
