import React, { useMemo } from 'react';
import { TiledContent } from './TiledContent';
import { BackgroundStar, Constellation, TelescopePosition, ConstellationLineData, ConstellationStarData } from '../utils/telescopeController';
import { useStarfieldRenderer } from '../hooks/useStarfieldRenderer';

interface TelescopeViewProps {
  VIEWPORT_SIZE: number;
  telescopeRef: React.RefObject<HTMLDivElement | null>;
  telescopePosition: TelescopePosition;
  backgroundStars: BackgroundStar[];
  constellations: Constellation[];
  constellationRenderData: Array<{
    constellation: Constellation;
    lineData: ConstellationLineData[];
    starData: ConstellationStarData[];
  }>;
  constellationLabelData: Array<{ name: string; left: number; top: number }>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  WORLD_SIZE: number;
  handleConstellationClick: (constellationName: string) => void;
}

const TelescopeViewComponent: React.FC<TelescopeViewProps> = ({
  VIEWPORT_SIZE,
  telescopeRef,
  telescopePosition,
  backgroundStars,
  constellations,
  constellationRenderData,
  constellationLabelData,
  handleConstellationClick,
  handleMouseMove,
  handleMouseDown,
  handleMouseUp,
  WORLD_SIZE
}) => {

  const { renderStarfield } = useStarfieldRenderer({
    constellationRenderData,
    handleConstellationClick
  });
  const backgroundTransform = useMemo(() => 
    `translate3d(${telescopePosition.x * 0.5}px, ${telescopePosition.y * 0.5}px, 0)`, 
    [telescopePosition.x, telescopePosition.y]
  );

  const constellationTransform = useMemo(() => 
    `translate3d(${telescopePosition.x}px, ${telescopePosition.y}px, 0)`, 
    [telescopePosition.x, telescopePosition.y]
  );

  const viewportStyle = useMemo(() => ({
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(10px)',
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform, contents'
  } as React.CSSProperties), []);

  const backgroundLayerStyle = useMemo(() => ({ 
    transform: backgroundTransform,
    willChange: 'transform'
  } as React.CSSProperties), [backgroundTransform]);

  const constellationLayerStyle = useMemo(() => ({ 
    transform: constellationTransform,
    willChange: 'transform'
  } as React.CSSProperties), [constellationTransform]);

  return (
    <div 
      className="relative border-4 border-white/20 rounded-full overflow-hidden cursor-move crt-viewport"
      style={viewportStyle}
      ref={telescopeRef}
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => {
        if (!(e.target as HTMLElement).closest('.constellation-star')) {
          handleMouseDown(e);
        }
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 crt-content">
        <div 
          className="absolute inset-0" 
          style={backgroundLayerStyle}
        >
          <TiledContent 
            items={backgroundStars} 
            isConstellation={false} 
            VIEWPORT_SIZE={VIEWPORT_SIZE}
            WORLD_SIZE={WORLD_SIZE}
            renderStarfield={renderStarfield}
          />
        </div>
        <div 
          className="absolute inset-0" 
          style={constellationLayerStyle}
        >
          <TiledContent 
            items={constellations} 
            isConstellation={true} 
            VIEWPORT_SIZE={VIEWPORT_SIZE}
            WORLD_SIZE={WORLD_SIZE}
            renderStarfield={renderStarfield}
          />
          {constellationLabelData.map(label => (
            <div
              key={label.name}
              style={{
                position: 'absolute',
                left: label.left,
                top: label.top,
                color: '#64ffda',
                fontSize: '1rem',
                fontWeight: 500,
                pointerEvents: 'none',
                textShadow: '0 0 8px #222, 0 0 2px #64ffda',
                zIndex: 20
              }}
            >
              {label.name}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-8 h-px bg-white/40 transform -translate-x-4 -translate-y-px"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-8 bg-white/40 transform -translate-x-px -translate-y-4"></div>
      </div>

      <div 
        className="absolute inset-2 border border-white/10 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)'
        }}
      />

    </div>
  );
};

export const TelescopeView = React.memo(TelescopeViewComponent);
TelescopeView.displayName = 'TelescopeView';