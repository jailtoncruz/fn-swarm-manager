import { Axios } from 'axios'
import { InputService } from '../../../core/domain/Input'
import { ServiceConfig } from '../../domain/ServiceConfig'
import { ServiceDTO } from '../../domain/ServiceDTO'
import { logger } from '../../lib/logger'
import { createListMountModel } from './create-list-mount-model'
import { createListPortModel } from './create-list-port-model'

export async function updateService(
  api: Axios,
  currentService: ServiceDTO,
  inputService: InputService,
  config: ServiceConfig,
) {
  const { data } = await api.post<ServiceDTO>(
    `/services/${currentService.ID}/update`,
    {
      Name: inputService.name,
      EndpointSpec: {
        Mode: 'vip',
        Ports: createListPortModel(inputService.ports),
      },
      TaskTemplate: {
        ContainerSpec: {
          Image: inputService.image,
          Env: inputService.environments,
          Mounts: createListMountModel(
            inputService.sharedFolders,
            config,
            inputService.name,
          ),
        },
      },
      Mode: {
        Replicated: {
          Replicas: config?.REPLICAS,
        },
      },
    },
    {
      params: {
        version: currentService.Version.Index,
      },
    },
  )

  logger.info(
    `Service [${inputService.name}] UPDATED on [${config.REPLICAS}] replicas`,
  )
  return data
}
