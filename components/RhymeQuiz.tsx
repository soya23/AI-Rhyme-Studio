
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
            alert('韻をさがしたい言葉を入力してください。');
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
    }
    
    const getButtonClass = (choice: string) => {
        if (gameState === 'result') {
            if (choice === quiz?.correct) {
                return 'bg-green-500 border-green-600 text-white scale-105'; // Correct answer
            }
            if (choice === selectedAnswer && !isCorrect) {
                return 'bg-red-500 border-red-600 text-white'; // Incorrectly selected
            }
            return 'bg-stone-200 border-stone-300 text-stone-500 opacity-70'; // Not selected or incorrect
        }
        return 'bg-white border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white'; // Default
    };

    return (
        <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg space-y-4">
            <h4 className="font-display text-stone-700">韻(いん)あてクイズ！</h4>
            
            {gameState === 'idle' || gameState === 'loading' ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
                        placeholder="例：人生"
                        className="flex-grow p-2 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    />
                    <button
                        onClick={handleGenerateQuiz}
                        disabled={gameState === 'loading'}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 text-stone-800 rounded-lg shadow-md hover:bg-yellow-500 disabled:bg-stone-400 transition-colors font-display"
                    >
                        <RefreshIcon className={`w-5 h-5 ${gameState === 'loading' ? 'animate-spin' : ''}`} />
                        {gameState === 'loading' ? '探し中...' : 'クイズ開始！'}
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-center text-stone-700 text-lg">
                        「<span className="font-bold font-display text-orange-500">{word}</span>」と韻をふむのはどれ？
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(choice)}
                                disabled={gameState === 'result'}
                                className={`p-3 border-2 rounded-lg shadow-sm transition-all duration-300 font-display text-base ${getButtonClass(choice)}`}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {gameState === 'result' && (
                 <div className="text-center p-3 bg-white rounded-lg border-2 border-amber-200 mt-4">
                    <h5 className={`font-display text-2xl mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '🎉 ピンポーン！正解！' : '🤔 ブブー！ざんねん！'}
                    </h5>
                    <p className="text-stone-600 mb-3">
                        {isCorrect ? 'いいセンスだ！この言葉を歌詞に使ってみよう！' : `正解は「${quiz?.correct}」でした！`}
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap">
                         <button
                            onClick={() => onWordSelect(selectedAnswer!)}
                            className="px-4 py-2 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors"
                        >
                            「{selectedAnswer}」を歌詞に追加
                        </button>
                        <button
                            onClick={handleRetry}
                            className="px-4 py-2 bg-stone-500 text-white text-sm rounded-full hover:bg-stone-600 transition-colors"
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
