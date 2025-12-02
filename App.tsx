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


const App: React.FC = () => {
    const [screenId, setScreenId] = useState('home');
    const [beat, setBeat] = useState<string | null>(null);
    const [lyrics, setLyrics] = useState<string>(
        "ここに歌詞を書いてみよう！\n\n例：\nワシの人生 まるで演歌\n酸いも甘いも 乗り越えた戦果\n孫の笑顔が 一番の援歌\nまだまだこれから 人生謳歌！"
    );
    const [albumEntries, setAlbumEntries] = useState<AlbumEntry[]>([
        { id: 1, title: "わしの人生演歌", date: "2024年7月15日", beat: "演歌風ビート（しっとり）", lyrics: "ワシの人生 まるで演歌\n酸いも甘いも 乗り越えた戦果\n孫の笑顔が 一番の援歌\nまだまだこれから 人生謳歌！", image: "https://picsum.photos/seed/grandpa/400/300" }
    ]);

    const currentScreen: ScreenData = useMemo(() => {
        return APP_DATA.screens.find(s => s.id === screenId)!;
    }, [screenId]);

    const handleNavigate = useCallback((next: string, beatSelection?: string) => {
        if (beatSelection) {
            setBeat(beatSelection);
        }
        if (next === "album" && currentScreen.id === "mv_demo") {
            if (beat && lyrics && lyrics.length > 20) {
                const newEntry: AlbumEntry = {
                    id: Date.now(),
                    title: `思い出ラップ ${new Date().toLocaleDateString('ja-JP')}`,
                    date: new Date().toLocaleDateString('ja-JP'),
                    beat: beat,
                    lyrics: lyrics,
                    image: `https://picsum.photos/seed/${Date.now()}/400/300`
                };
                if (!albumEntries.some(e => e.beat === newEntry.beat && e.lyrics === newEntry.lyrics)) {
                    setAlbumEntries(prev => [newEntry, ...prev]);
                }
            }
        }
        setScreenId(next);
    }, [beat, lyrics, albumEntries, currentScreen.id]);
    
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

    // Screens where options are displayed in the main content area, so we hide them from the footer.
    const contentOptionScreens = ['home', 'beat_select', 'record_select', 'video_create_select'];

    return (
        <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 transition-all duration-500">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-stone-200">
                <header className="p-4 bg-orange-400 text-white text-center border-b-4 border-orange-500">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-wider">{currentScreen.title}</h1>
                </header>

                <main className="p-6 md:p-8 space-y-6">
                    <p className="text-stone-600 text-base md:text-lg whitespace-pre-line text-center leading-relaxed">
                        {currentScreen.text}
                    </p>
                    
                    <div className="content-area">
                        {renderScreenContent()}
                    </div>
                </main>

                <footer className="p-4 bg-stone-100 border-t-2 border-stone-200">
                    <div className="flex flex-wrap justify-center gap-3">
                       {!contentOptionScreens.includes(screenId) && currentScreen.options.map((opt) => (
                           <button
                               key={opt.label}
                               onClick={() => handleNavigate(opt.next)}
                               className="px-5 py-3 bg-white border-2 border-orange-400 text-orange-500 rounded-full shadow-md hover:bg-orange-400 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out text-sm md:text-base"
                           >
                               {opt.label}
                           </button>
                       ))}
                       {screenId !== 'home' && !currentScreen.options.some(opt => opt.next === 'home') && (
                            <button
                                onClick={() => handleNavigate('home')}
                                className="flex items-center justify-center gap-2 px-5 py-3 bg-stone-500 text-white rounded-full shadow-md hover:bg-stone-600 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out text-sm md:text-base"
                            >
                                <HomeIcon className="w-5 h-5" />
                                ホームに戻る
                            </button>
                       )}
                    </div>
                </footer>
            </div>
            <p className="mt-4 text-sm text-stone-400 font-display">{APP_DATA.app.name}</p>
        </div>
    );
};

export default App;