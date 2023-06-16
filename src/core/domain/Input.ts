export interface InputService {
  name: string
  image: string
  ports: {
    targetPort: number
    publishedPort: number
  }[]
  environments?: string[]
}

export interface Input {
  service: InputService
  preserveLeader?: boolean
  compartment_id: string
  vault_id: string
}
