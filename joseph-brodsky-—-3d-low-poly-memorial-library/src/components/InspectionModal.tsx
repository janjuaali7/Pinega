import React, { useState } from 'react';
import { LiteraryWork, InteractiveTarget } from '../types/brodsky';
import { BRODSKY_WORKS, NOBEL_PRIZE_DETAILS, BIOGRAPHY_DETAILS } from '../data/brodskyData';
import { audioAmbience } from '../utils/audioAmbience';
import {
  X,
  Volume2,
  BookOpen,
  Award,
  User,
  Coffee,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface InspectionModalProps {
  target: InteractiveTarget | null;
  onClose: () => void;
  onSelectWork: (work: LiteraryWork) => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  target,
  onClose,
  onSelectWork
}) => {
  const [activeLang, setActiveLang] = useState<'en' | 'ru'>('en');
  const [isReciting, setIsReciting] = useState<boolean>(false);

  if (!target) return null;

  const handleRecite = (text: string) => {
    if (isReciting) {
      audioAmbience.stopRecitation();
      setIsReciting(false);
    } else {
      setIsReciting(true);
      audioAmbience.reciteText(text, activeLang, () => {
        setIsReciting(false);
      });
    }
  };

  const handleClose = () => {
    audioAmbience.stopRecitation();
    setIsReciting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0d1717] border border-[#2d4744] rounded-2xl shadow-2xl text-[#e8ded1] flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0d1717]/95 border-b border-[#243a37] backdrop-blur-md">
          <div className="flex items-center gap-3">
            {target.type === 'work' && <BookOpen className="w-5 h-5 text-[#c59b27]" />}
            {target.type === 'nobel' && <Award className="w-5 h-5 text-[#ffd700]" />}
            {target.type === 'character' && <User className="w-5 h-5 text-[#c59b27]" />}
            {target.type === 'desk' && <Coffee className="w-5 h-5 text-[#85b59b]" />}

            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#c59b27]">
                {target.type === 'work' ? 'Etched Library Volume' : 'Exhibition Archive'}
              </span>
              <h3 className="font-serif-vintage text-xl sm:text-2xl font-bold text-[#fdf4dc] leading-tight">
                {target.type === 'work' && target.data ? target.data.title : target.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle (English / Russian) */}
            <div className="flex items-center bg-[#142424] p-0.5 rounded-lg border border-[#243a37]">
              <button
                onClick={() => {
                  audioAmbience.stopRecitation();
                  setIsReciting(false);
                  setActiveLang('en');
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                  activeLang === 'en' ? 'bg-[#c59b27] text-[#0a1414] font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  audioAmbience.stopRecitation();
                  setIsReciting(false);
                  setActiveLang('ru');
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                  activeLang === 'ru' ? 'bg-[#c59b27] text-[#0a1414] font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                РУ
              </button>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg bg-[#142424] hover:bg-[#1f3737] text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* 1. LITERARY WORK VIEW */}
          {target.type === 'work' && target.data && (
            <>
              {/* Russian title & Metadata strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#243a37]/80 text-xs text-stone-400">
                <span className="font-serif-vintage text-lg text-[#dfc374] italic">
                  {target.data.russianTitle}
                </span>
                <div className="flex items-center gap-2 font-mono-code text-[11px]">
                  <span>{target.data.genre}</span>
                  <span aria-hidden="true">·</span>
                  <span>Published {target.data.year}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-stone-300">
                {target.data.description}
              </p>

              {/* Prominent Quote Card */}
              <div className="p-5 rounded-xl bg-[#142525]/70 border border-[#2b4442] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#c59b27]">
                    Key Epigraph
                  </span>
                  <button
                    onClick={() => handleRecite(activeLang === 'en' ? target.data!.quoteEn : target.data!.quoteRu)}
                    className="flex items-center gap-1.5 text-xs text-[#c59b27] hover:text-[#dfb53f] transition-colors cursor-pointer"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isReciting ? 'animate-pulse text-[#6ee7b7]' : ''}`} />
                    <span>{isReciting ? 'Stop Recitation' : 'Listen'}</span>
                  </button>
                </div>
                <blockquote className="font-serif-vintage text-lg sm:text-xl text-[#fdf4dc] italic leading-relaxed">
                  «{activeLang === 'en' ? target.data.quoteEn : target.data.quoteRu}»
                </blockquote>
              </div>

              {/* Poetic Stanza / Excerpt */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono-code tracking-wider text-stone-400">
                  Manuscript Excerpt
                </h4>
                <div className="p-4 rounded-lg bg-[#0a1212] border border-[#1d302f] font-serif-vintage text-base text-stone-200 whitespace-pre-line leading-relaxed italic">
                  {activeLang === 'en' ? target.data.excerptEn : target.data.excerptRu}
                </div>
              </div>

              {/* Literary Significance */}
              <div className="pt-2">
                <h4 className="text-xs uppercase font-mono-code tracking-wider text-[#c59b27] mb-1">
                  Literary Legacy
                </h4>
                <p className="text-xs leading-relaxed text-stone-400">
                  {target.data.significance}
                </p>
              </div>

              {/* Quick cycle through etched books */}
              <div className="flex items-center justify-between pt-4 border-t border-[#243a37]">
                <span className="text-xs text-stone-500 font-mono-code">
                  Volume {BRODSKY_WORKS.findIndex((w) => w.id === target.data?.id) + 1} of {BRODSKY_WORKS.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const idx = BRODSKY_WORKS.findIndex((w) => w.id === target.data?.id);
                      const prevIdx = (idx - 1 + BRODSKY_WORKS.length) % BRODSKY_WORKS.length;
                      audioAmbience.playTypewriterClick();
                      onSelectWork(BRODSKY_WORKS[prevIdx]);
                    }}
                    className="p-1.5 rounded bg-[#142424] hover:bg-[#1d3535] text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title="Previous book"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      const idx = BRODSKY_WORKS.findIndex((w) => w.id === target.data?.id);
                      const nextIdx = (idx + 1) % BRODSKY_WORKS.length;
                      audioAmbience.playTypewriterClick();
                      onSelectWork(BRODSKY_WORKS[nextIdx]);
                    }}
                    className="p-1.5 rounded bg-[#142424] hover:bg-[#1d3535] text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title="Next book"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 2. NOBEL PRIZE IN LITERATURE VIEW */}
          {target.type === 'nobel' && (
            <>
              <div className="p-4 rounded-xl bg-[#2b220d]/60 border border-[#8a681c] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#ffd700]">
                  <Sparkles className="w-4 h-4 text-[#ffd700]" />
                  <span>The Swedish Academy · Stockholm, 1987</span>
                </div>
                <h4 className="font-serif-vintage text-xl font-bold text-[#fef3c7]">
                  Official Nobel Citation
                </h4>
                <p className="font-serif-vintage text-base text-[#fde68a] italic">
                  «{activeLang === 'en' ? NOBEL_PRIZE_DETAILS.officialCitation : NOBEL_PRIZE_DETAILS.officialCitationRu}»
                </p>
              </div>

              {/* Speech Excerpt */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-mono-code tracking-wider text-stone-300">
                    {NOBEL_PRIZE_DETAILS.speechTitle}
                  </h4>
                  <button
                    onClick={() => handleRecite(activeLang === 'en' ? NOBEL_PRIZE_DETAILS.addressExcerptEn : NOBEL_PRIZE_DETAILS.addressExcerptRu)}
                    className="flex items-center gap-1.5 text-xs text-[#c59b27] hover:text-[#dfb53f] transition-colors cursor-pointer"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isReciting ? 'animate-pulse text-[#6ee7b7]' : ''}`} />
                    <span>{isReciting ? 'Stop Recitation' : 'Listen to Address'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-lg bg-[#0a1212] border border-[#1d302f] font-serif-vintage text-sm leading-relaxed text-stone-300 space-y-3">
                  <p className="italic text-[#dfc374]">
                    «{activeLang === 'en' ? NOBEL_PRIZE_DETAILS.keyQuoteEn : NOBEL_PRIZE_DETAILS.keyQuoteRu}»
                  </p>
                  <p>
                    {activeLang === 'en' ? NOBEL_PRIZE_DETAILS.addressExcerptEn : NOBEL_PRIZE_DETAILS.addressExcerptRu}
                  </p>
                </div>
              </div>

              {/* Medal Presentation Note */}
              <div className="p-4 rounded-lg bg-[#142424] border border-[#243a37] text-xs text-stone-400 space-y-1">
                <span className="font-mono-code text-[#c59b27] uppercase">Medal Inscription</span>
                <p>
                  Crafted in 18-karat recycled gold by the Royal Swedish Mint, featuring Alfred Nobel’s side silhouette, the Roman year of his demise (MDCCCXCVI), and the muse of lyrical poetry with laurel branch.
                </p>
              </div>
            </>
          )}

          {/* 3. JOSEPH BRODSKY BIOGRAPHY VIEW */}
          {target.type === 'character' && (
            <>
              <div className="space-y-2 pb-3 border-b border-[#243a37]">
                <h4 className="font-serif-vintage text-2xl text-[#fdf4dc] font-bold">
                  {BIOGRAPHY_DETAILS.fullName}
                </h4>
                <div className="text-xs font-mono-code text-stone-400 space-y-1">
                  <div>Lifespan: {BIOGRAPHY_DETAILS.lifespan}</div>
                  <div>Final resting place: {BIOGRAPHY_DETAILS.restingPlace}</div>
                </div>
              </div>

              {/* 1964 Leningrad Trial Dialogue Box */}
              <div className="p-4 rounded-xl bg-[#1b1c24] border border-[#3b3e54] space-y-2">
                <span className="text-[11px] font-mono-code text-[#9fa8da] uppercase tracking-wider">
                  The Leningrad Trial (1964) · Recorded by Frida Vigdorova
                </span>
                <div className="font-serif-vintage text-base text-stone-200 space-y-2 italic">
                  <p>
                    <strong className="text-stone-400 not-italic">Judge Saveleva:</strong> «{activeLang === 'en' ? BIOGRAPHY_DETAILS.trialQuote.judge : BIOGRAPHY_DETAILS.trialQuote.judgeRu}»
                  </p>
                  <p className="text-[#ffd700]">
                    <strong className="text-[#c59b27] not-italic">Joseph Brodsky:</strong> «{activeLang === 'en' ? BIOGRAPHY_DETAILS.trialQuote.brodsky : BIOGRAPHY_DETAILS.trialQuote.brodskyRu}»
                  </p>
                </div>
              </div>

              {/* Overview */}
              <p className="text-sm leading-relaxed text-stone-300">
                {BIOGRAPHY_DETAILS.overview}
              </p>

              {/* Honors list */}
              <div className="space-y-2">
                <h5 className="text-xs uppercase font-mono-code tracking-wider text-[#c59b27]">
                  Major Honors & Appointments
                </h5>
                <ul className="text-xs space-y-1.5 text-stone-400 list-disc list-inside">
                  {BIOGRAPHY_DETAILS.majorHonors.map((honor, i) => (
                    <li key={i}>{honor}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* 4. WRITING DESK VIEW */}
          {target.type === 'desk' && (
            <>
              <p className="text-sm leading-relaxed text-stone-300">
                A reconstruction of Joseph Brodsky’s intimate workspace—blending his Leningrad room at Muruzi House on Liteyny Prospect with his study in South Hadley, Massachusetts and Greenwich Village, New York.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#142424] border border-[#243a37] space-y-1">
                  <h5 className="font-semibold text-[#fdf4dc] flex items-center gap-1.5">
                    <span className="text-[#c59b27]">●</span> Cyrillic Typewriter
                  </h5>
                  <p className="text-stone-400">
                    Brodsky typed hundreds of poems on manual mechanical typewriters, revising lines strictly in rhythmic cadence with the strike of the metal hammers.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#142424] border border-[#243a37] space-y-1">
                  <h5 className="font-semibold text-[#fdf4dc] flex items-center gap-1.5">
                    <span className="text-[#85b59b]">●</span> Green Banker’s Lamp
                  </h5>
                  <p className="text-stone-400">
                    The classic emerald Bibliotheca lamp of Russian libraries and reading rooms, creating an intimate sanctuary of amber incandescent focus in the winter darkness.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#142424] border border-[#243a37] space-y-1">
                  <h5 className="font-semibold text-[#fdf4dc] flex items-center gap-1.5">
                    <span className="text-[#dfc374]">●</span> Russian Podstakannik
                  </h5>
                  <p className="text-stone-400">
                    A tea glass nestled inside a silver filigree holder with a slice of lemon—the timeless beverage of Russian literary circles during long night conversations.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#142424] border border-[#243a37] space-y-1">
                  <h5 className="font-semibold text-[#fdf4dc] flex items-center gap-1.5">
                    <span className="text-[#c59b27]">●</span> Fountain Pen & Verse
                  </h5>
                  <p className="text-stone-400">
                    Drafting handwritten drafts in purple ink, measuring meters with his fingers before translating his thoughts into English and Russian.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
