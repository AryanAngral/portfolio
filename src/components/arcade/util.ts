export function loadBest(key: string): number {
  try {
    return Number(localStorage.getItem(`arcade-${key}`)) || 0;
  } catch {
    return 0;
  }
}

export function saveBest(key: string, value: number) {
  try {
    localStorage.setItem(`arcade-${key}`, String(value));
  } catch {
    /* storage unavailable — scores just don't persist */
  }
}

export function beep(freq: number, durationMs = 160, type: OscillatorType = "square") {
  try {
    const Ctx = window.AudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.04;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
    osc.onended = () => ctx.close();
  } catch {
    /* audio unavailable */
  }
}
