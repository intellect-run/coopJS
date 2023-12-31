import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";

export type BalancingMode = 'round-robin' | 'random-once' | 'random'

export interface RpcEndpoint {
  protocol: string
  host: string
  port: number
}

export interface TableCodeConfig {
  core?: string
  staker?: string
  p2p?: string
  reg?: string
  part?: string
}

export interface TableCodeConfigStrict {
  core: string
  staker: string
  p2p: string
  reg: string
  part: string
}

export type AuthKeyType = 'plain-auth-key' | 'auth-key-search-callback'

export interface WalletConfig {
  symbol: string
  contract: string
  canTransfer?: boolean
  canDeposit?: boolean
  canWithdraw?: boolean
  canChange?: boolean
  canChangeButDisabled?: boolean
  routeForChange?: string
}

export interface ChainConfig {
  name: string
  rpcEndpoints: RpcEndpoint[]
  balancingMode?: BalancingMode
  explorerApiUrl: string
  tableCodeConfigOverride?: TableCodeConfig
  authKeyType?: AuthKeyType
  wallets?: WalletConfig[]
  coreSymbol?: string
}

export interface UalConfig {
  rootChain: string
}

export interface RegistratorConfig {
  api: string
  appName: string
}

export interface PersonalDataConfig {
  api: string
}

export interface Config {
  chains: ChainConfig[]
  ual: UalConfig
  tableCodeConfig: TableCodeConfigStrict
  registrator?: RegistratorConfig
  personalData?: PersonalDataConfig
}

export type AuthKeySearchCallback = (authKeyQuery: string) => Promise<string | null>

export type SignatureProviderMaker = (authKey: string) => Promise<SignatureProvider>

export interface ChainCrypt {
  encrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>
  decrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>
  sign(privateKey: string, message: string): string
  verify(publicKey: string, signature: string, message: string): boolean
}