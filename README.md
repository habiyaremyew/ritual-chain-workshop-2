# Price Pulse Scanner

A self-resolving prediction market that detects **price pulse patterns**.

## Distinctive Features

- **Pulse Detection**: Identifies sharp, broad, and double pulse patterns
- **Three Pulse Types**: Sharp, Broad, and Double
- **Movement Pattern Analysis**: Tracks price intensity and duration
- **Threshold-Based Detection**: Configurable pulse thresholds

## How Pulse Detection Works

1. Each contract tracks price movements over time
2. Pulse scores are calculated from price intensity and duration
3. Sharp: score > threshold, Broad: score > threshold, Double: score > threshold
4. Contracts settle based on the detected pulse pattern

## Contracts

- ETH - Sharp Pulse > 0.03
- BTC - Broad Pulse > 0.05
- SOL - Double Pulse > 0.4

## Installation

npm install
npm start

## License

MIT
