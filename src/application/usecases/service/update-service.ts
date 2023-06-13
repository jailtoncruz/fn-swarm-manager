import { Axios } from 'axios'
import { InputService } from '../../../core/domain/Input'
import { ServiceDTO } from '../../domain/ServiceDTO'

export async function updateService(
  api: Axios,
  currentService: ServiceDTO,
  inputService: InputService,
  replicas?: number,
) {
  const { data } = await api.post<ServiceDTO>(
    `/services/${currentService.ID}/update`,
    {
      Name: inputService.name,
      EndpointSpec: {
        Mode: 'vip',
        Ports: inputService.ports?.map((p) => {
          return {
            Protocol: 'tcp',
            PublishedPort: p.publishedPort,
            TargetPort: p.targetPort,
          }
        }),
      },
      TaskTemplate: {
        ContainerSpec: {
          Image: inputService.image,
        },
      },
      Mode: {
        Replicated: {
          Replicas: replicas,
        },
      },
    },
    {
      params: {
        version: currentService.Version.Index,
      },
    },
  )

  console.log(
    `Service [${inputService.name}] UPDATED on [${replicas}] replicas`,
  )
  return data
}
