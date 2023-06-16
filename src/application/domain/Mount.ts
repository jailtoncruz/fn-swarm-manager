export interface Mount {
  Type: 'bind' | 'volume' | 'tmpfs'
  Source: string
  Target: string
}
