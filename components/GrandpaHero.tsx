import React from 'react';

interface GrandpaHeroProps {
    className?: string;
}

const GrandpaHero: React.FC<GrandpaHeroProps> = ({ className = '' }) => (
    <img
        src="/image.png"
        alt="ヘッドホン姿のおじいちゃんラッパーのアイコン"
        className={className}
        draggable={false}
    />
);

export default GrandpaHero;
