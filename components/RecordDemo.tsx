import React, { useState, useEffect } from 'react';
import { MicrophoneIcon } from './icons';

interface RecordDemoProps {
    lyrics: string;
    beat: string | null;
}

const RecordDemo: React.FC<RecordDemoProps> = ({ lyrics, beat }) => {
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        let interval: number | undefined;
        if (isRecording) {
            interval = window.setInterval(() => {
                // animation placeholder
            }, 500);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRecording]);

    const handleRecordClick = () => {
        setIsRecording(prev => !prev);
    };

    return (
        <div className="space-y-6 text-center text-[#1B1F3B]">
            <div className="p-5 bg-white/90 rounded-2xl border border-[#D7DCFF] shadow-sm max-h-48 overflow-y-auto">
                <h4 className="font-display text-[#4B4F7A] border-b border-[#E6E8FF] pb-2 mb-3">あなたの歌詞</h4>
                <p className="text-sm text-[#1D2247] whitespace-pre-wrap leading-relaxed">
                    {lyrics || '歌詞がまだありません。'}
                </p>
            </div>

            <div className="p-4 bg-[#E8ECFF] rounded-2xl border border-[#CBD0FF]">
                <p className="text-sm text-[#1B1F3B]">
                    選択中のビート：<span className="font-bold">{beat || '未選択'}</span>
                </p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <button
                    type="button"
                    onClick={handleRecordClick}
                    className="relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                >
                    <div className={`absolute inset-0 rounded-full ${isRecording ? 'bg-[#FF6B6B]' : 'bg-[#1B1F3B]'} shadow-[0_15px_35px_rgba(15,23,72,0.35)]`} />
                    <MicrophoneIcon className={`relative w-14 h-14 text-white transition-transform ${isRecording ? 'scale-110' : ''}`} />
                    {isRecording && (
                        <span className="absolute inset-0 rounded-full border-4 border-[#FFB4B4] animate-ping" />
                    )}
                </button>
                <p className={`font-display text-xl ${isRecording ? 'text-[#FF6B6B] animate-pulse' : 'text-[#4B4F7A]'}`}>
                    {isRecording ? '録音中…（デモ）' : 'マイクをタップして録音開始！'}
                </p>
                <p className="text-xs text-[#7D82AA]">
                    ※ デモ表示のため実際の音声は録音されません
                </p>
            </div>
        </div>
    );
};

export default RecordDemo;
