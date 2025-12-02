import React from 'react';
import type { Option } from '../types';
import { MusicNoteIcon, PencilIcon, MicrophoneIcon, BookOpenIcon, CameraIcon } from './icons';

interface BeatSelectionProps {
    options: Option[];
    onNavigate: (next: string, beatSelection?: string) => void;
    isHome: boolean;
}

const iconMap: { [key: string]: React.FC<{className?: string}> } = {
    'ビートを選ぶ': MusicNoteIcon,
    '歌詞': PencilIcon,
    '録音する': MicrophoneIcon,
    '動画をつくる': CameraIcon,
    '過去に作ったラップを聴く': BookOpenIcon
};

const BeatSelection: React.FC<BeatSelectionProps> = ({ options, onNavigate, isHome }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {options.map((opt) => {
                const Icon = isHome ? Object.entries(iconMap).find(([key]) => opt.label.includes(key))?.[1] : MusicNoteIcon;
                const beatSelection = isHome ? undefined : opt.label;
                return (
                    <button
                        key={opt.label}
                        onClick={() => onNavigate(opt.next, beatSelection)}
                        className="flex flex-col items-center justify-center text-center p-6 bg-amber-100 rounded-xl border-2 border-amber-200 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-amber-200 transition-all duration-300 ease-in-out"
                    >
                        {Icon && <Icon className="w-12 h-12 mb-3 text-orange-500" />}
                        <span className="font-display text-lg text-stone-700">{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BeatSelection;