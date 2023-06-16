import { Axios } from 'axios'
import { InputService } from '../../../core/domain/Input'
import { ServiceDTO } from '../../domain/ServiceDTO'

export async function createService(
  api: Axios,
  service: InputService,
  replicas?: number,
) {
  const { data } = await api.post<ServiceDTO>(`/services/create`, {
    Name: service.name,
    EndpointSpec: {
      Mode: 'vip',
      Ports: service.ports?.map((p) => {
        return {
          Protocol: 'tcp',
          PublishedPort: p.publishedPort,
          TargetPort: p.targetPort,
        }
      }),
    },
    TaskTemplate: {
      ContainerSpec: {
        Image: service.image,
        Env: service.environments,
        Mounts: [],
      },
    },
    Mode: {
      Replicated: {
        Replicas: replicas,
      },
    },
  })
  console.log(`Service [${service.name}] CREATED on [${replicas}] replicas`)
  return data
}
