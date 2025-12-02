
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
        const result = await generateLyricSuggestion(memory, aiPrompt);
        setSuggestion(result);
        setIsLoading(false);
    };
    
    const addSuggestionToLyrics = () => {
        if(suggestion) {
            const separator = lyrics.trim().length === 0 ? '' : '\n\n';
            onLyricsChange(`${lyrics}${separator}${suggestion}`);
            setSuggestion('');
        }
    }

    const handleWordSelect = (word: string) => {
        const separator = lyrics.trim().length === 0 ? '' : (lyrics.endsWith('\n') || lyrics.endsWith(' ') ? '' : ' ');
        onLyricsChange(`${lyrics}${separator}${word}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="memory" className="block text-lg font-display text-stone-700 mb-2">1. まずは思い出を書いてみよう</label>
                <textarea
                    id="memory"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="例：昔、孫と一緒に行った夏祭り。花火がとてもきれいだったなあ。"
                    className="w-full h-24 p-3 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
                <button
                    onClick={handleGetSuggestion}
                    disabled={isLoading}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 disabled:bg-stone-400 transition-colors"
                >
                    <PencilIcon className="w-5 h-5"/>
                    {isLoading ? 'AIが考え中...' : 'AIに歌詞化をたのむ'}
                </button>
            </div>

            {suggestion && (
                <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-r-lg">
                    <h4 className="font-display text-green-800">AIからの提案歌詞：</h4>
                    <p className="mt-2 text-stone-700 whitespace-pre-wrap">{suggestion}</p>
                    <button onClick={addSuggestionToLyrics} className="mt-3 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600">
                        ↓ これを歌詞に追加する
                    </button>
                </div>
            )}

            <div>
                <label className="block text-lg font-display text-stone-700 mb-2">2. 韻をふむ言葉をさがそう</label>
                <RhymeQuiz onWordSelect={handleWordSelect} />
            </div>

            <div>
                <label htmlFor="lyrics" className="block text-lg font-display text-stone-700 mb-2">3. 完成した歌詞</label>
                <textarea
                    id="lyrics"
                    value={lyrics}
                    onChange={(e) => onLyricsChange(e.target.value)}
                    className="w-full h-48 p-3 bg-amber-50 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
            </div>
        </div>
    );
};

export default LyricEditor;
