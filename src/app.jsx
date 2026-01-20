// app.jsx - COMPLETE FILE (NO SAMPLE DATA)
import { useState, useEffect } from 'react'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'
import { BrowserProvider } from 'ethers'
import apiClient from './utils/api'  // ADD THIS IMPORT

import clutchLogo from './logo.png'
import clutchgif from './clutch.gif'

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
  flex-shrink: 0;
  min-width: fit-content;
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
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
  margin: 0 20px;
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
  min-width: 0; /* Add this */
}

/* Update the nav-links to handle overflow */
.nav-links {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px;
  border-radius: 24px;
  background: radial-gradient(circle at 0% 0%, #1E477B 0%, #020817 55%);
  overflow: hidden; /* Add this */
}

.nav-link {
  flex: 0 1 auto; /* Change from flex: 1 1 0 */
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
  margin-left: auto; /* Add this to push to the right */
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
  .country-pill img {
  display: inline-block;
  vertical-align: middle;
}

.team-logo img {
  width: 70%;
  height: auto;
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
    justify-content: space-between; /* Add this */
    
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
    margin-left: 0; /* Reset for mobile */
  }
  .logo {
    order: 1;
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
   const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()  // Use this instead of useWalletClient

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
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  // BACKEND API BASE URL - YOUR BACKEND
  const API_BASE = 'http://localhost:3000/api/v4'

  // In your frontend app.jsx, update the fetchData function:
// ========== ADD THE AUTO-LOGIN EFFECT HERE ==========
  useEffect(() => {
    if (isConnected && address) {
      // Check if we need to log in
      const token = localStorage.getItem('token');
      const storedWallet = localStorage.getItem('walletAddress');
      
      if (!token || storedWallet !== address) {
        // Auto-login after wallet connects
        console.log('🔄 Auto-login triggered');
        setTimeout(() => {
          handleWalletLogin();
        }, 500);
      }
    }
  }, [isConnected, address]);

  // ========== ADD THE DEBUG FUNCTION HERE ==========
  const debugAuth = () => {
    const token = localStorage.getItem('token');
    console.log('🔍 Debug Auth:');
    console.log('Token exists:', !!token);
    console.log('Token:', token ? `${token.substring(0, 20)}...` : 'None');
    console.log('Wallet connected:', isConnected);
    console.log('Wallet address:', address);
    
    // Test the API endpoint
    fetch(`${API_BASE}/debug/auth-test`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => console.log('Auth test result:', data))
    .catch(err => console.error('Auth test error:', err));
  };

  
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('📡 Fetching REAL data from backend...');
      console.log('API Base:', API_BASE);
      
      // Fetch ALL matches (not just upcoming)
      const [matchesRes, groupsRes] = await Promise.all([
        fetch(`${API_BASE}/matches?limit=100`),  // Get up to 100 matches
        fetch(`${API_BASE}/matches/groups`)
      ]);

      console.log('Matches response status:', matchesRes.status);
      console.log('Groups response status:', groupsRes.status);

      if (!matchesRes.ok) throw new Error(`Matches API failed: ${matchesRes.status}`);
      if (!groupsRes.ok) throw new Error(`Groups API failed: ${groupsRes.status}`);

      const matchesData = await matchesRes.json();
      const groupsData = await groupsRes.json();

      console.log('✅ RAW Backend data - matches:', matchesData);
      console.log('✅ RAW Backend data - groups:', groupsData);
      
      // IMPORTANT: Check the actual structure
      // matchesData might have: matchesData.data OR matchesData.matches
      const allMatchesRaw = matchesData.data || matchesData.matches || matchesData || [];
      console.log(`📊 Total matches from API: ${allMatchesRaw.length}`);
      
      if (allMatchesRaw.length > 0) {
        console.log('Sample raw match:', allMatchesRaw[0]);
      }

      // CORRECT TRANSFORMATION - Match your database fields
      const matches = allMatchesRaw.map(match => {
        // Add date formatting
        const matchDate = new Date(match.match_date || match.timestamp);
        const formattedDate = matchDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        
        return {
          id: match.match_id || match.id,
          match_id: match.match_id, // Keep original ID
          teamA: match.team_a || match.teamA,
          teamB: match.team_b || match.teamB,
          homeTeam: match.team_a, // Add alternative naming
          awayTeam: match.team_b, // Add alternative naming
          group: match.group_name || match.group,
          group_name: match.group_name, // Keep original
          timestamp: match.match_date || match.timestamp,
          displayDate: formattedDate, // Add formatted date for display
          venue: match.venue,
          odds: {
            teamA: match.odds_team_a || (match.odds && match.odds.teamA) || 2.0,
            draw: match.odds_draw || (match.odds && match.odds.draw) || 3.5,
            teamB: match.odds_team_b || (match.odds && match.odds.teamB) || 2.5
          },
          status: match.status || 'upcoming',
          // Add date for sorting
          date: matchDate.getTime()
        };
      });

      console.log(`✅ Transformed ${matches.length} matches`);
      if (matches.length > 0) {
        console.log('First transformed match DETAILS:', JSON.stringify(matches[0], null, 2));
      }

      // For groups - create from all matches
      const groupedMatches = {};
      matches.forEach(match => {
        if (match.group) {
          if (!groupedMatches[match.group]) {
            groupedMatches[match.group] = [];
          }
          groupedMatches[match.group].push(match);
        }
      });

      // Create groups with teams
      const transformedGroups = Object.keys(groupedMatches).map(groupName => {
        const groupMatches = groupedMatches[groupName];
        const teams = new Set();
        
        groupMatches.forEach(match => {
          if (match.teamA) teams.add(match.teamA);
          if (match.teamB) teams.add(match.teamB);
        });
        
        return {
          name: groupName,
          teams: Array.from(teams),
          matches: groupMatches,
          matchCount: groupMatches.length
        };
      });

      console.log(`✅ Created ${transformedGroups.length} groups`);
      
      // Sort matches by date (oldest first)
      const sortedMatches = [...matches].sort((a, b) => a.date - b.date);
      
      // Sort groups by name
      const sortedGroups = [...transformedGroups].sort((a, b) => 
        a.name.localeCompare(b.name)
      );

      setState(prev => ({ ...prev, matches: sortedMatches }));
      setGroups(sortedGroups);
      
      console.log('🎯 REAL Data loaded successfully');
      console.log(`📊 Final counts: ${sortedMatches.length} matches, ${sortedGroups.length} groups`);

    } catch (error) {
      console.error('❌ Failed to load REAL data from backend:', error);
      console.error('Error stack:', error.stack);
      showNotification('Backend connection failed', 'error');
      
      setState(prev => ({ ...prev, matches: [] }));
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  // 2. FETCH USER BETS FROM BACKEND - UPDATED
// Make sure this useEffect exists and will run when address changes:
useEffect(() => {
  const fetchUserBets = async () => {
    if (!isConnected || !address) return
    
    try {
      console.log(`📥 Fetching REAL bets for user: ${address}`)
      
      // Use the API client which handles authentication
      const data = await apiClient.get(`/bets/user/${address}`)
      
      if (data.success) {
        console.log(`✅ Loaded ${data.data?.length || 0} REAL user bets`)
        setState(prev => ({
          ...prev,
          userBets: data.data || []
        }))
      }
    } catch (error) {
      console.error('Failed to fetch REAL user bets:', error)
      if (error.message.includes('Authentication')) {
        showNotification('Please log in to view your bets', 'error');
      }
    }
  }

  fetchUserBets()
}, [isConnected, address]) // This should re-run when address changes

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

  // 3. PLACE BET FUNCTION (Calls REAL backend) - UPDATED
const placeBet = async () => {
  if (!isConnected || !address) {
    showNotification('Please connect your wallet first', 'error')
    return
  }

  if (!betAmount || Number(betAmount) <= 0 || !state.selectedBet) {
    showNotification('Enter a valid bet amount', 'error')
    return
  }

  try {
    const selectedMatch = state.selectedBet.match
    const betData = {
      match_id: selectedMatch.id,
      outcome: state.selectedBet.outcome,
      amount: Number(betAmount)
    }

    console.log('📤 Placing REAL bet:', betData)
    
    // Use the API client which adds authentication headers
    const result = await apiClient.post('/bets', betData)

    if (result.success) {
      console.log('✅ Bet placed successfully:', result)
      
      const newBet = {
        id: result.data?.bet?.bet_id || Date.now(),
        matchId: betData.match_id,
        outcome: betData.outcome,
        amount: betData.amount,
        potentialWin: result.data?.bet?.potential_win || (betData.amount * getOdds(selectedMatch, betData.outcome)),
        resolved: false,
        transaction_hash: result.data?.chain?.txHash,
        created_at: new Date().toISOString()
      }

      setState(prev => ({
        ...prev,
        userBets: [...prev.userBets, newBet]
      }))

      setShowBettingModal(false)
      setBetAmount('')
      showNotification('Real bet placed on blockchain!', 'success')
      triggerCelebration()
    } else {
      showNotification(result.error || 'Failed to place bet', 'error')
    }

  } catch (error) {
    console.error('Error placing REAL bet:', error)
    showNotification(error.message || 'Failed to place bet. Please try again.', 'error')
  }
}
const handleWalletLogin = async () => {
  try {
    console.log('🚀 STARTING WALLET LOGIN PROCESS');
    console.log('🔗 Wallet connected:', isConnected);
    console.log('📝 Wallet address:', address);
    
    if (!isConnected || !address) {
      console.error('❌ Wallet not connected');
      showNotification('Please connect your wallet first', 'error');
      return;
    }
    
    // Sign a message for authentication
    const message = `Welcome to CLUTCH! Please sign this message to authenticate.\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;
    console.log('📝 Message to sign:', message);
    
    try {
      console.log('✍️ Attempting to sign message...');
      
      // Use signMessageAsync from wagmi
      const signature = await signMessageAsync({ 
        message: message 
      });
      
      console.log('✅ Signature obtained:', signature ? 'Yes' : 'No');
      console.log('🔤 Signature preview:', signature ? `${signature.substring(0, 50)}...` : 'None');
      
      console.log('📤 Sending login request to backend...');
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: address,
          signature: signature,
          message: message
        })
      });
      
      console.log('📥 Backend response status:', response.status);
      
      const responseText = await response.text();
      console.log('📥 Raw response text (first 200 chars):', responseText.substring(0, 200));
      
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('📥 Parsed response:', result);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        console.error('Raw response:', responseText);
        showNotification('Invalid response from server', 'error');
        return;
      }
      
      if (result.success && result.token) {
  // Store the token
  localStorage.setItem('token', result.token);
  localStorage.setItem('walletAddress', address);
  console.log('✅ Login successful!');
  console.log('🔑 Token stored (first 20 chars):', result.token.substring(0, 20) + '...');
  console.log('👤 User data:', result.user);
  showNotification('Successfully logged in!', 'success');
        
        // Force refresh user bets after login
        // fetchUserBets();
      } else {
        console.error('❌ Login failed:', result.error || 'Unknown error');
        showNotification(result.error || 'Login failed', 'error');
      }
    } catch (signError) {
      console.error('❌ Signature error:', signError);
      console.error('❌ Error details:', {
        name: signError.name,
        message: signError.message,
        code: signError.code
      });
      showNotification('Failed to sign message: ' + (signError.message || 'User rejected'), 'error');
    }
  } catch (error) {
    console.error('❌ Login process error:', error);
    showNotification('Login failed. Please try again.', 'error');
  }
};
  // 4. PLACE ULTIMATE BET
  const placeUltimateBet = async () => {
    if (!isConnected || !address) {
      showNotification('Please connect your wallet first', 'error')
      return
    }

    if (!ultimateBetAmount || Number(ultimateBetAmount) <= 0 || !state.selectedTeam) {
      showNotification('Enter a valid bet amount', 'error')
      return
    }

    try {
      const betData = {
        bet_type: 'championship',
        team_id: state.selectedTeam.id,
        user_address: address,
        amount: Number(ultimateBetAmount),
        odds: state.selectedTeam.odds
      }

      const response = await fetch(`${API_BASE}/bets/championship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(betData)
      })

      const result = await response.json()

      if (result.success) {
        const newUltimateBet = {
          id: result.bet?.id || Date.now(),
          team: state.selectedTeam,
          amount: betData.amount,
          potentialWin: betData.amount * betData.odds,
          resolved: false,
          transaction_hash: result.txHash,
          created_at: new Date().toISOString()
        }

        setState(prev => ({
          ...prev,
          ultimateBet: newUltimateBet,
          userBets: [...prev.userBets, { ...newUltimateBet, isUltimate: true }]
        }))

        setShowUltimateModal(false)
        setUltimateBetAmount('')
        showNotification('Real championship bet placed!', 'success')
        triggerCelebration()
      } else {
        showNotification(result.error || 'Failed to place bet', 'error')
      }

    } catch (error) {
      console.error('Error placing REAL ultimate bet:', error)
      showNotification('Failed to place bet. Please try again.', 'error')
    }
  }

  // Helper functions
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000)
  }

  const triggerCelebration = () => {
    setIsCelebrating(true)
    setTimeout(() => setIsCelebrating(false), 1800)
  }

  const getFlag = (country) => {
    const map = {
      Mexico:        { code: 'mx', emoji: '🇲🇽' },
      'South Africa':{ code: 'za', emoji: '🇿🇦' },
      'South Korea': { code: 'kr', emoji: '🇰🇷' },
      Canada:        { code: 'ca', emoji: '🇨🇦' },
      Qatar:         { code: 'qa', emoji: '🇶🇦' },
      Switzerland:   { code: 'ch', emoji: '🇨🇭' },
      Brazil:        { code: 'br', emoji: '🇧🇷' },
      Morocco:       { code: 'ma', emoji: '🇲🇦' },
      Haiti:         { code: 'ht', emoji: '🇭🇹' },
      Scotland:      { code: 'gb-sct', emoji: '🏴' },
      'United States':{ code: 'us', emoji: '🇺🇸' },
      Paraguay:      { code: 'py', emoji: '🇵🇾' },
      Australia:     { code: 'au', emoji: '🇦🇺' },
      Germany:       { code: 'de', emoji: '🇩🇪' },
      Curacao:       { code: 'cw', emoji: '🇨🇼' },
      'Ivory Coast': { code: 'ci', emoji: '🇨🇮' },
      Ecuador:       { code: 'ec', emoji: '🇪🇨' },
      Netherlands:   { code: 'nl', emoji: '🇳🇱' },
      Japan:         { code: 'jp', emoji: '🇯🇵' },
      Tunisia:       { code: 'tn', emoji: '🇹🇳' },
      Belgium:       { code: 'be', emoji: '🇧🇪' },
      Egypt:         { code: 'eg', emoji: '🇪🇬' },
      Iran:          { code: 'ir', emoji: '🇮🇷' },
      'New Zealand': { code: 'nz', emoji: '🇳🇿' },
      Spain:         { code: 'es', emoji: '🇪🇸' },
      'Cape Verde':  { code: 'cv', emoji: '🇨🇻' },
      'Saudi Arabia':{ code: 'sa', emoji: '🇸🇦' },
      Uruguay:       { code: 'uy', emoji: '🇺🇾' },
      France:        { code: 'fr', emoji: '🇫🇷' },
      Senegal:       { code: 'sn', emoji: '🇸🇳' },
      Norway:        { code: 'no', emoji: '🇳🇴' },
      Argentina:     { code: 'ar', emoji: '🇦🇷' },
      Algeria:       { code: 'dz', emoji: '🇩🇿' },
      Austria:       { code: 'at', emoji: '🇦🇹' },
      Jordan:        { code: 'jo', emoji: '🇯🇴' },
      Portugal:      { code: 'pt', emoji: '🇵🇹' },
      Uzbekistan:    { code: 'uz', emoji: '🇺🇿' },
      Colombia:      { code: 'co', emoji: '🇨🇴' },
      England:       { code: 'gb-eng', emoji: '🏴' },
      Croatia:       { code: 'hr', emoji: '🇭🇷' },
      Ghana:         { code: 'gh', emoji: '🇬🇭' },
      Panama:        { code: 'pa', emoji: '🇵🇦' }
    }

    if (map[country]) return map[country]
    if (country.includes('Playoff')) return { code: null, emoji: '🏁' }
    return { code: null, emoji: '🏳️' }
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
    if (outcome === 0) return match.odds?.teamA || 2.0
    if (outcome === 1) return match.odds?.draw || 3.5
    if (outcome === 2) return match.odds?.teamB || 3.0
    return 1
  }

  const formatAmount = (n) => n.toLocaleString()

  const selectBet = (matchId, outcome) => {
    if (!isConnected) {
      showNotification('Connect your wallet to place bets', 'error')
      return
    }
    const match = state.matches.find(m => m.id === matchId)
    if (!match) return
    setState(prev => ({ ...prev, selectedBet: { matchId, outcome, match } }))
    setBetAmount('')
    setShowBettingModal(true)
  }

  const selectTeam = (teamId) => {
    if (!isConnected) {
      showNotification('Connect your wallet to pick champion', 'error')
      return
    }
    const team = teamsData.find(t => t.id === teamId)
    if (!team) return
    setState(prev => ({ ...prev, selectedTeam: team }))
  }

  const renderFlag = (country, size = 20) => {
    const { code, emoji } = getFlag(country)
    if (code) {
      return (
        <img
          src={`https://flagcdn.com/w20/${code}.png`}
          alt={country}
          width={size}
          height={size * 0.75}
          style={{ borderRadius: 3 }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentNode.textContent = emoji
          }}
        />
      )
    }
    return <span>{emoji}</span>
  }

  const openUltimateBetModal = () => {
    if (!state.selectedTeam) {
      showNotification('Choose a champion team first', 'error')
      return
    }
    setUltimateBetAmount('')
    setShowUltimateModal(true)
  }

  const totalBets = state.userBets.length + (state.ultimateBet ? 1 : 0)
  const activeBets = state.userBets.filter(b => !b.resolved).length + 
    (state.ultimateBet && !state.ultimateBet.resolved ? 1 : 0)
  const totalStaked = state.userBets.reduce((s, b) => s + b.amount, 0) + 
    (state.ultimateBet ? state.ultimateBet.amount : 0)
  const potentialWins = state.userBets.reduce((s, b) => s + b.potentialWin, 0) + 
    (state.ultimateBet ? state.ultimateBet.potentialWin : 0)

  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = styles
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: 'var(--text-main)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🦅</div>
            <div>Loading REAL World Cup 2026 data from backend...</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-soft)', marginTop: '0.5rem' }}>
              Fetching from: {API_BASE}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Empty state if no REAL data
  if (state.matches.length === 0) {
    return (
      <div className="app">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: 'var(--text-main)',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦅</div>
            <h2>No REAL match data available</h2>
            <p style={{ color: 'var(--text-soft)', marginTop: '0.5rem' }}>
              Backend connection issue. Make sure your server is running at:
            </p>
            <code style={{ 
              background: 'var(--card-surface)', 
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              display: 'inline-block',
              marginTop: '1rem'
            }}>
              {API_BASE}
            </code>
          </div>
        </div>
      </div>
    )
  }

  // MAIN RENDER - REAL DATA ONLY
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
  onClick={async () => {
    if (typeof window !== 'undefined' && window.web3modal) {
      window.web3modal.open();
    } else {
      console.log('Web3Modal not available');
    }
    
    // After wallet connects, wait a moment then auto-login
    if (isConnected && address) {
      setTimeout(() => {
        handleWalletLogin();
      }, 1000);
    }
  }}
>
  {isConnected ? 'Switch / Wallet' : 'Connect Wallet'}
</button>

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
                  src={clutchgif}
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
            {state.matches.filter(m => m.teamA === 'USA' || m.teamB === 'USA').slice(0, 2).map(match => (
              <button
                key={match.id}
                className="usa-bet-pill"
                onClick={() => selectBet(match.id, match.teamA === 'USA' ? 0 : 2)}
              >
                <span className="icon">🇺🇸</span>
                <span>USA to win vs {match.teamA === 'USA' ? match.teamB : match.teamA}</span>
              </button>
            ))}
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
          REAL 2026 World Cup matches from backend • {state.matches.length} matches
        </div>

        <div className="matches-grid">
          {state.matches.map(match => (
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
                    {renderFlag(match.teamA)}
                  </div>
                  <div className="country-pill">
                    <span>{renderFlag(match.teamA)}</span>
                    <span>{match.teamA}</span>
                  </div>
                </div>
                <div className="vs-text">VS</div>
                <div className="team">
                  <div className="team-logo">
                    {renderFlag(match.teamB)}
                  </div>
                  <div className="country-pill">
                    <span>{renderFlag(match.teamB)}</span>
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
                    <span>{renderFlag(match.teamA)}</span>
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
                    <span>{renderFlag(match.teamB)}</span>
                    <span>{match.teamB}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROUP STANDINGS */}
      <section id="groups">
        <h2 className="section-title">World Cup 26™ Group Line-ups</h2>
        <div className="section-kicker">
          REAL group data from backend • {groups.length} groups
        </div>

        <div className="groups-grid">
          {groups.map(group => (
            <div key={group.name} className="group-card">
              <div className="group-header">
                <div className="group-name">{group.name}</div>
                <div className="group-subtitle">
                  {group.teams.length} teams
                </div>
              </div>
              {group.teams.map(team => (
                <div key={team} className="group-team-row">
                  <div className="country-pill">
                    <span>{renderFlag(team)}</span>
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

export default ClutchApp