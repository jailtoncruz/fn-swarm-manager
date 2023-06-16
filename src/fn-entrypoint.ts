import fdk from '@fnproject/fdk'
import { getSecrets } from '@jailtoncruz/oci-vault-env'
import { ConfigFileAuthenticationDetailsProvider } from 'oci-common'
import { ServiceConfig } from './application/domain/ServiceConfig'
import { logger } from './application/lib/logger'
import { createAxiosClient } from './application/usecases/create-axios-client'
import { getEnvironmentVariablesVault } from './application/usecases/get-environment-variables-vault'
import { getAvaliableNodes } from './application/usecases/nodes/get-avaliable-nodes'
import { createService } from './application/usecases/service/create-service'
import { getService } from './application/usecases/service/get-service'
import { updateService } from './application/usecases/service/update-service'
import { Input, InputService } from './core/domain/Input'

fdk.handle(async function (input: Input, ctx) {
  logger.info('Request recived')
  logger.info('Function input', JSON.stringify(input))
  logger.info('Function config', JSON.stringify(ctx._config))

  const { DAEMON_URL, REGISTRY_AUTH, SWARM_WORKER_SHARED_FOLDER } = ctx._config

  const api = createAxiosClient(DAEMON_URL, REGISTRY_AUTH)

  try {
    const provider = new ConfigFileAuthenticationDetailsProvider()
    const secrets = await getSecrets(
      provider,
      input.compartment_id,
      input.vault_id,
    )

    const { compartment_id, vault_id, preserveLeader } = input
    const environments = await getEnvironmentVariablesVault(
      compartment_id,
      vault_id,
    )

    const avaliableNodes = await getAvaliableNodes(api, preserveLeader)

    const newService: InputService = {
      ...input.service,
      environments,
    }

    const serviceConfig: ServiceConfig = {
      SWARM_WORKER_SHARED_FOLDER,
      REPLICAS: avaliableNodes.length,
    }

    let service = await getService(api, input.service.name)

    if (!service) service = await createService(api, newService, serviceConfig)
    else service = await updateService(api, service, newService, serviceConfig)

    logger.info('Function finished')
    logger.info(JSON.stringify(newService))
    return { service, newService, secrets }
  } catch (_err) {
    logger.error(JSON.stringify(_err))
    return {
      Error: (_err as Error).message ?? 'ERROR',
      input,
    }
  }
})
