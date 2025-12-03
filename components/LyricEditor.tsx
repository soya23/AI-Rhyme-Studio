import React, { useState } from 'react';
import { generateLyricSuggestion } from '../services/geminiService';
import { PencilIcon } from './icons';
import RhymeQuiz from './RhymeQuiz';

interface LyricEditorProps {
    aiPrompt: string;
    lyrics: string;
    onLyricsChange: (lyrics: string) => void;
}

const LyricEditor: React.FC<LyricEditorProps> = ({ aiPrompt, lyrics, onLyricsChange }) => {
    const [memory, setMemory] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetSuggestion = async () => {
        if (!memory.trim()) {
            alert('思い出を少し入力してくださいね。');
            return;
        }
        setIsLoading(true);
        setSuggestion('');
        try {
            const result = await generateLyricSuggestion(memory, aiPrompt);
            setSuggestion(result);
        } finally {
            setIsLoading(false);
        }
    };

    const addSuggestionToLyrics = () => {
        if (suggestion) {
            const separator = lyrics.trim().length === 0 ? '' : '\n\n';
            onLyricsChange(`${lyrics}${separator}${suggestion}`);
            setSuggestion('');
        }
    };

    const handleWordSelect = (word: string) => {
        const separator =
            lyrics.trim().length === 0 ? '' : lyrics.endsWith('\n') || lyrics.endsWith(' ') ? '' : ' ';
        onLyricsChange(`${lyrics}${separator}${word}`);
    };

    return (
        <div className="space-y-8">
            <div>
                <label htmlFor="memory" className="block text-lg font-display text-[#131740] mb-2">
                    1. まず、思い出を書き出してみよう
                </label>
                <textarea
                    id="memory"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="例：去年の夏、孫と一緒に行った夏祭り。金魚すくいを教えて、夜空の花火を一緒に眺めた。"
                    className="w-full h-28 p-4 bg-white/85 border border-white/40 rounded-2xl focus:ring-4 focus:ring-[#FFD369]/50 focus:border-[#FFD369] transition placeholder:text-[#8E94C7]"
                />
                <button
                    onClick={handleGetSuggestion}
                    disabled={isLoading}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#FFD369] text-[#261B26] rounded-[1.5rem] font-display shadow-[0_8px_0_#C17F21] hover:-translate-y-0.5 hover:shadow-[0_12px_0_#C17F21] disabled:opacity-60 disabled:translate-y-0 transition-all"
                >
                    <PencilIcon className="w-5 h-5" />
                    {isLoading ? 'AIが思い出を吟味中...' : 'AIにラップ化してもらう'}
                </button>
            </div>

            {suggestion && (
                <div className="p-5 bg-[#E6F6FF] border border-[#B0E0FF] rounded-2xl shadow-sm">
                    <h4 className="font-display text-[#0F1C45] text-lg">AIからの提案リリック</h4>
                    <p className="mt-3 text-[#2F3560] whitespace-pre-wrap leading-relaxed">{suggestion}</p>
                    <button
                        onClick={addSuggestionToLyrics}
                        className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-[#3FB7F8] text-white rounded-full text-sm font-display shadow hover:bg-[#2a9edc] transition-colors"
                    >
                        この歌詞を追加する
                    </button>
                </div>
            )}

            <div>
                <label className="block text-lg font-display text-[#131740] mb-3">2. 韻をふむ言葉をさがそう</label>
                <RhymeQuiz onWordSelect={handleWordSelect} />
            </div>

            <div>
                <label htmlFor="lyrics" className="block text-lg font-display text-[#131740] mb-2">
                    3. 完成した歌詞
                </label>
                <textarea
                    id="lyrics"
                    value={lyrics}
                    onChange={(e) => onLyricsChange(e.target.value)}
                    className="w-full h-56 p-4 bg-white/90 border border-white/40 rounded-2xl focus:ring-4 focus:ring-[#A5B4FC]/50 focus:border-[#7D8DE2] transition"
                />
            </div>
        </div>
    );
};

export default LyricEditor;
