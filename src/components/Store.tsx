import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Store: React.FC = () => {
  const { player, characters } = useSelector((state: RootState) => state.game);
  const premiumCharacters = characters.filter(c => c.isPaid && !player.characters.includes(c.id));

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
          <div className="flex flex-col items-center mt-8 space-y-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">💎</span>
              <span className="text-2xl">{player.gems}</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🪙</span>
              <span className="text-2xl">{player.gold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="ml-64 h-full overflow-y-auto">
        <div className="p-12">
          <div className="mb-12">
            <h2 className="text-6xl font-bold mb-6">Store</h2>
            <p className="text-3xl text-gray-400">Premium Characters & Items</p>
          </div>

          {/* Premium Characters */}
          <div className="mb-12">
            <h3 className="text-4xl font-bold mb-8">Premium Characters</h3>
            <div className="grid grid-cols-2 gap-8">
              {premiumCharacters.map(character => (
                <div key={character.id} className="bg-gray-800 rounded-2xl p-8">
                  <div className="flex flex-col h-full">
                    <div className="mb-8">
                      <h4 className="text-4xl font-bold mb-4">{character.name}</h4>
                      <div className="flex items-center mb-4">
                        <span className="material-icons text-3xl mr-2">favorite</span>
                        <span className="text-2xl">{character.health}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-3xl mr-2">stars</span>
                        <span className="text-2xl">Level {character.level}</span>
                      </div>
                    </div>

                    <div className="space-y-6 mb-8">
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

                    <button className="w-full bg-yellow-500 text-black rounded-xl py-6 text-2xl font-bold hover:bg-yellow-400 transition-all duration-200">
                      Purchase for {character.cost} 💎
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Items */}
          <div>
            <h3 className="text-4xl font-bold mb-8">Special Items</h3>
            <div className="grid grid-cols-3 gap-8">
              {[
                { id: 'gems1', name: 'Small Gem Pack', amount: 100, cost: 0.99 },
                { id: 'gems2', name: 'Medium Gem Pack', amount: 500, cost: 4.99 },
                { id: 'gems3', name: 'Large Gem Pack', amount: 1000, cost: 9.99 },
                { id: 'gold1', name: 'Small Gold Pack', amount: 1000, cost: 100 },
                { id: 'gold2', name: 'Medium Gold Pack', amount: 5000, cost: 450 },
                { id: 'gold3', name: 'Large Gold Pack', amount: 10000, cost: 800 }
              ].map(item => (
                <div key={item.id} className="bg-gray-800 rounded-2xl p-8">
                  <h4 className="text-3xl font-bold mb-6">{item.name}</h4>
                  <div className="flex items-center justify-center mb-8">
                    <span className="text-6xl">
                      {item.id.startsWith('gems') ? '💎' : '🪙'}
                    </span>
                    <span className="text-4xl ml-4">{item.amount}</span>
                  </div>
                  <button className="w-full bg-yellow-500 text-black rounded-xl py-6 text-2xl font-bold hover:bg-yellow-400 transition-all duration-200">
                    {item.id.startsWith('gems') 
                      ? `$${item.cost.toFixed(2)}`
                      : `${item.cost} 💎`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store; 