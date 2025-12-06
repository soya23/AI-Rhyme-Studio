import React from 'react';
import type { Option } from '../types';
import { MusicNoteIcon, PencilIcon, MicrophoneIcon, BookOpenIcon, CameraIcon, HomeIcon } from './icons';

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

const homeStepDescriptions: Record<string, string> = {
    beat_select: '好きなリズムを押して、気分にぴったりのビートを決めましょう。',
    lyric: '思い出メモから歌詞をAIと一緒に考えます。',
    record_select: '歌う方法を選んで、ラップを形にしましょう。',
    video_create_select: '写真や動画を合わせて、思い出ムービーに仕上げます。',
    album: 'これまでのラップを家族といっしょに振り返りましょう。'
};

const BeatSelection: React.FC<BeatSelectionProps> = ({ options, onNavigate, isHome }) => {
    if (isHome) {
        return (
            <div className="space-y-4">
                {options.map((opt, index) => {
                    const Icon = homeIconMap[opt.next] ?? MusicNoteIcon;
                    return (
                        <button
                            key={opt.label}
                            onClick={() => onNavigate(opt.next)}
                            className="w-full flex items-center gap-4 text-left p-5 rounded-3xl border border-[#E3E6FF] bg-white shadow-[0_20px_45px_rgba(19,23,66,0.15)] hover:bg-[#F7F8FF] transition-all duration-300"
                        >
                            <div className="flex flex-col items-center justify-center px-3">
                                <span className="text-[11px] uppercase tracking-widest text-[#8A90C6]">ステップ</span>
                                <span className="text-3xl font-display text-[#3F3AC5]">{index + 1}</span>
                            </div>
                            {Icon && (
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5D7] text-[#E3A626]">
                                    <Icon className="w-8 h-8" />
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-display text-xl text-[#1F244B]">{opt.label}</p>
                                <p className="text-sm text-[#4B4F7A] mt-1">
                                    {homeStepDescriptions[opt.next] ?? 'このボタンを押して次のステップへ進みましょう。'}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        );
    }

    const goHomeOption = options.find((opt) => opt.next === 'home');
    const beatOptions = options.filter((opt) => opt.next !== 'home');

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {beatOptions.map((opt) => {
                    const beatSelection = opt.label;
                    return (
                        <button
                            key={opt.label}
                            onClick={() => onNavigate(opt.next, beatSelection)}
                            className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-white/40 bg-gradient-to-b from-white/95 to-[#F0F2FF] shadow-[0_18px_35px_rgba(20,19,53,0.18)] hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(10,11,43,0.25)] hover:bg-[#EEF1FF] transition-all duration-300 ease-out"
                        >
                            <MusicNoteIcon className="w-12 h-12 mb-3 text-[#FFE28F]" />
                            <span className="font-display text-lg text-[#1F244B]">{opt.label}</span>
                        </button>
                    );
                })}
            </div>

            {goHomeOption && (
                <button
                    onClick={() => onNavigate(goHomeOption.next)}
                    className="w-full flex items-center justify-center gap-3 rounded-2xl border border-[#DCE0FF] bg-[#F8F9FF] text-[#1F244B] font-display text-lg py-4 shadow-[0_12px_28px_rgba(25,26,65,0.15)] hover:bg-white transition"
                >
                    <HomeIcon className="w-6 h-6 text-[#3F3AC5]" />
                    {goHomeOption.label}
                </button>
            )}
        </div>
    );
};

export default BeatSelection;
