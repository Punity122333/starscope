'use client';

import React from 'react';
import { useStargazeSection } from '../hooks/useStargazeSection';
import { TelescopeView } from './TelescopeView';
import { ConstellationDialog } from './ConstellationDialog';

const StargazeSection = () => {
  const {
    isVisible,
    selectedConstellation,
    isDialogTransitioning,
    telescopePosition,
    VIEWPORT_SIZE,
    WORLD_SIZE,
    constellations,
    backgroundStars,
    constellationRenderData,
    constellationLabelData,
    telescopeController,
    sectionRef,
    telescopeRef,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleConstellationClick,
    setTelescopePosition
  } = useStargazeSection();

  return (
    <section
      ref={sectionRef}
      id="stargaze"
      className={`relative min-h-screen flex items-center justify-center py-24 overflow-hidden bg-transparent transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ paddingTop: '6rem', marginBottom: '6rem' }}
    >
      <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 w-full z-10">
        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-center w-full max-w-4xl mx-auto" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s', padding: '0 1rem' }}>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wider text-center mx-auto" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>
                EXPLORE THE
                <span className="block text-[#64ffda]" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>NIGHT SKY</span>
              </h2>
            </div>
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s', padding: '0 2rem' }}>
              <p className="text-xl text-white/70 font-light leading-relaxed max-w-3xl text-center mx-auto">
                Use our interactive telescope to discover constellations. Click and drag to explore the cosmos.
              </p>
            </div>
          </div>
          <div
            className={`relative mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              transitionDelay: '0.6s',
              marginTop: '4rem',
              marginBottom: '4rem',
              width: `${VIEWPORT_SIZE}px`,
              height: `${VIEWPORT_SIZE}px`
            }}
          >
            <TelescopeView
              VIEWPORT_SIZE={VIEWPORT_SIZE}
              WORLD_SIZE={WORLD_SIZE}
              telescopeRef={telescopeRef}
              telescopePosition={telescopePosition}
              backgroundStars={backgroundStars}
              constellations={constellations}
              constellationRenderData={constellationRenderData}
              constellationLabelData={constellationLabelData}
              handleMouseMove={handleMouseMove}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleConstellationClick={handleConstellationClick}
            />
            {selectedConstellation && (
              <ConstellationDialog
                selectedConstellation={selectedConstellation}
                isDialogTransitioning={isDialogTransitioning}
                constellations={constellations}
              />
            )}
          </div>
          <div className={`text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1.0s' }}>
            <p className="text-white/50 text-sm tracking-wider uppercase" style={{ marginBottom: '1.5rem' }}>
              Click & Drag to Move • Click Stars to Learn More
            </p>
            <button
              className="group relative text-base font-light text-white bg-transparent border border-[#64ffda]/30 rounded-lg hover:border-[#64ffda] transition-all duration-300 uppercase tracking-[0.15em] overflow-hidden"
              style={{
                padding: '1rem 2rem',
                backdropFilter: 'blur(10px)',
                background: 'rgba(10, 10, 15, 0.4)'
              }}
              onClick={() => setTelescopePosition(telescopeController.getInitialPosition())}
            >
              <span className="relative z-10">Reset View</span>
              <div className="absolute inset-0 bg-[#64ffda]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-[#64ffda] rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-[#64ffda] rounded-full opacity-40 animate-bounce"></div>
      </div>
    </section>
  );
};

export default StargazeSection;