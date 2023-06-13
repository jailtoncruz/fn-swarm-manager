import fdk from '@fnproject/fdk'
import axios from 'axios'
import { getAvaliableNodes } from './application/usecases/get-avaliable-nodes'
import { listNodes } from './application/usecases/nodes/list-nodes'
import { createService } from './application/usecases/service/create-service'
import { getService } from './application/usecases/service/get-service'
import { updateService } from './application/usecases/service/update-service'
import { Input } from './core/domain/Input'

fdk.handle(async function (input: Input) {
  const api = axios.create({
    baseURL: input.daemon_url,
  })

  const nodes = await listNodes(api)
  const avaliableNodes = getAvaliableNodes(nodes, input.preserveLeader)
  const replicas = avaliableNodes.length

  try {
    let service = await getService(api, input.service.name)
    if (!service) service = await createService(api, input.service, replicas)
    else
      service = await updateService(
        api,
        service,
        input.service,
        avaliableNodes.length,
      )

    return { service, input }
  } catch (_err) {
    return { Error: (_err as Error).message, input }
  }
})
