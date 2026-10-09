import React from 'react';
import { LiteraryWork } from '../types/brodsky';
import { BRODSKY_WORKS } from '../data/brodskyData';
import { audioAmbience } from '../utils/audioAmbience';
import { X, BookOpen, ExternalLink } from 'lucide-react';

interface WorksCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWork: (work: LiteraryWork) => void;
}

export const WorksCatalogModal: React.FC<WorksCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectWork
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0c1616] border border-[#2d4744] rounded-2xl shadow-2xl text-[#e8ded1] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0c1616]/95 border-b border-[#243a37] backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#c59b27]" />
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#c59b27]">
                Library Archives
              </span>
              <h3 className="font-serif-vintage text-2xl font-bold text-[#fdf4dc]">
                Etched Poetry & Literary Volumes
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#142424] hover:bg-[#1f3737] text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Catalog Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {BRODSKY_WORKS.map((work) => (
            <div
              key={work.id}
              onClick={() => {
                audioAmbience.playTypewriterClick();
                onSelectWork(work);
              }}
              className="p-5 rounded-xl bg-[#122121]/80 hover:bg-[#182b2a] border border-[#233b39] hover:border-[#c59b27]/60 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-stone-400 font-mono-code mb-1">
                  <span>{work.genre}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#c59b27] font-semibold">{work.year}</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-serif-vintage text-xl font-bold text-[#fdf4dc] group-hover:text-[#ffd700] transition-colors">
                    {work.title}
                  </h4>
                  <span className="font-serif-vintage text-sm text-[#dfc374] italic">
                    {work.russianTitle}
                  </span>
                </div>

                <p className="text-xs text-stone-300 mt-2 line-clamp-2 leading-relaxed">
                  {work.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1e3432] flex items-center justify-between text-xs text-stone-400">
                <span className="font-serif-vintage italic text-stone-300 truncate max-w-[280px]">
                  «{work.quoteEn}»
                </span>
                <span className="text-[#c59b27] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium text-[11px]">
                  Inspect <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
