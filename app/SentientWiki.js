import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";

import WhatIsSentient from "./WhatIsSentient";
import Grids from "./Grid";
import logo from "./images/sentient-logo.jpg";
import sentientMess from "./images/sentient-mess.png";
import Community from "./Community";
import Github from "./Github";
import Partners from "./Partners";
import Contribute from "./Contribute";
import Airdrop from "./Airdrop";
import Blog from "./Blog";

// The Fireworks client initialization is removed from here.

export default function SentientWiki() {
  const [dark, setDark] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeHeading, setActiveHeading] = useState("home");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedId, setSelectedId] = useState("home");
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = window.localStorage.getItem("chat_widget_msgs_v1");
      if (cached) return JSON.parse(cached);
    }
    return [
      {
        id: crypto.randomUUID(),
        role: "bot",
        text: "Hello 👋 I'm your virtual assistant. How can I help you?",
      },
    ];
  });

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  // Save chat history
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("chat_widget_msgs_v1", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    const next = Math.min(144, el.scrollHeight);
    el.style.height = next + "px";
  }, [input, open]);

  // Send message using the Python backend
  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsSending(true);

    const botId = crypto.randomUUID();
    setMessages((m) => [...m, { id: botId, role: "bot", text: "" }]);

    try {
      // Fetch from your Python backend
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the stream from the backend
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const delta = decoder.decode(value);
        if (delta) {
          fullText += delta;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botId ? { ...msg, text: fullText } : msg
            )
          );
        }
      }
    } catch (err) {
      console.error("Backend fetch error:", err);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === botId
            ? { ...msg, text: "⚠️ Error: could not connect to the backend server." }
            : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const brand = useMemo(
    () => ({
      ring: "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      subtle: "text-neutral-500",
      surface: "bg-white dark:bg-neutral-900",
      border: "border border-neutral-200 dark:border-neutral-800",
      text: "text-neutral-900 dark:text-neutral-100",
      bubbleUser: "bg-indigo-600 text-white",
      bubbleBot: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
    }),
    []
  );

    const nav = [
    {
      title: "Overview",
      items: [
        { id: "intro", label: "Home", component: "home" },
        { id: "timeline", label: "What is Sentient?", component: "whatis" },
        { id: "timeline", label: "GRID", component: "grid" },
        { id: "timeline", label: "Discord Community", component: "community" },
        { id: "timeline", label: "Github", component: "github" },
        { id: "timeline", label: "Partners", component: "partners" },
        { id: "timeline", label: "How to Contribute", component: "contribute" },
        { id: "timeline", label: "Airdrop & Token info", component: "airdrop" },
        { id: "timeline", label: "Blog/Research", component: "blog" },
      ],
    },
  ];

  const filteredNav = useMemo(() => {
    if (!query.trim()) return nav;
    const q = query.toLowerCase();
    return nav
      .map((sec) => ({
        ...sec,
        items: sec.items.filter((it) => it.label.toLowerCase().includes(q)),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [query, nav]);


  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* HEADER, SIDEBAR, CONTENT, FOOTER ... (your original layout) */}

        {/* Chat Button */}
        <button
          type="button"
          aria-label="Open chat"
          onClick={() => setOpen((v) => !v)}
          className={`fixed bottom-10 right-10 z-40 inline-flex items-center justify-center h-16 w-16 rounded-full shadow-xl ${brand.primary} ${brand.ring}`}
        >
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <img
              src={sentientMess.src}
              className="h-full w-full rounded-full hover:scale-105 duration-300"
              alt="Chat icon"
            />
          )}
        </button>

        {/* Chat Popup */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className={`fixed bottom-24 right-6 z-40 w-[92vw] max-w-md rounded-2xl shadow-2xl ${brand.surface} ${brand.border}`}
              role="dialog"
              aria-modal="true"
              aria-label="Chat dialog"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <img src={logo.src} className="h-9 w-9" alt="Logo" />
                  <div className="leading-tight">
                    <p className={`text-sm font-semibold ${brand.text}`}>
                      Virtual Assistant
                    </p>
                    <p className="text-xs text-neutral-500">Online</p>
                  </div>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className={`p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${brand.ring}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="px-3 sm:px-4 py-3 h-[50vh] overflow-y-auto space-y-3"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                        m.role === "user"
                          ? brand.bubbleUser
                          : brand.bubbleBot
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Enter message..."
                    className={`flex-1 resize-none rounded-xl px-3 py-2 overflow-hidden text-sm ${brand.surface} ${brand.text} ${brand.border} ${brand.ring}`}
                    rows={1}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() || isSending}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium ${brand.primary} text-white disabled:opacity-50 ${brand.ring}`}
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-neutral-500">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}