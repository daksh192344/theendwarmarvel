import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const { player } = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar */}
      <div className="w-24 bg-gray-800 flex flex-col items-center py-4 space-y-6">
        <div className="flex flex-col items-center">
          <img 
            src="/profile-placeholder.png" 
            alt="Profile" 
            className="w-16 h-16 rounded-full bg-gray-700"
          />
          <span className="text-xs mt-2">Lv.{player.level}</span>
        </div>

        <button 
          onClick={() => navigate('/store')}
          className="w-20 h-20 bg-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-600"
        >
          <span className="material-icons text-2xl">store</span>
          <span className="text-xs mt-1">Store</span>
        </button>

        <button 
          onClick={() => navigate('/characters')}
          className="w-20 h-20 bg-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-600"
        >
          <span className="material-icons text-2xl">groups</span>
          <span className="text-xs mt-1">Characters</span>
        </button>

        <button 
          onClick={() => navigate('/guide')}
          className="w-20 h-20 bg-gray-700 rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-gray-600"
        >
          <span className="material-icons text-2xl">help</span>
          <span className="text-xs">Guide</span>
        </button>

        <button 
          onClick={() => navigate('/story')}
          className="w-20 h-20 bg-gray-700 rounded-lg flex flex-col items-center justify-center hover:bg-gray-600"
        >
          <span className="material-icons text-2xl">auto_stories</span>
          <span className="text-xs mt-1">Story</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center">
              <span className="material-icons text-yellow-500 mr-2">monetization_on</span>
              <span>{player.coins}</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center">
              <span className="material-icons text-blue-500 mr-2">diamond</span>
              <span>{player.diamonds}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/redeem')}
              className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Redeem Code
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Profile
            </button>
          </div>
        </div>

        {/* Character Display */}
        <div className="relative h-[500px] bg-gray-800 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Character model would go here */}
            <div className="text-6xl text-gray-600">Character Model</div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Battle Royale</h2>
                <p className="text-gray-400">Choose your character and join the fight!</p>
              </div>
              <button 
                onClick={() => navigate('/battle')}
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg text-xl font-bold hover:bg-yellow-400"
              >
                START
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby; 