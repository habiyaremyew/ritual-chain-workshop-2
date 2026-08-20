const { PulseScanner } = require('./pulse-scanner');

async function main() {
  console.log('🚀 Price Pulse Scanner Demo\n');

  const scanner = new PulseScanner();

  scanner.on('contractCreated', (c) => {
    console.log(`📋 Contract created: ${c.id}\n`);
  });

  scanner.on('betPlaced', ({ contractId, side, amount }) => {
    console.log(`💰 ${amount} on ${side} for ${contractId}\n`);
  });

  scanner.on('contractSettled', ({ contractId, outcome, price, pulseScore, pulseType, threshold }) => {
    console.log(`🎯 ${contractId} settled as ${outcome}!`);
    console.log(`   Price: ${price}`);
    console.log(`   Pulse Score: ${pulseScore ? pulseScore.toFixed(4) : 'N/A'}`);
    console.log(`   Type: ${pulseType}, Threshold: ${threshold}\n`);
  });

  scanner.on('payoutDistributed', ({ contractId, user, amount }) => {
    console.log(`💸 ${amount} to ${user} for ${contractId}`);
  });

  // Contract 1: Sharp Pulse ETH
  console.log('=== Contract 1: ETH - Sharp Pulse > 0.03 ===');
  const c1 = scanner.createContract({
    asset: 'ETH',
    pulseType: 'SHARP',
    threshold: 0.03,
    sourceUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    jsonPath: 'ethereum.usd',
    duration: 5,
    maxAttempts: 3
  });

  scanner.placeBet(c1.id, 'YES', BigInt(200));
  scanner.placeBet(c1.id, 'NO', BigInt(150));

  // Contract 2: Broad Pulse BTC
  console.log('\n=== Contract 2: BTC - Broad Pulse > 0.05 ===');
  const c2 = scanner.createContract({
    asset: 'BTC',
    pulseType: 'BROAD',
    threshold: 0.05,
    sourceUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    jsonPath: 'bitcoin.usd',
    duration: 3,
    maxAttempts: 2
  });

  scanner.placeBet(c2.id, 'YES', BigInt(100));
  scanner.placeBet(c2.id, 'NO', BigInt(200));

  // Contract 3: Double Pulse SOL
  console.log('\n=== Contract 3: SOL - Double Pulse > 0.4 ===');
  const c3 = scanner.createContract({
    asset: 'SOL',
    pulseType: 'DOUBLE',
    threshold: 0.4,
    sourceUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
    jsonPath: 'solana.usd',
    duration: 4,
    maxAttempts: 3
  });

  scanner.placeBet(c3.id, 'YES', BigInt(80));
  scanner.placeBet(c3.id, 'NO', BigInt(40));

  console.log('\n=== Settling contracts ===');
  await scanner.advanceTime(6);

  console.log('\n=== All Contracts ===');
  scanner.getContracts().forEach(c => {
    console.log(`${c.id}: ${c.status}`);
    console.log(`  YES: ${c.totalYes}, NO: ${c.totalNo}`);
    console.log(`  Outcome: ${c.outcome || 'Pending'}`);
    console.log(`  Pulse Score: ${c.pulseScore ? c.pulseScore.toFixed(4) : 'N/A'}`);
    console.log('---');
  });

  scanner.destroy();
  console.log('\n✅ Pulse Demo complete!');
}

main().catch(console.error);
