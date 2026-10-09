import React from 'react';

interface NavigationHeaderProps {
  onOpenWorks: () => void;
  onOpenNobel: () => void;
  onOpenBiography: () => void;
  onOpenSpeech: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onOpenWorks,
  onOpenNobel,
  onOpenBiography,
  onOpenSpeech
}) => {
  return (
    <header className="relative z-20 flex items-center justify-between gap-8 px-6 md:px-10 py-4 bg-[#0a1414]/85 backdrop-blur-md border-b border-[#2a4542]/40 text-[#e8ded1]">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-serif-vintage text-xl md:text-2xl font-bold tracking-wide text-[#fdf4dc] whitespace-nowrap">
          Joseph Brodsky
        </span>
        <span className="hidden sm:inline text-xs tracking-wider text-[#c59b27] uppercase font-mono-code opacity-90">
          1987 Nobel Laureate
        </span>
      </div>

      {/* Zone 2: 4-5 concise single-line nav links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide uppercase text-stone-300">
        <button
          onClick={onOpenWorks}
          className="hover:text-[#fdf4dc] transition-colors whitespace-nowrap py-1 cursor-pointer hover:border-b hover:border-[#c59b27]"
        >
          Etched Volumes
        </button>
        <button
          onClick={onOpenNobel}
          className="hover:text-[#fdf4dc] transition-colors whitespace-nowrap py-1 cursor-pointer hover:border-b hover:border-[#c59b27]"
        >
          1987 Nobel Medal
        </button>
        <button
          onClick={onOpenBiography}
          className="hover:text-[#fdf4dc] transition-colors whitespace-nowrap py-1 cursor-pointer hover:border-b hover:border-[#c59b27]"
        >
          Chronicle & Trial
        </button>
        <button
          onClick={onOpenSpeech}
          className="hover:text-[#fdf4dc] transition-colors whitespace-nowrap py-1 cursor-pointer hover:border-b hover:border-[#c59b27]"
        >
          Nobel Address
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenWorks}
          className="px-4 py-2 text-xs font-semibold text-[#0a1414] bg-[#c59b27] hover:bg-[#dfb53f] transition-all rounded shadow-md whitespace-nowrap shrink-0 cursor-pointer"
        >
          Catalog of Works
        </button>
      </div>
    </header>
  );
};
