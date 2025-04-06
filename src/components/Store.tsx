import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const { player, characters } = useSelector((state: RootState) => state.game);

  const featuredCharacters = characters.filter(char => char.isPaid && !char.isUnlocked).slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 hover:text-gray-300"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold">Store</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center">
            <span className="material-icons text-yellow-500 mr-2">monetization_on</span>
            <span>{player.coins}</span>
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center">
            <span className="material-icons text-blue-500 mr-2">diamond</span>
            <span>{player.diamonds}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Featured Heroes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCharacters.map((character) => (
              <div key={character.id} className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="aspect-[16/9] bg-gray-700 flex items-center justify-center">
                  {/* Replace with actual character image */}
                  <span className="material-icons text-8xl">person</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{character.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">Special hero with unique abilities</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="material-icons text-blue-500 mr-1">diamond</span>
                      <span>1200</span>
                    </div>
                    <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currency Packages */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Get More Diamonds</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { amount: 100, bonus: 10, price: '$0.99' },
              { amount: 500, bonus: 75, price: '$4.99' },
              { amount: 1200, bonus: 200, price: '$9.99' },
              { amount: 2500, bonus: 500, price: '$19.99' },
            ].map((pack, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="material-icons text-blue-500 mr-2">diamond</span>
                  <span className="font-bold">{pack.amount}</span>
                  {pack.bonus > 0 && (
                    <span className="text-green-500 text-sm ml-2">+{pack.bonus}</span>
                  )}
                </div>
                <div className="text-lg font-bold text-yellow-500">{pack.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section>
          <h2 className="text-xl font-bold mb-4">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-2">Starter Pack</h3>
                  <p className="text-gray-200 mb-4">Perfect for new players!</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">check_circle</span>
                      <span>3 Random Heroes</span>
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">check_circle</span>
                      <span>1000 Coins</span>
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">check_circle</span>
                      <span>500 Diamonds</span>
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-500">$19.99</div>
                  <div className="text-sm line-through text-gray-400">$49.99</div>
                </div>
              </div>
              <button className="w-full bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-400">
                Purchase Pack
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-2">Battle Pass</h3>
                  <p className="text-gray-200 mb-4">Unlock premium rewards!</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">check_circle</span>
                      <span>Exclusive Skins</span>
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">check_circle</span>
                      <span>Weekly Rewards</span>
                    </li>
                    <li className="flex items-center">
                      <span className="material-icons text-yellow-500 mr-2">check_circle</span>
                      <span>Premium Missions</span>
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-500">$9.99</div>
                  <div className="text-sm text-gray-400">per season</div>
                </div>
              </div>
              <button className="w-full bg-yellow-500 text-black py-2 rounded-lg font-bold hover:bg-yellow-400">
                Get Battle Pass
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Store; 