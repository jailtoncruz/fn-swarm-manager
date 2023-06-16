import { EndpointPort } from '../../domain/ServiceDTO'

export function createListPortModel(
  ports: {
    targetPort: number
    publishedPort: number
  }[] = [],
): EndpointPort[] {
  return ports.map((port) => {
    return {
      Protocol: 'tcp',
      PublishedPort: port.publishedPort,
      TargetPort: port.targetPort,
      PublishMode: 'ingress',
    }
  })
}
