'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const MAJOR_CONSTELLATIONS = [
  'Orion', 'Ursa Major', 'Cassiopeia', 'Leo', 'Scorpius', 'Cygnus', 'Aquarius', 'Gemini', 'Sagittarius', 'Draco', 'Andromeda', 'Perseus', 'Lyra', 'Taurus', 'Virgo'
];

type WikiConstellationData = {
  thumbnail?: { source: string };
  extract?: string;
  content_urls?: { desktop?: { page?: string } };
};

const fetchConstellationData = async (name: string): Promise<WikiConstellationData | null> => {
  // Example API: https://api.le-systeme-solaire.net/rest/bodies/ (not real for constellations)
  // Replace with a real constellation API if available
  // For demo, use Wikipedia API
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name + ' (constellation)')}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.json();
};

const LearnSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [constellationData, setConstellationData] = useState<{ name: string; data: WikiConstellationData | null }[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [headerOffsets, setHeaderOffsets] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    Promise.all(MAJOR_CONSTELLATIONS.map(async (name) => {
      const data = await fetchConstellationData(name);
      return { name, data };
    })).then((results) => setConstellationData(results));
  }, []);

  useEffect(() => {
    if (expandedIndex !== null && headerRefs.current[expandedIndex]) {
      const header = headerRefs.current[expandedIndex];
      const parentWidth = header?.parentElement?.offsetWidth || 0;
      const headerWidth = header?.offsetWidth || 0;
      const offset = (parentWidth - headerWidth) / 2 - (header?.offsetLeft || 0);
      setHeaderOffsets((prev) => {
        const newOffsets = [...prev];
        newOffsets[expandedIndex] = offset;
        return newOffsets;
      });
    }
  }, [expandedIndex]);

  return (
    <section
      ref={sectionRef}
      id="learn"
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
      style={{ paddingTop: '6rem', marginBottom: '6rem' }}
    >
      {/* Removed background dim overlay when expanded */}
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 w-full" style={{ position: 'relative', zIndex: expandedIndex !== null ? 50 : 1 }}>
        <div className="text-center flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center w-full" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s', padding: '0 1.5rem' }}>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wider text-center mx-auto" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>
                LEARN ABOUT
                <span className="block text-[#64ffda]" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>CONSTELLATIONS</span>
              </h2>
            </div>
          </div>
          <div className="w-full max-w-3xl mx-auto flex flex-col items-stretch" style={{ marginTop: '3rem', marginBottom: '3rem', gap: '2.5rem', position: 'relative' }}>
            {constellationData.map(({ name, data }, idx) => {
              const expanded = expandedIndex === idx;
              return (
                <div
                  key={name}
                  className={`group bg-transparent border border-white/10 rounded-xl hover:border-[#64ffda]/30 transition-all duration-500 text-left flex flex-col items-start justify-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
                  style={{
                    animationDelay: '0.6s',
                    padding: expanded ? '3.5rem 2.5rem' : '2.5rem 2rem',
                    marginBottom: '2.5rem',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(10, 10, 15, 0.3)',
                    boxShadow: expanded ? '0 8px 48px 0 #64ffda55, 0 0 0 4px #64ffda33' : 'none',
                    zIndex: expanded ? 100 : 1,
                    position: 'relative',
                    left: undefined,
                    top: undefined,
                    transform: 'none',
                    width: '100%',
                    maxWidth: '100%',
                    transition: 'all 0.5s cubic-bezier(.77,0,.18,1)',
                  }}
                >
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: expanded ? '2rem' : '0.5rem' }}>
                    <h3
                      ref={el => { headerRefs.current[idx] = el; }}
                      className="text-2xl font-light text-[#64ffda] tracking-[0.15em] uppercase"
                      style={{
                        textShadow: '0 0 12px #64ffda, 0 0 8px #fff',
                        marginBottom: 0,
                        transition: 'transform 0.6s cubic-bezier(.77,0,.18,1)',
                        transform: expanded ? `translateX(calc(${headerOffsets[idx] || 0}px + 1.5vw))` : 'translateX(0)',
                        width: 'fit-content',
                        display: 'inline-block',
                      }}
                    >
                      {name}
                    </h3>
                    <button
                      aria-label={expanded ? 'Collapse' : 'Expand'}
                      onClick={() => setExpandedIndex(expanded ? null : idx)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                        marginLeft: '1rem',
                        fontSize: '2rem',
                        color: '#64ffda',
                        transition: 'transform 0.3s',
                        transform: expanded ? 'rotate(180deg)' : 'none',
                      }}
                    >
                      <span style={{ display: 'inline-block', transition: 'transform 0.3s' }}>&#9660;</span>
                    </button>
                  </div>
                  {/* Animated dropdown content */}
                  <div
                    style={{
                      maxHeight: expanded ? '1000px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.5s cubic-bezier(.77,0,.18,1)',
                    }}
                  >
                    <div
                      style={{
                        animation: expanded ? 'fadeInUp 0.7s forwards' : 'fadeOutDown 0.7s forwards',
                      }}
                    >
                      {data ? (
                        <div>
                          {data.thumbnail && (
                              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '2rem', marginTop: '0.5rem' }}>
                                <Image
                                  src={data.thumbnail.source}
                                  alt={name}
                                  width={220}
                                  height={220}
                                  style={{ maxHeight: '220px', borderRadius: '1.25rem', boxShadow: '0 8px 32px rgba(100,255,218,0.18)', margin: '0 auto', display: 'block', width: 'auto' }}
                                />
                              </div>
                          )}
                          <p className="text-white/70 font-light leading-relaxed text-base text-left" style={{ padding: '0 0.5rem', marginBottom: '1rem', marginTop: data.thumbnail ? '0.5rem' : '0' }}>{data.extract}</p>
                          <a href={data.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer" className="text-[#64ffda] underline mt-2 block">Learn more</a>
                        </div>
                      ) : (
                        <p className="text-white/50 italic">Loading...</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#64ffda]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#64ffda]/3 rounded-full blur-3xl"></div>
      </div>
      {/* Keyframes for entry, dropdown, and header glide animation */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutDown {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(40px); }
        }
        @keyframes headerGlideCenter {
          0% { transform: translateX(0); }
          100% { transform: translateX(16vw); }
        }
        @keyframes headerGlideLeft {
          0% { transform: translateX(16vw); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default LearnSection;
