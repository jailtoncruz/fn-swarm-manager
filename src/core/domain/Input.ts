export interface InputService {
  name: string
  image: string
  ports: {
    targetPort: number
    publishedPort: number
  }[]
}

export interface Input {
  daemon_url: string
  service: InputService
  preserveLeader?: boolean
}
