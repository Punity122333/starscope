import React, { useMemo } from 'react';
import { BackgroundStar, Constellation } from '../utils/telescopeController';

interface TiledContentProps {
  items: BackgroundStar[] | Constellation[];
  isConstellation: boolean;
  VIEWPORT_SIZE: number;
  WORLD_SIZE: number;
  renderStarfield: (items: BackgroundStar[] | Constellation[], isConstellation: boolean) => React.ReactNode;
}

const TiledContentComponent: React.FC<TiledContentProps> = ({ 
  items, 
  isConstellation, 
  VIEWPORT_SIZE, 
  WORLD_SIZE, 
  renderStarfield 
}) => {

  const tilesX = Math.min(3, Math.max(1, Math.ceil(VIEWPORT_SIZE / WORLD_SIZE) + 1));
  const tilesY = Math.min(3, Math.max(1, Math.ceil(VIEWPORT_SIZE / WORLD_SIZE) + 1));

  const tilePositions = useMemo(() => {
    const positions = [];
    for (let i = -Math.floor(tilesX / 2); i <= Math.floor(tilesX / 2); i++) {
      for (let j = -Math.floor(tilesY / 2); j <= Math.floor(tilesY / 2); j++) {
        positions.push({ i, j, key: `${i}-${j}` });
      }
    }
    return positions;
  }, [tilesX, tilesY]);

  const getTileStyle = useMemo(() => (i: number, j: number) => ({
    width: WORLD_SIZE,
    height: WORLD_SIZE,
    left: i * WORLD_SIZE,
    top: j * WORLD_SIZE,
    transform: 'translate3d(0, 0, 0)', 
    willChange: 'transform',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000
  }), [WORLD_SIZE]);
  
  return (
    <>
      {tilePositions.map(({ i, j, key }) => (
        <div
          key={key}
          className="absolute"
          style={getTileStyle(i, j)}
        >
          {renderStarfield(items, isConstellation)}
        </div>
      ))}
    </>
  );
};

export const TiledContent = React.memo(TiledContentComponent);
TiledContent.displayName = 'TiledContent';
