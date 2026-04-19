import { cn } from "@/lib/utils";
import type { StoredMsg } from "@/lib/sokoni-assistant/persistence";

export function AssistantMessage({ m }: { m: StoredMsg }) {
  return (
    <div className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
          m.role === "user"
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        {m.text}
      </div>
    </div>
  );
}
