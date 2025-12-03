import React from 'react';
import type { AlbumEntry } from '../types';
import { PlayIcon, ShareIcon } from './icons';

interface AlbumProps {
    entries: AlbumEntry[];
}

const AlbumCard: React.FC<{ entry: AlbumEntry }> = ({ entry }) => (
    <div className="bg-white/95 rounded-3xl shadow-[0_18px_45px_rgba(15,23,72,0.15)] overflow-hidden flex flex-col sm:flex-row border border-[#E0E7FF]">
        <img src={entry.image} alt={entry.title} className="w-full sm:w-1/3 h-48 sm:h-auto object-cover" />
        <div className="p-5 flex flex-col gap-4 flex-1">
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9AA1C6]">{entry.date}</p>
                <h3 className="font-display text-2xl text-[#1B1F3B] mt-1">{entry.title}</h3>
                <span className="inline-flex items-center gap-2 text-xs font-display text-[#1B1F3B] bg-[#FFE8B6] border border-[#F3CF78] px-3 py-1 rounded-full mt-2">
                    {entry.beat}
                </span>
            </div>
            <p className="text-sm text-[#4B4F7A] whitespace-pre-line">{entry.lyrics}</p>
            <div className="flex justify-end gap-2 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FFD369] text-[#1F244B] text-sm rounded-full font-display shadow hover:-translate-y-0.5 transition-all">
                    <PlayIcon className="w-4 h-4" />
                    再生する
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1B1F3B] text-white text-sm rounded-full font-display shadow hover:bg-[#2C3270] transition-all">
                    <ShareIcon className="w-4 h-4" />
                    家族に共有
                </button>
            </div>
        </div>
    </div>
);

const Album: React.FC<AlbumProps> = ({ entries }) => {
    return (
        <div className="space-y-6">
            {entries.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                    {entries.map(entry => <AlbumCard key={entry.id} entry={entry} />)}
                </div>
            ) : (
                <div className="text-center p-10 bg-white/85 border border-[#D7DCFF] rounded-3xl shadow-sm">
                    <p className="text-[#1B1F3B] font-display text-xl">まだアルバムにラップがありません。</p>
                    <p className="text-sm text-[#4B4F7A] mt-3">最初の一曲を作って、家族との思い出を残しましょう。</p>
                </div>
            )}
        </div>
    );
};

export default Album;
