import React, { useState, useCallback, useMemo } from 'react';
import { APP_DATA } from './constants';
import type { ScreenData, AlbumEntry } from './types';
import BeatSelection from './components/BeatSelection';
import LyricEditor from './components/LyricEditor';
import RecordDemo from './components/RecordDemo';
import MvDemo from './components/MvDemo';
import Album from './components/Album';
import { HomeIcon } from './components/icons';
import RecordSelect from './components/RecordSelect';
import VideoCreateSelect from './components/VideoCreateSelect';
import GrandpaHero from './components/GrandpaHero';

const heroTagline = '昭和フロー × 令和AIで人生をラップに残そう';

const defaultLyrics = `ここに歌詞を書いてみよう！

例：
ワシの人生 まるで演歌
酸いも甘いも乗り越えた戦果
孫の笑顔が 一番の援歌
まだまだこれから 人生謳歌！`;

const App: React.FC = () => {
    const [screenId, setScreenId] = useState('home');
    const [beat, setBeat] = useState<string | null>(null);
    const [lyrics, setLyrics] = useState<string>(defaultLyrics);
    const [albumEntries, setAlbumEntries] = useState<AlbumEntry[]>([
        {
            id: 1,
            title: 'わしの人生演歌',
            date: '2024年7月15日',
            beat: '演歌風ビート（しっとり）',
            lyrics: defaultLyrics,
            image: 'https://picsum.photos/seed/grandpa/400/300'
        }
    ]);

    const currentScreen: ScreenData = useMemo(() => {
        return APP_DATA.screens.find((s) => s.id === screenId)!;
    }, [screenId]);

    const handleNavigate = useCallback(
        (next: string, beatSelection?: string) => {
            if (beatSelection) {
                setBeat(beatSelection);
            }
            if (next === 'album' && currentScreen.id === 'mv_demo') {
                if (beat && lyrics && lyrics.length > 20) {
                    const newEntry: AlbumEntry = {
                        id: Date.now(),
                        title: `思い出ラップ ${new Date().toLocaleDateString('ja-JP')}`,
                        date: new Date().toLocaleDateString('ja-JP'),
                        beat: beat,
                        lyrics: lyrics,
                        image: `https://picsum.photos/seed/${Date.now()}/400/300`
                    };
                    if (!albumEntries.some((e) => e.beat === newEntry.beat && e.lyrics === newEntry.lyrics)) {
                        setAlbumEntries((prev) => [newEntry, ...prev]);
                    }
                }
            }
            setScreenId(next);
        },
        [beat, lyrics, albumEntries, currentScreen.id]
    );

    const renderScreenContent = () => {
        switch (screenId) {
            case 'home':
                return <BeatSelection options={currentScreen.options} onNavigate={handleNavigate} isHome={true} />;
            case 'beat_select':
                return <BeatSelection options={currentScreen.options} onNavigate={handleNavigate} isHome={false} />;
            case 'lyric':
                return <LyricEditor aiPrompt={currentScreen.ai_prompt!} lyrics={lyrics} onLyricsChange={setLyrics} />;
            case 'record_select':
                return <RecordSelect options={currentScreen.options} onNavigate={handleNavigate} />;
            case 'record':
                return <RecordDemo lyrics={lyrics} beat={beat} />;
            case 'video_create_select':
                return <VideoCreateSelect options={currentScreen.options} onNavigate={handleNavigate} />;
            case 'mv_demo':
                return <MvDemo />;
            case 'album':
                return <Album entries={albumEntries} />;
            default:
                return null;
        }
    };

    const contentOptionScreens = ['home', 'beat_select', 'record_select', 'video_create_select'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#556CFF] via-[#3F3AC5] to-[#171433] flex flex-col items-center justify-center px-4 py-10 transition-all duration-500">
            <div className="relative w-full max-w-3xl bg-white/90 backdrop-blur-2xl rounded-[2.75rem] shadow-[0_35px_95px_rgba(7,6,31,0.6)] border border-white/30 overflow-hidden">
                <header className="relative bg-gradient-to-b from-[#5F7CFF] via-[#4A44CE] to-[#2A255B] text-white px-6 py-10 flex flex-col items-center">
                    <div className="absolute inset-0">
                        <div className="absolute -left-12 -top-10 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
                        <div className="absolute right-4 top-6 w-28 h-28 bg-[#FFE28F]/55 rounded-full blur-xl" />
                        <div className="absolute right-[-40px] bottom-[-40px] w-44 h-44 border border-white/25 rounded-full" />
                    </div>
                    <div className="relative flex flex-col items-center gap-4 text-center">
                        <GrandpaHero className="w-44 h-44 rounded-[1.5rem] shadow-[0_25px_50px_rgba(9,7,28,0.6)] border border-white/30 object-cover" />
                        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/80">{heroTagline}</p>
                        <h1 className="text-2xl md:text-3xl font-bold font-display tracking-wide drop-shadow-[0_6px_20px_rgba(9,5,26,0.45)]">
                            {currentScreen.title}
                        </h1>
                    </div>
                </header>

                <main className="px-6 md:px-10 py-8 space-y-6 bg-gradient-to-b from-white/95 via-white/92 to-[#F3F2FF] text-[#1F244B]">
                    <p className="text-base md:text-lg whitespace-pre-line text-center leading-relaxed text-[#4B4F7A]">{currentScreen.text}</p>

                    <div className="content-area">{renderScreenContent()}</div>
                </main>

                <footer className="px-6 md:px-10 py-6 bg-[#EEF0FF]/75 backdrop-blur border-t border-white/40">
                    <div className="flex flex-wrap justify-center gap-3">
                        {!contentOptionScreens.includes(screenId) &&
                            currentScreen.options.map((opt) => (
                                <button
                                    key={opt.label}
                                    onClick={() => handleNavigate(opt.next)}
                                    className="px-5 py-3 rounded-full font-display text-sm md:text-base bg-[#FFD369] text-[#261B26] border-2 border-[#E0A63B] shadow-[0_6px_0_#C17F21] hover:-translate-y-0.5 hover:shadow-[0_10px_0_#C17F21] transition-all duration-300 ease-in-out"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        {screenId !== 'home' && !currentScreen.options.some((opt) => opt.next === 'home') && (
                            <button
                                onClick={() => handleNavigate('home')}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-display text-sm md:text-base bg-[#1B1F3B] text-white border-2 border-[#2F345A] shadow-[0_6px_0_#141833] hover:bg-[#262C59] transition-all duration-300 ease-in-out"
                            >
                                <HomeIcon className="w-5 h-5" />
                                ホームに戻る
                            </button>
                        )}
                    </div>
                </footer>
            </div>
            <p className="mt-6 text-sm text-white/80 font-display tracking-[0.2em] uppercase">{APP_DATA.app.name}</p>
        </div>
    );
};

export default App;
