import { Mount } from '../../domain/Mount'
import { ServiceConfig } from '../../domain/ServiceConfig'

export function createListMountModel(
  list: string[] = [],
  config: ServiceConfig,
  serviceName: string,
): Mount[] {
  return list?.map((target) => {
    const folder = target.split('/').reverse()[0]
    const source = `${config.SWARM_WORKER_SHARED_FOLDER}/${serviceName}/${folder}`

    return {
      Type: 'bind',
      Target: target,
      Source: source,
    }
  })
}
