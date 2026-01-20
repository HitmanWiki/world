// wagmi.config.js
import { createConfig, http } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'
import { createWeb3Modal } from '@web3modal/wagmi/react'

const projectId = '6f5fd7faa128d369f81c8c280945a4ca'

// Create wagmi config
export const config = createConfig({
  chains: [mainnet, base],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http()
  },
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: 'CLUTCH - Team USA Mascot',
        description: 'CLUTCH – Official 2026 Team USA Mascot Signature Prediction Suite',
        url: typeof window !== 'undefined' ? window.location.origin : '',
        icons: typeof window !== 'undefined' ? [`${window.location.origin}/clutch-logo.jpg`] : []
      }
    }),
    injected()
  ]
})

// Create and export modal
export const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#D71920',
    '--w3m-border-radius-master': '16px',
    '--w3m-font-family': 'Montserrat, sans-serif',
    '--w3m-font-size-master': '14px'
  }
})

// Store modal instance globally for easy access
if (typeof window !== 'undefined') {
  window.web3modal = modal
}