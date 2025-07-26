// usestarfieldrenderer.tsx
import React from 'react';
import { BackgroundStar, Constellation } from '../utils/telescopeController';

interface LineData {
  key: string;
  left: number;
  top: number;
  width: number;
  height: number;
  transform: string;
  opacity: number;
}

interface StarData {
  key: string;
  left: number;
  top: number;
  width: number;
  height: number;
  boxShadow: string;
  opacity: number;
}

interface StarfieldRendererProps {
  constellationRenderData: Array<{
    constellation: Constellation;
    lineData: LineData[];
    starData: StarData[];
  }>;

  handleConstellationClick: (constellationName: string) => void;
}

export const useStarfieldRenderer = ({ constellationRenderData, handleConstellationClick }: StarfieldRendererProps) => {
  const renderStarfield = (items: BackgroundStar[] | Constellation[], isConstellation: boolean) => {
    if (isConstellation) {
      return constellationRenderData.map(({ constellation, lineData, starData }) => (
        <div key={constellation.name} className="absolute inset-0">
          {lineData.map((line) => (
            <div
              key={line.key}
              className="absolute bg-[#64ffda]/30 transition-opacity duration-300 pointer-events-none"
              style={{
                left: `${line.left}px`,
                top: `${line.top}px`,
                width: `${line.width}px`,
                height: `${line.height}px`,
                transformOrigin: '0 0',
                transform: line.transform,
                opacity: line.opacity
              }}
            />
          ))}
          {starData.map((star) => (
            <div
              key={star.key}
              className="absolute rounded-full bg-[#64ffda] cursor-pointer transition-all duration-300 hover:scale-150 constellation-star"
              style={{
                left: `${star.left}px`,
                top: `${star.top}px`,
                width: `${star.width}px`,
                height: `${star.height}px`,
                boxShadow: star.boxShadow,
                opacity: star.opacity
              }}

              onMouseDown={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                handleConstellationClick(constellation.name);
              }}
            />
          ))}
        </div>
      ));
    } else {
      return (items as BackgroundStar[]).map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            animation: star.animation,
            opacity: 0.6
          }}
        />
      ));
    }
  };

  return { renderStarfield };
};