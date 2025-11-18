
import { useState, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi'
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
        name: 'WorldCup Meme Mascot',
        description: 'World Cup 2026 Prediction Platform',
        url: window.location.origin,
        icons: ['https://avatars.githubusercontent.com/u/37784886']
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
    '--w3m-accent': '#FF6B35',
    '--w3m-border-radius-master': '12px'
  }
})

const queryClient = new QueryClient()

// ===== ENHANCED CSS STYLES =====
const styles = `
:root {
  --primary: #FF6B35;
  --primary-dark: #E55A2B;
  --primary-light: #FF8C5A;
  --secondary: #1E1E1E;
  --accent: #00C9B1;
  --accent-dark: #00B49E;
  --accent-gold: #FFD700;
  --accent-silver: #C0C0C0;
  --accent-bronze: #CD7F32;
  --background: #0A0A0A;
  --surface: #1A1A1A;
  --surface-light: #2A2A2A;
  --surface-dark: #121212;
  --text: #FFFFFF;
  --text-secondary: #8E8E93;
  --text-tertiary: #636366;
  --success: #34C759;
  --danger: #FF3B30;
  --warning: #FFCC00;
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--accent));
  --gradient-gold: linear-gradient(135deg, var(--accent-gold), #FFED4E);
  --gradient-hero: linear-gradient(135deg, #FF6B35 0%, #00C9B1 50%, #FFD700 100%);
  --gradient-surface: linear-gradient(145deg, var(--surface), var(--surface-dark));
  --glass-bg: rgba(18, 18, 18, 0.85);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background: var(--background);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.6;
}

/* Enhanced Animated Background */
.stadium-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 201, 177, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
    linear-gradient(45deg, rgba(10, 10, 10, 0.9) 0%, transparent 100%);
  z-index: -3;
  animation: backgroundShift 20s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(1deg); }
}

.mascot-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 50% 50%, transparent 30%, rgba(10, 10, 10, 0.9) 100%),
    linear-gradient(45deg, rgba(26, 26, 26, 0.4) 0%, transparent 50%);
  z-index: -2;
}

.app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

/* Enhanced Premium Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  margin-bottom: 40px;
  background: var(--glass-bg);
  backdrop-filter: blur(40px) saturate(180%);
  border-radius: 25px;
  border: 1px solid var(--glass-border);
  position: sticky;
  top: 20px;
  z-index: 1000;
  box-shadow: var(--glass-shadow);
  transition: all 0.3s ease;
}

.header.scrolled {
  padding: 12px 30px;
  backdrop-filter: blur(60px) saturate(200%);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 28px;
  font-weight: 900;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
  animation: pulseGlow 2s ease-in-out infinite alternate;
  transition: all 0.3s ease;
}

.logo:hover .logo-icon {
  transform: scale(1.1) rotate(5deg);
}

@keyframes pulseGlow {
  from { 
    box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4),
                0 0 0 0 rgba(255, 107, 53, 0.4);
  }
  to { 
    box-shadow: 0 4px 30px rgba(0, 201, 177, 0.6),
                0 0 0 10px rgba(0, 201, 177, 0);
  }
}

/* Enhanced Navigation */
.nav-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links {
  display: flex;
  gap: 5px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 14px;
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
  background: var(--gradient-primary);
  transition: left 0.3s ease;
  z-index: -1;
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
}

.nav-link:hover::before {
  left: 0;
}

.nav-link.active {
  background: var(--gradient-primary);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  color: white;
}

/* Enhanced Wallet Section */
.wallet-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.balance-card {
  background: var(--gradient-primary);
  padding: 12px 20px;
  border-radius: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.balance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
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
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.disconnect-btn:hover {
  background: #ff1a1a;
  transform: translateY(-2px);
}

/* Mobile Menu */
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

/* Enhanced Hero Section */
.hero {
  text-align: center;
  padding: 120px 0;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
  border-radius: 40px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-hero);
  opacity: 0.1;
  z-index: -1;
}

.hero h1 {
  font-size: 4.5rem;
  margin-bottom: 20px;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: textGlow 3s ease-in-out infinite alternate;
}

@keyframes textGlow {
  from { text-shadow: 0 0 20px rgba(255, 107, 53, 0.5); }
  to { text-shadow: 0 0 30px rgba(0, 201, 177, 0.5), 0 0 40px rgba(255, 215, 0, 0.3); }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
}

.tokenomics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 40px 0;
}

.tokenomic-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 30px 25px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.tokenomic-card::before {
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

.tokenomic-card:hover::before {
  left: 0;
}

.tokenomic-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary);
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.2);
}

.tokenomic-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 10px;
}

/* Enhanced Betting Sections */
.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  position: relative;
  padding-bottom: 20px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

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
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.match-card:hover::before {
  transform: scaleX(1);
}

.match-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary);
  box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
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
  width: 80px;
  height: 80px;
  background: var(--secondary);
  border-radius: 50%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  border: 3px solid var(--primary);
  transition: all 0.3s ease;
}

.match-card:hover .team-logo {
  transform: scale(1.1);
  border-color: var(--accent);
}

.betting-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.bet-option {
  background: rgba(255, 255, 255, 0.05);
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
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary);
  transform: translateY(-3px);
}

.odds {
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
  font-size: 1.3rem;
}

/* Enhanced Groups Section */
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
  border-color: var(--primary);
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.15);
}

.group-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary);
}

.group-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent);
}

.group-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

.team-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Enhanced Ultimate Bet Section */
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
  background: var(--gradient-hero);
  opacity: 0.05;
  animation: rotate 10s linear infinite;
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
  background: rgba(255, 255, 255, 0.05);
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
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary);
  transform: translateY(-5px) scale(1.05);
}

.team-option.selected {
  background: rgba(255, 107, 53, 0.2);
  border-color: var(--primary);
  transform: scale(1.05);
}

.team-option.selected::before {
  left: 0;
}

/* Enhanced Dashboard */
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
  background: rgba(255, 255, 255, 0.05);
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
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 10px;
}

/* Enhanced Leaderboard */
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
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.leaderboard-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--glass-border);
  transform: translateX(10px);
}

.rank {
  width: 40px;
  height: 40px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 20px;
  flex-shrink: 0;
}

/* Enhanced Modal */
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
  background: rgba(255, 255, 255, 0.05);
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
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.place-bet {
  width: 100%;
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 20px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 600;
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.place-bet:hover::before {
  left: 100%;
}

.place-bet:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

/* Enhanced Notification */
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
  background: rgba(0, 201, 177, 0.9);
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Enhanced Responsive Design */
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
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .matches-grid {
    grid-template-columns: 1fr;
  }
  
  .groups-grid {
    grid-template-columns: 1fr;
  }
  
  .teams-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .tokenomics-grid {
    grid-template-columns: 1fr;
  }
  
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
  
  .logo {
    font-size: 24px;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .modal-content {
    padding: 25px;
    margin: 10px;
  }
  
  .ultimate-bet {
    padding: 25px 20px;
  }
  
  .dashboard {
    padding: 25px 20px;
  }
  
  .leaderboard {
    padding: 25px 20px;
  }
}

/* Loading States */
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

/* Scrollbar Styling */
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
function WorldCupApp() {
  // Wagmi hooks
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  // Application State
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /// Sample Data
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
        { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", points: 5, goals: 5 },
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
    }
  ]

  const teamsData = [
    { id: 1, name: "Brazil", flag: "🇧🇷", odds: 4.5 },
    { id: 2, name: "Germany", flag: "🇩🇪", odds: 5.0 },
    { id: 3, name: "Argentina", flag: "🇦🇷", odds: 4.2 },
    { id: 4, name: "France", flag: "🇫🇷", odds: 4.8 },
    { id: 5, name: "Spain", flag: "🇪🇸", odds: 6.0 },
    { id: 6, name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", odds: 5.5 },
    { id: 7, name: "Portugal", flag: "🇵🇹", odds: 7.0 },
    { id: 8, name: "Netherlands", flag: "🇳🇱", odds: 8.0 }
  ]

  const leaderboardData = [
    { rank: 1, address: "0x7a3...f8e2", winnings: "12,450 WCM", bets: 24 },
    { rank: 2, address: "0x4b2...c9d1", winnings: "9,870 WCM", bets: 19 },
    { rank: 3, address: "0x1f9...a4b6", winnings: "8,120 WCM", bets: 16 },
    { rank: 4, address: "0x6d5...e7f3", winnings: "7,540 WCM", bets: 14 },
    { rank: 5, address: "0x3c8...b2d9", winnings: "6,980 WCM", bets: 13 },
    { rank: 6, address: "0x9a1...d4e7", winnings: "5,430 WCM", bets: 11 },
    { rank: 7, address: "0x2f7...b8c9", winnings: "4,210 WCM", bets: 9 },
    { rank: 8, address: "0x5e6...a3d2", winnings: "3,890 WCM", bets: 8 }
  ]

  

  // Scroll handler for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Utility Functions (same as before)
  const getOutcomeText = (outcome, match) => {
    switch(outcome) {
      case 0: return match.teamA;
      case 1: return 'Draw';
      case 2: return match.teamB;
      default: return 'Unknown';
    }
  }

  const getOdds = (match, outcome) => {
    switch(outcome) {
      case 0: return match.odds.teamA;
      case 1: return match.odds.draw;
      case 2: return match.odds.teamB;
      default: return 1;
    }
  }

  const getFlagEmoji = (country) => {
    const flags = {
      'Brazil': '🇧🇷', 'Germany': '🇩🇪', 'Argentina': '🇦🇷',
      'France': '🇫🇷', 'Spain': '🇪🇸', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      'Portugal': '🇵🇹', 'Netherlands': '🇳🇱', 'Canada': '🇨🇦',
      'Japan': '🇯🇵', 'Morocco': '🇲🇦', 'Ukraine': '🇺🇦',
      'Sweden': '🇸🇪', 'Poland': '🇵🇱', 'Senegal': '🇸🇳',
      'USA': '🇺🇸'
    };
    return flags[country] || '🏴';
  }

  const formatAmount = (amount) => {
    return amount.toLocaleString();
  }

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  }

  // Betting Functions (same as before)
  const selectBet = (matchId, outcome) => {
    if (!isConnected) {
      showNotification('Please connect your wallet first!', 'error');
      return;
    }

    const match = sampleMatches.find(m => m.id === matchId);
    if (!match) {
      showNotification('Match not found!', 'error');
      return;
    }

    setState(prev => ({ ...prev, selectedBet: { matchId, outcome, match } }));
    setBetAmount('');
    setShowBettingModal(true);
  }

  const selectTeam = (teamId) => {
    if (!isConnected) {
      showNotification('Please connect your wallet first!', 'error');
      return;
    }

    setState(prev => ({ ...prev, selectedTeam: teamsData.find(t => t.id === teamId) }));
  }

  const openUltimateBetModal = () => {
    if (!state.selectedTeam) {
      showNotification('Please select a team first!', 'error');
      return;
    }
    setUltimateBetAmount('');
    setShowUltimateModal(true);
  }

  const placeBet = async () => {
    // ... placeBet function remains the same
  }

  const placeUltimateBet = async () => {
    // ... placeUltimateBet function remains the same
  }

  // Calculate dashboard stats (same as before)
  const totalBets = state.userBets.length + (state.ultimateBet ? 1 : 0);
  const activeBets = state.userBets.filter(bet => !bet.resolved).length + (state.ultimateBet && !state.ultimateBet.resolved ? 1 : 0);
  const totalStaked = state.userBets.reduce((sum, bet) => sum + bet.amount, 0) + 
                     (state.ultimateBet ? state.ultimateBet.amount : 0);
  const potentialWins = state.userBets.reduce((sum, bet) => sum + bet.potentialWin, 0) + 
                      (state.ultimateBet ? state.ultimateBet.potentialWin : 0);

  // Initialize app
  useEffect(() => {
    setState(prev => ({ ...prev, matches: sampleMatches }));
  }, [])

  // Add CSS to document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="stadium-background"></div>
      <div className="mascot-overlay"></div>

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Enhanced Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <div className="logo-icon">⚽</div>
          WorldCup Meme Mascot
        </div>
        
        <div className="nav-container">
          <nav className="nav-links">
            <a href="#matches" className="nav-link active">🎯 Match Bets</a>
            <a href="#groups" className="nav-link">📋 Groups</a>
            <a href="#ultimate" className="nav-link">🏆 Ultimate Bet</a>
            <a href="#dashboard" className="nav-link">📊 Dashboard</a>
            <a href="#leaderboard" className="nav-link">🏅 Leaderboard</a>
          </nav>
        </div>

        <div className="wallet-section">
          <div className="balance-card">
            <span>⚡</span>
            <span id="user-balance">
              {isConnected ? '1,500 WCM' : '0 WCM'}
            </span>
          </div>
          <w3m-button />
          {isConnected && (
            <button className="disconnect-btn" onClick={() => disconnect()}>
              Disconnect
            </button>
          )}
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </header>

      {/* Rest of the components remain the same */}
      <section className="hero">
        <h1>WORLD CUP 2026</h1>
        <div className="hero-subtitle">
          Predict match outcomes, place your Ultimate Bet, and win big with our meme mascot token!
        </div>
        
        <div className="tokenomics-grid">
          <div className="tokenomic-card">
            <div className="tokenomic-value">97%</div>
            <div>To Winners</div>
          </div>
          <div className="tokenomic-card">
            <div className="tokenomic-value">2%</div>
            <div>Platform Fee</div>
          </div>
          <div className="tokenomic-card">
            <div className="tokenomic-value">1%</div>
            <div>Oracle Fee</div>
          </div>
        </div>
      </section>

      {/* Match Bets Section */}
      <section id="matches">
        <h2 className="section-title">Match Predictions</h2>
        <div className="matches-grid">
          {sampleMatches.map(match => (
            <div key={match.id} className="match-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{match.group}</span>
                <span>{new Date(match.timestamp).toLocaleDateString()}</span>
              </div>
              <div className="match-teams">
                <div className="team">
                  <div className="team-logo">{getFlagEmoji(match.teamA)}</div>
                  <div style={{ fontWeight: '600' }}>{match.teamA}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: 'var(--accent)', fontSize: '1.2rem' }}>VS</div>
                <div className="team">
                  <div className="team-logo">{getFlagEmoji(match.teamB)}</div>
                  <div style={{ fontWeight: '600' }}>{match.teamB}</div>
                </div>
              </div>
              <div className="betting-options">
                <div className="bet-option" onClick={() => selectBet(match.id, 0)}>
                  <div className="odds">{match.odds.teamA}</div>
                  <div>{match.teamA}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Pool: {formatAmount(match.pool.teamA)} WCM
                  </div>
                </div>
                <div className="bet-option" onClick={() => selectBet(match.id, 1)}>
                  <div className="odds">{match.odds.draw}</div>
                  <div>Draw</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Pool: {formatAmount(match.pool.draw)} WCM
                  </div>
                </div>
                <div className="bet-option" onClick={() => selectBet(match.id, 2)}>
                  <div className="odds">{match.odds.teamB}</div>
                  <div>{match.teamB}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Pool: {formatAmount(match.pool.teamB)} WCM
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Groups Section */}
      <section id="groups">
        <h2 className="section-title">Group Stage</h2>
        <div className="groups-grid">
          {groupsData.map(group => (
            <div key={group.name} className="group-card">
              <div className="group-header">
                <div className="group-name">{group.name}</div>
              </div>
              <div className="group-teams">
                {group.teams.map(team => (
                  <div key={team.name} className="group-team">
                    <div className="team-info">
                      <span style={{ fontSize: '1.2rem' }}>{team.flag}</span>
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

      {/* Ultimate Bet Section */}
      <section id="ultimate">
        <div className="ultimate-bet">
          <h2 className="section-title">Ultimate Bet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            Predict the overall tournament winner and win the grand prize pool!
          </p>
          
          <div className="teams-grid">
            {teamsData.map(team => (
              <div 
                key={team.id} 
                className={`team-option ${state.selectedTeam?.id === team.id ? 'selected' : ''}`}
                onClick={() => selectTeam(team.id)}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{team.flag}</div>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>{team.name}</div>
                <div style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>Odds: {team.odds}</div>
              </div>
            ))}
          </div>
          
          <button 
            className="btn-primary" 
            onClick={openUltimateBetModal}
            style={{ marginTop: '30px' }}
          >
            Place Ultimate Bet
          </button>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard" id="dashboard">
        <h2 className="section-title">Your Prediction Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalBets}</div>
            <div>Total Bets</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatAmount(totalStaked)} WCM</div>
            <div>Total Staked</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeBets}</div>
            <div>Active Bets</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatAmount(potentialWins)} WCM</div>
            <div>Potential Wins</div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="leaderboard" id="leaderboard">
        <h2 className="section-title">Top Predictors</h2>
        <div>
          {leaderboardData.map(player => (
            <div key={player.rank} className="leaderboard-item">
              <div className="rank">{player.rank}</div>
              <div style={{ flex: '1' }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>{player.address}</div>
                <div style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>
                  {player.winnings} • {player.bets} bets
                </div>
              </div>
              <div style={{ color: 'var(--accent-gold)' }}>
                {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : '⭐'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Betting Modal */}
      {showBettingModal && state.selectedBet && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Bet on {getOutcomeText(state.selectedBet.outcome, state.selectedBet.match)}</h3>
              <button className="close-modal" onClick={() => setShowBettingModal(false)}>&times;</button>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Match:</strong>
                  <span>{state.selectedBet.match.teamA} vs {state.selectedBet.match.teamB}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Your Selection:</strong>
                  <span style={{ color: 'var(--accent)' }}>
                    {getOutcomeText(state.selectedBet.outcome, state.selectedBet.match)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Odds:</strong>
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
              placeholder="Enter WCM amount" 
              min="1"
            />
            <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Platform Fee: 2% • Oracle Fee: 1% • Winners Share: 97%
            </div>
            <button className="place-bet" onClick={placeBet}>Place Bet</button>
          </div>
        </div>
      )}

      {/* Ultimate Bet Modal */}
      {showUltimateModal && state.selectedTeam && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Place Ultimate Bet</h3>
              <button className="close-modal" onClick={() => setShowUltimateModal(false)}>&times;</button>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Your Selection:</strong>
                  <span style={{ color: 'var(--accent)' }}>
                    {state.selectedTeam.flag} {state.selectedTeam.name}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Odds:</strong>
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
              placeholder="Enter WCM amount" 
              min="1"
            />
            <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Platform Fee: 2% • Oracle Fee: 1% • Winners Share: 97%
            </div>
            <button className="place-bet" onClick={placeUltimateBet}>Place Ultimate Bet</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Main App wrapper with providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WorldCupApp />
    </QueryClientProvider>
  )
}

export default App
