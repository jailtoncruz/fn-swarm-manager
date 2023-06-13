interface EndpointPort {
  Protocol: 'tcp'
  TargetPort: number
  PublishedPort: number
}

interface EndpointSpec {
  Mode: 'vip' | 'dnsrr'
  Ports: EndpointPort[]
}

interface NetworkIP {
  NetworkID: string
  Addr: string
}

export interface ServiceDTO {
  ID: string
  Version: {
    Index: number
  }
  CreatedAt: Date
  UpdatedAt: Date
  Spec: {
    Name: string
    TaskTemplate: {
      ContainerSpec: {
        Image: string
      }
      Resources: {
        Limits: any
        Reservations: any
      }
      RestartPolicy: {
        Condition: string
        MaxAttempts: number
      }
      Placement: any
      ForceUpdate: number
    }
    Mode: {
      Replicated: {
        Replicas: number
      }
    }
    UpdateConfig: {
      Parallelism: number
      Delay: number
      FailureAction: string
      Monitor: number
      MaxFailureRatio: number
    }
    RollbackConfig: {
      Parallelism: number
      Delay: number
      FailureAction: string
      Monitor: number
      MaxFailureRatio: number
    }
    EndpointSpec: EndpointSpec
  }
  Endpoint: {
    Spec: EndpointSpec
    Ports: EndpointPort[]
    VirtualIPs: NetworkIP[]
  }
}

export interface ServiceCreate {
  Name: string
  EndpointSpec: EndpointSpec
  TaskTemplate: {
    ContainerSpec: {
      Image: string
    }
  }
}
