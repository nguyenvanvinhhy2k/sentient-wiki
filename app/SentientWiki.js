import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import WhatIsSentient from "./WhatIsSentient"
import Grids from "./Grid"
import logo from "./images/sentient-new.jpg"
import dobbyMess from "./images/dobby-mess.png"
import Community from "./Community"
import Builder from "./Builder"
import Partners from "./Partners"
import Contribute from "./Contribute"
import Home from "./Home"
import Airdrop from "./Airdrop"
import Blog from "./Blog"


const componentsMap = {
  home: Home,
  whatis: WhatIsSentient,
  grid: Grids,
  community: Community,
  builder: Builder,
  partners: Partners,
  contribute: Contribute,
  airdrop: Airdrop,
  blog: Blog,
}


export default function SentientWiki() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeHeading, setActiveHeading] = useState("home");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedId, setSelectedId] = useState("home");
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [messages, setMessages] = useState([
    { id: "init-msg", role: "bot", text: "Hello 👋 I am a dobby supporter. How can I help you?" }
  ]);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const nav = [
    {
      title: "Overview",
      items: [
        { id: "home", label: "Home", component: "home" },
        { id: "whatis", label: "What is Sentient?", component: "whatis" },
        { id: "grid", label: "GRID", component: "grid" },
        { id: "community", label: "Community", component: "community" },
        { id: "builder", label: "Builder", component: "builder" },
        { id: "partners", label: "Partners", component: "partners" },
        { id: "contribute", label: "Contribute", component: "contribute" },
        { id: "airdrop", label: "Airdrop & Token info", component: "airdrop" },
        { id: "blog", label: "Blog/Research", component: "blog" },
      ],
    },
  ];

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsSending(true);
    setLoading(true)

    const botId = crypto.randomUUID();
    setMessages((m) => [...m, { id: botId, role: "bot", text: "" }]);

    try {
      const res = await fetch(
        "https://api.fireworks.ai/inference/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIREWORKS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "accounts/sentientfoundation/models/dobby-unhinged-llama-3-3-70b-new",
            max_tokens: 1024,
            temperature: 0.5,
            top_p: 0.95,
            messages: [
              {
                role: "system",
                content:
                  "You are DobbyGPT, a virtual assistant and Sentient expert who can answer anything about Sentient",
              },
              {
                role: "user",
                content: trimmed,
              },
            ],
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: data?.choices[0]?.message?.content } : msg
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: "Error occurred while fetching response" } : msg
        )
      );
    } finally {
      setLoading(false);
      setIsSending(false)
    }
  };

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const handleSearch = () => {
    const item = nav[0].items.find((i) =>
      i.label.toLowerCase().includes(query.toLowerCase())
    );
    if (item) {
      setSearchId(item.id);
      setActiveHeading(item.id)
      setSelectedId(item.id)
    } else {
      setSearchId(null);
    }
  };

  const ActiveComponent = componentsMap[searchId || selectedId];

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


  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebounced(query);
  //   }, 500);

  //   return () => clearTimeout(handler); // cleanup
  // }, [query]);

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

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
          <div className="mx-auto flex max-w-[85rem] items-center gap-3 px-4 py-3">
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 md:hidden"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Mở menu"
            >
              <BurgerIcon /> Menu
            </button>

            <div className="flex items-center gap-2">
              <img src={logo.src} className="h-11 w-11 rounded-full" />
              <span className=" text-lg font-bold">Sentient Synthesis</span>
            </div>

            <div className="mx-2 hidden flex-1 md:block">
              <label className="relative block">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search…"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 pl-9 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" >
                  <SearchIcon onClick={handleSearch} />
                </span>
              </label>
            </div>

            <div className="ml-auto flex items-center gap-2">

            <a href="https://chat.sentient.xyz/" target="_blank"
                className="rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium cursor-pointer hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                aria-label="Đổi chế độ sáng/tối"
              >
              Sentient Chat
              </a>

              <a href="https://grid.sentient.xyz/" target="_blank"
                onClick={() => setDark((d) => !d)}
                className="rounded-2xl border border-zinc-200 cursor-pointer px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                aria-label="Đổi chế độ sáng/tối"
              >
              GIRD
              </a>
              <button disabled
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
              {/* <button className="hidden rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 sm:inline-flex">
                Login
              </button> */}
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[85rem] grid-cols-1 gap-6 px-4 py-4 md:grid-cols-[170px_1fr] lg:grid-cols-[180px_1fr_300px]">

          <aside className={"fixed block md:hidden top-[70px] inset-y-0 left-0 z-30 w-72 -translate-x-full overflow-y-auto border-r border-zinc-200 bg-white p-4 transition-transform dark:border-zinc-800 dark:bg-zinc-900 md:static md:translate-x-0 md:w-auto md:border-0 md:bg-transparent md:p-0 md:dark:bg-transparent" + (mobileNavOpen ? " translate-x-0" : "")} aria-label="Điều hướng">
            <div className="md:hidden mb-4 flex items-center justify-between sticky md:top-20 md:space-y-6 ">
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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  type="search"
                  placeholder="Tìm mục…"
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 pl-9 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 cursor-pointer">
                  <SearchIcon onClick={handleSearch} />
                </span>
              </label>
            </div>

            <nav className="space-b-5 pr-2 text-sm ">
              {nav.map((section) => (
                <div key={section.title}>
                  <div className="mb-4 px-2 text-[24px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {section.title}
                  </div>
                  <ul className="space-y-1 md:mt-[20px]">
                    {section.items.map((it) => (
                      <li key={it.id}  className={
                        "flex rounded-xl px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full" +
                        (activeHeading === it.component
                          ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
                          : "")
                      }>
                        <button
                        className="w-full"
                          onClick={() => {
                            setMobileNavOpen(false)
                            setSelectedId(it.component)
                            setActiveHeading(it.component)
                            setSearchId("")
                          }
                          }
                         
                        >
                          {it.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-6">
              <nav className="space-b-5 pr-2 text-sm ">
                {nav.map((section) => (
                  <div key={section.title}>
                    <div className="mb-4 px-2 text-[24px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {section.title}
                    </div>
                    <ul className="space-y-1">
                      {section.items.map((it) => (
                        <li key={it.id}>
                          <button
                            onClick={() => {
                              setMobileNavOpen(false)
                              setSelectedId(it.component)
                              setActiveHeading(it.component)
                              setSearchId("")
                            }
                            }
                            className={
                              " w-full flex justify-start rounded-xl px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 " +
                              (activeHeading === it.component
                                ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
                                : "")
                            }
                          >
                            {it.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <div> {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="text-center text-neutral-400">
              <p className="text-lg font-semibold">⚠ Không tìm thấy {query}</p>
              <p className="text-sm">Vui lòng chọn mục hợp lệ.</p>
            </div>
          )}</div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-200 p-4 text-sm font-semibold dark:border-zinc-800">Featured News</div>
                <ul className="p-2">
                  {[
                    "ROMA: The Backbone for Open-Source Meta-Agents",
                    "The Grid",
                    "Building the Future",
                  ].map((e) => (
                    <li key={e} className="flex items-center gap-2 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="w-[90%] text-sm">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <footer className="border-t border-zinc-200 bg-white/60 py-8 text-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="mx-auto max-w-[85rem] px-4">
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
        className="fixed bottom-10 animate-bounce right-10 z-40 animation-subtle-scale h-20 w-20"
        >
        {!open ?  <img src={dobbyMess.src} className="h-full w-full hover:scale-105 duration-300" /> : ""}
      </button>
      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className={`fixed bottom-10 right-6 z-40 w-[92vw] max-w-md rounded-2xl shadow-2xl ${brand.surface} ${brand.border}`}
            role="dialog"
            aria-modal="true"
            aria-label="Hộp thoại trò chuyện"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 ">
              <div className="flex items-center gap-2">
                <img src={dobbyMess.src} className="h-11 w-11 rounded-full" />
                <div className="leading-tight">
                  <p className={`text-sm font-semibold ${brand.text}`}>Assistant Dobby</p>
                  <div className="text-xs text-neutral-500 flex gap-1 items-center">Online <div className="bg-lime-500 w-2 h-2 rounded-full mt-[2px]"></div></div>
                </div>
              </div>
              <button
                aria-label="Đóng"
                onClick={() => setOpen(false)}
                className={`p-2 rounded-xl bg-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-300 ${brand.ring}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="px-3 sm:px-4 py-3 h-[50vh] overflow-y-auto space-y-3">
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1; // kiểm tra tin nhắn cuối cùng
                return (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${m.role === "user" ? brand.bubbleUser : brand.bubbleBot}`}>
                      {m.role === "user" ? (
                        m.text
                      ) : loading && isLast ? ( // chỉ áp dụng cho bot + message cuối cùng
                        <div className="flex items-center space-x-1 text-whitep-3 rounded-xl">
                          <span className="w-2 h-2 rounded-full bg-white animate-dot1"></span>
                          <span className="w-2 h-2 rounded-full bg-white animate-dot2"></span>
                          <span className="w-2 h-2 rounded-full bg-white animate-dot3"></span>
                        </div>
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
                );
              })}
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
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41m0-14.14-1.41 1.41M6.34 17.66 4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M20 15.5A8.5 8.5 0 1 1 8.5 4a7 7 0 0 0 11.5 11.5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
