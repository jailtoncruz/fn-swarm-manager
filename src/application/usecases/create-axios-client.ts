import axios from 'axios'

export function createAxiosClient(DAEMON_URL: string, REGISTRY_AUTH?: string) {
  const api = axios.create({
    baseURL: DAEMON_URL,
  })

  api.interceptors.request.use((config) => {
    config.headers['X-Registry-Auth'] = REGISTRY_AUTH
    return config
  })

  return api
}
