interface NodeDescription {
  Hostname: string
  Platform: {
    Architecture: string
    OS: string
  }
  Resources: {
    NanoCPUs: number
    MemoryBytes: number
    GenericResources: []
  }
  Engine: {
    EngineVersion: string
    Labels: any
    Plugins: []
  }
  TLSInfo: {
    TrustRoot: string
    CertIssuerSubject: string
    CertIssuerPublicKey: string
  }
}

interface NodeStatus {
  State: 'unknown' | 'ready'
  Message: string
  Addr: string
}

interface NodeManagerStatus {
  Leader: boolean
  Reachability: string
  Addr: string
}

export interface NodeDTO {
  ID: string
  Version: {
    Index: number
  }
  CreatedAt: Date
  UpdatedAt: Date
  Spec: {
    Availability: string
    Name: string
    Role: 'manager' | 'worker'
    Labels: {
      [key: string]: string
    }
  }
  Description: NodeDescription
  Status: NodeStatus
  ManagerStatus: NodeManagerStatus
}
