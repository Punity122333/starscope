import { RefObject } from 'react';

export interface Star {
  x: number;
  y: number;
  magnitude: number;
}

export interface Constellation {
  name: string;
  stars: Star[];
  description: string;
}

export interface BackgroundStar {
  left: string;
  top: string;
  width: string;
  height: string;
  animation: string;
}

export interface TelescopePosition {
  x: number;
  y: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ConstellationLineData {
  key: string;
  left: number;
  top: number;
  width: number;
  height: number;
  transform: string;
  opacity: number;
}

export interface ConstellationStarData {
  key: string;
  left: number;
  top: number;
  width: number;
  height: number;
  boxShadow: string;
  opacity: number;
}

export class TelescopeController {
  private viewportSize: number;
  private worldSize: number;

  constructor(viewportSize: number, worldSize: number) {
    this.viewportSize = viewportSize;
    this.worldSize = worldSize;
  }

  getInitialPosition(): TelescopePosition {
    return {
      x: -(this.worldSize / 2) + (this.viewportSize / 2),
      y: -(this.worldSize / 2) + (this.viewportSize / 2),
    };
  }

  generateBackgroundStars(count: number): BackgroundStar[] {
    return Array.from({ length: count }, () => ({
      left: `${Math.random() * this.worldSize}px`,
      top: `${Math.random() * this.worldSize}px`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      animation: `slowPulse ${5 + Math.random() * 10}s infinite ease-in-out`
    }));
  }

  handleMouseMove(
    e: React.MouseEvent,
    isDragging: boolean,
    telescopeRef: RefObject<HTMLDivElement | null>,
    mousePosition: MousePosition,
    setTelescopePosition: (updater: (pos: TelescopePosition) => TelescopePosition) => void,
    setMousePosition: (pos: MousePosition) => void
  ): void {
    if (!isDragging || !telescopeRef.current) return;
    
    const rect = telescopeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      const dx = x - mousePosition.x;
      const dy = y - mousePosition.y;
      
      setTelescopePosition(prevPos => ({
        x: prevPos.x - dx,
        y: prevPos.y - dy
      }));
    }
    
    setMousePosition({ x, y });
  }

  handleMouseDown(
    e: React.MouseEvent,
    telescopeRef: RefObject<HTMLDivElement | null>,
    setIsDragging: (dragging: boolean) => void,
    setMousePosition: (pos: MousePosition) => void
  ): void {
    if (!telescopeRef.current) return;
    if ((e.target as HTMLElement).closest('.constellation-star')) return;
    
    const rect = telescopeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setMousePosition({ x, y });
    e.preventDefault();
  }

  handleMouseUp(
    setIsDragging: (dragging: boolean) => void,
    setMousePosition: (pos: MousePosition) => void
  ): void {
    setIsDragging(false);
    setMousePosition({ x: 0, y: 0 });
  }

  getConstellationLineData(constellation: Constellation, selectedConstellation: string | null): ConstellationLineData[] {
    const lines: ConstellationLineData[] = [];
    for (let i = 0; i < constellation.stars.length - 1; i++) {
      const star1 = constellation.stars[i];
      const star2 = constellation.stars[i + 1];
      const dx = star2.x - star1.x;
      const dy = star2.y - star1.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      lines.push({
        key: `${constellation.name}-line-${i}`,
        left: star1.x,
        top: star1.y,
        width: length,
        height: 1,
        transform: `rotate(${angle}deg)`,
        opacity: selectedConstellation === constellation.name ? 0.8 : 0.3
      });
    }
    return lines;
  }

  getConstellationStarData(constellation: Constellation, selectedConstellation: string | null): ConstellationStarData[] {
    return constellation.stars.map((star, index) => ({
      key: `${constellation.name}-star-${index}`,
      left: star.x - 4,
      top: star.y - 4,
      width: 8,
      height: 8,
      boxShadow: selectedConstellation === constellation.name 
        ? '0 0 10px #64ffda, 0 0 20px #64ffda' 
        : '0 0 5px #64ffda',
      opacity: selectedConstellation === constellation.name ? 1 : 0.7
    }));
  }
}
