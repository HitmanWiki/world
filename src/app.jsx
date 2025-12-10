import { useState, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi'
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// CLUTCH mascot image
import clutchLogo from './clutch-logo.jpg'

// ===== WAGMI CONFIGURATION =====
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
        description: 'CLUTCH – Official 2026 Team USA Mascot Signature Prediction Suite',
        url: window.location.origin,
        icons: [`${window.location.origin}/clutch-logo.jpg`]
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
    '--w3m-border-radius-master': '12px'
  }
})

const queryClient = new QueryClient()

// ===== CLUTCH THEME + STYLES =====
const styles = `
:root {
  --primary: #D71920;          /* USA red */
  --primary-dark: #A30F15;
  --primary-light: #FF4B5C;
  --secondary: #021225;        /* deep navy */
  --accent: #0052A5;           /* USA blue */
  --accent-dark: #003C7A;
  --accent-gold: #FFD700;
  --accent-silver: #C0C0C0;
  --accent-bronze: #CD7F32;
  --background: #020610;
  --surface: #0B1424;
  --surface-light: #122038;
  --surface-dark: #040812;
  --text: #FFFFFF;
  --text-secondary: #AAB3C5;
  --text-tertiary: #77809A;
  --success: #34C759;
  --danger: #FF3B30;
  --warning: #FFCC00;
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--accent));
  --gradient-gold: linear-gradient(135deg, var(--accent-gold), #FFED4E);
  --gradient-hero: linear-gradient(135deg, #D71920 0%, #FFFFFF 40%, #0052A5 100%);
  --gradient-surface: linear-gradient(145deg, var(--surface), var(--surface-dark));
  --glass-bg: rgba(4, 8, 18, 0.9);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

/* Global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background: radial-gradient(circle at top, #021A3A 0%, #020610 55%, #000000 100%);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.6;
}

.app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

/* Flag utilities */
.usa-stripes {
  background: linear-gradient(
    90deg,
    #D71920 0%,
    #D71920 16.6%,
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
}

.usa-pill {
  background: linear-gradient(135deg, #001B3A, #003C7A);
  border-radius: 999px;
  padding: 4px 10px;
  border: 1px solid rgba(255,255,255,0.18);
}

/* Background */
.stadium-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 10% 15%, rgba(215, 25, 32, 0.25) 0%, transparent 55%),
    radial-gradient(circle at 85% 20%, rgba(0, 82, 165, 0.25) 0%, transparent 55%),
    radial-gradient(circle at 50% 90%, rgba(255, 215, 0, 0.18) 0%, transparent 60%),
    linear-gradient(145deg, rgba(2, 6, 16, 0.95) 0%, rgba(2, 6, 16, 0.9) 35%, rgba(0,0,0,0.9) 100%);
  z-index: -3;
  animation: backgroundShift 20s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.03) translateY(-6px); }
}

.mascot-overlay {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 50%, transparent 35%, rgba(2, 6, 16, 0.95) 100%),
    repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.04),
      rgba(255,255,255,0.04) 2px,
      transparent 2px,
      transparent 6px
    );
  z-index: -2;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  margin-bottom: 40px;
  background: var(--glass-bg);
  backdrop-filter: blur(40px) saturate(200%);
  border-radius: 25px;
  border: 2px solid rgba(255,255,255,0.18);
  position: sticky;
  top: 20px;
  z-index: 1000;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.85);
  transition: all 0.3s ease;
}

.header.scrolled {
  padding: 12px 30px;
  backdrop-filter: blur(60px) saturate(220%);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.9);
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  width: 58px;
  height: 58px;
  background: #001B3A;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(215, 25, 32, 0.6);
  overflow: hidden;
  position: relative;
  border: 2px solid #FFFFFF;
}

.logo-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent 40%, rgba(0,0,0,0.5));
  mix-blend-mode: soft-light;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  background:
    linear-gradient(90deg, #001B3A 0%, #001B3A 25%, #FFFFFF 25%, #FFFFFF 50%, #D71920 50%, #D71920 75%, #FFFFFF 75%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-tagline {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
}

/* NAV */
.nav-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links {
  display: flex;
  gap: 5px;
  background: rgba(2, 18, 40, 0.95);
  padding: 6px;
  border-radius: 999px;
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.18);
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 999px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(135deg, #001B3A, #FFFFFF, #D71920);
  transition: left 0.3s ease;
  z-index: -1;
}

.nav-link:hover {
  color: #001B3A;
  transform: translateY(-2px);
}

.nav-link:hover::before {
  left: 0;
}

.nav-link.active {
  background: linear-gradient(135deg, #001B3A, #FFFFFF, #D71920);
  box-shadow: 0 4px 15px rgba(0, 82, 165, 0.4);
  color: #001B3A;
}

/* Wallet */
.wallet-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.balance-card {
  background: linear-gradient(90deg, #001B3A, #003C7A, #D71920);
  padding: 12px 20px;
  border-radius: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 22px rgba(0, 82, 165, 0.55);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.balance-card span:first-child {
  font-size: 18px;
}

.balance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 26px rgba(215, 25, 32, 0.7);
}

.w3m-button {
  border-radius: 18px !important;
}

.disconnect-btn {
  background: var(--danger);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.disconnect-btn:hover {
  background: #ff1a1a;
  transform: translateY(-2px);
}

/* Mobile menu */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* HERO */
.hero {
  text-align: center;
  padding: 120px 0;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  border-radius: 40px;
  background: var(--glass-bg);
  backdrop-filter: blur(22px);
  border: 2px solid rgba(255,255,255,0.2);
  box-shadow: 0 18px 42px rgba(0,0,0,0.9);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.05),
      rgba(255,255,255,0.05) 4px,
      transparent 4px,
      transparent 12px
    ),
    var(--gradient-hero);
  opacity: 0.14;
  z-index: -1;
}

.hero-content {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto 30px auto;
}

.hero-left {
  flex: 1.2;
  min-width: 0;
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
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: rgba(2, 18, 40, 0.9);
  border: 1px solid rgba(255,255,255,0.18);
  margin-bottom: 12px;
  color: var(--accent-gold);
}

.hero h1 {
  font-size: 4.5rem;
  margin-bottom: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 6px;
  background:
    linear-gradient(90deg, #001B3A 0%, #FFFFFF 20%, #D71920 40%, #FFFFFF 60%, #001B3A 80%, #D71920 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textGlow 3s ease-in-out infinite alternate;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  max-width: 650px;
  margin-left: 0;
  margin-right: auto;
  line-height: 1.7;
}

.hero-subsubtitle {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Mascot card */
.hero-mascot-card {
  background: radial-gradient(circle at 20% 0%, rgba(255,255,255,0.25) 0%, transparent 45%),
              radial-gradient(circle at 80% 100%, rgba(0,82,165,0.6) 0%, transparent 60%),
              rgba(2, 18, 40, 0.95);
  border-radius: 26px;
  padding: 18px 18px 22px;
  max-width: 380px;
  width: 100%;
  border: 2px solid rgba(255,255,255,0.24);
  box-shadow: 0 18px 40px rgba(0,0,0,0.9);
  position: relative;
  overflow: hidden;
}

.hero-mascot-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.22), transparent 40%, rgba(215,25,32,0.4));
  mix-blend-mode: soft-light;
  opacity: 0.7;
  pointer-events: none;
}

.hero-mascot-header {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-gold);
  text-align: center;
}

.hero-mascot-frame {
  margin: 12px 0 14px;
  padding: 6px;
  border-radius: 22px;
  background:
    linear-gradient(135deg, #001B3A, #FFFFFF, #D71920);
  box-shadow: 0 10px 30px rgba(0,0,0,0.7);
}

.hero-mascot-img {
  display: block;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  transform: translateY(0);
  transition: transform 0.4s ease;
}

.hero-mascot-footer {
  font-size: 12px;
  text-align: center;
  color: var(--text-secondary);
}

.hero-mascot-footer span {
  color: var(--accent-gold);
  font-weight: 700;
}

/* Hover motion */
.hero-mascot-card:hover .hero-mascot-img {
  transform: translateY(-4px) scale(1.02);
}

@keyframes textGlow {
  from { text-shadow: 0 0 22px rgba(215, 25, 32, 0.8); }
  to { text-shadow: 0 0 32px rgba(0, 82, 165, 0.8), 0 0 45px rgba(255, 255, 255, 0.5); }
}

/* Tokenomics */
.tokenomics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 20px 0 10px;
}

.tokenomic-card {
  background: rgba(2, 18, 40, 0.9);
  padding: 30px 25px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
}

.tokenomic-card::before {
  content: '';
  position: absolute;
  top: -40%;
  left: -40%;
  width: 180%;
  height: 180%;
  background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.18) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tokenomic-card:hover::before {
  opacity: 1;
  transform: translate3d(6px, 6px, 0);
}

.tokenomic-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  box-shadow: 0 18px 44px rgba(0, 82, 165, 0.45);
}

.tokenomic-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-gold);
  margin-bottom: 10px;
}

/* Section headings */
.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 10px;
  background:
    linear-gradient(90deg, #001B3A, #FFFFFF, #D71920, #FFFFFF, #001B3A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  position: relative;
  padding-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 4px;
  background:
    linear-gradient(90deg, #D71920, #FFFFFF, #001B3A, #FFFFFF, #D71920);
  border-radius: 999px;
}

.section-kicker {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

/* Country pill (flag + name) */
.country-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(2,18,40,0.95);
  border: 1px solid rgba(255,255,255,0.18);
  font-size: 0.85rem;
}

/* Matches */
.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.match-card {
  background: var(--gradient-surface);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.match-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #D71920, #FFFFFF, #0052A5);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.match-card::after {
  content: 'Flagship Fixture';
  position: absolute;
  top: 16px;
  left: 24px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  font-size: 0.65rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.match-card:hover::before {
  transform: scaleX(1);
}

.match-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  box-shadow: 0 20px 44px rgba(0, 82, 165, 0.4);
}

.match-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  margin-top: 8px;
  font-size: 0.85rem;
}

.match-header-row span:last-child {
  color: var(--text-tertiary);
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.team-logo {
  width: 68px;
  height: 68px;
  background: radial-gradient(circle at 30% 20%, #FFFFFF 0%, #F4F4F4 40%, #021225 100%);
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.7rem;
  border: 3px solid var(--primary);
  transition: all 0.3s ease;
}

.match-card:hover .team-logo {
  transform: scale(1.08);
  border-color: var(--accent);
}

/* Betting options */
.betting-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.bet-option {
  background: rgba(2, 18, 40, 0.9);
  padding: 20px 15px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.bet-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0.1;
  transition: left 0.3s ease;
}

.bet-option:hover::before {
  left: 0;
}

.bet-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--primary);
  transform: translateY(-3px);
}

.odds {
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
  font-size: 1.3rem;
}

/* Standings / Groups */
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.group-card {
  background: var(--gradient-surface);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.group-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: 0 15px 40px rgba(0, 82, 165, 0.35);
}

.group-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #D71920, #FFFFFF, #0052A5) 1;
}

.group-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
}

.group-subtitle {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.group-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.group-team:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
}

.group-team:last-child {
  border-bottom: none;
}

/* Ultimate bet */
.ultimate-bet {
  background: var(--gradient-surface);
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 60px;
  border: 1px solid var(--glass-border);
  text-align: center;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.ultimate-bet::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 10% 10%, rgba(215,25,32,0.5), transparent 55%),
              radial-gradient(circle at 80% 80%, rgba(0,82,165,0.5), transparent 55%);
  opacity: 0.15;
  animation: rotate 18s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 30px 0;
  position: relative;
  z-index: 1;
}

.team-option {
  background: rgba(2, 18, 40, 0.9);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.team-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  transition: left 0.3s ease;
  z-index: -1;
}

.team-option:hover::before {
  left: 0;
}

.team-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--primary);
  transform: translateY(-5px) scale(1.05);
}

.team-option.selected {
  background: rgba(215, 25, 32, 0.25);
  border-color: var(--primary);
  transform: scale(1.05);
}

.team-option.selected::before {
  left: 0;
}

/* Dashboard */
.dashboard {
  background: var(--gradient-surface);
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 60px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: radial-gradient(circle at 0 0, rgba(255,255,255,0.12) 0%, transparent 55%),
              rgba(2, 18, 40, 0.95);
  padding: 30px 25px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #D71920, #FFFFFF, #0052A5);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
}

.stat-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-tertiary);
  margin-bottom: 6px;
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--accent-gold);
  margin-bottom: 10px;
}

/* Leaderboard */
.leaderboard {
  background: var(--gradient-surface);
  border-radius: 25px;
  padding: 40px;
  margin-bottom: 60px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
}

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(2, 18, 40, 0.9);
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.leaderboard-item:nth-child(1) {
  background: linear-gradient(135deg, rgba(255,215,0,0.18), rgba(2,18,40,0.95));
}

.leaderboard-item:nth-child(2) {
  background: linear-gradient(135deg, rgba(192,192,192,0.18), rgba(2,18,40,0.95));
}

.leaderboard-item:nth-child(3) {
  background: linear-gradient(135deg, rgba(205,127,50,0.18), rgba(2,18,40,0.95));
}

.leaderboard-item:hover {
  background: rgba(2, 18, 40, 1);
  border-color: var(--glass-border);
  transform: translateX(10px);
}

.rank {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #001B3A, #FFFFFF, #D71920);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 20px;
  flex-shrink: 0;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 2000;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal.show {
  display: flex;
  animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.modal-content {
  background: var(--gradient-surface);
  padding: 40px;
  border-radius: 25px;
  max-width: 500px;
  width: 100%;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(20px);
  animation: modalContentAppear 0.3s ease;
}

@keyframes modalContentAppear {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.close-modal {
  background: none;
  border: none;
  color: var(--text);
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 8px;
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.bet-amount {
  width: 100%;
  padding: 20px;
  background: rgba(2, 18, 40, 0.9);
  border: 2px solid var(--glass-border);
  border-radius: 15px;
  color: var(--text);
  margin-bottom: 25px;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.bet-amount:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(215, 25, 32, 0.25);
}

.place-bet {
  width: 100%;
  background: linear-gradient(135deg, #001B3A, #FFFFFF, #D71920);
  color: #001B3A;
  border: none;
  padding: 20px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.place-bet::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  transition: left 0.5s ease;
}

.place-bet:hover::before {
  left: 100%;
}

.place-bet:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(215, 25, 32, 0.55);
}

.btn-primary {
  background: linear-gradient(135deg, #001B3A, #FFFFFF, #D71920);
  color: #001B3A;
  border: none;
  padding: 15px 30px;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 82, 165, 0.55);
}

/* Notifications */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  z-index: 3000;
  animation: slideIn 0.3s ease;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--glass-shadow);
  max-width: 400px;
}

.notification.success {
  background: rgba(52, 199, 89, 0.9);
}

.notification.error {
  background: rgba(255, 59, 48, 0.9);
}

.notification.info {
  background: rgba(0, 82, 165, 0.9);
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Responsive */
@media (max-width: 1200px) {
  .app {
    padding: 15px;
  }
  
  .hero h1 {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
    text-align: center;
  }
  
  .nav-container {
    width: 100%;
    justify-content: center;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .wallet-section {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  
  .balance-card {
    width: 100%;
    justify-content: center;
  }
  
  .hero {
    padding: 80px 20px;
  }

  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-left {
    width: 100%;
  }

  .hero-right {
    width: 100%;
  }

  .hero-mascot-card {
    max-width: 320px;
  }
  
  .hero h1 {
    font-size: 2.7rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .matches-grid,
  .groups-grid {
    grid-template-columns: 1fr;
  }
  
  .teams-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .tokenomics-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .betting-options {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 12px 15px;
  }
  
  .logo-title {
    font-size: 24px;
  }
  
  .logo-icon {
    width: 44px;
    height: 44px;
  }
  
  .hero h1 {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .modal-content,
  .ultimate-bet,
  .dashboard,
  .leaderboard {
    padding: 25px 20px;
  }
}

/* Loading */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--surface-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}
`

// ===== REACT COMPONENT =====
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
  const [isScrolled, setIsScrolled] = useState(false)

  // Sample Data
  const sampleMatches = [
    {
      id: 1,
      teamA: "Brazil",
      teamB: "Germany",
      timestamp: Date.now() + 86400000,
      odds: { teamA: 2.1, draw: 3.2, teamB: 2.8 },
      pool: { teamA: 15000, draw: 8000, teamB: 12000 },
      group: "Group A"
    },
    {
      id: 2,
      teamA: "Argentina",
      teamB: "France",
      timestamp: Date.now() + 172800000,
      odds: { teamA: 2.4, draw: 3.0, teamB: 2.6 },
      pool: { teamA: 18000, draw: 9500, teamB: 14000 },
      group: "Group B"
    },
    {
      id: 3,
      teamA: "Spain",
      teamB: "England",
      timestamp: Date.now() + 259200000,
      odds: { teamA: 2.3, draw: 3.1, teamB: 2.7 },
      pool: { teamA: 12000, draw: 7000, teamB: 11000 },
      group: "Group C"
    },
    {
      id: 4,
      teamA: "Portugal",
      teamB: "Netherlands",
      timestamp: Date.now() + 345600000,
      odds: { teamA: 2.5, draw: 3.0, teamB: 2.5 },
      pool: { teamA: 13000, draw: 8500, teamB: 12500 },
      group: "Group D"
    }
  ]

  // Expanded to Groups A–H
  const groupsData = [
    {
      name: "Group A",
      teams: [
        { name: "Brazil", flag: "🇧🇷", points: 7, goals: 8 },
        { name: "Germany", flag: "🇩🇪", points: 6, goals: 6 },
        { name: "Canada", flag: "🇨🇦", points: 3, goals: 3 },
        { name: "Japan", flag: "🇯🇵", points: 1, goals: 2 }
      ]
    },
    {
      name: "Group B",
      teams: [
        { name: "Argentina", flag: "🇦🇷", points: 9, goals: 7 },
        { name: "France", flag: "🇫🇷", points: 6, goals: 5 },
        { name: "Morocco", flag: "🇲🇦", points: 3, goals: 4 },
        { name: "Ukraine", flag: "🇺🇦", points: 0, goals: 1 }
      ]
    },
    {
      name: "Group C",
      teams: [
        { name: "Spain", flag: "🇪🇸", points: 7, goals: 6 },
        { name: "England", flag: "🏴", points: 5, goals: 5 },
        { name: "Sweden", flag: "🇸🇪", points: 4, goals: 4 },
        { name: "Poland", flag: "🇵🇱", points: 1, goals: 2 }
      ]
    },
    {
      name: "Group D",
      teams: [
        { name: "Portugal", flag: "🇵🇹", points: 9, goals: 9 },
        { name: "Netherlands", flag: "🇳🇱", points: 6, goals: 6 },
        { name: "Senegal", flag: "🇸🇳", points: 3, goals: 3 },
        { name: "USA", flag: "🇺🇸", points: 0, goals: 1 }
      ]
    },
    {
      name: "Group E",
      teams: [
        { name: "Mexico", flag: "🇲🇽", points: 6, goals: 5 },
        { name: "Croatia", flag: "🇭🇷", points: 4, goals: 4 },
        { name: "South Korea", flag: "🇰🇷", points: 4, goals: 3 },
        { name: "Nigeria", flag: "🇳🇬", points: 2, goals: 2 }
      ]
    },
    {
      name: "Group F",
      teams: [
        { name: "Belgium", flag: "🇧🇪", points: 7, goals: 7 },
        { name: "Uruguay", flag: "🇺🇾", points: 5, goals: 5 },
        { name: "Switzerland", flag: "🇨🇭", points: 3, goals: 3 },
        { name: "Qatar", flag: "🇶🇦", points: 1, goals: 1 }
      ]
    },
    {
      name: "Group G",
      teams: [
        { name: "Italy", flag: "🇮🇹", points: 6, goals: 5 },
        { name: "Colombia", flag: "🇨🇴", points: 6, goals: 5 },
        { name: "Australia", flag: "🇦🇺", points: 3, goals: 3 },
        { name: "Ghana", flag: "🇬🇭", points: 1, goals: 2 }
      ]
    },
    {
      name: "Group H",
      teams: [
        { name: "USA", flag: "🇺🇸", points: 7, goals: 6 },
        { name: "Saudi Arabia", flag: "🇸🇦", points: 4, goals: 4 },
        { name: "Ecuador", flag: "🇪🇨", points: 3, goals: 3 },
        { name: "Scotland", flag: "🏴", points: 1, goals: 2 }
      ]
    }
  ]

  const teamsData = [
    { id: 1, name: "Brazil", flag: "🇧🇷", odds: 4.5 },
    { id: 2, name: "Germany", flag: "🇩🇪", odds: 5.0 },
    { id: 3, name: "Argentina", flag: "🇦🇷", odds: 4.2 },
    { id: 4, name: "France", flag: "🇫🇷", odds: 4.8 },
    { id: 5, name: "Spain", flag: "🇪🇸", odds: 6.0 },
    { id: 6, name: "England", flag: "🏴", odds: 5.5 },
    { id: 7, name: "Portugal", flag: "🇵🇹", odds: 7.0 },
    { id: 8, name: "Netherlands", flag: "🇳🇱", odds: 8.0 }
  ]

  const leaderboardData = [
    { rank: 1, address: "0x7a3...f8e2", winnings: "12,450 CLUTCH", bets: 24 },
    { rank: 2, address: "0x4b2...c9d1", winnings: "9,870 CLUTCH", bets: 19 },
    { rank: 3, address: "0x1f9...a4b6", winnings: "8,120 CLUTCH", bets: 16 },
    { rank: 4, address: "0x6d5...e7f3", winnings: "7,540 CLUTCH", bets: 14 },
    { rank: 5, address: "0x3c8...b2d9", winnings: "6,980 CLUTCH", bets: 13 },
    { rank: 6, address: "0x9a1...d4e7", winnings: "5,430 CLUTCH", bets: 11 },
    { rank: 7, address: "0x2f7...b8c9", winnings: "4,210 CLUTCH", bets: 9 },
    { rank: 8, address: "0x5e6...a3d2", winnings: "3,890 CLUTCH", bets: 8 }
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getOutcomeText = (outcome, match) => {
    switch(outcome) {
      case 0: return match.teamA
      case 1: return 'Draw'
      case 2: return match.teamB
      default: return 'Unknown'
    }
  }

  const getOdds = (match, outcome) => {
    switch(outcome) {
      case 0: return match.odds.teamA
      case 1: return match.odds.draw
      case 2: return match.odds.teamB
      default: return 1
    }
  }

  const getFlagEmoji = (country) => {
    const flags = {
      'Brazil': '🇧🇷', 'Germany': '🇩🇪', 'Argentina': '🇦🇷',
      'France': '🇫🇷', 'Spain': '🇪🇸', 'England': '🏴',
      'Portugal': '🇵🇹', 'Netherlands': '🇳🇱', 'Canada': '🇨🇦',
      'Japan': '🇯🇵', 'Morocco': '🇲🇦', 'Ukraine': '🇺🇦',
      'Sweden': '🇸🇪', 'Poland': '🇵🇱', 'Senegal': '🇸🇳',
      'USA': '🇺🇸', 'Mexico': '🇲🇽', 'Croatia': '🇭🇷',
      'South Korea': '🇰🇷', 'Nigeria': '🇳🇬', 'Belgium': '🇧🇪',
      'Uruguay': '🇺🇾', 'Switzerland': '🇨🇭', 'Qatar': '🇶🇦',
      'Italy': '🇮🇹', 'Colombia': '🇨🇴', 'Australia': '🇦🇺',
      'Ghana': '🇬🇭', 'Saudi Arabia': '🇸🇦', 'Ecuador': '🇪🇨',
      'Scotland': '🏴'
    }
    return flags[country] || '🏴'
  }

  const formatAmount = (amount) => amount.toLocaleString()

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000)
  }

  const selectBet = (matchId, outcome) => {
    if (!isConnected) {
      showNotification('Connect your wallet to place CLUTCH tickets.', 'error')
      return
    }
    const match = sampleMatches.find(m => m.id === matchId)
    if (!match) {
      showNotification('Match not found!', 'error')
      return
    }
    setState(prev => ({ ...prev, selectedBet: { matchId, outcome, match } }))
    setBetAmount('')
    setShowBettingModal(true)
  }

  const selectTeam = (teamId) => {
    if (!isConnected) {
      showNotification('Connect your wallet to pick your CLUTCH champion.', 'error')
      return
    }
    setState(prev => ({ ...prev, selectedTeam: teamsData.find(t => t.id === teamId) }))
  }

  const openUltimateBetModal = () => {
    if (!state.selectedTeam) {
      showNotification('Choose a champion team first.', 'error')
      return
    }
    setUltimateBetAmount('')
    setShowUltimateModal(true)
  }

  const placeBet = () => {
    if (!betAmount || Number(betAmount) <= 0) {
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
    setState(prev => ({
      ...prev,
      userBets: [...prev.userBets, newBet]
    }))
    setShowBettingModal(false)
    showNotification('CLUTCH ticket confirmed.', 'success')
  }

  const placeUltimateBet = () => {
    if (!ultimateBetAmount || Number(ultimateBetAmount) <= 0) {
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
    showNotification('Ultimate CLUTCH champion ticket locked in.', 'success')
  }

  const totalBets = state.userBets.length + (state.ultimateBet ? 1 : 0)
  const activeBets = state.userBets.filter(bet => !bet.resolved).length +
                     (state.ultimateBet && !state.ultimateBet.resolved ? 1 : 0)
  const totalStaked = state.userBets.reduce((s, b) => s + b.amount, 0) +
                      (state.ultimateBet ? state.ultimateBet.amount : 0)
  const potentialWins = state.userBets.reduce((s, b) => s + b.potentialWin, 0) +
                        (state.ultimateBet ? state.ultimateBet.potentialWin : 0)

  useEffect(() => {
    setState(prev => ({ ...prev, matches: sampleMatches }))
  }, [])

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    document.head.appendChild(styleElement)
    return () => document.head.removeChild(styleElement)
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

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <div className="logo-icon">
            <img src={clutchLogo} alt="CLUTCH Mascot" />
          </div>
          <div className="logo-text">
            <span className="logo-title">CLUTCH</span>
            <span className="logo-tagline">
              OFFICIAL 2026 TEAM USA MASCOT • SIGNATURE PREDICTION SUITE
            </span>
          </div>
        </div>

        <div className="nav-container">
          <nav className="nav-links">
            <a href="#matches" className="nav-link active">🎯 Match Arena</a>
            <a href="#groups" className="nav-link">📊 World Cup Standings</a>
            <a href="#ultimate" className="nav-link">🏆 Champion Futures</a>
            <a href="#dashboard" className="nav-link">💼 CLUTCH Vault</a>
            <a href="#leaderboard" className="nav-link">🏅 Hall of Fame</a>
          </nav>
        </div>

        <div className="wallet-section">
          <div className="balance-card">
            <span>🦅</span>
            <span id="user-balance">
              {isConnected ? '1,500 CLUTCH' : '0 CLUTCH'}
            </span>
          </div>
          <w3m-button />
          {isConnected && (
            <button className="disconnect-btn" onClick={() => disconnect()}>
              Disconnect
            </button>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              🦅 CLUTCH • TEAM USA 2026
            </div>
            <h1>CLUTCH</h1>
            <div className="hero-subtitle">
              A luxury sportsbook experience wrapped in the stars and stripes. 
              Back every strike, save, and upset with CLUTCH and turn World Cup 2026™ momentum into rewards.
            </div>
            <div className="hero-subsubtitle">
              WORLD CUP 2026™ • AMERICAN FLAG EDITION • POWERED BY CLUTCH
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-mascot-card">
              <div className="hero-mascot-header">
                OFFICIAL 2026 TEAM USA MASCOT
              </div>
              <div className="hero-mascot-frame">
                <img
                  src={clutchLogo}
                  alt="CLUTCH Mascot in the stadium"
                  className="hero-mascot-img"
                />
              </div>
              <div className="hero-mascot-footer">
                Step onto the pitch with <span>CLUTCH</span> – where every call flies with the flag.
              </div>
            </div>
          </div>
        </div>

        <div className="tokenomics-grid">
          <div className="tokenomic-card">
            <div className="tokenomic-value">97%</div>
            <div>Prize Pool for CLUTCH Winners</div>
          </div>
          <div className="tokenomic-card">
            <div className="tokenomic-value">2%</div>
            <div>Luxury Treasury & Liquidity</div>
          </div>
          <div className="tokenomic-card">
            <div className="tokenomic-value">1%</div>
            <div>Data Oracle & Infrastructure</div>
          </div>
        </div>
      </section>

      {/* MATCHES */}
      <section id="matches">
        <h2 className="section-title">Match Predictions</h2>
        <div className="section-kicker">
          Pick your side, size your CLUTCH, and let the ninety minutes decide.
        </div>
        <div className="matches-grid">
          {sampleMatches.map(match => (
            <div key={match.id} className="match-card">
              <div className="match-header-row">
                <span>{match.group}</span>
                <span>{new Date(match.timestamp).toLocaleString()}</span>
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
                <div style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '1.2rem' }}>VS</div>
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
                <div className="bet-option" onClick={() => selectBet(match.id, 0)}>
                  <div className="odds">{match.odds.teamA}</div>
                  <div className="country-pill" style={{ justifyContent: 'center', marginTop: 6 }}>
                    <span>{getFlagEmoji(match.teamA)}</span>
                    <span>{match.teamA}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                    Pool: {formatAmount(match.pool.teamA)} CLUTCH
                  </div>
                </div>
                <div className="bet-option" onClick={() => selectBet(match.id, 1)}>
                  <div className="odds">{match.odds.draw}</div>
                  <div>Draw</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                    Pool: {formatAmount(match.pool.draw)} CLUTCH
                  </div>
                </div>
                <div className="bet-option" onClick={() => selectBet(match.id, 2)}>
                  <div className="odds">{match.odds.teamB}</div>
                  <div className="country-pill" style={{ justifyContent: 'center', marginTop: 6 }}>
                    <span>{getFlagEmoji(match.teamB)}</span>
                    <span>{match.teamB}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                    Pool: {formatAmount(match.pool.teamB)} CLUTCH
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROUP STANDINGS */}
      <section id="groups">
        <h2 className="section-title">FIFA World Cup 2026™ Standings</h2>
        <div className="section-kicker">
          All groups, all tables – flags and form before you commit your CLUTCH.
        </div>
        <div className="groups-grid">
          {groupsData.map(group => (
            <div key={group.name} className="group-card">
              <div className="group-header">
                <div className="group-name">{group.name}</div>
                <div className="group-subtitle">
                  Official Group Standings • 3 pts Win / 1 Draw
                </div>
              </div>
              <div className="group-teams">
                {group.teams.map(team => (
                  <div key={team.name} className="group-team">
                    <div className="country-pill">
                      <span>{team.flag}</span>
                      <span>{team.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>{team.points} pts</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {team.goals} goals
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ULTIMATE BET */}
      <section id="ultimate">
        <div className="ultimate-bet">
          <h2 className="section-title">Ultimate Bet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            Call the champion for FIFA World Cup 2026™. One decision, a tournament-long sweat,
            and a CLUTCH-sized payout if you&apos;re right.
          </p>
          
          <div className="teams-grid">
            {teamsData.map(team => (
              <div 
                key={team.id} 
                className={`team-option ${state.selectedTeam?.id === team.id ? 'selected' : ''}`}
                onClick={() => selectTeam(team.id)}
              >
                <div className="country-pill" style={{ justifyContent: 'center', marginBottom: 10 }}>
                  <span>{team.flag}</span>
                  <span>{team.name}</span>
                </div>
                <div style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>Outright Odds: {team.odds}</div>
              </div>
            ))}
          </div>
          
          <button 
            className="btn-primary" 
            onClick={openUltimateBetModal}
            style={{ marginTop: '30px' }}
          >
            Place Ultimate CLUTCH Bet
          </button>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="dashboard" id="dashboard">
        <h2 className="section-title">Your CLUTCH Vault</h2>
        <div className="section-kicker">
          A luxury overview of your exposure, volume, and upside across the flag-striped markets.
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Tickets</div>
            <div className="stat-value">{totalBets}</div>
            <div>Open & historical CLUTCH positions</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Staked</div>
            <div className="stat-value">{formatAmount(totalStaked)} CLUTCH</div>
            <div>Aggregate CLUTCH you&apos;ve deployed across the tournament</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Live Bets</div>
            <div className="stat-value">{activeBets}</div>
            <div>Tickets still sweating match outcomes</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Potential Payout</div>
            <div className="stat-value">{formatAmount(potentialWins)} CLUTCH</div>
            <div>Maximum upside if every active ticket lands</div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="leaderboard" id="leaderboard">
        <h2 className="section-title">Hall of Fame</h2>
        <div className="section-kicker">
          The sharpest CLUTCH predictors riding the 2026 World Cup wave.
        </div>
        <div>
          {leaderboardData.map(player => (
            <div key={player.rank} className="leaderboard-item">
              <div className="rank">{player.rank}</div>
              <div style={{ flex: '1' }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>{player.address}</div>
                <div style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
                  {player.winnings} • {player.bets} tickets
                </div>
              </div>
              <div style={{ fontSize: '1.3rem' }}>
                {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : '⭐'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MATCH BET MODAL */}
      {showBettingModal && state.selectedBet && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm CLUTCH Ticket</h3>
              <button className="close-modal" onClick={() => setShowBettingModal(false)}>&times;</button>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Fixture:</strong>
                  <span>
                    {state.selectedBet.match.teamA} vs {state.selectedBet.match.teamB}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Your Side:</strong>
                  <span style={{ color: 'var(--accent)' }}>
                    {getOutcomeText(state.selectedBet.outcome, state.selectedBet.match)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>CLUTCH Odds:</strong>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
                    {getOdds(state.selectedBet.match, state.selectedBet.outcome)}
                  </span>
                </div>
              </div>
            </div>
            <input 
              type="number" 
              className="bet-amount" 
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Enter CLUTCH amount" 
              min="1"
            />
            <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Platform Fee: 2% • Oracle Fee: 1% • Winners Share: 97%
            </div>
            <button className="place-bet" onClick={placeBet}>Confirm Ticket</button>
          </div>
        </div>
      )}

      {/* ULTIMATE BET MODAL */}
      {showUltimateModal && state.selectedTeam && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ultimate CLUTCH Champion</h3>
              <button className="close-modal" onClick={() => setShowUltimateModal(false)}>&times;</button>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Your Champion:</strong>
                  <span style={{ color: 'var(--accent)' }}>
                    {state.selectedTeam.flag} {state.selectedTeam.name}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Outright Odds:</strong>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
                    {state.selectedTeam.odds}
                  </span>
                </div>
              </div>
            </div>
            <input 
              type="number" 
              className="bet-amount" 
              value={ultimateBetAmount}
              onChange={(e) => setUltimateBetAmount(e.target.value)}
              placeholder="Enter CLUTCH amount" 
              min="1"
            />
            <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Platform Fee: 2% • Oracle Fee: 1% • Winners Share: 97%
            </div>
            <button className="place-bet" onClick={placeUltimateBet}>Lock Champion Ticket</button>
          </div>
        </div>
      )}
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
