import fdk from '@fnproject/fdk'
import { getSecrets } from '@jailtoncruz/oci-vault-env'
import axios from 'axios'
import { ConfigFileAuthenticationDetailsProvider } from 'oci-common'
import { getAvaliableNodes } from './application/usecases/get-avaliable-nodes'
import { listNodes } from './application/usecases/nodes/list-nodes'
import { createService } from './application/usecases/service/create-service'
import { getService } from './application/usecases/service/get-service'
import { updateService } from './application/usecases/service/update-service'
import { Input, InputService } from './core/domain/Input'

fdk.handle(async function (input: Input, ctx) {
  console.log('Solicitação recebida', JSON.stringify({ input, ctx }))
  const { DAEMON_URL } = ctx._config
  const api = axios.create({
    baseURL: DAEMON_URL,
  })

  try {
    const provider = new ConfigFileAuthenticationDetailsProvider()
    const secrets = await getSecrets(
      provider,
      input.compartment_id,
      input.vault_id,
    )

    console.log('secrets obtained', secrets.length)

    const nodes = await listNodes(api)
    console.log('nodes obtained', nodes.length)

    const avaliableNodes = getAvaliableNodes(nodes, input.preserveLeader)
    const replicas = avaliableNodes.length
    const newService: InputService = {
      ...input.service,
      environments: secrets.map((s) =>
        s.name.concat('=').concat(s.value ?? ''),
      ),
    }

    console.log('service dto', newService)

    let service = await getService(api, input.service.name)
    if (!service) service = await createService(api, newService, replicas)
    else
      service = await updateService(
        api,
        service,
        newService,
        avaliableNodes.length,
      )

    console.log('FINISH')
    return { service, newService, secrets }
  } catch (_err) {
    console.log('Finished with error', _err)
    return {
      Error: (_err as Error).message ?? 'ERROR',
      input,
    }
  }
})
