import React from 'react';
import { Constellation } from '../utils/telescopeController';

interface ConstellationDialogProps {
  selectedConstellation: string | null;
  isDialogTransitioning: boolean;
  constellations: Constellation[];
}

export const ConstellationDialog: React.FC<ConstellationDialogProps> = ({
  selectedConstellation,
  isDialogTransitioning,
  constellations
}) => {
  return (
    <>
      {selectedConstellation && !isDialogTransitioning && (
        <div 
          className="absolute border border-white/20 rounded-lg max-w-xs tv-effect-dialog"
          style={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(10, 25, 47, 0.85)',
            padding: '1.5rem',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            zIndex: 10,
            animation: 'tvTurnOn 0.6s ease-out'
          }}
        >
          <h4 className="text-[#64ffda] font-light tracking-wider uppercase text-sm mb-2">
            {selectedConstellation}
          </h4>
          <p className="text-white/70 text-xs leading-relaxed">
            {constellations.find(c => c.name === selectedConstellation)?.description}
          </p>
        </div>
      )}
      {isDialogTransitioning && (
        <div 
          className="absolute border border-white/20 rounded-lg max-w-xs tv-effect-dialog"
          style={{
            backdropFilter: 'blur(10px)',
            background: 'rgba(10, 25, 47, 0.85)',
            padding: '1.5rem',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            zIndex: 10,
            animation: 'tvTurnOff 0.3s ease-out forwards'
          }}
        >
          <h4 className="text-[#64ffda] font-light tracking-wider uppercase text-sm mb-2">
            {selectedConstellation}
          </h4>
          <p className="text-white/70 text-xs leading-relaxed">
            {constellations.find(c => c.name === selectedConstellation)?.description}
          </p>
        </div>
      )}
    </>
  );
};
