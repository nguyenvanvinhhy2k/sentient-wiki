import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "./images/sentient-logo.jpg"

export default function SentientWiki() {
  const [dark, setDark] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeHeading, setActiveHeading] = useState("intro");

  // Fake data (replace with real content or CMS)
  const nav = [
    {
      title: "Tổng quan",
      items: [
        { id: "intro", label: "Giới thiệu" },
        { id: "lore", label: "Cốt truyện" },
        { id: "timeline", label: "Dòng thời gian" },
      ],
    },
    {
      title: "Nhân vật",
      items: [
        { id: "heroes", label: "Heroes" },
        { id: "roles", label: "Vai trò" },
        { id: "abilities", label: "Kỹ năng" },
      ],
    },
    {
      title: "Chế độ & Bản đồ",
      items: [
        { id: "modes", label: "Chế độ chơi" },
        { id: "maps", label: "Bản đồ" },
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

  // Observe headings to highlight active section in TOC
  const contentRef = useRef(null);
  useEffect(() => {
    const headings = contentRef.current?.querySelectorAll("section[id]") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: "-64px 0px -60% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    headings.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
              <span className="hidden text-lg font-bold sm:block">Sentient Wiki</span>
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
          <aside
            className={
              "fixed inset-y-0 left-0 z-30 w-72 -translate-x-full overflow-y-auto border-r border-zinc-200 bg-white p-4 transition-transform dark:border-zinc-800 dark:bg-zinc-900 md:static md:translate-x-0 md:w-auto md:border-0 md:bg-transparent md:p-0 md:dark:bg-transparent" +
              (mobileNavOpen ? " translate-x-0" : "")
            }
            aria-label="Điều hướng"
          >
            <div className="md:hidden mb-4 flex items-center justify-between sticky top-20 space-y-6 ">
              <span className="text-sm font-semibold opacity-70">Danh mục</span>
              <button
                className="rounded-xl border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                onClick={() => setMobileNavOpen(false)}
              >Đóng</button>
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

            <nav className="space-y-5 pr-2 text-sm ">
              {filteredNav.map((section) => (
                <div key={section.title}>
                  <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {section.title}
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((it) => (
                      <li key={it.id}>
                        <a
                          href={`#${it.id}`}
                          onClick={() => setMobileNavOpen(false)}
                          className={
                            "block rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 " +
                            (activeHeading === it.id
                              ? "bg-zinc-100 font-semibold dark:bg-zinc-800"
                              : "")
                          }
                        >
                          {it.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main ref={contentRef} className="space-y-6">
            {/* Breadcrumbs */}
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <a href="#" className="hover:underline">Trang chủ</a> / <a href="#" className="hover:underline">Bách khoa</a> / Overwatch
            </div>

            {/* Featured */}
            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">Sentient – Tổng quan</h1>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Overwatch là trò chơi bắn súng nhóm 6v6/5v5 với hệ thống hero đa dạng, mỗi hero có bộ kỹ năng riêng. Bài viết này tóm tắt
                    cốt truyện, chế độ chơi và các bản cập nhật quan trọng theo phong cách wiki.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">FPS</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">PvP</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">eSports</span>
                  </div>
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

            {/* Lore */}
            <section id="lore" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-3 text-xl font-bold">Cốt truyện</h2>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Tổ chức Overwatch được thành lập để đối phó khủng hoảng Omnic, quy tụ những anh hùng từ khắp nơi trên thế giới.
                Sau giai đoạn hoàng kim, nội bộ rạn nứt và tổ chức bị giải thể, nhưng các mối đe doạ mới buộc các anh hùng phải tái hợp.
              </p>
            </section>

            {/* Timeline */}
            <section id="timeline" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-xl font-bold">Dòng thời gian</h2>
              <ul className="space-y-3 text-sm">
                {[
                  { year: 2016, text: "Overwatch phát hành lần đầu" },
                  { year: 2022, text: "Công bố Overwatch 2" },
                  { year: 2023, text: "OW2 phát hành, chuyển sang 5v5" },
                  { year: 2025, text: "Nhiều mùa giải & sự kiện" },
                ].map((t) => (
                  <li key={t.year} className="flex items-start gap-3">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                    <div>
                      <div className="font-medium">{t.year}</div>
                      <div className="text-zinc-600 dark:text-zinc-300">{t.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Heroes */}
            <section id="heroes" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Heroes</h2>
                <a href="#" className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-400">Xem tất cả</a>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {["Tank", "Damage", "Support", "Special"].map((role, i) => (
                  <article key={role} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="aspect-video">
                      <img
                        src={`https://picsum.photos/seed/hero-${i}/600/400`}
                        alt={`${role} hero`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{role}</h3>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        Danh sách hero theo vai trò, chỉ số và kỹ năng nổi bật.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Modes & Maps */}
            <section id="modes" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-3 text-xl font-bold">Chế độ chơi</h2>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Push, Control, Hybrid, Escort… mỗi chế độ có mục tiêu riêng và yêu cầu phối hợp khác nhau.
              </p>
            </section>

            <section id="maps" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-3 text-xl font-bold">Bản đồ</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {["Shambali", "Circuit Royal", "New Junk City", "Ilios"].map((m, i) => (
                  <div key={m} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <img
                      src={`https://picsum.photos/seed/map-${i}/800/450`}
                      alt={`Map ${m}`}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <div className="font-semibold">{m}</div>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        Mô tả ngắn gọn về bản đồ và mẹo thi đấu.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Đang thịnh hành</h2>
                <a href="#" className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-400">Khám phá</a>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trending.map((t) => (
                  <a key={t.id} href="#" className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="aspect-video overflow-hidden">
                      <img src={t.img} alt="Trending" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy"/>
                    </div>
                    <div className="p-4">
                      <div className="font-semibold group-hover:underline">{t.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Latest */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Mới cập nhật</h2>
                <button className="rounded-xl border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">Theo dõi</button>
              </div>
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {latest.map((it) => (
                  <li key={it.id} className="flex items-center justify-between gap-4 py-3">
                    <a href="#" className="font-medium hover:underline">{it.title}</a>
                    <span className="text-xs text-zinc-500">{it.date}</span>
                  </li>
                ))}
              </ul>
            </section>
          </main>

          {/* Right Column: Infobox */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
              </div>

              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-200 p-4 text-sm font-semibold dark:border-zinc-800">Sự kiện</div>
                <ul className="p-2">
                  {[
                    "Halloween Terror",
                    "Winter Wonderland",
                    "Summer Games",
                    "Anniversary",
                  ].map((e) => (
                    <li key={e} className="flex items-center gap-2 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
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
                  <li><a href="#" className="hover:underline">Giới thiệu</a></li>
                  <li><a href="#" className="hover:underline">Quy tắc</a></li>
                  <li><a href="#" className="hover:underline">Liên hệ</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Cộng đồng</div>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">Thảo luận</a></li>
                  <li><a href="#" className="hover:underline">Đóng góp</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Tài liệu</div>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">API</a></li>
                  <li><a href="#" className="hover:underline">Hướng dẫn biên tập</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Bản quyền</div>
                <p className="text-zinc-600 dark:text-zinc-400">Nội dung demo cho mục đích học tập. Thương hiệu thuộc về chủ sở hữu tương ứng.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
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
