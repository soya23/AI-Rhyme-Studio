
import React, { useState, useEffect } from 'react';
import { MicrophoneIcon } from './icons';

interface RecordDemoProps {
    lyrics: string;
    beat: string | null;
}

const RecordDemo: React.FC<RecordDemoProps> = ({ lyrics, beat }) => {
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        let interval: number;
        if (isRecording) {
            interval = window.setInterval(() => {
                // This is just for demo visual effect
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isRecording]);
    
    const handleRecordClick = () => {
        setIsRecording(prev => !prev);
    }

    return (
        <div className="space-y-6 text-center">
            <div className="p-4 bg-stone-100 rounded-lg max-h-48 overflow-y-auto border">
                <h4 className="font-display text-stone-600 border-b pb-2 mb-2">あなたの歌詞</h4>
                <p className="text-stone-800 whitespace-pre-wrap text-sm">{lyrics || "歌詞がまだありません。"}</p>
            </div>
            
            <div className="p-3 bg-blue-100 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">選択中のビート: <span className="font-bold">{beat || '未選択'}</span></p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
                <div 
                    className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500' : 'bg-stone-300'}`}
                >
                    <MicrophoneIcon className={`w-12 h-12 text-white transition-transform ${isRecording ? 'scale-110' : ''}`} />
                    {isRecording && (
                        <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                    )}
                </div>
                <p className={`font-display text-xl ${isRecording ? 'text-red-600 animate-pulse' : 'text-stone-600'}`}>
                    {isRecording ? '録音中... (デモ)' : '録音ボタンを押してね'}
                </p>
                <p className="text-xs text-stone-500">（このアプリはデモのため、実際の音声は録音されません）</p>
            </div>
        </div>
    );
};

export default RecordDemo;
