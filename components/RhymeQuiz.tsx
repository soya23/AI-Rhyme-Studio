import React, { useState, useMemo } from 'react';
import { generateRhymeQuiz } from '../services/geminiService';
import { RefreshIcon } from './icons';

interface RhymeQuizProps {
    onWordSelect: (word: string) => void;
}

type GameState = 'idle' | 'loading' | 'playing' | 'result';

const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const RhymeQuiz: React.FC<RhymeQuizProps> = ({ onWordSelect }) => {
    const [word, setWord] = useState('');
    const [quiz, setQuiz] = useState<{ correct: string; incorrect: string[] } | null>(null);
    const [choices, setChoices] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [gameState, setGameState] = useState<GameState>('idle');

    const isCorrect = useMemo(() => {
        if (!quiz || !selectedAnswer) return null;
        return quiz.correct === selectedAnswer;
    }, [quiz, selectedAnswer]);

    const handleGenerateQuiz = async () => {
        if (!word.trim()) {
            alert('韻を探したい言葉を入力してください。');
            return;
        }
        setGameState('loading');
        setSelectedAnswer(null);
        const result = await generateRhymeQuiz(word);
        setQuiz(result);
        setChoices(shuffleArray([result.correct, ...result.incorrect]));
        setGameState('playing');
    };

    const handleSelectAnswer = (choice: string) => {
        if (gameState !== 'playing') return;
        setSelectedAnswer(choice);
        setGameState('result');
    };

    const handleRetry = () => {
        handleGenerateQuiz();
    };

    const getButtonClass = (choice: string) => {
        if (gameState === 'result') {
            if (choice === quiz?.correct) {
                return 'bg-[#3ECF8E] border-[#1F9C66] text-white scale-[1.02]';
            }
            if (choice === selectedAnswer && !isCorrect) {
                return 'bg-[#FF6B6B] border-[#C63E3E] text-white';
            }
            return 'bg-white/70 border-transparent text-[#9AA1C6]';
        }
        return 'bg-[#F4F5FF] border-[#CBD0FF] text-[#1F244B] hover:bg-[#FFD369]/30 hover:border-[#FFD369] hover:text-[#1B1233]';
    };

    return (
        <div className="p-5 bg-white/90 border border-[#D7DCFF] rounded-2xl space-y-4 shadow-sm">
            <h4 className="font-display text-[#1B1F3B] text-lg">韻（いん）当てクイズ</h4>

            {gameState === 'idle' || gameState === 'loading' ? (
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
                        placeholder="例：人生、笑顔、冒険..."
                        className="flex-1 p-3 border border-[#CBD0FF] rounded-2xl bg-white/80 focus:ring-4 focus:ring-[#A5B4FC]/40 focus:border-[#7D8DE2] transition placeholder:text-[#9AA1C6]"
                    />
                    <button
                        onClick={handleGenerateQuiz}
                        disabled={gameState === 'loading'}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FFD369] text-[#1F244B] font-display shadow-[0_6px_0_#C17F21] hover:-translate-y-0.5 hover:shadow-[0_10px_0_#C17F21] disabled:opacity-60 transition-all"
                    >
                        <RefreshIcon className={`w-5 h-5 ${gameState === 'loading' ? 'animate-spin' : ''}`} />
                        {gameState === 'loading' ? '探し中...' : 'クイズ開始！'}
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-center text-[#2F3560] text-lg">
                        「<span className="font-bold font-display text-[#FFD369]">{word}</span>」と韻をふむのはどれ？
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(choice)}
                                disabled={gameState === 'result'}
                                className={`p-3 border rounded-2xl shadow-sm transition-all duration-300 font-display text-base ${getButtonClass(choice)}`}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {gameState === 'result' && (
                <div className="text-center p-4 bg-white/80 rounded-2xl border border-[#D7DCFF]">
                    <h5 className={`font-display text-2xl mb-2 ${isCorrect ? 'text-[#19A769]' : 'text-[#E54848]'}`}>
                        {isCorrect ? '🎉 ビンゴ！正解！' : '💥 ざんねん！'}
                    </h5>
                    <p className="text-[#4B4F7A] mb-4">
                        {isCorrect ? 'ナイス韻感覚！この言葉を歌詞に入れてみよう。' : `正解は「${quiz?.correct}」でした。もう一度チャレンジする？`}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {selectedAnswer && (
                            <button
                                onClick={() => onWordSelect(selectedAnswer)}
                                className="px-4 py-2 bg-[#FFD369] text-[#1F244B] text-sm rounded-full font-display shadow hover:-translate-y-0.5 transition"
                            >
                                「{selectedAnswer}」を歌詞に追加
                            </button>
                        )}
                        <button
                            onClick={handleRetry}
                            className="px-4 py-2 bg-[#1B1F3B] text-white text-sm rounded-full font-display shadow hover:bg-[#282E66] transition"
                        >
                            もう一回！
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RhymeQuiz;
