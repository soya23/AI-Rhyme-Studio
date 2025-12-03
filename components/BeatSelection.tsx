import React from 'react';
import type { Option } from '../types';
import { MusicNoteIcon, PencilIcon, MicrophoneIcon, BookOpenIcon, CameraIcon } from './icons';

interface BeatSelectionProps {
    options: Option[];
    onNavigate: (next: string, beatSelection?: string) => void;
    isHome: boolean;
}

const homeIconMap: Record<string, React.FC<{ className?: string }>> = {
    beat_select: MusicNoteIcon,
    lyric: PencilIcon,
    record_select: MicrophoneIcon,
    video_create_select: CameraIcon,
    album: BookOpenIcon
};

const BeatSelection: React.FC<BeatSelectionProps> = ({ options, onNavigate, isHome }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {options.map((opt) => {
                const Icon = isHome ? homeIconMap[opt.next] : MusicNoteIcon;
                const beatSelection = isHome ? undefined : opt.label;
                return (
                    <button
                        key={opt.label}
                        onClick={() => onNavigate(opt.next, beatSelection)}
                        className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-white/40 bg-gradient-to-b from-white/95 to-[#F0F2FF] shadow-[0_18px_35px_rgba(20,19,53,0.18)] hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(10,11,43,0.25)] hover:bg-[#EEF1FF] transition-all duration-300 ease-out"
                    >
                        {Icon && <Icon className="w-12 h-12 mb-3 text-[#FFE28F]" />}
                        <span className="font-display text-lg text-[#1F244B]">{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BeatSelection;
