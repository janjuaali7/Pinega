/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { NavigationHeader } from './components/NavigationHeader';
import { HUDControls } from './components/HUDControls';
import { InspectionModal } from './components/InspectionModal';
import { WorksCatalogModal } from './components/WorksCatalogModal';
import { AtmosphereMode, InteractiveTarget, LiteraryWork } from './types/brodsky';
import { BRODSKY_WORKS } from './data/brodskyData';
import { audioAmbience } from './utils/audioAmbience';

export default function App() {
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('twilight');
  const [activePresetId, setActivePresetId] = useState<string>('overview');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useState<InteractiveTarget | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  // Audio ambience toggle
  const handleToggleAudio = useCallback(() => {
    const isNowPlaying = audioAmbience.toggle();
    setIsAudioPlaying(isNowPlaying);
  }, []);

  // Handle object selection from 3D canvas
  const handleSelectTarget = useCallback((target: InteractiveTarget) => {
    setSelectedTarget(target);
  }, []);

  // Handle selecting a work from modals
  const handleSelectWork = useCallback((work: LiteraryWork) => {
    setSelectedTarget({
      type: 'work',
      data: work,
      title: work.title
    });
    setIsCatalogOpen(false);
  }, []);

  // Header quick navigation triggers
  const handleOpenWorks = useCallback(() => {
    setIsCatalogOpen(true);
  }, []);

  const handleOpenNobel = useCallback(() => {
    setActivePresetId('nobel');
    setSelectedTarget({
      type: 'nobel',
      title: '1987 Nobel Prize in Literature'
    });
  }, []);

  const handleOpenBiography = useCallback(() => {
    setActivePresetId('brodsky');
    setSelectedTarget({
      type: 'character',
      title: 'Joseph Brodsky (1940–1996)'
    });
  }, []);

  const handleOpenSpeech = useCallback(() => {
    setSelectedTarget({
      type: 'nobel',
      title: 'Nobel Lecture & Address (1987)'
    });
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a1414] text-[#e8ded1] flex flex-col font-sans select-none">
      {/* 90s filmic vignette and warm color grading overlay */}
      <div className="absolute inset-0 vignette-overlay z-10 pointer-events-none" />
      <div className="absolute inset-0 dust-grain z-10 pointer-events-none opacity-40" />

      {/* Top Bar (adhering to Top Bar Contract) */}
      <NavigationHeader
        onOpenWorks={handleOpenWorks}
        onOpenNobel={handleOpenNobel}
        onOpenBiography={handleOpenBiography}
        onOpenSpeech={handleOpenSpeech}
      />

      {/* 3D WebGL Canvas Viewport */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <ThreeCanvas
          atmosphere={atmosphere}
          activePresetId={activePresetId}
          isAutoRotating={isAutoRotating}
          onSelectTarget={handleSelectTarget}
        />
      </main>

      {/* Floating Spatial HUD Controls */}
      <HUDControls
        activePresetId={activePresetId}
        onSelectPreset={setActivePresetId}
        atmosphere={atmosphere}
        onSelectAtmosphere={setAtmosphere}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        isAutoRotating={isAutoRotating}
        onToggleAutoRotate={() => setIsAutoRotating((prev) => !prev)}
        onOpenWorksCatalog={handleOpenWorks}
      />

      {/* Detailed Modal for Books, Nobel Medal, Desk, and Character */}
      <InspectionModal
        target={selectedTarget}
        onClose={() => setSelectedTarget(null)}
        onSelectWork={handleSelectWork}
      />

      {/* All Works Catalog Modal */}
      <WorksCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectWork={handleSelectWork}
      />
    </div>
  );
}

