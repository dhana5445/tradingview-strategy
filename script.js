const tabs = document.querySelectorAll('.engine-tab');
const panel = document.getElementById('enginePanel');
const panels = {
  direction: {
    index: '01 / 04', kicker: 'MODULE 01', title: 'Direction is a hard rule.',
    intro: 'The engine first evaluates the confirmed swing structure. With filters enabled, the higher timeframe and EMA environment must agree before a trend setup can qualify.',
    rules: [
      ['↑', 'BULLISH', 'Confirmed HH + HL, price above EMA 50, EMA 50 above EMA 200, and bullish higher-timeframe conditions when enabled.'],
      ['↓', 'BEARISH', 'Confirmed LH + LL, price below EMA 50, EMA 50 below EMA 200, and bearish higher-timeframe conditions when enabled.']
    ], foot: 'NO DIRECTION = NO TREND ENTRY'
  },
  liquidity: {
    index: '02 / 04', kicker: 'MODULE 02', title: 'Look for evidence of intent.',
    intro: 'Liquidity sweeps and displacement are supporting evidence. They contribute to confluence but cannot independently override the market-direction gate.',
    rules: [
      ['◎', 'LIQUIDITY SWEEP', 'Checks swing highs/lows, equal highs/lows, and recent range extremes for sweep-and-rejection behavior.'],
      ['↗', 'DISPLACEMENT', 'Looks for a strong candle body relative to ATR, with additional checks for breaks beyond recent candles.']
    ], foot: 'CONFLUENCE SUPPORTS DIRECTION'
  },
  locations: {
    index: '03 / 04', kicker: 'MODULE 03', title: 'Location matters.',
    intro: 'The engine checks whether price is interacting with a configured technical area. Enabled location filters must be satisfied unless all location filters are disabled.',
    rules: [
      ['▧', 'FVG / ORDER BLOCK', 'Tracks recent fair value gaps and order blocks, with age and invalidation rules.'],
      ['⌖', 'OTE / PREMIUM-DISCOUNT', 'Uses the latest confirmed structural range to estimate retracement, equilibrium, premium, and discount areas.']
    ], foot: 'LOCATION + CONFIRMATION'
  },
  execution: {
    index: '04 / 04', kicker: 'MODULE 04', title: 'Execution has guardrails.',
    intro: 'The strategy evaluates final entries on confirmed bars and checks whether a position is already open, daily limits are respected, and the cooldown has passed.',
    rules: [
      ['◷', 'DAILY CONTROLS', 'Default limit is five trades per day, with a three-bar cooldown and an optional 2% daily-loss guard.'],
      ['↔', 'TRADE MANAGEMENT', 'Configurable stop loss, 1.5R and 3R targets, break-even logic, and an ATR-based runner.']
    ], foot: 'PLAN RISK BEFORE EXECUTION'
  }
};
function renderPanel(key) {
  const d = panels[key];
  panel.innerHTML = `<div class="panel-kicker"><span class="live-dot"></span> ${d.kicker} <span>· CORE LOGIC</span></div>
    <h3>${d.title}</h3><p>${d.intro}</p>
    ${d.rules.map((r, i) => `<div class="rule-box"><span class="rule-symbol ${i ? 'down' : ''}">${r[0]}</span><div><b>${r[1]}</b><p>${r[2]}</p></div></div>`).join('')}
    <div class="panel-foot"><span>${d.foot}</span><span>${d.index}</span></div>`;
}
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  renderPanel(tab.dataset.panel);
}));
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
