import React from 'react';
import type { AlbumEntry } from '../types';
import { PlayIcon, ShareIcon } from './icons';

interface AlbumProps {
    entries: AlbumEntry[];
}

const AlbumCard: React.FC<{ entry: AlbumEntry }> = ({ entry }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row transition-transform hover:scale-105 duration-300 border">
        <img src={entry.image} alt={entry.title} className="w-full sm:w-1/3 h-40 sm:h-auto object-cover" />
        <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <p className="text-sm text-stone-500">{entry.date}</p>
                <h3 className="font-display text-xl text-stone-800 mt-1">{entry.title}</h3>
                <p className="text-xs mt-1 text-blue-600 bg-blue-100 inline-block px-2 py-0.5 rounded-full">{entry.beat}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors">
                    <PlayIcon className="w-4 h-4" />
                    再生
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-sky-500 text-white text-sm rounded-full hover:bg-sky-600 transition-colors whitespace-nowrap">
                    <ShareIcon className="w-4 h-4" />
                    友達、家族に共有
                </button>
            </div>
        </div>
    </div>
);


const Album: React.FC<AlbumProps> = ({ entries }) => {
    return (
        <div className="space-y-6">
            {entries.length > 0 ? (
                 <div className="space-y-4 max-h-96 overflow-y-auto p-1">
                    {entries.map(entry => <AlbumCard key={entry.id} entry={entry} />)}
                </div>
            ) : (
                <div className="text-center p-8 bg-stone-100 rounded-lg">
                    <p className="text-stone-600">まだアルバムにラップがありません。</p>
                    <p className="text-stone-500 text-sm mt-2">最初のラップを作ってみましょう！</p>
                </div>
            )}
        </div>
    );
};

export default Album;
