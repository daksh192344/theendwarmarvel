import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Characters: React.FC = () => {
  const { characters, player } = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Characters</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
        {characters.map((character) => (
          <div 
            key={character.id}
            className={`
              bg-gray-800 rounded-lg overflow-hidden
              ${character.isPaid ? 'border-2 border-yellow-500' : ''}
              ${player.characters.includes(character.id) ? 'ring-2 ring-green-500' : 'opacity-75'}
              transform transition-all duration-200 hover:scale-102
            `}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold">{character.name}</h2>
                  <p className="text-xs md:text-sm text-gray-400">Level {character.level}</p>
                </div>
                {character.isPaid && (
                  <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                    PREMIUM
                  </span>
                )}
              </div>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-1">
                    <span>Health</span>
                    <span>{character.maxHealth}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-xs md:text-sm uppercase tracking-wider text-gray-400">
                    Abilities
                  </h3>
                  {character.abilities.map((ability) => (
                    <div 
                      key={ability.id}
                      className="bg-gray-700 rounded p-2 text-xs md:text-sm"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{ability.name}</span>
                        {ability.damage > 0 && (
                          <span className="text-red-400">{ability.damage} DMG</span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-gray-400 flex flex-wrap gap-2">
                        {ability.effect && (
                          <span className="inline-block">
                            Effect: {ability.effect}
                            {ability.duration && ` (${ability.duration}s)`}
                          </span>
                        )}
                        {ability.cooldown && (
                          <span className="text-blue-400 inline-block">
                            CD: {ability.cooldown}s
                          </span>
                        )}
                        {ability.hits && (
                          <span className="text-purple-400 inline-block">
                            Hits: {ability.hits}
                          </span>
                        )}
                        {ability.tickDamage && (
                          <span className="text-orange-400 inline-block">
                            DoT: {ability.tickDamage}/s
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!player.characters.includes(character.id) && (
                  <div className="text-center pt-2">
                    {character.isPaid ? (
                      <button className="w-full bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm md:text-base font-bold hover:bg-yellow-400 transition-colors">
                        Purchase
                      </button>
                    ) : (
                      <p className="text-xs md:text-sm text-gray-400">
                        Unlock through gameplay
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters; 