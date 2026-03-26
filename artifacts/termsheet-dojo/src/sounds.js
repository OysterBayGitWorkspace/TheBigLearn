export const playCorrectSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    [[1174.7, 0, "triangle", 0.35], [1174.7*2, 0, "sine", 0.1], [1760, 0.08, "triangle", 0.35], [1760*2, 0.08, "sine", 0.1]].forEach(([freq, delay, type, vol]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(vol, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.18);
    });
    setTimeout(() => ctx.close(), 400);
  } catch (e) {}
};

export const playWrongSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    [[311, 0, 0.28], [233, 0.12, 0.28]].forEach(([freq, delay, vol]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(vol, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.22);
    });
    setTimeout(() => ctx.close(), 500);
  } catch (e) {}
};

export const playLevelUpSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const hits = [
      [261.6, 0, "square", 0.3, 0.12],
      [329.6, 0.12, "square", 0.3, 0.12],
      [523.3, 0.4, "triangle", 0.35, 0.18],
      [659.3, 0.5, "triangle", 0.35, 0.18],
      [784.0, 0.6, "triangle", 0.3, 0.25],
      [1047, 0.6, "sine", 0.12, 0.4],
    ];
    hits.forEach(([freq, delay, type, vol, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(vol, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.05);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch (e) {}
};

export const playPerfectRoundSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const tones = [
      [440, 0, "sawtooth", 0.2, 0.08],
      [554.4, 0.08, "sawtooth", 0.22, 0.08],
      [659.3, 0.16, "sawtooth", 0.24, 0.08],
      [880, 0.24, "sawtooth", 0.28, 0.12],
      [1760, 0.24, "sine", 0.08, 0.2],
      [130.8, 0.55, "sawtooth", 0.35, 0.35],
      [65.4, 0.55, "sine", 0.25, 0.5],
      [261.6, 0.6, "triangle", 0.15, 0.4],
      [523.3, 0.65, "sine", 0.08, 0.35],
    ];
    tones.forEach(([freq, delay, type, vol, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + delay);
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(vol, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.05);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch (e) {}
};
