
import React from 'react';
import { CameraIcon, PlayIcon } from './icons';

const MvDemo: React.FC = () => {
    return (
        <div className="space-y-6 text-center">
            <div className="w-full aspect-video bg-stone-900 rounded-lg flex items-center justify-center text-white relative overflow-hidden">
                <img src="https://picsum.photos/seed/mv/600/337" alt="MV Placeholder" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                    <PlayIcon className="w-16 h-16 text-white opacity-70 mb-4" />
                    <h3 className="font-display text-2xl">人生MV (デモ)</h3>
                    <p className="text-sm text-stone-300 mt-2">写真を選ぶとここにMVが表示されます</p>
                </div>
            </div>
             <p className="text-sm text-stone-500">
               下のボタンから家族の写真を選ぶと、あなたのラップと組み合わさって感動的なミュージックビデオが完成します！
            </p>
        </div>
    );
};

export default MvDemo;
