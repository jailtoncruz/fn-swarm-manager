export interface InputService {
  name: string
  image: string
  ports: {
    targetPort: number
    publishedPort: number
  }[]
  environments?: string[]
  sharedFolders?: string[] // in container, likes workdir or public
}

export interface Input {
  service: InputService
  compartment_id: string
  vault_id: string

  global?: boolean
  preserveLeader?: boolean
}
