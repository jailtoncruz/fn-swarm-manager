import { Axios } from 'axios'
import { InputService } from '../../../core/domain/Input'
import { ServiceConfig } from '../../domain/ServiceConfig'
import { ServiceDTO } from '../../domain/ServiceDTO'
import { logger } from '../../lib/logger'
import { createListMountModel } from './create-list-mount-model'
import { createListPortModel } from './create-list-port-model'

export async function createService(
  api: Axios,
  service: InputService,
  config: ServiceConfig,
) {
  const { data } = await api.post<ServiceDTO>(`/services/create`, {
    Name: service.name,
    EndpointSpec: {
      Mode: 'vip',
      Ports: createListPortModel(service.ports),
    },
    TaskTemplate: {
      ContainerSpec: {
        Image: service.image,
        Env: service.environments,
        Mounts: createListMountModel(
          service.sharedFolders,
          config,
          service.name,
        ),
      },
    },
    Mode: {
      Replicated: {
        Replicas: config.REPLICAS,
      },
    },
  })

  logger.info(
    `Service [${service.name}] CREATED on [${config?.REPLICAS}] replicas`,
  )
  return data
}
