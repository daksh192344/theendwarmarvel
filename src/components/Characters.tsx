import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getCharacterImage } from '../utils/characterImages';
import SoundManager from '../utils/sound/SoundManager';
import ParticleEffect from './VFX/ParticleEffect';

const Characters: React.FC = () => {
  const { characters, player } = useSelector((state: RootState) => state.game);
  const [vfxPosition, setVfxPosition] = useState<{ x: number; y: number } | null>(null);
  const [vfxType, setVfxType] = useState<'unlock' | 'levelUp' | null>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  const handleUnlock = (event: React.MouseEvent<HTMLButtonElement>, character: any) => {
    const soundManager = SoundManager.getInstance();
    soundManager.play('unlock');
    
    const rect = event.currentTarget.getBoundingClientRect();
    setVfxPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setVfxType('unlock');
  };

  const handleImageLoad = (characterName: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [characterName]: false
    }));
  };

  const handleImageError = (characterName: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [characterName]: false
    }));
    console.error(`Failed to load image for ${characterName}`);
  };

  return (
    <div className="relative w-full h-full bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 flex flex-col items-center py-8 space-y-12">
        <div className="flex flex-col items-center">
          <img 
            src="/profile-placeholder.png" 
            alt="Profile" 
            className="w-48 h-48 rounded-full bg-gray-700"
          />
          <span className="text-2xl mt-4">Lv.{player.level}</span>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="ml-64 h-full overflow-y-auto">
        <div className="p-12">
          <div className="mb-12">
            <h2 className="text-6xl font-bold mb-6">Characters</h2>
            <p className="text-3xl text-gray-400">Collection Progress: {player.characters.length}/{characters.length}</p>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-3 gap-8 pb-12">
            {characters.map(character => {
              const characterImage = getCharacterImage(character.name);
              const isLoading = loadingImages[character.name];

              return (
                <div
                  key={character.id}
                  className={`bg-gray-800 rounded-2xl p-8 ${!character.isUnlocked ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col h-full">
                    {/* Character Image */}
                    <div className="mb-6 overflow-hidden rounded-xl relative" style={{ minHeight: '250px' }}>
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
                        </div>
                      )}
                      {characterImage && (
                        <img
                          src={characterImage.imageUrl}
                          alt={characterImage.altText}
                          className={`w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                          onLoad={() => handleImageLoad(character.name)}
                          onError={() => handleImageError(character.name)}
                        />
                      )}
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-4xl font-bold mb-4">{character.name}</h3>
                      <div className="flex items-center mb-4">
                        <span className="material-icons text-3xl mr-2">favorite</span>
                        <span className="text-2xl">{character.health}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-3xl mr-2">stars</span>
                        <span className="text-2xl">Level {character.level}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {character.abilities.map(ability => (
                        <div key={ability.id} className="bg-gray-700 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-semibold">{ability.name}</span>
                            <span className="text-2xl text-yellow-500">{ability.damage} DMG</span>
                          </div>
                          <p className="text-xl text-gray-400">{ability.description}</p>
                        </div>
                      ))}
                    </div>

                    {!character.isUnlocked && (
                      <div className="mt-8">
                        <button
                          className="w-full bg-yellow-500 text-black rounded-xl py-6 text-2xl font-bold hover:bg-yellow-400 transition-all duration-200"
                          onClick={(e) => handleUnlock(e, character)}
                        >
                          Unlock for {character.unlockCost} 💎
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* VFX Layer */}
      {vfxPosition && vfxType && (
        <ParticleEffect
          type={vfxType}
          x={vfxPosition.x}
          y={vfxPosition.y}
          onComplete={() => {
            setVfxPosition(null);
            setVfxType(null);
          }}
        />
      )}
    </div>
  );
};

export default Characters; 