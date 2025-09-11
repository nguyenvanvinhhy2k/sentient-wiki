export default function Github() {
  return (
    <main className="space-y-6">
    <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-1">
        <div className="p-6">
          <h1 className="mb-2 text-2xl font-bold">Contributing to Sentient</h1>
          <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Contributing to Sentient
          </p>
        </div>
      </div>
    </section>
{/* 
    <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-1">
        <div className="p-6">
          <h1 className="mb-2 text-2xl font-bold">Open Source Overview</h1>
          <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          Sentient is built on principles of openness and transparency. All core components of the ecosystem are developed as open source projects, enabling community contributions, peer review, and collaborative development of decentralized AI infrastructure.
          </p>

          <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          The Sentient GitHub organization hosts repositories covering everything from core protocol implementation to developer tools, documentation, and example applications.
          </p>
        </div>
      </div>
    </section> */}

    <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-1">
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold">Contributing to Sentient</h1>
          <section id="intro" className="overflow-hidden rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
                  <h3>Getting Started</h3>
                  
                   <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                   Start by exploring the repositories, reading the documentation, and understanding the codebase structure. Look for good first issue labels for beginner-friendly contributions.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">Good First Issue</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">Documentation</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">Code Review</span>

                </div>

                </section>

                <section id="intro" className="overflow-hidden rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
                  <h3>Development Process</h3>
                  
                   <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                   Follow the standard GitHub workflow: fork repositories, create feature branches, submit pull requests, and participate in code reviews. All contributions are welcome and reviewed by maintainers.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">Fork & PR</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">Code Review</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">Testing</span>
                </div>
                </section>

                <section id="intro" className="overflow-hidden rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
                  <h3>Community Support</h3>
                  
                   <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                   Join the developer community on Discord for technical discussions, questions, and collaboration opportunities. Maintainers and experienced contributors are available to help.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">Discord</span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">Mentorship</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">Collaboration</span>
                </div>
                </section>

                <section id="intro" className="overflow-hidden rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
                  <h3>Docs</h3>
                  
                   <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                   Comprehensive documentation, API references, and developer guides.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">Documentation</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">Markdown</span>
                </div>
                </section>
        </div>
      </div>
    </section>
  </main>
  )
}