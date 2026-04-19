import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, X, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { detectIntent } from "@/lib/sokoni-assistant/intents";
import {
  getSpeechRecognition,
  isSpeechRecognitionSupported,
  speak,
  stopSpeaking,
} from "@/lib/sokoni-assistant/speech";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; text: string; id: string };

const WELCOME =
  "Hi! I'm Sokoni Assistant. Tap the mic and tell me what you need — search, navigate, or ask how something works.";

export function SokoniAssistant() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [partial, setPartial] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: WELCOME, id: "welcome" },
  ]);
  const recRef = useRef<ReturnType<typeof getSpeechRecognition>>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supported = isSpeechRecognitionSupported();

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, partial]);

  const reply = useCallback(
    (userText: string) => {
      const result = detectIntent(userText);
      const id = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { role: "user", text: userText, id: crypto.randomUUID() },
        { role: "assistant", text: result.reply, id },
      ]);
      if (!muted) speak(result.reply);

      if (result.action) {
        // Small delay so the user hears the reply start.
        setTimeout(() => {
          if (result.action?.type === "navigate") {
            navigate(result.action.path);
          } else if (result.action?.type === "search") {
            navigate(`/search?q=${encodeURIComponent(result.action.query)}`);
          } else if (result.action?.type === "external") {
            window.open(result.action.url, "_blank", "noopener,noreferrer");
          }
        }, 600);
      }
    },
    [muted, navigate]
  );

  const startListening = useCallback(async () => {
    if (!supported) {
      toast({
        variant: "destructive",
        title: "Voice not supported",
        description:
          "Your browser doesn't support voice input. Try Chrome, Edge, or Safari.",
      });
      return;
    }
    try {
      // Prompt mic permission.
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      toast({
        variant: "destructive",
        title: "Microphone blocked",
        description: "Please allow microphone access to talk to Sokoni Assistant.",
      });
      return;
    }

    stopSpeaking();
    const rec = getSpeechRecognition();
    if (!rec) return;
    recRef.current = rec;
    rec.interimResults = true;

    rec.onstart = () => setListening(true);
    rec.onerror = (e: any) => {
      setListening(false);
      if (e?.error && e.error !== "no-speech" && e.error !== "aborted") {
        toast({
          variant: "destructive",
          title: "Voice error",
          description: e.error,
        });
      }
    };
    rec.onend = () => {
      setListening(false);
      setPartial("");
    };
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += transcript;
        else interim += transcript;
      }
      if (interim) setPartial(interim);
      if (final) {
        setPartial("");
        reply(final.trim());
      }
    };

    try {
      rec.start();
    } catch {
      // Already started; ignore.
    }
  }, [reply, supported]);

  const stopListening = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  const handleMicClick = () => {
    if (listening) stopListening();
    else startListening();
  };

  const toggleMute = () => {
    if (!muted) stopSpeaking();
    setMuted((m) => !m);
  };

  // Stop everything on close
  useEffect(() => {
    if (!open) {
      stopListening();
      stopSpeaking();
    }
  }, [open, stopListening]);

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Sokoni Assistant"
          className={cn(
            "fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full",
            "bg-primary text-primary-foreground shadow-2xl",
            "flex items-center justify-center",
            "hover:scale-105 transition-transform",
            "ring-4 ring-primary/20"
          )}
        >
          <Sparkles className="h-6 w-6" />
          <span className="sr-only">Sokoni Assistant</span>
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "fixed bottom-6 right-6 z-[60] w-[min(380px,calc(100vw-2rem))]",
            "h-[min(560px,calc(100vh-3rem))]",
            "bg-background border border-border rounded-2xl shadow-2xl",
            "flex flex-col overflow-hidden"
          )}
          role="dialog"
          aria-label="Sokoni Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">
                  Sokoni Assistant
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {listening
                    ? "Listening…"
                    : muted
                    ? "Voice muted"
                    : "Tap mic to talk"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleMute}
                aria-label={muted ? "Unmute voice" : "Mute voice"}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {partial && (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 text-sm bg-primary/40 text-primary-foreground italic">
                  {partial}…
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="px-3 py-2 border-t flex gap-2 overflow-x-auto">
            {[
              "Open shops",
              "Find iPhones",
              "How do I post an ad?",
              "Take me to my dashboard",
            ].map((q) => (
              <button
                key={q}
                onClick={() => reply(q)}
                className="shrink-0 text-xs rounded-full border border-border px-3 py-1.5 hover:bg-muted transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Mic */}
          <div className="p-4 border-t flex items-center justify-center gap-3">
            <button
              onClick={handleMicClick}
              aria-label={listening ? "Stop listening" : "Start listening"}
              className={cn(
                "h-14 w-14 rounded-full flex items-center justify-center transition-all",
                listening
                  ? "bg-destructive text-destructive-foreground animate-pulse ring-4 ring-destructive/30"
                  : "bg-primary text-primary-foreground hover:scale-105 ring-4 ring-primary/20"
              )}
            >
              {listening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>
          </div>
          {!supported && (
            <p className="px-4 pb-3 text-[11px] text-center text-muted-foreground">
              Voice input isn't supported in this browser. Use Chrome, Edge, or Safari.
            </p>
          )}
        </div>
      )}
    </>
  );
}
