"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Mode = "chat" | "recommend";

export default function ChatPage() {
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message whenever the history changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  function switchMode(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setMessages([]);
    setError("");
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const history = [...messages, { role: "user", content: trimmed } as Message];

    setMessages(history);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "chat" ? "/ai/chat" : "/ai/recommend";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            conversation_history: messages,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data: { reply: string } = await response.json();
      setMessages([...history, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 p-8">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <h1 className="mb-6 text-3xl font-bold">Chat</h1>

        {/* Mode toggle */}
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => switchMode("chat")}
            className={`rounded px-4 py-2 ${
              mode === "chat"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            General Chat
          </button>

          <button
            type="button"
            onClick={() => switchMode("recommend")}
            className={`rounded px-4 py-2 ${
              mode === "recommend"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Book Recommendations
          </button>
        </div>

        {/* Message history */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto rounded-lg bg-white p-4 shadow"
        >
          {messages.length === 0 && !loading ? (
            <p className="text-gray-500">
              {mode === "chat"
                ? "Ask me anything to get started."
                : "Tell me what you like, and I'll recommend a book."}
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-gray-200 px-4 py-2 text-gray-500">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
