import React from 'react';
import { CameraIcon, PlayIcon } from './icons';

const MvDemo: React.FC = () => {
    return (
        <div className="space-y-6 text-center text-[#1B1F3B]">
            <div className="relative w-full aspect-video bg-gradient-to-b from-[#0E143C] via-[#111847] to-[#05060F] rounded-3xl overflow-hidden border-4 border-[#1B1F3B] shadow-[0_25px_60px_rgba(7,9,30,0.55)]">
                <img src="https://picsum.photos/seed/mv/600/337" alt="MV Placeholder" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center gap-4 px-6">
                    <div className="p-4 bg-white/10 rounded-full border border-white/40">
                        <PlayIcon className="w-16 h-16 text-white drop-shadow" />
                    </div>
                    <h3 className="font-display text-3xl text-white">人生MV（デモ）</h3>
                    <p className="text-sm text-white/80 max-w-md">
                        写真を選ぶと、あなたのラップと組み合わさったあなただけのミュージックビデオがここに流れます。
                    </p>
                </div>
            </div>
            <p className="text-sm text-[#4B4F7A] leading-relaxed">
                下のボタンから家族の写真を選ぶと、AIがビートに合わせて感動のハイライトをつくります。
                完成したらアルバムに保存していつでも見返しましょう。
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/85 border border-[#D7DCFF] rounded-full shadow-sm text-[#1F244B]">
                <CameraIcon className="w-6 h-6 text-[#FFD369]" />
                <span className="font-display">写真を準備してMVをつくろう</span>
            </div>
        </div>
    );
};

export default MvDemo;
