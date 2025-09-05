export default function Home() {
    return (
      <main className="space-y-6">
      <section
        id="intro"
        className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            <h1 className="mb-2 text-2xl font-bold">Sentient – Overview</h1>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              A comprehensive knowledge base for everything related to the
              Sentient ecosystem - the decentralized intelligence network
              building the future of AI.
            </p>
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
    </main>
    )
}