/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = {
  compiler: {
    removeConsole: true
  }
}

module.exports = (phase, {defaultConfig}) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {}
  }

  return nextConfig
}
