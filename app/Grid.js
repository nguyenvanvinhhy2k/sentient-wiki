import { useState } from "react";
import partners from "./images/participants.png"
import economy from "./images/grid_economy.png"
import gird1 from "./images/grid1.png"
import gird2 from "./images/gird2.png"

export default function Grid() {
  const [selectedImage, setSelectedImage] = useState(null);
    return (
          <main className="space-y-6">
            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">The Grid</h1>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The Grid is Sentients decentralized compute network that powers the distributed intelligence ecosystem.
                  </p>
                </div>
              </div>
            </section>

            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">What is The Grid?</h1>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The Grid represents the computational backbone of the Sentient ecosystem. Its a decentralized network of compute nodes that collectively provide the processing power needed for AI model training, inference, and other computational tasks.
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Unlike traditional cloud computing services that rely on centralized data centers, The Grid distributes computational workloads across a network of individual contributors, creating a more resilient and democratized computing infrastructure.
                    </p>
                </div>
              </div>
            </section>

            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">Introducing GRID: the world’s largest network of intelligence</h1>
                
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  GRID (Global Research and Intelligence Directory) is the first step toward open-source AGI: is a network of specialized agents, models, data, tools, and compute—contributed by the world’s best builders—working together to deliver AGI-level results.
                  </p>

                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  A query sent to the GRID is split, routed to the right intelligences, enriched with tools like search and domain data, then merged into the best result, giving users a coherent, high-quality output. GRID’s output reflects the work of thousands of open-source developers, not a small closed team.
                  </p>
                  <img src={gird1.src} className="rounded-md cursor-pointer" onClick={() => setSelectedImage(gird1.src) }/>
              
                </div>
              </div>
            </section>

            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">How can you experience the GRID tangibly?</h1>
                
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Users access the GRID through Sentient Chat. Sentient Chat is part of the GRID and acts as the gateway to a unified world of intelligence.
                  </p>

                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  By using <a href="https://chat.sentient.xyz/" target="_blank" className="text-blue-600 underline"> Sentient Chat</a>, users are able to see all intelligence being accessed in real-time.
                  </p>
                  <img src={gird2.src} className="rounded-md cursor-pointer" onClick={() => setSelectedImage(gird2.src) }/>
              
                </div>
              </div>
            </section>



            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">The economics of GRID</h1>
                
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  GRID tackles the toughest hurdle for building open-source AI: funding and monetization. Sentient’s token economy fuels both network growth and community participation. Holders can stake $SENT on the artifacts they believe in. More stake directs a larger share of emissions to that artifact while stakers earn yield.
                  </p>

                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Emission allocation is further influenced by globally recognized AI experts (reps) and weighted by real usage and revenue — ensuring rewards flow to projects that people actually use and value. This lets the community collectively fund and scale open-source AI simply by using and staking.


                  </p>
                  <img src={economy.src} className="rounded-md cursor-pointer" onClick={() => setSelectedImage(economy.src) }/>
              
                </div>
              </div>
            </section>

            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">Current GRID ecosystem</h1>
                
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The GRID now includes 110+ partners: 50+ specialized agents, 50+ data providers, six AI models, and 10+ compute & verifiable-AI infrastructure providers — alongside Sentient-native products like Sentient Chat, Dobby, the Model Fingerprinting library, and Open Deep Search. Partners span web2 & web3 — from Napkin and Exa to Caldo, Kaito, Messari Co-Pilot, The Graph, and EigenLayer (launching the Dobby Judge).
                  </p>
                  <img src={partners.src} className="rounded-md cursor-pointer" onClick={() => setSelectedImage(partners.src) }/>
              
                </div>
              </div>
            </section>

            {/* <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">Introducing GRID: the world’s largest network of intelligence</h1>
                  <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                  <h3> Distributed Computing</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Computational tasks are broken down into smaller units and distributed across multiple nodes in the network, enabling parallel processing and improved efficiency.
                  </p>
                  </section>
                  <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                  <h3> Peer-to-Peer Network</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  
                  Nodes communicate directly with each other without requiring central coordination, creating a robust and censorship-resistant network architecture.
                    </p>
                    </section>
                    <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                    <h3> Incentive System</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  
                  Contributors are rewarded for providing computational resources, creating economic incentives for network participation and growth.
                    </p>
                    </section>
                    <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                    <h3> Community Governance</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  
                  Network parameters and upgrades are governed by the community through decentralized decision-making processes.
                    </p>
                    </section>
                </div>
              </div>
            </section> */}


            <section id="intro" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="grid grid-cols-1 md:grid-cols-1">
                <div className="p-6">
                  <h1 className="mb-2 text-2xl font-bold">How The Grid Works</h1>
                  <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                  <h3> Distributed Computing</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Computational tasks are broken down into smaller units and distributed across multiple nodes in the network, enabling parallel processing and improved efficiency.
                  </p>
                  </section>
                  <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                  <h3> Peer-to-Peer Network</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  
                  Nodes communicate directly with each other without requiring central coordination, creating a robust and censorship-resistant network architecture.
                    </p>
                    </section>
                    <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                    <h3> Incentive System</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  
                  Contributors are rewarded for providing computational resources, creating economic incentives for network participation and growth.
                    </p>
                    </section>
                    <section id="intro" className="mt-[20px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 p-4 ">
                    <h3> Community Governance</h3>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  
                  Network parameters and upgrades are governed by the community through decentralized decision-making processes.
                    </p>
                    </section>
                </div>
              </div>
            </section>

            {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="h-[90vh] w-[90vw] rounded-lg shadow-lg"
            />
            {/* Nút đóng */}
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 text-black"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

          </main>
    )
}