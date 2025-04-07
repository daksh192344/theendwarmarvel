import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import captainAmericaImage from '../assets/images/captain-america.jpg';

const Characters: React.FC = () => {
  const { characters, player } = useSelector((state: RootState) => state.game);

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
            {characters.map(character => (
              <div
                key={character.id}
                className={`bg-gray-800 rounded-2xl p-8 ${!character.isUnlocked ? 'opacity-50' : ''}`}
              >
                <div className="flex flex-col h-full">
                  {/* Character Image */}
                  {character.name === "Captain America" && (
                    <div className="mb-6 overflow-hidden rounded-xl">
                      <img
                        src={captainAmericaImage}
                        alt="Captain America"
                        className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
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
                      >
                        Unlock for {character.unlockCost} 💎
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters; 