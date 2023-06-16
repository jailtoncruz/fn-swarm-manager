import { getSecrets } from '@jailtoncruz/oci-vault-env'
import { ConfigFileAuthenticationDetailsProvider } from 'oci-common'

export async function getEnvironmentVariablesVault(
  compartment_id: string,
  vault_id: string,
): Promise<string[]> {
  const provider = new ConfigFileAuthenticationDetailsProvider()
  const secrets = await getSecrets(provider, compartment_id, vault_id)

  return secrets.map((s) => s.name.concat('=').concat(s.value ?? ''))
}
