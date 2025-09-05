import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import WhatIsSentient from "./WhatIsSentient"
import Grids from "./Grid"
import logo from "./images/sentient-logo.jpg"
import sentientMess from "./images/sentient-mess.png"
import Community from "./Community"
import Github from "./Github"
import Partners from "./Partners"
import Contribute from "./Contribute"
import Airdrop from "./Airdrop"
import Blog from "./Blog"

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
        text: "Xin chào 👋 Mình là trợ lý ảo. Mình có thể giúp gì cho bạn?",
      },
    ];
  });
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("chat_widget_msgs_v1", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    const next = Math.min(144, el.scrollHeight);
    el.style.height = next + "px";
  }, [input, open]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsSending(true);

    const replyText = generateBotReply(trimmed);
    setTimeout(() => {
      const botMsg = { id: crypto.randomUUID(), role: "bot", text: replyText };
      setMessages((m) => [...m, botMsg]);
      setIsSending(false);
    }, 450);
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
        { id: "timeline", label: "What is Sentient?", component: "whatis"  },
        { id: "timeline", label: "GRID", component: "grid"  },
        { id: "timeline", label: "Discord Community", component: "community"  },
        { id: "timeline", label: "Github", component: "github"  },
        { id: "timeline", label: "Partners", component: "partners"  },
        { id: "timeline", label: "How to Contribute", component: "contribute"  },
        { id: "timeline", label: "Airdrop & Token info", component: "airdrop"  },
        { id: "timeline", label: "Blog/Research", component: "blog"  },
      ],
    },
  ];

  const trending = new Array(6).fill(0).map((_, i) => ({
    id: `trend-${i + 1}`,
    title: `Bài nổi bật #${i + 1}`,
    img: `https://picsum.photos/seed/ow-${i}/480/270`,
  }));

  const latest = new Array(8).fill(0).map((_, i) => ({
    id: `latest-${i + 1}`,
    title: `Cập nhật gần đây #${i + 1}`,
    date: `2025-0${(i % 9) + 1}-0${(i % 9) + 1}`,
  }));

  // Filtered nav search
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
        {/* Top Nav */}
        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 md:hidden"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Mở menu"
            >
              <BurgerIcon /> Menu
            </button>

            <a href="#" className="flex items-center gap-2">
              <img src={logo.src} className="h-12 w-12"/>
              <span className=" text-lg font-bold ">Sentient Wiki</span>
            </a>

            <div className="mx-2 hidden flex-1 md:block">
              <label className="relative block">
                <input
                  type="search"
                  placeholder="Tìm kiếm heroes, bản đồ, cập nhật…"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 pl-9 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
                  <SearchIcon />
                </span>
              </label>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setDark((d) => !d)}
                className="rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                aria-label="Đổi chế độ sáng/tối"
              >
                {dark ? (
                  <span className="inline-flex items-center gap-2"><SunIcon /> Light</span>
                ) : (
                  <span className="inline-flex items-center gap-2"><MoonIcon /> Dark</span>
                )}
              </button>
              <button className="hidden rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 sm:inline-flex">
                Đăng nhập
              </button>
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_320px]">
          {/* Sidebar */}
          <aside className={" inset-y-0 left-0 z-30 w-72 -translate-x-full overflow-y-auto border-r border-zinc-200 bg-white p-4 transition-transform dark:border-zinc-800 dark:bg-zinc-900 md:static md:translate-x-0 md:w-auto md:border-0 md:bg-transparent md:p-0 md:dark:bg-transparent" + (mobileNavOpen ? " translate-x-0" : "")
            }
            aria-label="Điều hướng"
          >
            <div className="md:hidden mb-4 flex items-center justify-between sticky sm:top-20 sm:space-y-6 ">
              <span className="text-sm font-semibold opacity-70">Category</span>
              <button
                className="rounded-xl border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                onClick={() => setMobileNavOpen(false)}
              >Close</button>
            </div>

            <div className="mb-3 md:hidden">
              <label className="relative block">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Tìm mục…"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 pl-9 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60">
                  <SearchIcon />
                </span>
              </label>
            </div>

            <nav className="space-b-5 pr-2 text-sm ">
              {filteredNav.map((section) => (
                <div key={section.title}>
                  <div className="mb-4 px-2 text-[24px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {section.title}
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((it) => (
                      <li key={it.id}>
                        <botton

                          onClick={() => { setMobileNavOpen(false)
                            setSelectedId(it.component)
                            setActiveHeading(it.component)}
                          }
                          className={
                            "block rounded-xl px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 " +
                            (activeHeading === it.component
                              ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
                              : "")
                          }
                        >
                          {it.label}
                        </botton>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div>
          {selectedId === 'home' &&  
          <main className="space-y-6">
            {/* Breadcrumbs */}
  
            {/* Featured */}
            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">Sentient – Overview</h1>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  A comprehensive knowledge base for everything related to the Sentient ecosystem - the decentralized intelligence network building the future of AI.
                  </p>
                  {/* <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">FPS</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">PvP</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">eSports</span>
                  </div> */}
                </div>
                <div className="relative min-h-60">
                  <img
                    src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1400&auto=format&fit=crop"
                    alt="Overwatch style banner"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </section>
          </main>}

          {selectedId === 'whatis' &&  <WhatIsSentient />}
          {selectedId === 'grid' &&  <Grids />}
          {selectedId === 'community' &&  <Community />}
          {selectedId === 'github' &&  <Github />}
          {selectedId === 'partners' &&  <Partners />}
          {selectedId === 'contribute' &&  <Contribute />}
          {selectedId === 'airdrop' &&  <Airdrop />}
          {selectedId === 'blog' &&  <Blog />}
         
          </div>
          {/* Right Column: Infobox */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-200 p-4 text-sm font-semibold dark:border-zinc-800">Infobox</div>
                <div className="p-4 text-sm">
                  <dl className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-500">Thể loại</dt>
                      <dd className="font-medium">FPS, PvP</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-500">Phát hành</dt>
                      <dd className="font-medium">2016 / 2023</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-500">Nền tảng</dt>
                      <dd className="font-medium">PC, Console</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-500">Người chơi</dt>
                      <dd className="font-medium">5v5</dd>
                    </div>
                  </dl>
                </div>
              </div> */}

              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-200 p-4 text-sm font-semibold dark:border-zinc-800">Event</div>
                <ul className="p-2">
                  {[
                    "Decentralized Consensus",
                    "The Grid",
                    "Building the Future",
                  ].map((e) => (
                    <li key={e} className="flex items-center gap-2 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-sm">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-white/60 py-8 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Sentient Wiki</div>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">Introduce</a></li>
                  <li><a href="#" className="hover:underline">Rules</a></li>
                  <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Community</div>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">Discuss</a></li>
                  <li><a href="#" className="hover:underline">Contribute</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Document</div>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">API</a></li>
                  <li><a href="#" className="hover:underline">Editorial Guide</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Copyright</div>
                <p className="text-zinc-600 dark:text-zinc-400">Demo content for learning purposes. Trademarks belong to their respective owners.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>


      <button
        type="button"
        aria-label="Mở trò chuyện"
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-10 right-10 z-40 inline-flex items-center justify-center h-16 w-16 rounded-full shadow-xl ${brand.primary} ${brand.ring}`}
      >
        {open ? <X className="h-6 w-6 text-white" /> : <img src={sentientMess.src} className="h-full w-full rounded-full hover:scale-105 duration-300"/> }
      </button>

      {/* Popup */}
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
            aria-label="Hộp thoại trò chuyện"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
              <img src={logo.src} className="h-9 w-9"/>
                <div className="leading-tight">
                  <p className={`text-sm font-semibold ${brand.text}`}>Virtual Assistant</p>
                  <p className="text-xs text-neutral-500">Online</p>
                </div>
              </div>
              <button
                aria-label="Đóng"
                onClick={() => setOpen(false)}
                className={`p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${brand.ring}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="px-3 sm:px-4 py-3 h-[50vh] overflow-y-auto space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                      m.role === "user" ? brand.bubbleUser : brand.bubbleBot
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
              <p className="mt-2 text-[11px] text-neutral-500">Press Enter to send • Shift+Enter to go to new line</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Icons (inline) ----------------------------- */
function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.253 12.01l4.244 4.244a.75.75 0 1 0 1.06-1.06l-4.244-4.244A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41m0-14.14-1.41 1.41M6.34 17.66 4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M20 15.5A8.5 8.5 0 1 1 8.5 4a7 7 0 0 0 11.5 11.5Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function generateBotReply(userText) {
  // Simple demo logic: you can replace this with your backend call
  const lowered = userText.toLowerCase();
  if (/(xin chào|chao|hello|hi)/.test(lowered)) {
    return "Chào bạn! Bạn đang cần tư vấn về vấn đề gì?";
  }
  if (/giờ|mấy giờ|time|date/.test(lowered)) {
    return `Bây giờ là ${new Date().toLocaleString()}.`;
  }
  if (/help|trợ giúp|hướng dẫn/.test(lowered)) {
    return "Bạn có thể hỏi về sản phẩm, giá, hoặc tình trạng đơn hàng. Mình sẽ trả lời ngay!";
  }
  return `Mình đã nhận: “${userText}”. Hiện tại đây là bản demo — bạn có thể nối API thật để trả lời thông minh hơn.`;
}

