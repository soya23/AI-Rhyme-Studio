import React from 'react';
import type { Option } from '../types';
import { MicrophoneIcon, PlayIcon } from './icons';

interface RecordSelectProps {
    options: Option[];
    onNavigate: (next: string) => void;
}

const optionIconMap: Record<string, React.FC<{ className?: string }>> = {
    record: MicrophoneIcon,
    mv_demo: PlayIcon
};

const RecordSelect: React.FC<RecordSelectProps> = ({ options, onNavigate }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {options.filter(opt => opt.next !== 'home').map((opt) => {
                const Icon = optionIconMap[opt.next] ?? MicrophoneIcon;
                return (
                    <button
                        key={opt.label}
                        onClick={() => onNavigate(opt.next)}
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

export default RecordSelect;
