// Tiny wrappers around the browser's free Web Speech API.

export type SpeechRecognitionLike = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  lang: string;
  interimResults: boolean;
  continuous: boolean;
};

export function getSpeechRecognition(): SpeechRecognitionLike | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec: SpeechRecognitionLike = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.continuous = false;
  return rec;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
  );
}

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Prefer an English female-sounding voice if available.
  const preferred =
    voices.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|google|jenny|zira/i.test(v.name)) ||
    voices.find((v) => /en[-_]US/i.test(v.lang)) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    voices[0];
  cachedVoice = preferred ?? null;
  return cachedVoice;
}

export function speak(text: string, opts?: { onEnd?: () => void }) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    opts?.onEnd?.();
    return;
  }
  // Cancel anything currently speaking so replies don't overlap.
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) utter.voice = voice;
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;
  utter.onend = () => opts?.onEnd?.();
  utter.onerror = () => opts?.onEnd?.();
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Some browsers load voices async — warm the cache.
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}
