#!/usr/bin/env node
/**
 * Refuse production builds while `npm run dev` is listening.
 * Running `next build` against a live Turbopack dev server corrupts `.next` (missing postcss.js, manifests).
 */
import { execSync } from 'node:child_process'

const port = process.env.BUG_IPSUM_DEV_PORT || '3001'

function listenersOnPort() {
  try {
    const out = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN -t`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (!out) return []
    return out.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

const pids = listenersOnPort()
if (pids.length > 0) {
  console.error(
    `\n[build] Refusing to run: port ${port} is in use (dev server PIDs: ${pids.join(', ')}).\n` +
      `Stop \`npm run dev\` first, or run build in another clone/CI where dev is not running.\n` +
      `See docs/decisions.md — ".next and dev server".\n`
  )
  process.exit(1)
}