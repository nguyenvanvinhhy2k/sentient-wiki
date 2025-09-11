import React, { useEffect, useState } from "react";

export default function Slide() {
    const slides = [
        { id: 1, img: "https://cdn.prod.website-files.com/67dac72fb5168c0677932b9c/6813bf5a6d6048bb5c82104f_Sentient%20Chat.avif", alt: "Decentralized Consensus" },
        { id: 2, img: "https://cdn.prod.website-files.com/67dac72fb5168c0677932b9c/6813bf6d40c1cfa6bb59f939_Open%20Deep%20Search.avif", alt: "The Grid" },
        { id: 3, img: "https://cdn.prod.website-files.com/67dac72fb5168c0677932b9c/6813bf79377c93491fc9144d_Dobby%2070B%20is%20Here!.avif", alt: "Building the Future" },
      ];
    
      const [index, setIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % slides.length);
        }, 4000); // đổi ảnh mỗi 4s
        return () => clearInterval(interval);
      }, [slides.length]);
    
      return (
        <div className="relative w-full h-64 sm:h-[360px] lg:h-[460px] overflow-hidden rounded-2xl shadow-lg">
          {/* Track */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s) => (
              <div key={s.id} className="w-full flex-shrink-0 h-full">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
    
          {/* Dots indicator */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-amber-500 scale-110" : "bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
    );
  }
  