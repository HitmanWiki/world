import { useState, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi'
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import clutchLogo from './clutch-logo.jpg'

// ========== WAGMI CONFIG ==========
const projectId = '6f5fd7faa128d369f81c8c280945a4ca'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  },
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: 'CLUTCH - Team USA Mascot',
        description:
          'CLUTCH – Official 2026 Team USA Mascot Signature Prediction Suite',
        url: typeof window !== 'undefined' ? window.location.origin : '',
        icons:
          typeof window !== 'undefined'
            ? [`${window.location.origin}/clutch-logo.jpg`]
            : []
      },
      showQrModal: false
    }),
    injected({ shimDisconnect: true })
  ]
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#D71920',
    '--w3m-border-radius-master': '16px'
  }
})

const queryClient = new QueryClient()

// ========== GLOBAL STYLES ==========
const styles = `
@font-face {
  font-family: 'ClutchDisplay';
  src: url('/fonts/ClutchDisplay.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

:root {
  --usa-red: #D71920;
  --usa-blue: #00224E;
  --usa-blue-soft: #022B5F;
  --usa-blue-dark: #020C26;
  --usa-white: #FFFFFF;
  --gold: #FFD666;

  --bg-main: radial-gradient(circle at top, #051633 0%, #01030A 60%, #000000 100%);
  --nav-panel: linear-gradient(135deg, #030816 0%, #020B1E 40%, #02132D 100%);
  --nav-pill: radial-gradient(circle at 0% 0%, #1A3E71 0%, #010918 55%, #060B13 100%);
  --nav-pill-active: linear-gradient(135deg, #021A3C 0%, #FFFFFF 40%, #F14A53 70%, #B01017 100%);

  --hero-glass: rgba(1, 8, 24, 0.94);
  --card-surface: rgba(3, 11, 29, 0.96);
  --card-border: rgba(255,255,255,0.16);

  --text-main: #FFFFFF;
  --text-soft: #A8B0C8;
  --text-muted: #737C94;

  --success: #38D67A;
  --danger: #FF3B30;
}

/* Global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  background: var(--bg-main);
  color: var(--text-main);
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 40px;
  position: relative;
}

/* Background */
.stadium-background {
  position: fixed;
  inset: 0;
  background:
    repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.04),
      rgba(255,255,255,0.04) 2px,
      transparent 2px,
      transparent 8px
    ),
    radial-gradient(circle at 10% 10%, rgba(215,25,32,0.35) 0%, transparent 55%),
    radial-gradient(circle at 90% 15%, rgba(15,115,255,0.35) 0%, transparent 55%),
    radial-gradient(circle at 50% 100%, rgba(255,214,102,0.35) 0%, transparent 65%),
    #01030A;
  opacity: 0.7;
  z-index: -2;
}

.mascot-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 35%, rgba(1,4,14,0.96) 100%);
  pointer-events: none;
  z-index: -1;
}

/* ========== HEADER / NAVBAR ========== */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 10px 16px;
  margin-bottom: 40px;
  border-radius: 32px;
  background: var(--nav-panel);
  border: 2px solid rgba(255,255,255,0.08);
  box-shadow: 0 16px 40px rgba(0,0,0,0.85);
  backdrop-filter: blur(28px);
  position: sticky;
  top: 16px;
  z-index: 1000;
  overflow: hidden;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.logo-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: radial-gradient(circle at 0% 0%, #FFFFFF 0%, #F5F5F5 30%, #001332 100%);
  padding: 4px;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.6), 0 8px 18px rgba(0,0,0,0.8);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-title {
  font-family: 'ClutchDisplay', 'Montserrat', system-ui;
  font-size: 26px;
  letter-spacing: 6px;
  font-weight: 900;
  text-transform: uppercase;
  background:
    linear-gradient(
      90deg,
      #002A6C 0%,
      #002A6C 16.6%,
      #FFFFFF 16.6%,
      #FFFFFF 33.3%,
      #D71920 33.3%,
      #D71920 50%,
      #FFFFFF 50%,
      #FFFFFF 66.6%,
      #D71920 66.6%,
      #D71920 83.3%,
      #FFFFFF 83.3%,
      #FFFFFF 100%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-tagline {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-soft);
}

.nav-container {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
}

.nav-rail {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
  max-width: 720px;
  padding: 4px 6px;
  border-radius: 30px;
  background: var(--nav-pill);
  border: 1px solid rgba(255,255,255,0.09);
}

.nav-links {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px;
  border-radius: 24px;
  background: radial-gradient(circle at 0% 0%, #1E477B 0%, #020817 55%);
}

.nav-link {
  flex: 1 1 0;
  text-align: center;
  color: var(--text-soft);
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 999px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  transition: all 0.25s ease;
}

.nav-link:hover {
  color: var(--usa-white);
}

.nav-link.active {
  background: var(--nav-pill-active);
  color: #00122D;
  box-shadow: 0 6px 18px rgba(228,72,94,0.6);
}

.nav-link span.icon {
  margin-right: 4px;
}

/* Wallet / balance area */
.wallet-section {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.wallet-pill {
  min-width: 150px;
  padding: 8px 14px;
  border-radius: 20px;
  background: linear-gradient(135deg, #001A3A 0%, #0246A5 35%, #F04052 85%);
  box-shadow: 0 8px 18px rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
}

.wallet-pill-icon {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}

.wallet-pill-meta {
  display: flex;
  flex-direction: column;
}

.wallet-pill-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.85;
}

.wallet-pill-value {
  font-size: 12px;
  font-weight: 700;
}

/* custom connect button (uses Web3Modal programmatically) */
.connect-btn {
  background: #D71920;
  color: #FFFFFF;
  border: none;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(215,25,32,0.75);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.connect-btn:hover {
  background: #f1454f;
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(215,25,32,0.85);
}

.disconnect-btn {
  background: transparent;
  color: var(--text-soft);
  border: 1px solid rgba(255,255,255,0.25);
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.disconnect-btn:hover {
  background: rgba(255,255,255,0.1);
  color: var(--usa-white);
}

/* ========== HERO ========== */
.hero {
  margin-top: 40px;
  margin-bottom: 52px;
  padding: 34px 32px 40px;
  border-radius: 32px;
  background: var(--hero-glass);
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: 0 24px 50px rgba(0,0,0,0.9);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 0% 0%, rgba(255,255,255,0.22) 0%, transparent 50%),
    radial-gradient(circle at 100% 0%, rgba(255,255,255,0.14) 0%, transparent 60%),
    repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.04),
      rgba(255,255,255,0.04) 3px,
      transparent 3px,
      transparent 10px
    );
  opacity: 0.18;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  display: flex;
  gap: 40px;
  align-items: stretch;
}

.hero-left {
  flex: 1.2;
}

.hero-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(0,0,0,0.55);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gold);
  margin-bottom: 10px;
}

.hero-title {
  font-family: 'ClutchDisplay', 'Montserrat', system-ui;
  font-size: 4rem;
  line-height: 0.9;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 10px;
  background:
    linear-gradient(
      90deg,
      #002A6C 0%,
      #002A6C 16.6%,
      #FFFFFF 16.6%,
      #FFFFFF 33.3%,
      #D71920 33.3%,
      #D71920 50%,
      #FFFFFF 50%,
      #FFFFFF 66.6%,
      #D71920 66.6%,
      #D71920 83.3%,
      #FFFFFF 83.3%,
      #FFFFFF 100%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-soft);
  max-width: 620px;
  margin-bottom: 10px;
}

.hero-subsubtitle {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Mascot hero card */
.hero-mascot-card {
  max-width: 320px;
  width: 100%;
  border-radius: 26px;
  background: radial-gradient(circle at 20% 0%, rgba(255,255,255,0.25) 0%, transparent 55%),
              radial-gradient(circle at 80% 100%, rgba(0,82,165,0.6) 0%, transparent 60%),
              rgba(3,11,29,0.98);
  padding: 16px 16px 18px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 18px 40px rgba(0,0,0,0.9);
}

.hero-mascot-header {
  text-align: center;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
}

.hero-mascot-frame {
  margin: 10px 0 12px;
  border-radius: 20px;
  padding: 5px;
  background: linear-gradient(135deg, #002A6C 0%, #FFFFFF 35%, #D71920 80%);
}

.hero-mascot-img {
  width: 100%;
  border-radius: 16px;
  display: block;
  object-fit: cover;
}

.hero-mascot-footer {
  font-size: 11px;
  color: var(--text-soft);
  text-align: center;
}

.hero-mascot-footer span {
  color: var(--gold);
  font-weight: 700;
}

/* Tokenomics / quick stats */
.tokenomics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 26px;
}

.tokenomic-card {
  background: var(--card-surface);
  border-radius: 18px;
  padding: 20px 18px;
  border: 1px solid var(--card-border);
  text-align: left;
  box-shadow: 0 10px 28px rgba(0,0,0,0.8);
}

.tokenomic-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.tokenomic-value {
  font-size: 22px;
  font-weight: 800;
  color: var(--gold);
}

/* Section titles */
.section-title {
  font-family: 'ClutchDisplay', 'Montserrat', system-ui;
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 6px;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #002A6C 0%, #FFFFFF 50%, #D71920 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-kicker {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

/* Country pill */
.country-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(6,18,42,0.95);
  border: 1px solid rgba(255,255,255,0.16);
  font-size: 0.85rem;
}

/* ========== USA QUICK-BET STRIP ========== */
.usa-strip {
  margin-bottom: 18px;
  padding: 14px 18px;
  border-radius: 24px;
  background: linear-gradient(135deg, #001A3A 0%, #021C3F 45%, #390710 100%);
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 0 10px 26px rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  gap: 18px;
}

.usa-strip-left {
  flex: 1;
}

.usa-strip-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.16);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gold);
  margin-bottom: 4px;
}

.usa-strip-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
}

.usa-strip-sub {
  font-size: 0.8rem;
  color: var(--text-soft);
}

.usa-strip-bets {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.usa-bet-pill {
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(3,17,43,0.96);
  border: 1px solid rgba(255,255,255,0.22);
  font-size: 0.8rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-main);
  transition: all 0.25s ease;
}

.usa-bet-pill span.icon {
  color: var(--gold);
}

.usa-bet-pill:hover {
  background: linear-gradient(135deg, #002A6C 0%, #FFFFFF 40%, #D71920 85%);
  color: #00122D;
}

/* ========== MATCHES ========== */
.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 24px;
  margin-bottom: 52px;
}

.match-card {
  background: var(--card-surface);
  border-radius: 22px;
  padding: 22px 20px 20px;
  border: 1px solid var(--card-border);
  box-shadow: 0 16px 36px rgba(0,0,0,0.85);
  position: relative;
  overflow: hidden;
}

.match-header-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 18px;
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.team {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-logo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 20%, #FFFFFF 0%, #F2F4F7 40%, #02132D 100%);
  border: 3px solid var(--usa-red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  margin-bottom: 8px;
}

.vs-text {
  font-weight: 700;
  color: var(--text-soft);
  font-size: 0.9rem;
}

.betting-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.bet-option {
  background: rgba(4,14,34,0.96);
  border-radius: 15px;
  padding: 14px 10px;
  border: 1px solid rgba(255,255,255,0.12);
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.bet-option:hover {
  border-color: var(--usa-red);
  box-shadow: 0 10px 24px rgba(0,0,0,0.9);
  transform: translateY(-3px);
}

.odds {
  font-weight: 700;
  font-size: 1.2rem;
  color: #2CB2FF;
}

/* ========== GROUP STANDINGS (NO POINTS) ========== */
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
  margin-bottom: 52px;
}

.group-card {
  background: var(--card-surface);
  border-radius: 22px;
  padding: 18px 18px 20px;
  border: 1px solid var(--card-border);
  box-shadow: 0 12px 30px rgba(0,0,0,0.85);
}

.group-header {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 2px solid rgba(255,255,255,0.09);
}

.group-name {
  font-family: 'ClutchDisplay', 'Montserrat', system-ui;
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.group-subtitle {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
}

.group-team-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
}

/* ========== ULTIMATE BET / DASHBOARD / LEADERBOARD ========== */
.ultimate-bet,
.dashboard,
.leaderboard {
  background: var(--card-surface);
  border-radius: 24px;
  padding: 32px 28px;
  border: 1px solid var(--card-border);
  box-shadow: 0 18px 40px rgba(0,0,0,0.9);
  margin-bottom: 52px;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  margin: 26px 0;
}

.team-option {
  background: rgba(4,14,34,0.96);
  border-radius: 18px;
  padding: 18px 14px;
  border: 1px solid rgba(255,255,255,0.14);
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.team-option:hover {
  border-color: var(--usa-red);
  transform: translateY(-3px);
}

.team-option.selected {
  background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.25) 0%, transparent 65%),
              rgba(40,11,22,0.95);
  border-color: var(--usa-red);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  margin-top: 22px;
}

.stat-card {
  background: rgba(4,14,34,0.96);
  border-radius: 18px;
  padding: 20px 18px;
  border: 1px solid rgba(255,255,255,0.14);
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--gold);
  margin-bottom: 4px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 16px;
  border-radius: 16px;
  background: rgba(4,14,34,0.96);
  border: 1px solid rgba(255,255,255,0.12);
  margin-bottom: 10px;
}

.rank {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #002A6C 0%, #FFFFFF 40%, #D71920 80%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* ========== MODALS & BUTTONS ========== */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  max-width: 480px;
  width: 100%;
  background: var(--card-surface);
  border-radius: 22px;
  padding: 26px 24px 24px;
  border: 1px solid var(--card-border);
  box-shadow: 0 18px 40px rgba(0,0,0,0.95);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.close-modal {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-main);
  cursor: pointer;
}

.bet-amount {
  width: 100%;
  margin: 18px 0 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(3,11,29,0.96);
  color: var(--text-main);
}

.bet-amount:focus {
  outline: none;
  border-color: var(--usa-red);
}

.btn-primary,
.place-bet {
  width: 100%;
  border-radius: 16px;
  border: none;
  padding: 14px 18px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: var(--nav-pill-active);
  color: #00122D;
}

/* Notification */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 0.85rem;
  z-index: 2500;
  color: #fff;
}

.notification.success { background: rgba(56,214,122,0.95); }
.notification.error { background: rgba(255,59,48,0.95); }
.notification.info { background: rgba(0,122,255,0.95); }

/* Celebration layer */
.celebration-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2200;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  width: 6px;
  height: 14px;
  border-radius: 2px;
  opacity: 0.9;
  animation: confetti-fall 1.8s linear forwards;
}

.confetti-red { background: #D71920; }
.confetti-blue { background: #0A59FF; }
.confetti-white { background: #FFFFFF; }

@keyframes confetti-fall {
  0% { transform: translate3d(0,-20px,0) rotateZ(0deg); }
  100% { transform: translate3d(10px,120vh,0) rotateZ(360deg); }
}

/* ========== FOOTER ========== */
.footer {
  margin-top: 12px;
  padding: 16px 18px;
  border-radius: 24px;
  background: linear-gradient(135deg, #020713 0%, #02152C 50%, #220710 100%);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 14px 32px rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.78rem;
  color: var(--text-soft);
}

.footer-left {
  max-width: 600px;
}

.footer-brand {
  font-family: 'ClutchDisplay', 'Montserrat', system-ui;
  font-size: 1.1rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #002A6C 0%, #FFFFFF 50%, #D71920 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-text {
  margin-top: 4px;
}

.footer-sub {
  margin-top: 4px;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.footer-right {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: right;
}

/* Responsive */
@media (max-width: 1100px) {
  .nav-rail { max-width: 540px; }
  .hero-inner { flex-direction: column; }
}

@media (max-width: 900px) {
  .header {
    flex-wrap: wrap;
    row-gap: 10px;
  }
  .nav-container {
    order: 3;
    width: 100%;
  }
  .nav-rail {
    max-width: 100%;
  }
  .wallet-section {
    order: 2;
  }
}

@media (max-width: 600px) {
  .hero {
    padding: 22px 18px 24px;
  }
  .hero-title {
    font-size: 2.6rem;
  }
  .matches-grid,
  .groups-grid {
    grid-template-columns: 1fr;
  }
  .usa-strip {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-links {
    flex-wrap: wrap;
  }
  .footer-right {
    text-align: left;
  }
}
`

// ========== REACT APP ==========
function ClutchApp() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const [state, setState] = useState({
    matches: [],
    userBets: [],
    ultimateBet: null,
    selectedBet: null,
    selectedTeam: null
  })
  const [showBettingModal, setShowBettingModal] = useState(false)
  const [showUltimateModal, setShowUltimateModal] = useState(false)
  const [betAmount, setBetAmount] = useState('')
  const [ultimateBetAmount, setUltimateBetAmount] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [isCelebrating, setIsCelebrating] = useState(false)

  // groups from 2026 draw – standings only (no points yet)
  const groupsData = [
    { name: 'Group A', teams: ['Mexico', 'South Africa', 'South Korea', 'European Playoff D'] },
    { name: 'Group B', teams: ['Canada', 'European Playoff A', 'Qatar', 'Switzerland'] },
    { name: 'Group C', teams: ['Brazil', 'Morocco', 'Haiti', 'Scotland'] },
    { name: 'Group D', teams: ['United States', 'Paraguay', 'Australia', 'European Playoff C'] },
    { name: 'Group E', teams: ['Germany', 'Curacao', 'Ivory Coast', 'Ecuador'] },
    { name: 'Group F', teams: ['Netherlands', 'Japan', 'European Playoff B', 'Tunisia'] },
    { name: 'Group G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'] },
    { name: 'Group H', teams: ['Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay'] },
    { name: 'Group I', teams: ['France', 'Senegal', 'FIFA Playoff 2', 'Norway'] },
    { name: 'Group J', teams: ['Argentina', 'Algeria', 'Austria', 'Jordan'] },
    { name: 'Group K', teams: ['Portugal', 'FIFA Playoff 1', 'Uzbekistan', 'Colombia'] },
    { name: 'Group L', teams: ['England', 'Croatia', 'Ghana', 'Panama'] }
  ]

  const sampleMatches = [
    {
      id: 1,
      group: 'Group A',
      teamA: 'Mexico',
      teamB: 'South Africa',
      timestamp: new Date('2026-06-11T13:00:00-06:00').getTime(),
      venue: 'Estadio Azteca, Mexico City',
      odds: { teamA: 1.9, draw: 3.4, teamB: 4.2 }
    },
    {
      id: 2,
      group: 'Group D',
      teamA: 'United States',
      teamB: 'Paraguay',
      timestamp: new Date('2026-06-12T19:00:00-05:00').getTime(),
      venue: 'Levi’s Stadium, Santa Clara',
      odds: { teamA: 2.0, draw: 3.3, teamB: 3.8 }
    },
    {
      id: 3,
      group: 'Group J',
      teamA: 'Argentina',
      teamB: 'Algeria',
      timestamp: new Date('2026-06-13T16:00:00-04:00').getTime(),
      venue: 'MetLife Stadium, New York/New Jersey',
      odds: { teamA: 1.8, draw: 3.4, teamB: 4.6 }
    },
    {
      id: 4,
      group: 'Group C',
      teamA: 'Brazil',
      teamB: 'Morocco',
      timestamp: new Date('2026-06-14T18:00:00-04:00').getTime(),
      venue: 'Mercedes-Benz Stadium, Atlanta',
      odds: { teamA: 2.1, draw: 3.2, teamB: 3.4 }
    }
  ]

  const teamsData = [
    { id: 1, name: 'United States', flag: '🇺🇸', odds: 7.0 },
    { id: 2, name: 'Brazil', flag: '🇧🇷', odds: 4.5 },
    { id: 3, name: 'Argentina', flag: '🇦🇷', odds: 4.2 },
    { id: 4, name: 'France', flag: '🇫🇷', odds: 4.8 },
    { id: 5, name: 'Germany', flag: '🇩🇪', odds: 6.0 },
    { id: 6, name: 'Spain', flag: '🇪🇸', odds: 6.5 },
    { id: 7, name: 'Portugal', flag: '🇵🇹', odds: 7.2 },
    { id: 8, name: 'England', flag: '🏴', odds: 6.8 }
  ]

  const leaderboardData = [
    { rank: 1, address: '0x7a3...f8e2', winnings: '12,450 CLUTCH', bets: 24 },
    { rank: 2, address: '0x4b2...c9d1', winnings: '9,870 CLUTCH', bets: 19 },
    { rank: 3, address: '0x1f9...a4b6', winnings: '8,120 CLUTCH', bets: 16 },
    { rank: 4, address: '0x6d5...e7f3', winnings: '7,540 CLUTCH', bets: 14 },
    { rank: 5, address: '0x3c8...b2d9', winnings: '6,980 CLUTCH', bets: 13 }
  ]

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 2600)
  }

  const triggerCelebration = () => {
    setIsCelebrating(true)
    setTimeout(() => setIsCelebrating(false), 1800)
  }

  const getFlagEmoji = (country) => {
    const map = {
      Mexico: '🇲🇽',
      'South Africa': '🇿🇦',
      'South Korea': '🇰🇷',
      Canada: '🇨🇦',
      Qatar: '🇶🇦',
      Switzerland: '🇨🇭',
      Brazil: '🇧🇷',
      Morocco: '🇲🇦',
      Haiti: '🇭🇹',
      Scotland: '🏴',
      'United States': '🇺🇸',
      Paraguay: '🇵🇾',
      Australia: '🇦🇺',
      Germany: '🇩🇪',
      Curacao: '🇨🇼',
      'Ivory Coast': '🇨🇮',
      Ecuador: '🇪🇨',
      Netherlands: '🇳🇱',
      Japan: '🇯🇵',
      Tunisia: '🇹🇳',
      Belgium: '🇧🇪',
      Egypt: '🇪🇬',
      Iran: '🇮🇷',
      'New Zealand': '🇳🇿',
      Spain: '🇪🇸',
      'Cape Verde': '🇨🇻',
      'Saudi Arabia': '🇸🇦',
      Uruguay: '🇺🇾',
      France: '🇫🇷',
      Senegal: '🇸🇳',
      Norway: '🇳🇴',
      Argentina: '🇦🇷',
      Algeria: '🇩🇿',
      Austria: '🇦🇹',
      Jordan: '🇯🇴',
      Portugal: '🇵🇹',
      Uzbekistan: '🇺🇿',
      Colombia: '🇨🇴',
      England: '🏴',
      Croatia: '🇭🇷',
      Ghana: '🇬🇭',
      Panama: '🇵🇦'
    }
    if (map[country]) return map[country]
    if (country.includes('Playoff')) return '🏁'
    return '🏳️'
  }

  const getOutcomeText = (outcome, match) => {
    if (!match) return ''
    if (outcome === 0) return match.teamA
    if (outcome === 1) return 'Draw'
    if (outcome === 2) return match.teamB
    return ''
  }

  const getOdds = (match, outcome) => {
    if (!match) return 1
    if (outcome === 0) return match.odds.teamA
    if (outcome === 1) return match.odds.draw
    if (outcome === 2) return match.odds.teamB
    return 1
  }

  const formatAmount = (n) => n.toLocaleString()

  const selectBet = (matchId, outcome) => {
    if (!isConnected) {
      showNotification('Connect your wallet to place CLUTCH tickets.', 'error')
      return
    }
    const match = sampleMatches.find(m => m.id === matchId)
    if (!match) return
    setState(prev => ({ ...prev, selectedBet: { matchId, outcome, match } }))
    setBetAmount('')
    setShowBettingModal(true)
  }

  const selectTeam = (teamId) => {
    if (!isConnected) {
      showNotification('Connect your wallet to pick your CLUTCH champion.', 'error')
      return
    }
    const team = teamsData.find(t => t.id === teamId)
    if (!team) return
    setState(prev => ({ ...prev, selectedTeam: team }))
  }

  const placeBet = () => {
    if (!betAmount || Number(betAmount) <= 0 || !state.selectedBet) {
      showNotification('Enter a valid CLUTCH amount.', 'error')
      return
    }
    const amount = Number(betAmount)
    const odds = getOdds(state.selectedBet.match, state.selectedBet.outcome)
    const potentialWin = amount * odds
    const newBet = {
      id: Date.now(),
      matchId: state.selectedBet.matchId,
      outcome: state.selectedBet.outcome,
      amount,
      potentialWin,
      resolved: false
    }
    setState(prev => ({ ...prev, userBets: [...prev.userBets, newBet] }))
    setShowBettingModal(false)
    triggerCelebration()
    showNotification('CLUTCH ticket submitted.', 'success')
  }

  const placeUltimateBet = () => {
    if (!ultimateBetAmount || Number(ultimateBetAmount) <= 0 || !state.selectedTeam) {
      showNotification('Enter a valid CLUTCH amount.', 'error')
      return
    }
    const amount = Number(ultimateBetAmount)
    const odds = state.selectedTeam.odds
    const potentialWin = amount * odds
    const newUltimate = {
      team: state.selectedTeam,
      amount,
      potentialWin,
      resolved: false
    }
    setState(prev => ({ ...prev, ultimateBet: newUltimate }))
    setShowUltimateModal(false)
    triggerCelebration()
    showNotification('Ultimate CLUTCH champion ticket locked in.', 'success')
  }

  const openUltimateBetModal = () => {
    if (!state.selectedTeam) {
      showNotification('Choose a champion team first.', 'error')
      return
    }
    setUltimateBetAmount('')
    setShowUltimateModal(true)
  }

  const totalBets = state.userBets.length + (state.ultimateBet ? 1 : 0)
  const activeBets =
    state.userBets.filter(b => !b.resolved).length +
    (state.ultimateBet && !state.ultimateBet.resolved ? 1 : 0)
  const totalStaked =
    state.userBets.reduce((s, b) => s + b.amount, 0) +
    (state.ultimateBet ? state.ultimateBet.amount : 0)
  const potentialWins =
    state.userBets.reduce((s, b) => s + b.potentialWin, 0) +
    (state.ultimateBet ? state.ultimateBet.potentialWin : 0)

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  useEffect(() => {
    setState(prev => ({ ...prev, matches: sampleMatches }))
  }, [])

  return (
    <div className="app">
      <div className="stadium-background" />
      <div className="mascot-overlay" />

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {isCelebrating && (
        <div className="celebration-layer">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className={
                'confetti-piece ' +
                (i % 3 === 0
                  ? 'confetti-red'
                  : i % 3 === 1
                  ? 'confetti-white'
                  : 'confetti-blue')
              }
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 10 - 10}%`,
                animationDelay: `${Math.random() * 0.2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <img src={clutchLogo} alt="CLUTCH mascot" />
          </div>
          <div className="logo-text">
            <div className="logo-title">CLUTCH</div>
            <div className="logo-tagline">
              OFFICIAL 2026 TEAM USA MASCOT • SIGNATURE PREDICTION SUITE
            </div>
          </div>
        </div>

        <div className="nav-container">
          <div className="nav-rail">
            <nav className="nav-links">
              <a href="#matches" className="nav-link active">
                <span className="icon">🎯</span> Match Arena
              </a>
              <a href="#groups" className="nav-link">
                📊 World Cup Standings
              </a>
              <a href="#ultimate" className="nav-link">
                🏆 Champion Futures
              </a>
              <a href="#dashboard" className="nav-link">
                💼 CLUTCH Vault
              </a>
              <a href="#leaderboard" className="nav-link">
                🏅 Hall of Fame
              </a>
            </nav>
          </div>
        </div>

        <div className="wallet-section">
          <div className="wallet-pill">
            <div className="wallet-pill-icon">🦅</div>
            <div className="wallet-pill-meta">
              <span className="wallet-pill-label">CLUTCH balance</span>
              <span className="wallet-pill-value">
                {isConnected ? '1,500 CLUTCH' : '0 CLUTCH'}
              </span>
            </div>
          </div>

          <button
            className="connect-btn"
            onClick={() => window?.openWeb3Modal?.()}
          >
            {isConnected ? 'Switch / Wallet' : 'Connect Wallet'}
          </button>

          {isConnected && (
            <button className="disconnect-btn" onClick={() => disconnect()}>
              Disconnect
            </button>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">🦅 CLUTCH • USA 2026</div>
            <h1 className="hero-title">CLUTCH</h1>
            <p className="hero-subtitle">
              A luxury World Cup 2026™ sportsbook wrapped in the stars and
              stripes. Back every strike, save and upset with CLUTCH tickets
              riding on the official Team USA mascot.
            </p>
            <p className="hero-subsubtitle">
              FIFA WORLD CUP 26™ • CANADA • MEXICO • USA • HOST NATION EDGE
            </p>

            <div className="tokenomics-grid">
              <div className="tokenomic-card">
                <div className="tokenomic-label">Prize pool</div>
                <div className="tokenomic-value">97% to winners</div>
              </div>
              <div className="tokenomic-card">
                <div className="tokenomic-label">Platform</div>
                <div className="tokenomic-value">2% treasury</div>
              </div>
              <div className="tokenomic-card">
                <div className="tokenomic-label">Oracle</div>
                <div className="tokenomic-value">1% data feed</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-mascot-card">
              <div className="hero-mascot-header">
                Official 2026 Team USA Mascot
              </div>
              <div className="hero-mascot-frame">
                <img
                  src={clutchLogo}
                  alt="CLUTCH mascot stadium art"
                  className="hero-mascot-img"
                />
              </div>
              <div className="hero-mascot-footer">
                Meet <span>CLUTCH</span> – your eagle-eyed guide to every
                world-class moment in 2026.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATCHES + USA QUICK STRIP */}
      <section id="matches">
        <div className="usa-strip">
          <div className="usa-strip-left">
            <div className="usa-strip-badge">🇺🇸 TEAM USA QUICK BETS</div>
            <div className="usa-strip-title">
              Ride the host nation with one-tap CLUTCH slips.
            </div>
            <div className="usa-strip-sub">
              Win next match · Win Group D · Lift the trophy.
            </div>
          </div>
          <div className="usa-strip-bets">
            <button
              className="usa-bet-pill"
              onClick={() => selectBet(2, 0)}
            >
              <span className="icon">🇺🇸</span>
              <span>USA to win vs Paraguay</span>
            </button>
            <button
              className="usa-bet-pill"
              onClick={() => selectTeam(1)}
            >
              <span className="icon">🏆</span>
              <span>USA to win World Cup</span>
            </button>
          </div>
        </div>

        <h2 className="section-title">Match Arena</h2>
        <div className="section-kicker">
          Real 2026 fixtures. No scores yet – just pure pre-kickoff anticipation.
        </div>

        <div className="matches-grid">
          {sampleMatches.map(match => (
            <div key={match.id} className="match-card">
              <div className="match-header-row">
                <span>{match.group}</span>
                <span>
                  {new Date(match.timestamp).toLocaleString()} • {match.venue}
                </span>
              </div>
              <div className="match-teams">
                <div className="team">
                  <div className="team-logo">
                    {getFlagEmoji(match.teamA)}
                  </div>
                  <div className="country-pill">
                    <span>{getFlagEmoji(match.teamA)}</span>
                    <span>{match.teamA}</span>
                  </div>
                </div>
                <div className="vs-text">VS</div>
                <div className="team">
                  <div className="team-logo">
                    {getFlagEmoji(match.teamB)}
                  </div>
                  <div className="country-pill">
                    <span>{getFlagEmoji(match.teamB)}</span>
                    <span>{match.teamB}</span>
                  </div>
                </div>
              </div>
              <div className="betting-options">
                <div
                  className="bet-option"
                  onClick={() => selectBet(match.id, 0)}
                >
                  <div className="odds">{match.odds.teamA}</div>
                  <div className="country-pill" style={{ marginTop: 6 }}>
                    <span>{getFlagEmoji(match.teamA)}</span>
                    <span>{match.teamA}</span>
                  </div>
                </div>
                <div
                  className="bet-option"
                  onClick={() => selectBet(match.id, 1)}
                >
                  <div className="odds">{match.odds.draw}</div>
                  <div>Draw</div>
                </div>
                <div
                  className="bet-option"
                  onClick={() => selectBet(match.id, 2)}
                >
                  <div className="odds">{match.odds.teamB}</div>
                  <div className="country-pill" style={{ marginTop: 6 }}>
                    <span>{getFlagEmoji(match.teamB)}</span>
                    <span>{match.teamB}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROUP STANDINGS (NO POINTS) */}
      <section id="groups">
        <h2 className="section-title">World Cup 26™ Group Line-ups</h2>
        <div className="section-kicker">
          Official draw – groups A to L. Standings will update once the first whistle blows.
        </div>

        <div className="groups-grid">
          {groupsData.map(group => (
            <div key={group.name} className="group-card">
              <div className="group-header">
                <div className="group-name">{group.name}</div>
                <div className="group-subtitle">
                  Canada • Mexico • USA • North America 2026
                </div>
              </div>
              {group.teams.map(team => (
                <div key={team} className="group-team-row">
                  <div className="country-pill">
                    <span>{getFlagEmoji(team)}</span>
                    <span>{team}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CHAMPION FUTURES */}
      <section id="ultimate">
        <div className="ultimate-bet">
          <h2 className="section-title">Champion Futures</h2>
          <div className="section-kicker">
            One ticket. One champion. One CLUTCH-sized sweat for all 39 days.
          </div>

          <div className="teams-grid">
            {teamsData.map(team => (
              <div
                key={team.id}
                className={
                  'team-option ' +
                  (state.selectedTeam?.id === team.id ? 'selected' : '')
                }
                onClick={() => selectTeam(team.id)}
              >
                <div className="country-pill" style={{ marginBottom: 8 }}>
                  <span>{team.flag}</span>
                  <span>{team.name}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#A8B0C8' }}>
                  Outright odds: {team.odds}
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={openUltimateBetModal}>
            Place Ultimate CLUTCH Ticket
          </button>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="dashboard">
        <h2 className="section-title">CLUTCH Vault</h2>
        <div className="section-kicker">
          Overview of your tickets, exposure and upside across all fixtures.
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total tickets</div>
            <div className="stat-value">{totalBets}</div>
            <div>Match & champion slips combined.</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total staked</div>
            <div className="stat-value">
              {formatAmount(totalStaked)} CLUTCH
            </div>
            <div>Aggregate CLUTCH deployed in 2026.</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Live tickets</div>
            <div className="stat-value">{activeBets}</div>
            <div>Awaiting kick-off or full-time.</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Max potential payout</div>
            <div className="stat-value">
              {formatAmount(potentialWins)} CLUTCH
            </div>
            <div>If every active ticket hits.</div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="leaderboard">
        <h2 className="section-title">Hall of Fame</h2>
        <div className="section-kicker">
          Top CLUTCH sharps riding the North American World Cup.
        </div>

        {leaderboardData.map(player => (
          <div key={player.rank} className="leaderboard-item">
            <div className="rank">{player.rank}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{player.address}</div>
              <div style={{ fontSize: '0.85rem', color: '#A8B0C8' }}>
                {player.winnings} • {player.bets} tickets
              </div>
            </div>
            <div style={{ fontSize: '1.3rem' }}>
              {player.rank === 1
                ? '🥇'
                : player.rank === 2
                ? '🥈'
                : player.rank === 3
                ? '🥉'
                : '⭐'}
            </div>
          </div>
        ))}
      </section>

      {/* BET MODALS */}
      {showBettingModal && state.selectedBet && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm CLUTCH Ticket</h3>
              <button
                className="close-modal"
                onClick={() => setShowBettingModal(false)}
              >
                ×
              </button>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                padding: 16,
                borderRadius: 14
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6
                }}
              >
                <strong>Fixture</strong>
                <span>
                  {state.selectedBet.match.teamA} vs{' '}
                  {state.selectedBet.match.teamB}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6
                }}
              >
                <strong>Your side</strong>
                <span style={{ color: '#2CB2FF' }}>
                  {getOutcomeText(
                    state.selectedBet.outcome,
                    state.selectedBet.match
                  )}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <strong>CLUTCH odds</strong>
                <span style={{ color: '#2CB2FF' }}>
                  {getOdds(
                    state.selectedBet.match,
                    state.selectedBet.outcome
                  )}
                </span>
              </div>
            </div>

            <input
              type="number"
              className="bet-amount"
              placeholder="Enter CLUTCH amount"
              value={betAmount}
              min="1"
              onChange={e => setBetAmount(e.target.value)}
            />
            <div
              style={{
                marginBottom: 10,
                fontSize: '0.8rem',
                color: '#A8B0C8'
              }}
            >
              Platform 2% • Oracle 1% • 97% paid to winners.
            </div>
            <button className="place-bet" onClick={placeBet}>
              Submit Ticket
            </button>
          </div>
        </div>
      )}

      {showUltimateModal && state.selectedTeam && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ultimate CLUTCH Champion</h3>
              <button
                className="close-modal"
                onClick={() => setShowUltimateModal(false)}
              >
                ×
              </button>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                padding: 16,
                borderRadius: 14
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6
                }}
              >
                <strong>Your champion</strong>
                <span style={{ color: '#2CB2FF' }}>
                  {state.selectedTeam.flag} {state.selectedTeam.name}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <strong>Outright odds</strong>
                <span style={{ color: '#2CB2FF' }}>
                  {state.selectedTeam.odds}
                </span>
              </div>
            </div>

            <input
              type="number"
              className="bet-amount"
              placeholder="Enter CLUTCH amount"
              value={ultimateBetAmount}
              min="1"
              onChange={e => setUltimateBetAmount(e.target.value)}
            />
            <div
              style={{
                marginBottom: 10,
                fontSize: '0.8rem',
                color: '#A8B0C8'
              }}
            >
              Platform 2% • Oracle 1% • 97% paid to winners.
            </div>
            <button className="place-bet" onClick={placeUltimateBet}>
              Lock Champion Ticket
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-brand">CLUTCH</div>
          <div className="footer-text">
            Official 2026 Team USA Mascot • Signature Prediction Suite for World Cup 26™.
          </div>
          <div className="footer-sub">
            CLUTCH is an independent fan project and is not affiliated with FIFA, FIFA World Cup 26™
            or any official organising body. Always bet responsibly.
          </div>
        </div>
        <div className="footer-right">
          <span>🇺🇸 Built for Canada · Mexico · USA 2026</span>
          <span>Terms • Privacy • Brand Guidelines</span>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClutchApp />
    </QueryClientProvider>
  )
}

export default App
