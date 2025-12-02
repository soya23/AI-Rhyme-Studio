import React from 'react';
import type { Option } from '../types';
import { MicrophoneIcon, PlayIcon } from './icons';

interface RecordSelectProps {
    options: Option[];
    onNavigate: (next: string) => void;
}

const iconMap: { [key: string]: React.FC<{className?: string}> } = {
    '自分で録音する': MicrophoneIcon,
    'AIに歌ってもらう': PlayIcon
};

const RecordSelect: React.FC<RecordSelectProps> = ({ options, onNavigate }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {options.filter(opt => opt.next !== 'home').map((opt) => {
                const Icon = Object.entries(iconMap).find(([key]) => opt.label.includes(key))?.[1];
                return (
                    <button
                        key={opt.label}
                        onClick={() => onNavigate(opt.next)}
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

export default RecordSelect;
