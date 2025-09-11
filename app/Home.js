import Slide from "./Slide"

const roadmapData = [
  {
    month: "February",
    items: ["Building Dobby and Dobby Apps with Community"],
  },
  {
    month: "March",
    items: ["Sentient Chat Builder Program"],
  },
  {
    month: "April",
    items: ["Sentient Agent Framework & Open Deep Search"],
  },
  {
    month: "May",
    items: ["Sentient Chat Private BETA"],
    highlight: true, // để viền đỏ
  },
];

export default function Home() {
    return (
      <main className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-1">
          <div className="p-1">
            <h1 className="mb-2 text-2xl font-bold">Sentient – Overview</h1>
            <h3 className="text-md leading-relaxed text-zinc-600 dark:text-zinc-300">
              A comprehensive knowledge base for everything related to the
              Sentient ecosystem - the decentralized intelligence network
              building the future of AI.
            </h3>
          </div>
        </div>

      <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <Slide />
      </section>

      
      <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">Outstanding project</h1>
                  <h3>Steps that shape Sentient AI</h3>
                  <section id="intro" className="overflow-hidden mt-[20px] rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
            <h3>🔹 Sentient AI Project (SAP)</h3>
            <p className="mb-4 text-sm mt-[10px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            Multi-agent AI platform, developed according to humanistic philosophy (仁 – Nhân, 义 – Nghĩa, 礼 – Lễ).
            </p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Integrating long-term memory, AI agents are capable of cooperation and self-evolution.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Towards an ethical AI system that accompanies humans.
            </p>

                  </section>

                  <section id="intro" className="overflow-hidden mt-[20px] rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
            <h3>🔹 Sentience Quest</h3>
            <p className="mb-4 text-sm mt-[10px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            Open AGI research initiative, focusing on “Story Weaver” – a model that simulates the inner world and motivations of AI.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            The goal: to help AI not only be intelligent but also have emotions and human values.
            </p>
                  </section>

                  <section id="intro" className="overflow-hidden mt-[20px] rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
            <h3>🔹 Sentient Blockchain</h3>
            <p className="mb-4 text-sm mt-[10px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            Decentralized AI Platform Raises $85M
            </p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Taking AI Out of Centralized Control and Making It a Community Property
            </p>

                  </section>

                  <section id="intro" className="overflow-hidden mt-[20px] rounded-2xl mb-[20px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
            <h3>🔹 Sentient Intelligence (NRO, USA)</h3>
            <p className="mb-4 text-sm mt-[10px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            Advanced satellite data analysis system.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Not sentient AI, but showing the technological stature called “Sentient”.
            </p>
                  </section>

                </div>
              </div>
            </section>

      <section id="intro" className="overflow-hidden rounded-2xl border flex flex-col items-center border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Roadmap</h2>

      {/* Timeline */}
      <div className="flex items-center justify-center w-full max-w-4xl">
        {roadmapData.map((step, idx) => (
          <div key={idx} className="flex items-center flex-1">
            {/* Nút tròn + chữ */}
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full border-2 border-red-500 mr-2"></span>
                <span
                  className={`text-sm md:text-base ${
                    step.highlight ? "text-red-500 font-semibold" : ""
                  }`}
                >
                  {step.month}
                </span>
              </div>
            </div>

            {/* Line chỉ vẽ nếu không phải phần tử cuối */}
            
              <div className="flex-1 h-px bg-gray-700 mx-2"></div>
            
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {roadmapData.map((step, idx) => (
          <div
            key={idx}
            className={`border rounded-md p-6 text-center text-sm transition ${
              step.highlight ? "border-red-500" : "border-gray-700"
            }`}
          >
            {step.items.map((item, i) => (
              <p key={i} className="leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      </section>

    </main>
    )
}