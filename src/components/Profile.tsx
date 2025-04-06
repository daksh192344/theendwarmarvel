import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const { player, characters } = useSelector((state: RootState) => state.game);
  const unlockedCharacters = characters.filter(c => player.characters.includes(c.id));
  const paidCharacters = characters.filter(c => c.isPaid);
  const totalCharacters = characters.length;

  // Calculate collection progress
  const collectionProgress = (unlockedCharacters.length / (totalCharacters - paidCharacters.length)) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Profile</h1>

        {/* Player Stats */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold mb-2">{player.name}</h2>
              <p className="text-gray-400 text-sm md:text-base">Level {player.level}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-yellow-500 font-bold text-lg md:text-xl">{player.coins} Coins</p>
            </div>
          </div>

          {/* Experience Bar */}
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>Experience</span>
              <span>{player.experience}/{player.level * 100}</span>
            </div>
            <div className="h-2 md:h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(player.experience / (player.level * 100)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Collection Progress */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Collection Progress</h2>
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>Characters Unlocked</span>
              <span>{unlockedCharacters.length}/{totalCharacters - paidCharacters.length}</span>
            </div>
            <div className="h-2 md:h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${collectionProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Unlocked Characters */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Your Characters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedCharacters.map((character) => (
              <div 
                key={character.id}
                className="bg-gray-700 rounded-lg p-3 md:p-4 transform transition-all duration-200 hover:scale-102"
              >
                <div className="aspect-square bg-gray-600 rounded-lg flex items-center justify-center mb-3">
                  <span className="material-icons text-4xl md:text-5xl">person</span>
                </div>
                <div className="text-center mb-3">
                  <h3 className="font-bold text-sm md:text-base mb-1">{character.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400">Level {character.level}</p>
                </div>
                {/* Character Stats */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Health</span>
                      <span>{character.maxHealth}</span>
                    </div>
                    <div className="h-1.5 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Experience</span>
                      <span>{character.experience}/1000</span>
                    </div>
                    <div className="h-1.5 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600"
                        style={{ width: `${(character.experience / 1000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                {/* Abilities Preview */}
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">Abilities:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {character.abilities.map((ability) => (
                      <span 
                        key={ability.id}
                        className="text-xs bg-gray-600 px-2 py-0.5 rounded"
                        title={ability.name}
                      >
                        {ability.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 