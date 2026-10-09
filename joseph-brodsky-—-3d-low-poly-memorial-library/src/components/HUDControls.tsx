import React from 'react';
import { CameraPreset, AtmosphereMode } from '../types/brodsky';
import { CAMERA_PRESETS, ATMOSPHERE_MODES } from '../data/brodskyData';
import {
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  Maximize2,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface HUDControlsProps {
  activePresetId: string;
  onSelectPreset: (presetId: string) => void;
  atmosphere: AtmosphereMode;
  onSelectAtmosphere: (mode: AtmosphereMode) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onOpenWorksCatalog: () => void;
}

export const HUDControls: React.FC<HUDControlsProps> = ({
  activePresetId,
  onSelectPreset,
  atmosphere,
  onSelectAtmosphere,
  isAudioPlaying,
  onToggleAudio,
  isAutoRotating,
  onToggleAutoRotate,
  onOpenWorksCatalog
}) => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex flex-col items-center gap-3 px-4">
      {/* Top micro-guide line */}
      <div className="pointer-events-auto flex items-center gap-3 px-3.5 py-1.5 rounded bg-[#0b1414]/80 backdrop-blur-md border border-[#2a4542]/50 text-[11px] text-stone-300 shadow-lg">
        <span className="text-[#c59b27] font-medium">3D Spatial Controls</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span>Drag to orbit 360°</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span>Scroll to zoom</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span>Click character, medal & etched books to inspect</span>
      </div>

      {/* Main Dock Controls */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#0b1414]/90 backdrop-blur-lg border border-[#2d4744]/70 rounded-xl shadow-2xl max-w-4xl">
        {/* Camera Views Segmented Group */}
        <div className="flex items-center gap-1 bg-[#132323] p-1 rounded-lg border border-[#213837]">
          {CAMERA_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#c59b27] text-[#0a1414] font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-[#fdf4dc] hover:bg-[#1c3332]'
                }`}
                title={preset.description}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Atmosphere Selector */}
        <div className="flex items-center gap-1 bg-[#132323] p-1 rounded-lg border border-[#213837]">
          <span className="text-[10px] uppercase font-mono-code text-stone-400 px-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#c59b27]" />
            Atmosphere:
          </span>
          <select
            value={atmosphere}
            onChange={(e) => onSelectAtmosphere(e.target.value as AtmosphereMode)}
            className="bg-[#0b1414] text-xs text-[#fdf4dc] py-1.5 px-2.5 rounded border border-[#2d4744] focus:outline-none focus:border-[#c59b27] cursor-pointer"
          >
            {ATMOSPHERE_MODES.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-1">
          {/* Ambient Audio Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
              isAudioPlaying
                ? 'bg-[#1b3d39] border-[#448076] text-[#6ee7b7]'
                : 'bg-[#132323] border-[#213837] text-stone-300 hover:text-white'
            }`}
            title={isAudioPlaying ? 'Mute 90s tape & room tone' : 'Enable 90s tape room tone'}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAudioPlaying ? '90s Sound On' : 'Ambience'}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={onToggleAutoRotate}
            className={`p-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
              isAutoRotating
                ? 'bg-[#3b2d18] border-[#a67c1e] text-[#ffd700]'
                : 'bg-[#132323] border-[#213837] text-stone-300 hover:text-white'
            }`}
            title={isAutoRotating ? 'Pause rotation' : 'Continuous orbit view'}
          >
            <Compass className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Orbit</span>
          </button>

          {/* Open Catalog */}
          <button
            onClick={onOpenWorksCatalog}
            className="p-2 rounded-lg bg-[#132323] border border-[#213837] text-stone-300 hover:text-[#fdf4dc] hover:bg-[#1c3332] transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Browse all etched poetry & essays"
          >
            <BookOpen className="w-4 h-4 text-[#c59b27]" />
            <span className="hidden sm:inline">All Works</span>
          </button>
        </div>
      </div>
    </div>
  );
};
