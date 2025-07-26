import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { 
  TelescopeController, 
  Constellation, 
  TelescopePosition,
  MousePosition 
} from '../utils/telescopeController';
import constellationsData from '../data/constellations.json';

export const useStargazeSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedConstellation, setSelectedConstellation] = useState<string | null>(null);
  const [isDialogTransitioning, setIsDialogTransitioning] = useState(false);
  
  const VIEWPORT_SIZE = 600;
  const WORLD_SIZE = 1500;

  const telescopeController = useMemo(() => new TelescopeController(VIEWPORT_SIZE, WORLD_SIZE), [VIEWPORT_SIZE, WORLD_SIZE]);
  
  const [telescopePosition, setTelescopePosition] = useState<TelescopePosition>(
    () => telescopeController.getInitialPosition()
  );
  
  const sectionRef = useRef<HTMLElement>(null);
  const telescopeRef = useRef<HTMLDivElement>(null);

  const constellations = useMemo(() => constellationsData as Constellation[], []);

  const backgroundStars = useMemo(() => 
    telescopeController.generateBackgroundStars(100),
    [telescopeController]
  );

  const constellationRenderData = useMemo(() => {
    return constellations.map((constellation) => ({
      constellation,
      lineData: telescopeController.getConstellationLineData(constellation, selectedConstellation),
      starData: telescopeController.getConstellationStarData(constellation, selectedConstellation)
    }));
  }, [constellations, selectedConstellation, telescopeController]);

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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      telescopeController.handleMouseMove(
        e, isDragging, telescopeRef, mousePosition, setTelescopePosition, setMousePosition
      );
    }
  }, [isDragging, telescopeController, mousePosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    telescopeController.handleMouseDown(e, telescopeRef, setIsDragging, setMousePosition);
  }, [telescopeController]);

  const handleMouseUp = useCallback(() => {
    telescopeController.handleMouseUp(setIsDragging, setMousePosition);
  }, [telescopeController]);

  const handleConstellationClick = useCallback((constellationName: string) => {
    setSelectedConstellation(constellationName);
    setIsDialogTransitioning(false);
  }, []);

  const constellationLabelData = useMemo(() => {
    return constellations.map((constellation) => {
      const avgX = constellation.stars.reduce((sum, s) => sum + s.x, 0) / constellation.stars.length;
      const avgY = constellation.stars.reduce((sum, s) => sum + s.y, 0) / constellation.stars.length;
      return {
        name: constellation.name,
        left: avgX,
        top: avgY
      };
    });
  }, [constellations]);

  return {
    // State
    isVisible,
    selectedConstellation,
    isDialogTransitioning,
    telescopePosition,
    isDragging,
    
    // Constants
    VIEWPORT_SIZE,
    WORLD_SIZE,
    
    // Data
    constellations,
    backgroundStars,
    constellationRenderData,
    constellationLabelData,
    telescopeController,
    
    // Refs
    sectionRef,
    telescopeRef,
    
    // Handlers
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleConstellationClick,
    setTelescopePosition
  };
};
